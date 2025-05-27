from flask import Blueprint, request, jsonify
from app.models import Client
from app import db

bp = Blueprint('clients', __name__)

@bp.route('/', methods=['POST'])
def create_client():
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No JSON data provided'}), 400
        
        # Validate required fields
        required_fields = ['analyst_name', 'name', 'client_type', 'email']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'{field} is required'}), 400
        
        # Validate pricing analyst name
        if not data.get('analyst_name', '').lower().startswith('pricing'):
            return jsonify({'error': 'Analyst name must start with "pricing"'}), 400
        
        client = Client(
            analyst_name=data['analyst_name'],
            name=data['name'],
            client_type=data['client_type'],
            country=data.get('country'),
            city=data.get('city'),
            currency=data.get('currency'),
            industry_sector=data.get('industry_sector'),
            company_size=data.get('company_size'),
            annual_revenue=data.get('annual_revenue'),
            contact_name=data.get('contact_name'),
            email=data['email'],
            phone=data.get('phone'),
            has_bi_team=data.get('has_bi_team', False),
            wants_bi_tool=data.get('wants_bi_tool', False),
            will_provide_bi_projects=data.get('will_provide_bi_projects', False)
        )
        
        db.session.add(client)
        db.session.commit()
        
        return jsonify(client.to_dict()), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@bp.route('/', methods=['GET'])
def get_all_clients():
    try:
        clients = Client.query.all()
        return jsonify([client.to_dict() for client in clients])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bp.route('/<int:id>', methods=['GET'])
def get_client(id):
    try:
        client = Client.query.get_or_404(id)
        return jsonify(client.to_dict())
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bp.route('/<int:id>', methods=['PUT'])
def update_client(id):
    try:
        client = Client.query.get_or_404(id)
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No JSON data provided'}), 400
        
        for field in ['name', 'client_type', 'country', 'city', 'currency',
                     'industry_sector', 'company_size', 'annual_revenue',
                     'contact_name', 'email', 'phone', 'has_bi_team',
                     'wants_bi_tool', 'will_provide_bi_projects']:
            if field in data:
                setattr(client, field, data[field])
        
        db.session.commit()
        return jsonify(client.to_dict())
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500