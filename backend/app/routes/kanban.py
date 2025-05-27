from flask import Blueprint, request, jsonify
from app.models import KanbanTicket, Project
from app import db

bp = Blueprint('kanban', __name__)

@bp.route('/', methods=['GET'])
def get_all_tickets():
    try:
        tickets = KanbanTicket.query.all()
        return jsonify([t.to_dict() for t in tickets])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bp.route('/<int:ticket_id>', methods=['GET'])
def get_ticket(ticket_id):
    try:
        ticket = KanbanTicket.query.get_or_404(ticket_id)
        return jsonify(ticket.to_dict())
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bp.route('/<int:ticket_id>/status', methods=['PUT'])
def update_ticket_status(ticket_id):
    try:
        ticket = KanbanTicket.query.get_or_404(ticket_id)
        data = request.get_json()
        
        if not data or 'status' not in data:
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
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@bp.route('/search', methods=['GET'])
def search_tickets():
    try:
        tag = request.args.get('tag')
        if not tag:
            return jsonify({'error': 'Tag parameter is required'}), 400
        
        # Use proper JSON query for PostgreSQL/MySQL or LIKE for SQLite
        tickets = KanbanTicket.query.filter(
            KanbanTicket.tags.contains([tag])
        ).all()
        return jsonify([t.to_dict() for t in tickets])
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500