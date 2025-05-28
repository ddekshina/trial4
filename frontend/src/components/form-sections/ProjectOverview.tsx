
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, FolderOpen } from "lucide-react";

interface ProjectOverviewProps {
  data: any;
  onChange: (data: any) => void;
}

const subscriptionPlans = [
  'Starter Lite (Monthly)',
  'Starter Growth (Monthly)',
  'Starter Scale (Monthly)',
  'Enterprise Lite (Monthly)',
  'Enterprise Growth (Monthly)',
  'Enterprise Scale (Monthly)',
  'Starter Lite (Annual)',
  'Starter Growth (Annual)',
  'Starter Scale (Annual)',
  'Enterprise Lite (Annual)',
  'Enterprise Growth (Annual)',
  'Enterprise Scale (Annual)',
  'Generative BI Developer'
];

const deliverableOptions = [
  'Dashboards',
  'Charts/Graphs',
  'KPI Reporting',
  'Interactive Reports',
  'Embedded Analytics',
  'Infographics',
  'White-labeled Portals'
];

const targetAudiences = [
  'Internal Teams',
  'External Clients',
  'Partners/Vendors'
];

export const ProjectOverview = ({ data, onChange }: ProjectOverviewProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const updateField = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const updateDeliverable = (deliverable: string, field: string, value: number) => {
    const deliverables = data.deliverables || {};
    const currentDeliverable = deliverables[deliverable] || {};
    
    onChange({
      ...data,
      deliverables: {
        ...deliverables,
        [deliverable]: {
          ...currentDeliverable,
          [field]: value,
          selected: value > 0 || currentDeliverable.selected
        }
      }
    });
  };

  const toggleDeliverable = (deliverable: string, checked: boolean) => {
    const deliverables = data.deliverables || {};
    
    if (checked) {
      onChange({
        ...data,
        deliverables: {
          ...deliverables,
          [deliverable]: {
            selected: true,
            quantity: deliverables[deliverable]?.quantity || 1,
            widgets: deliverables[deliverable]?.widgets || 1
          }
        }
      });
    } else {
      const newDeliverables = { ...deliverables };
      delete newDeliverables[deliverable];
      onChange({ ...data, deliverables: newDeliverables });
    }
  };

  const updateTargetAudience = (audience: string, checked: boolean) => {
    const audiences = data.target_audience || [];
    if (checked) {
      onChange({ ...data, target_audience: [...audiences, audience] });
    } else {
      onChange({ ...data, target_audience: audiences.filter((a: string) => a !== audience) });
    }
  };

  return (
    <Card className="animate-fade-in bg-white shadow-md hover:shadow-lg transition-shadow">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FolderOpen className="w-5 h-5 text-blue-600" />
                2. Project Overview
              </div>
              <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="project-title">Project Title *</Label>
                <Input
                  id="project-title"
                  placeholder="Enter project title"
                  value={data.title || ''}
                  onChange={(e) => updateField('title', e.target.value)}
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subscription-plan">Subscription Plan *</Label>
                <Select value={data.subscription_plan || ''} onValueChange={(value) => updateField('subscription_plan', value)}>
                  <SelectTrigger className="border-gray-300 focus:border-blue-500">
                    <SelectValue placeholder="Select plan" />
                  </SelectTrigger>
                  <SelectContent>
                    {subscriptionPlans.map((plan) => (
                      <SelectItem key={plan} value={plan}>{plan}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="project-description">Project Description *</Label>
              <Textarea
                id="project-description"
                placeholder="Describe the project in detail"
                value={data.description || ''}
                onChange={(e) => updateField('description', e.target.value)}
                className="border-gray-300 focus:border-blue-500 min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="business-objective">Business Objective *</Label>
              <Textarea
                id="business-objective"
                placeholder="What business goals will this project achieve?"
                value={data.business_objective || ''}
                onChange={(e) => updateField('business_objective', e.target.value)}
                className="border-gray-300 focus:border-blue-500 min-h-[80px]"
              />
            </div>

            <div className="space-y-4">
              <Label>Expected Deliverables *</Label>
              <div className="grid grid-cols-1 gap-4">
                {deliverableOptions.map((deliverable) => {
                  const isSelected = data.deliverables?.[deliverable]?.selected || false;
                  const quantity = data.deliverables?.[deliverable]?.quantity || 1;
                  const widgets = data.deliverables?.[deliverable]?.widgets || 1;
                  
                  return (
                    <div key={deliverable} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={(checked) => toggleDeliverable(deliverable, checked as boolean)}
                        />
                        <Label className="font-medium">{deliverable}</Label>
                      </div>
                      
                      {isSelected && (
                        <div className="grid grid-cols-2 gap-4 ml-6">
                          <div className="space-y-2">
                            <Label htmlFor={`${deliverable}-quantity`}>Quantity</Label>
                            <Input
                              id={`${deliverable}-quantity`}
                              type="number"
                              min="1"
                              value={quantity}
                              onChange={(e) => updateDeliverable(deliverable, 'quantity', parseInt(e.target.value) || 1)}
                              className="border-gray-300 focus:border-blue-500"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`${deliverable}-widgets`}>Number of Widgets</Label>
                            <Input
                              id={`${deliverable}-widgets`}
                              type="number"
                              min="1"
                              value={widgets}
                              onChange={(e) => updateDeliverable(deliverable, 'widgets', parseInt(e.target.value) || 1)}
                              className="border-gray-300 focus:border-blue-500"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4">
              <Label>Target Audience</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {targetAudiences.map((audience) => (
                  <div key={audience} className="flex items-center space-x-2">
                    <Checkbox
                      checked={data.target_audience?.includes(audience) || false}
                      onCheckedChange={(checked) => updateTargetAudience(audience, checked as boolean)}
                    />
                    <Label>{audience}</Label>
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
