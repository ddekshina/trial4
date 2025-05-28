
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Database, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TechnicalScopeProps {
  data: any;
  onChange: (data: any) => void;
}

const dataSources = [
  'Excel', 'CSV', 'XML', 'XLS', 'XLSX', 'JSON', 'APIs', 'Database', 'Cloud Storage'
];

const databases = [
  'MongoDB', 'MySQL', 'Microsoft SQL', 'Snowflake', 'PostgreSQL', 'Airtable'
];

const cloudServices = [
  'AWS S3', 'Google Cloud Storage', 'Azure Blob Storage', 'Dropbox', 'OneDrive'
];

const dataVolumes = [
  'Small (<1M)', 'Medium (1M–10M)', 'Large (10M+)'
];

const integrations = [
  'CRM (Salesforce)', 'ERP (SAP)', 'BI Tools (Power BI, Tableau)', 'Custom APIs'
];

export const TechnicalScope = ({ data, onChange }: TechnicalScopeProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const updateField = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const updateDataSource = (source: string, checked: boolean) => {
    const sources = data.data_sources || [];
    if (checked) {
      onChange({ ...data, data_sources: [...sources, source] });
    } else {
      onChange({ ...data, data_sources: sources.filter((s: string) => s !== source) });
    }
  };

  const updateDatabase = (database: string, checked: boolean) => {
    const databases = data.databases || [];
    if (checked) {
      onChange({ ...data, databases: [...databases, database] });
    } else {
      onChange({ ...data, databases: databases.filter((d: string) => d !== database) });
    }
  };

  const updateIntegration = (integration: string, checked: boolean) => {
    const integrations = data.required_integrations || [];
    if (checked) {
      onChange({ ...data, required_integrations: [...integrations, integration] });
    } else {
      onChange({ ...data, required_integrations: integrations.filter((i: string) => i !== integration) });
    }
  };

  const addApiInfo = () => {
    const apis = data.api_info || [];
    onChange({
      ...data,
      api_info: [...apis, { name: '', available: false, documented: false }]
    });
  };

  const updateApiInfo = (index: number, field: string, value: any) => {
    const apis = [...(data.api_info || [])];
    apis[index] = { ...apis[index], [field]: value };
    onChange({ ...data, api_info: apis });
  };

  const removeApiInfo = (index: number) => {
    const apis = [...(data.api_info || [])];
    apis.splice(index, 1);
    onChange({ ...data, api_info: apis });
  };

  const showDatabases = data.data_sources?.includes('Database');
  const showApiInfo = data.data_sources?.includes('APIs');
  const showCloudStorage = data.data_sources?.includes('Cloud Storage');

  return (
    <Card className="animate-fade-in bg-white shadow-md hover:shadow-lg transition-shadow">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-green-600" />
                3. Technical Scope
              </div>
              <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label>Data Sources</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {dataSources.map((source) => (
                  <div key={source} className="flex items-center space-x-2">
                    <Checkbox
                      checked={data.data_sources?.includes(source) || false}
                      onCheckedChange={(checked) => updateDataSource(source, checked as boolean)}
                    />
                    <Label>{source}</Label>
                  </div>
                ))}
              </div>
            </div>

            {showDatabases && (
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <Label>Databases</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {databases.map((db) => (
                    <div key={db} className="flex items-center space-x-2">
                      <Checkbox
                        checked={data.databases?.includes(db) || false}
                        onCheckedChange={(checked) => updateDatabase(db, checked as boolean)}
                      />
                      <Label>{db}</Label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {showApiInfo && (
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <Label>API Information</Label>
                  <Button type="button" onClick={addApiInfo} size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add API
                  </Button>
                </div>
                <div className="space-y-2">
                  <Input
                    placeholder="Specify API details"
                    value={data.api_specification || ''}
                    onChange={(e) => updateField('api_specification', e.target.value)}
                    className="border-gray-300 focus:border-green-500"
                  />
                </div>
                
                {(data.api_info || []).map((api: any, index: number) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-white rounded border">
                    <div className="space-y-2">
                      <Label>Primary API Name</Label>
                      <Input
                        placeholder="API name"
                        value={api.name || ''}
                        onChange={(e) => updateApiInfo(index, 'name', e.target.value)}
                        className="border-gray-300 focus:border-green-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>API Available?</Label>
                      <Select value={api.available ? 'yes' : 'no'} onValueChange={(value) => updateApiInfo(index, 'available', value === 'yes')}>
                        <SelectTrigger className="border-gray-300 focus:border-green-500">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>API Documented?</Label>
                      <Select value={api.documented ? 'yes' : 'no'} onValueChange={(value) => updateApiInfo(index, 'documented', value === 'yes')}>
                        <SelectTrigger className="border-gray-300 focus:border-green-500">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-end">
                      <Button type="button" onClick={() => removeApiInfo(index)} size="sm" variant="outline">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {showCloudStorage && (
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <Label>Cloud Storage Service</Label>
                <Select value={data.cloud_storage_service || ''} onValueChange={(value) => updateField('cloud_storage_service', value)}>
                  <SelectTrigger className="border-gray-300 focus:border-green-500">
                    <SelectValue placeholder="Select cloud service" />
                  </SelectTrigger>
                  <SelectContent>
                    {cloudServices.map((service) => (
                      <SelectItem key={service} value={service}>{service}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="google-sheet">Google Spreadsheet Link</Label>
              <Input
                id="google-sheet"
                placeholder="https://docs.google.com/spreadsheets/..."
                value={data.google_spreadsheet_link || ''}
                onChange={(e) => updateField('google_spreadsheet_link', e.target.value)}
                className="border-gray-300 focus:border-green-500"
              />
            </div>

            <div className="space-y-2">
              <Label>Volume of Data *</Label>
              <Select value={data.data_volume || ''} onValueChange={(value) => updateField('data_volume', value)}>
                <SelectTrigger className="border-gray-300 focus:border-green-500">
                  <SelectValue placeholder="Select data volume" />
                </SelectTrigger>
                <SelectContent>
                  {dataVolumes.map((volume) => (
                    <SelectItem key={volume} value={volume}>{volume}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label>Required Integrations</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {integrations.map((integration) => (
                  <div key={integration} className="flex items-center space-x-2">
                    <Checkbox
                      checked={data.required_integrations?.includes(integration) || false}
                      onCheckedChange={(checked) => updateIntegration(integration, checked as boolean)}
                    />
                    <Label>{integration}</Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};
