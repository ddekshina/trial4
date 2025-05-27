from flask import Blueprint, request, jsonify
from app.models import Project, Client, Quote, KanbanTicket
from app import db
from datetime import datetime

bp = Blueprint('projects', __name__)

@bp.route('/', methods=['POST'])
def create_project():
    data = request.get_json()
    
    # Validate client exists
    client = Client.query.get_or_404(data['client_id'])
    
    project = Project(
        client_id=data['client_id'],
        title=data['title'],
        description=data.get('description'),
        business_objective=data.get('business_objective'),
        subscription_plan=data.get('subscription_plan'),
        data_sources=data.get('data_sources', {}),
        features=data.get('features', {}),
        engagement_type=data.get('engagement_type'),
        support_plan=data.get('support_plan'),
        start_date=datetime.strptime(data['start_date'], '%Y-%m-%d') if data.get('start_date') else None,
        end_date=datetime.strptime(data['end_date'], '%Y-%m-%d') if data.get('end_date') else None,
        budget_range=data.get('budget_range'),
        analyst_notes=data.get('analyst_notes')
    )
    
    db.session.add(project)
    db.session.commit()
    
    # Create kanban ticket
    kanban_ticket = KanbanTicket(
        project_id=project.id,
        status='Pricing Submissions',
        tags=data.get('tags', [])
    )
    db.session.add(kanban_ticket)
    db.session.commit()
    
    return jsonify(project.to_dict()), 201

@bp.route('/<int:id>', methods=['GET'])
def get_project(id):
    project = Project.query.get_or_404(id)
    return jsonify(project.to_dict())

@bp.route('/<int:id>', methods=['PUT'])
def update_project(id):
    project = Project.query.get_or_404(id)
    data = request.get_json()
    
    for field in ['title', 'description', 'business_objective', 'subscription_plan',
                 'data_sources', 'features', 'engagement_type', 'support_plan',
                 'budget_range', 'analyst_notes']:
        if field in data:
            setattr(project, field, data[field])
    
    if 'start_date' in data:
        project.start_date = datetime.strptime(data['start_date'], '%Y-%m-%d')
    if 'end_date' in data:
        project.end_date = datetime.strptime(data['end_date'], '%Y-%m-%d')
    
    db.session.commit()
    return jsonify(project.to_dict())

# Add to_dict method to Project model
def project_to_dict(self):
    return {
        'id': self.id,
        'client_id': self.client_id,
        'title': self.title,
        'description': self.description,
        'business_objective': self.business_objective,
        'subscription_plan': self.subscription_plan,
        'data_sources': self.data_sources,
        'features': self.features,
        'engagement_type': self.engagement_type,
        'support_plan': self.support_plan,
        'start_date': self.start_date.isoformat() if self.start_date else None,
        'end_date': self.end_date.isoformat() if self.end_date else None,
        'budget_range': self.budget_range,
        'analyst_notes': self.analyst_notes,
        'created_at': self.created_at.isoformat() if self.created_at else None,
        'client': self.client.to_dict() if self.client else None,
        'quote': self.quote.to_dict() if self.quote else None,
        'kanban_ticket': self.kanban_ticket.to_dict() if self.kanban_ticket else None
    }

Project.to_dict = project_to_dict