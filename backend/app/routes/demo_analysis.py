from flask import Blueprint, request, jsonify
from app.models import DemoBusinessAnalysis, Project
from app import db
from datetime import datetime

bp = Blueprint('demo_analysis', __name__)

@bp.route('/project/<int:project_id>', methods=['POST'])
def create_demo_analysis(project_id):
    project = Project.query.get_or_404(project_id)
    data = request.get_json()
    
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

@bp.route('/project/<int:project_id>', methods=['GET'])
def get_demo_analysis(project_id):
    analysis = DemoBusinessAnalysis.query.filter_by(project_id=project_id).first()
    if not analysis:
        return jsonify({'error': 'Not found'}), 404
    return jsonify(analysis.to_dict())

# Add to_dict method to DemoBusinessAnalysis model
def demo_analysis_to_dict(self):
    return {
        'id': self.id,
        'project_id': self.project_id,
        'analysis_type': self.analysis_type,
        'company_website': self.company_website,
        'use_case_description': self.use_case_description,
        'reference_links': self.reference_links,
        'attachments': self.attachments,
        'verticals': self.verticals,
        'custom_vertical': self.custom_vertical,
        'demo_details': self.demo_details,
        'client_suggestions': self.client_suggestions,
        'problem_statement': self.problem_statement,
        'case_description': self.case_description,
        'stakeholders': self.stakeholders,
        'visualization_goal': self.visualization_goal,
        'resources_provided': self.resources_provided,
        'documentation_status': self.documentation_status,
        'support_team_available': self.support_team_available,
        'mathematical_modeling': self.mathematical_modeling,
        'created_at': self.created_at.isoformat() if self.created_at else None
    }

DemoBusinessAnalysis.to_dict = demo_analysis_to_dict