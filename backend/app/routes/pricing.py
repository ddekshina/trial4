from flask import Blueprint, request, jsonify
from app.models import Project, Quote
from app.utils.pricing_logic import generate_quote
from app import db
from datetime import datetime

bp = Blueprint('pricing', __name__)

@bp.route('/generate/<int:project_id>', methods=['POST'])
def generate_project_quote(project_id):
    try:
        project = Project.query.get_or_404(project_id)
        data = request.get_json() or {}
        
        # Merge project data with additional pricing details
        quote_data = {
            'num_dashboards': data.get('num_dashboards', 1),
            'num_widgets': data.get('num_widgets', 0),
            'file_counts': data.get('file_counts', {}),
            'database_sources': data.get('database_sources', []),
            'integrations': data.get('integrations', {}),
            'features': data.get('features', {}),
            'branding': data.get('branding', {}),
            'support_plan': project.support_plan or 'Basic',
            'support_hours': data.get('support_hours', 0),
            'hosting_details': data.get('hosting_details', {}),
            'currency': project.client.currency if project.client else 'USD'
        }
        
        # Calculate quote
        quote_result = generate_quote(quote_data)
        
        # Create or update quote
        if project.quote:
            quote = project.quote
            for key, value in quote_result.items():
                setattr(quote, key, value)
            quote.updated_at = datetime.utcnow()
        else:
            quote = Quote(
                project_id=project.id,
                **quote_result
            )
            db.session.add(quote)
        
        db.session.commit()
        
        return jsonify(quote.to_dict()), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@bp.route('/quote/<int:quote_id>', methods=['GET'])
def get_quote(quote_id):
    try:
        quote = Quote.query.get_or_404(quote_id)
        return jsonify(quote.to_dict())
    except Exception as e:
        return jsonify({'error': str(e)}), 500