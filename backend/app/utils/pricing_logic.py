def calculate_widgets_price(num_widgets):
    """Calculate price based on number of widgets"""
    return num_widgets * 20

def calculate_file_source_price(file_counts):
    """Calculate price for file data sources
    file_counts is a dict like {'csv': 2, 'excel': 1, ...}
    """
    if not file_counts or not isinstance(file_counts, dict):
        return 0
    return sum(count * 40 for count in file_counts.values() if isinstance(count, (int, float)))

def calculate_database_price(db_entries):
    """Calculate price for database sources
    db_entries is a list of dicts: [{'type': 'mysql', 'tables': [{'records': 5000}, ...]}, ...]
    """
    if not db_entries or not isinstance(db_entries, list):
        return 0
    
    total = 0
    for db in db_entries:
        if not isinstance(db, dict):
            continue
        for table in db.get('tables', []):
            if not isinstance(table, dict):
                continue
            records = table.get('records', 0)
            if not isinstance(records, (int, float)):
                continue
            
            if records < 1000:
                total += 40
            elif 1000 <= records < 10000:
                total += 100
            elif 10000 <= records < 100000:
                total += 200
            elif 100000 <= records < 1000000:
                total += 300
            else:
                total += 700
    return total

def calculate_integrations_price(integrations):
    """Calculate price for integrations
    integrations is a dict with api, cloud, software counts
    """
    if not integrations or not isinstance(integrations, dict):
        return 0
    
    total = 0
    integration_types = ['custom_apis', 'cloud_integrations', 'software_integrations', 'standard_integrations']
    
    for integration_type in integration_types:
        count = integrations.get(integration_type, 0)
        if isinstance(count, (int, float)):
            total += count * 400
    
    return total

def calculate_features_price(features):
    """Calculate price for features
    features is a dict of feature counts
    """
    if not features or not isinstance(features, dict):
        return 0
    
    total = 0
    drilldowns = features.get('drilldowns', 0)
    if isinstance(drilldowns, (int, float)):
        total += drilldowns * 20
    
    # Add more feature pricing as needed
    return total

def calculate_branding_price(branding, num_widgets, num_dashboards):
    """Calculate price for branding options
    branding is a dict of branding options
    """
    if not branding or not isinstance(branding, dict):
        return 0
    
    total = 0
    
    # Validate inputs
    if not isinstance(num_widgets, (int, float)):
        num_widgets = 0
    if not isinstance(num_dashboards, (int, float)):
        num_dashboards = 0
    
    if branding.get('logo'):
        total += 40
    if branding.get('widget_color'):
        total += num_widgets * 20
    if branding.get('dashboard_color'):
        total += num_dashboards * 20
    if branding.get('widget_font'):
        total += num_widgets * 20
    if branding.get('dashboard_style'):
        total += num_dashboards * 20
    if branding.get('localization'):
        total += num_widgets * 20
    if branding.get('dashboard_localization'):
        total += num_dashboards * 20
    
    return total

def calculate_support_price(support_plan, hours=0):
    """Calculate support pricing based on plan and hours"""
    if not isinstance(hours, (int, float)):
        hours = 0
    
    if support_plan == 'Priority':
        return hours * 40
    elif support_plan == 'Dedicated Account Manager':
        return 400  # Default to 20 hours/month * 20$/hour
    return 0

def calculate_hosting_price(hosting_details):
    """Calculate hosting price
    hosting_details contains widget_count, api_count, tables_count
    """
    if not hosting_details or not isinstance(hosting_details, dict):
        return 500 * 4  # Minimum hosting cost
    
    total = 0
    
    widget_count = hosting_details.get('widget_count', 0)
    if isinstance(widget_count, (int, float)):
        total += (widget_count // 10) * 1000
    
    api_count = hosting_details.get('api_count', 0)
    if isinstance(api_count, (int, float)):
        total += (api_count // 10) * 1000
    
    tables_count = hosting_details.get('tables_count', 0)
    if isinstance(tables_count, (int, float)):
        total += tables_count * 150
    
    total += 500 * 4  # Frontend/backend deployment and testing
    return total

def generate_quote(project_data):
    """Generate complete quote from project data"""
    if not isinstance(project_data, dict):
        project_data = {}
    
    # Extract all necessary data from project_data with defaults
    num_dashboards = project_data.get('num_dashboards', 1)
    num_widgets = project_data.get('num_widgets', 0)
    file_counts = project_data.get('file_counts', {})
    db_entries = project_data.get('database_sources', [])
    integrations = project_data.get('integrations', {})
    features = project_data.get('features', {})
    branding = project_data.get('branding', {})
    support_plan = project_data.get('support_plan', 'Basic')
    support_hours = project_data.get('support_hours', 0)
    hosting_details = project_data.get('hosting_details', {})
    currency = project_data.get('currency', 'USD')
    
    # Validate numeric inputs
    if not isinstance(num_dashboards, (int, float)) or num_dashboards < 1:
        num_dashboards = 1
    if not isinstance(num_widgets, (int, float)) or num_widgets < 0:
        num_widgets = 0
    
    # Calculate each component
    try:
        widgets_price = calculate_widgets_price(num_widgets)
        file_sources_price = calculate_file_source_price(file_counts)
        database_price = calculate_database_price(db_entries)
        integrations_price = calculate_integrations_price(integrations)
        features_price = calculate_features_price(features)
        branding_price = calculate_branding_price(branding, num_widgets, num_dashboards)
        support_price = calculate_support_price(support_plan, support_hours)
        hosting_price = calculate_hosting_price(hosting_details)
        
        # Calculate totals
        base_price = 1000  # Starting base price
        total_price = (base_price + widgets_price + file_sources_price + database_price +
                      integrations_price + features_price + branding_price + 
                      support_price + hosting_price)
        
        return {
            'base_price': float(base_price),
            'widgets_price': float(widgets_price),
            'data_sources_price': float(file_sources_price + database_price),
            'integrations_price': float(integrations_price),
            'features_price': float(features_price),
            'branding_price': float(branding_price),
            'support_price': float(support_price),
            'hosting_price': float(hosting_price),
            'total_price': float(total_price),
            'currency': currency
        }
    
    except Exception as e:
        # Return basic quote if calculation fails
        return {
            'base_price': 1000.0,
            'widgets_price': 0.0,
            'data_sources_price': 0.0,
            'integrations_price': 0.0,
            'features_price': 0.0,
            'branding_price': 0.0,
            'support_price': 0.0,
            'hosting_price': 2000.0,
            'total_price': 3000.0,
            'currency': currency
        }