
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, TrendingUp } from "lucide-react";

interface CompetitiveInputsProps {
  data: any;
  onChange: (data: any) => void;
}

export const CompetitiveInputs = ({ data, onChange }: CompetitiveInputsProps) => {
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
                <TrendingUp className="w-5 h-5 text-red-600" />
                6. Competitive / Value-based Inputs
              </div>
              <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="budget-range">Client Budget Range *</Label>
              <Input
                id="budget-range"
                placeholder="e.g., $10,000 - $25,000"
                value={data.budget_range || ''}
                onChange={(e) => updateField('budget_range', e.target.value)}
                className="border-gray-300 focus:border-red-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="competitor-comparison">Competitor Comparison</Label>
              <Textarea
                id="competitor-comparison"
                placeholder="How does this compare to competitor offerings?"
                value={data.competitor_comparison || ''}
                onChange={(e) => updateField('competitor_comparison', e.target.value)}
                className="border-gray-300 focus:border-red-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="roi-expectations">ROI Expectations</Label>
              <Textarea
                id="roi-expectations"
                placeholder="What ROI does the client expect?"
                value={data.roi_expectations || ''}
                onChange={(e) => updateField('roi_expectations', e.target.value)}
                className="border-gray-300 focus:border-red-500"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="tiered-pricing">Tiered Pricing Needed</Label>
                <Switch
                  id="tiered-pricing"
                  checked={data.tiered_pricing_needed || false}
                  onCheckedChange={(checked) => updateField('tiered_pricing_needed', checked)}
                />
              </div>
              
              {data.tiered_pricing_needed && (
                <div className="space-y-2">
                  <Label htmlFor="tiered-details">Tiered Pricing Details</Label>
                  <Textarea
                    id="tiered-details"
                    placeholder="Describe the different pricing tiers"
                    value={data.tiered_pricing_details || ''}
                    onChange={(e) => updateField('tiered_pricing_details', e.target.value)}
                    className="border-gray-300 focus:border-red-500"
                  />
                </div>
              )}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};
