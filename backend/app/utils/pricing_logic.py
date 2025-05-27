def calculate_widgets_price(num_widgets):
    return num_widgets * 20

def calculate_file_source_price(file_counts):
    # file_counts is a dict like {'csv': 2, 'excel': 1, ...}
    return sum(count * 40 for count in file_counts.values())

def calculate_database_price(db_entries):
    # db_entries is a list of dicts: [{'type': 'mysql', 'tables': [{'records': 5000}, ...]}, ...]
    total = 0
    for db in db_entries:
        for table in db.get('tables', []):
            records = table.get('records', 0)
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
    # integrations is a dict with api, cloud, software counts
    total = 0
    total += integrations.get('custom_apis', 0) * 400
    total += integrations.get('cloud_integrations', 0) * 400
    total += integrations.get('software_integrations', 0) * 400
    total += integrations.get('standard_integrations', 0) * 400
    return total

def calculate_features_price(features):
    # features is a dict of feature counts
    total = 0
    total += features.get('drilldowns', 0) * 20
    return total

def calculate_branding_price(branding, num_widgets, num_dashboards):
    # branding is a dict of branding options
    total = 0
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
    if support_plan == 'Priority':
        return hours * 40
    elif support_plan == 'Dedicated Account Manager':
        return 400  # Default to 20 hours/month
    return 0

def calculate_hosting_price(hosting_details):
    # hosting_details contains widget_count, api_count, tables_count
    total = 0
    total += (hosting_details.get('widget_count', 0) // 10) * 1000
    total += (hosting_details.get('api_count', 0) // 10) * 1000
    total += hosting_details.get('tables_count', 0) * 150
    total += 500 * 4  # Frontend/backend deployment and testing
    return total

def generate_quote(project_data):
    # Extract all necessary data from project_data
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
    
    # Calculate each component
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
        'base_price': base_price,
        'widgets_price': widgets_price,
        'data_sources_price': file_sources_price + database_price,
        'integrations_price': integrations_price,
        'features_price': features_price,
        'branding_price': branding_price,
        'support_price': support_price,
        'hosting_price': hosting_price,
        'total_price': total_price,
        'currency': project_data.get('currency', 'USD')
    }