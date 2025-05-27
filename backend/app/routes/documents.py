from flask import Blueprint, request, jsonify
from app.models import Document, Project
from app import db
from datetime import datetime
import os
from werkzeug.utils import secure_filename

bp = Blueprint('documents', __name__)

# Configure upload folder (should be in config.py)
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@bp.route('/project/<int:project_id>', methods=['POST'])
def upload_document(project_id):
    project = Project.query.get_or_404(project_id)
    
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        os.makedirs(UPLOAD_FOLDER, exist_ok=True)
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        file.save(filepath)
        
        document = Document(
            project_id=project_id,
            filename=filename,
            filepath=filepath,
            filetype=filename.rsplit('.', 1)[1].lower()
        )
        
        db.session.add(document)
        db.session.commit()
        
        return jsonify(document.to_dict()), 201
    
    return jsonify({'error': 'Invalid file type'}), 400

@bp.route('/project/<int:project_id>', methods=['GET'])
def get_project_documents(project_id):
    documents = Document.query.filter_by(project_id=project_id).all()
    return jsonify([d.to_dict() for d in documents])

@bp.route('/<int:doc_id>', methods=['DELETE'])
def delete_document(doc_id):
    document = Document.query.get_or_404(doc_id)
    
    try:
        os.remove(document.filepath)
    except OSError:
        pass
    
    db.session.delete(document)
    db.session.commit()
    
    return jsonify({'message': 'Document deleted'})

# Add to_dict method to Document model
def document_to_dict(self):
    return {
        'id': self.id,
        'project_id': self.project_id,
        'filename': self.filename,
        'filepath': self.filepath,
        'filetype': self.filetype,
        'uploaded_at': self.uploaded_at.isoformat() if self.uploaded_at else None
    }

Document.to_dict = document_to_dict