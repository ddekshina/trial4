from flask import Blueprint, request, jsonify
from app.models import DemoBusinessAnalysis, Project
from app import db

bp = Blueprint('demo_analysis', __name__)

@bp.route('/project/<int:project_id>', methods=['POST'])
def create_demo_analysis(project_id):
    try:
        project = Project.query.get_or_404(project_id)
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No JSON data provided'}), 400
        
        if not data.get('analysis_type'):
            return jsonify({'error': 'analysis_type is required'}), 400
        
        analysis = DemoBusinessAnalysis(
            project_id=project_id,
            analysis_type=data['analysis_type'],
            company_website=data.get('company_website'),
            use_case_description=data.get('use_case_description'),
            reference_links=data.get('reference_links', []),
            attachments=data.get('attachments', []),
            verticals=data.get('verticals', []),
            custom_vertical=data.get('custom_vertical'),
            demo_details=data.get('demo_details', {}),
            client_suggestions=data.get('client_suggestions'),
            problem_statement=data.get('problem_statement'),
            case_description=data.get('case_description'),
            stakeholders=data.get('stakeholders'),
            visualization_goal=data.get('visualization_goal'),
            resources_provided=data.get('resources_provided'),
            documentation_status=data.get('documentation_status'),
            support_team_available=data.get('support_team_available', False),
            mathematical_modeling=data.get('mathematical_modeling', False)
        )
        
        db.session.add(analysis)
        
        # Update kanban ticket tags
        if project.kanban_ticket:
            tags = project.kanban_ticket.tags or []
            if data['analysis_type'] not in tags:
                tags.append(data['analysis_type'])
                project.kanban_ticket.tags = tags
        
        db.session.commit()
        
        return jsonify(analysis.to_dict()), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@bp.route('/project/<int:project_id>', methods=['GET'])
def get_demo_analysis(project_id):
    try:
        analysis = DemoBusinessAnalysis.query.filter_by(project_id=project_id).first()
        if not analysis:
            return jsonify({'error': 'Demo analysis not found'}), 404
        return jsonify(analysis.to_dict())
    except Exception as e:
        return jsonify({'error': str(e)}), 500