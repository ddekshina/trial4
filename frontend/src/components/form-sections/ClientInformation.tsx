
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Users } from "lucide-react";

interface ClientInformationProps {
  data: any;
  onChange: (data: any) => void;
}

const countries = [
  { code: "US", name: "United States", currency: "USD" },
  { code: "CA", name: "Canada", currency: "CAD" },
  { code: "GB", name: "United Kingdom", currency: "GBP" },
  { code: "AU", name: "Australia", currency: "AUD" },
  { code: "DE", name: "Germany", currency: "EUR" },
  { code: "FR", name: "France", currency: "EUR" },
  { code: "IN", name: "India", currency: "INR" },
  { code: "SG", name: "Singapore", currency: "SGD" }
];

const clientTypes = ["B2B", "B2B2B", "Private individual"];

const industrySectors = [
  "Technology", "Healthcare", "Finance", "Retail", "Manufacturing", 
  "Education", "Government", "Non-profit", "Entertainment", "Other"
];

const companySizes = [
  "1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"
];

export const ClientInformation = ({ data, onChange }: ClientInformationProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const updateField = (field: string, value: any) => {
    const newData = { ...data, [field]: value };
    
    // Auto-update currency when country changes
    if (field === 'country') {
      const country = countries.find(c => c.name === value);
      if (country) {
        newData.currency = country.currency;
      }
    }
    
    onChange(newData);
  };

  return (
    <Card className="animate-fade-in bg-white shadow-md hover:shadow-lg transition-shadow">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-600" />
                1. Client Information
              </div>
              <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="analyst-name">Pricing Analyst Name *</Label>
                <Input
                  id="analyst-name"
                  placeholder="pricing-analyst-name"
                  value={data.analyst_name || ''}
                  onChange={(e) => updateField('analyst_name', e.target.value)}
                  className="border-gray-300 focus:border-purple-500"
                />
                <p className="text-xs text-gray-500">Must start with "pricing"</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="client-name">Client Name *</Label>
                <Input
                  id="client-name"
                  placeholder="Company Name"
                  value={data.client_name || ''}
                  onChange={(e) => updateField('client_name', e.target.value)}
                  className="border-gray-300 focus:border-purple-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="client-type">Client Type *</Label>
                <Select value={data.client_type || ''} onValueChange={(value) => updateField('client_type', value)}>
                  <SelectTrigger className="border-gray-300 focus:border-purple-500">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {clientTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select value={data.country || ''} onValueChange={(value) => updateField('country', value)}>
                  <SelectTrigger className="border-gray-300 focus:border-purple-500">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.code} value={country.name}>{country.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Input
                  id="currency"
                  value={data.currency || 'USD'}
                  readOnly
                  className="bg-gray-50 border-gray-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  placeholder="City name"
                  value={data.city || ''}
                  onChange={(e) => updateField('city', e.target.value)}
                  className="border-gray-300 focus:border-purple-500"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="industry">Industry Sector *</Label>
                <Select value={data.industry_sector || ''} onValueChange={(value) => updateField('industry_sector', value)}>
                  <SelectTrigger className="border-gray-300 focus:border-purple-500">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industrySectors.map((sector) => (
                      <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company-size">Company Size (employees) *</Label>
                <Select value={data.company_size || ''} onValueChange={(value) => updateField('company_size', value)}>
                  <SelectTrigger className="border-gray-300 focus:border-purple-500">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {companySizes.map((size) => (
                      <SelectItem key={size} value={size}>{size}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="revenue">Annual Revenue ({data.currency || 'USD'}) *</Label>
                <Input
                  id="revenue"
                  type="number"
                  placeholder="Annual revenue"
                  value={data.annual_revenue || ''}
                  onChange={(e) => updateField('annual_revenue', e.target.value)}
                  className="border-gray-300 focus:border-purple-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact-name">Primary Contact Name *</Label>
                <Input
                  id="contact-name"
                  placeholder="Contact person"
                  value={data.contact_name || ''}
                  onChange={(e) => updateField('contact_name', e.target.value)}
                  className="border-gray-300 focus:border-purple-500"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="contact@company.com"
                  value={data.email || ''}
                  onChange={(e) => updateField('email', e.target.value)}
                  className="border-gray-300 focus:border-purple-500"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1-555-123-4567"
                  value={data.phone || ''}
                  onChange={(e) => updateField('phone', e.target.value)}
                  className="border-gray-300 focus:border-purple-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="has-bi-team">Has BI Team</Label>
                <Switch
                  id="has-bi-team"
                  checked={data.has_bi_team || false}
                  onCheckedChange={(checked) => updateField('has_bi_team', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="wants-bi-tool">Wants to use tool with BI team?</Label>
                <Switch
                  id="wants-bi-tool"
                  checked={data.wants_bi_tool || false}
                  onCheckedChange={(checked) => updateField('wants_bi_tool', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="will-provide-projects">Will provide BI projects?</Label>
                <Switch
                  id="will-provide-projects"
                  checked={data.will_provide_projects || false}
                  onCheckedChange={(checked) => updateField('will_provide_projects', checked)}
                />
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};
