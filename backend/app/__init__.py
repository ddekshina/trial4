from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object('app.config.Config')
    
    db.init_app(app)
    migrate.init_app(app, db)
    
    # Import models after db initialization
    from app import models
    
    # Register blueprints
    from app.routes import clients, projects, pricing, kanban, demo_analysis, documents
    app.register_blueprint(clients.bp, url_prefix='/api/clients')
    app.register_blueprint(projects.bp, url_prefix='/api/projects')
    app.register_blueprint(pricing.bp, url_prefix='/api/pricing')
    app.register_blueprint(kanban.bp, url_prefix='/api/kanban')
    app.register_blueprint(demo_analysis.bp, url_prefix='/api/demo-analysis')
    app.register_blueprint(documents.bp, url_prefix='/api/documents')
    
    return app
