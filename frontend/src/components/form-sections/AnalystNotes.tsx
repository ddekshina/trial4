
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, FileText } from "lucide-react";

interface AnalystNotesProps {
  data: any;
  onChange: (data: any) => void;
}

const pricingModels = [
  'Fixed Price', 'Time & Materials', 'Milestone-based', 'Subscription', 'Retainer'
];

const nextStepOptions = [
  'Project basis', 'Retainer basis (Dedicated BI developer)'
];

export const AnalystNotes = ({ data, onChange }: AnalystNotesProps) => {
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
                <FileText className="w-5 h-5 text-indigo-600" />
                7. Analyst Notes & Recommendations
              </div>
              <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="internal-notes">Internal Analyst Notes</Label>
              <Textarea
                id="internal-notes"
                placeholder="Internal notes and observations"
                value={data.internal_notes || ''}
                onChange={(e) => updateField('internal_notes', e.target.value)}
                className="border-gray-300 focus:border-indigo-500 min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label>Suggested Pricing Model</Label>
              <Select value={data.suggested_pricing_model || ''} onValueChange={(value) => updateField('suggested_pricing_model', value)}>
                <SelectTrigger className="border-gray-300 focus:border-indigo-500">
                  <SelectValue placeholder="Select pricing model" />
                </SelectTrigger>
                <SelectContent>
                  {pricingModels.map((model) => (
                    <SelectItem key={model} value={model}>{model}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="risk-factors">Risk Factors</Label>
              <Textarea
                id="risk-factors"
                placeholder="Identify potential risks and mitigation strategies"
                value={data.risk_factors || ''}
                onChange={(e) => updateField('risk_factors', e.target.value)}
                className="border-gray-300 focus:border-indigo-500"
              />
            </div>

            <div className="space-y-2">
              <Label>Suggested Next Steps</Label>
              <Select value={data.suggested_next_steps || ''} onValueChange={(value) => updateField('suggested_next_steps', value)}>
                <SelectTrigger className="border-gray-300 focus:border-indigo-500">
                  <SelectValue placeholder="Select next steps" />
                </SelectTrigger>
                <SelectContent>
                  {nextStepOptions.map((step) => (
                    <SelectItem key={step} value={step}>{step}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};
