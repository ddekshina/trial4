from flask import Blueprint, request, jsonify
from app.models import KanbanTicket, Project
from app import db

bp = Blueprint('kanban', __name__)

@bp.route('/', methods=['GET'])
def get_all_tickets():
    tickets = KanbanTicket.query.all()
    return jsonify([t.to_dict() for t in tickets])

@bp.route('/<int:ticket_id>', methods=['GET'])
def get_ticket(ticket_id):
    ticket = KanbanTicket.query.get_or_404(ticket_id)
    return jsonify(ticket.to_dict())

@bp.route('/<int:ticket_id>/status', methods=['PUT'])
def update_ticket_status(ticket_id):
    ticket = KanbanTicket.query.get_or_404(ticket_id)
    data = request.get_json()
    
    if 'status' not in data:
        return jsonify({'error': 'Status is required'}), 400
    
    valid_statuses = [
        'Pricing Submissions',
        'Quote Generated',
        'Contract Signed',
        'Contract Rejected',
        'Project Started',
        'Project Delivered',
        'Project Change Log After Delivery',
        'Change Log Pricing Accepted',
        'Change Log Pricing Rejected'
    ]
    
    if data['status'] not in valid_statuses:
        return jsonify({'error': 'Invalid status'}), 400
    
    ticket.status = data['status']
    db.session.commit()
    
    return jsonify(ticket.to_dict())

@bp.route('/search', methods=['GET'])
def search_tickets():
    tag = request.args.get('tag')
    if not tag:
        return jsonify({'error': 'Tag parameter is required'}), 400
    
    tickets = KanbanTicket.query.filter(KanbanTicket.tags.contains([tag])).all()
    return jsonify([t.to_dict() for t in tickets])

# Add to_dict method to KanbanTicket model
def kanban_ticket_to_dict(self):
    return {
        'id': self.id,
        'project_id': self.project_id,
        'status': self.status,
        'tags': self.tags,
        'created_at': self.created_at.isoformat() if self.created_at else None,
        'updated_at': self.updated_at.isoformat() if self.updated_at else None,
        'project': self.project.to_dict() if self.project else None
    }

KanbanTicket.to_dict = kanban_ticket_to_dict