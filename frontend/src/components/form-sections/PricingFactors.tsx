
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, DollarSign } from "lucide-react";

interface PricingFactorsProps {
  data: any;
  onChange: (data: any) => void;
}

const engagementTypes = ['One-time Project', 'Monthly Retainer', 'Subscription'];
const supportPlans = ['Basic', 'Priority', 'Dedicated Account Manager'];
const deliveryModels = ['Web Portal', 'Downloadable Reports'];

export const PricingFactors = ({ data, onChange }: PricingFactorsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const updateField = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <Card className="animate-fade-in bg-white shadow-md hover:shadow-lg transition-shadow">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-yellow-600" />
                5. Pricing Factors
              </div>
              <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Engagement Type *</Label>
                <Select value={data.engagement_type || ''} onValueChange={(value) => updateField('engagement_type', value)}>
                  <SelectTrigger className="border-gray-300 focus:border-yellow-500">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {engagementTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Support Plan Required *</Label>
                <Select value={data.support_plan || ''} onValueChange={(value) => updateField('support_plan', value)}>
                  <SelectTrigger className="border-gray-300 focus:border-yellow-500">
                    <SelectValue placeholder="Select plan" />
                  </SelectTrigger>
                  <SelectContent>
                    {supportPlans.map((plan) => (
                      <SelectItem key={plan} value={plan}>{plan}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-date">Estimated Start Date *</Label>
                <Input
                  id="start-date"
                  type="date"
                  value={data.start_date || ''}
                  onChange={(e) => updateField('start_date', e.target.value)}
                  className="border-gray-300 focus:border-yellow-500"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="end-date">Estimated End Date *</Label>
                <Input
                  id="end-date"
                  type="date"
                  value={data.end_date || ''}
                  onChange={(e) => updateField('end_date', e.target.value)}
                  className="border-gray-300 focus:border-yellow-500"
                />
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};
