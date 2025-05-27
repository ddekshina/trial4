from flask import Blueprint, request, jsonify
from app.models import Project, Client, KanbanTicket
from app import db
from datetime import datetime

bp = Blueprint('projects', __name__)

@bp.route('/', methods=['POST'])
def create_project():
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No JSON data provided'}), 400
        
        # Validate required fields
        if not data.get('client_id'):
            return jsonify({'error': 'client_id is required'}), 400
        if not data.get('title'):
            return jsonify({'error': 'title is required'}), 400
        
        # Validate client exists
        client = Client.query.get_or_404(data['client_id'])
        
        project = Project(
            client_id=data['client_id'],
            title=data['title'],
            description=data.get('description'),
            business_objective=data.get('business_objective'),
            expected_deliverables=data.get('expected_deliverables', []),
            subscription_plan=data.get('subscription_plan'),
            target_audience=data.get('target_audience', []),
            data_sources=data.get('data_sources', {}),
            data_volume=data.get('data_volume'),
            api_details=data.get('api_details', {}),
            google_spreadsheet=data.get('google_spreadsheet'),
            required_integrations=data.get('required_integrations', []),
            interactivity=data.get('interactivity', {}),
            user_access=data.get('user_access', {}),
            customization=data.get('customization', {}),
            engagement_type=data.get('engagement_type'),
            support_plan=data.get('support_plan'),
            delivery_model=data.get('delivery_model', {}),
            budget_range=data.get('budget_range'),
            competitor_comparison=data.get('competitor_comparison'),
            roi_expectations=data.get('roi_expectations'),
            tiered_pricing=data.get('tiered_pricing', {}),
            analyst_notes=data.get('analyst_notes'),
            suggested_pricing_model=data.get('suggested_pricing_model'),
            risk_factors=data.get('risk_factors'),
            next_steps=data.get('next_steps')
        )
        
        if data.get('start_date'):
            try:
                project.start_date = datetime.strptime(data['start_date'], '%Y-%m-%d').date()
            except ValueError:
                return jsonify({'error': 'Invalid start_date format. Use YYYY-MM-DD'}), 400
        
        if data.get('end_date'):
            try:
                project.end_date = datetime.strptime(data['end_date'], '%Y-%m-%d').date()
            except ValueError:
                return jsonify({'error': 'Invalid end_date format. Use YYYY-MM-DD'}), 400
        
        db.session.add(project)
        db.session.flush()  # Flush to get the project ID
        
        # Create kanban ticket
        kanban_ticket = KanbanTicket(
            project_id=project.id,
            status='Pricing Submissions',
            tags=data.get('tags', [])
        )
        db.session.add(kanban_ticket)
        db.session.commit()
        
        return jsonify(project.to_dict()), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@bp.route('/', methods=['GET'])
def get_all_projects():
    try:
        projects = Project.query.all()
        return jsonify([project.to_dict() for project in projects])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bp.route('/<int:id>', methods=['GET'])
def get_project(id):
    try:
        project = Project.query.get_or_404(id)
        return jsonify(project.to_dict())
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bp.route('/<int:id>', methods=['PUT'])
def update_project(id):
    try:
        project = Project.query.get_or_404(id)
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No JSON data provided'}), 400
        
        # Update all possible fields
        updatable_fields = [
            'title', 'description', 'business_objective', 'expected_deliverables',
            'subscription_plan', 'target_audience', 'data_sources', 'data_volume',
            'api_details', 'google_spreadsheet', 'required_integrations',
            'interactivity', 'user_access', 'customization', 'engagement_type',
            'support_plan', 'delivery_model', 'budget_range', 'competitor_comparison',
            'roi_expectations', 'tiered_pricing', 'analyst_notes',
            'suggested_pricing_model', 'risk_factors', 'next_steps'
        ]
        
        for field in updatable_fields:
            if field in data:
                setattr(project, field, data[field])
        
        if 'start_date' in data and data['start_date']:
            try:
                project.start_date = datetime.strptime(data['start_date'], '%Y-%m-%d').date()
            except ValueError:
                return jsonify({'error': 'Invalid start_date format. Use YYYY-MM-DD'}), 400
        
        if 'end_date' in data and data['end_date']:
            try:
                project.end_date = datetime.strptime(data['end_date'], '%Y-%m-%d').date()
            except ValueError:
                return jsonify({'error': 'Invalid end_date format. Use YYYY-MM-DD'}), 400
        
        db.session.commit()
        return jsonify(project.to_dict())
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500