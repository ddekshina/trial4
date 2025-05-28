
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, PlayCircle } from "lucide-react";

interface DemoAnalysisProps {
  data: any;
  onChange: (data: any) => void;
}

const analysisTypes = ['Demo', 'Business Analysis'];

export const DemoAnalysis = ({ data, onChange }: DemoAnalysisProps) => {
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
                <PlayCircle className="w-5 h-5 text-blue-600" />
                9. Demo OR Business Analysis
              </div>
              <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label>Select Type</Label>
              <RadioGroup value={data.type || ''} onValueChange={(value) => updateField('type', value)}>
                {analysisTypes.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <RadioGroupItem value={type} id={type} />
                    <Label htmlFor={type}>{type}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {data.type === 'Demo' && (
              <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900">Demo Information</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company-website">Company Website</Label>
                    <Input
                      id="company-website"
                      placeholder="https://company.com"
                      value={data.company_website || ''}
                      onChange={(e) => updateField('company_website', e.target.value)}
                      className="border-gray-300 focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="demo-date">Preferred Demo Date</Label>
                    <Input
                      id="demo-date"
                      type="date"
                      value={data.demo_date || ''}
                      onChange={(e) => updateField('demo_date', e.target.value)}
                      className="border-gray-300 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="use-case-description">Description of Use Case</Label>
                  <Textarea
                    id="use-case-description"
                    placeholder="Describe the intended use case for the demo"
                    value={data.use_case_description || ''}
                    onChange={(e) => updateField('use_case_description', e.target.value)}
                    className="border-gray-300 focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            {data.type === 'Business Analysis' && (
              <div className="space-y-4 p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900">Business Analysis</h4>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="problem-statement">Problem Statement</Label>
                    <Textarea
                      id="problem-statement"
                      placeholder="Describe the business problem"
                      value={data.problem_statement || ''}
                      onChange={(e) => updateField('problem_statement', e.target.value)}
                      className="border-gray-300 focus:border-green-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="stakeholders">Stakeholders</Label>
                    <Textarea
                      id="stakeholders"
                      placeholder="List key stakeholders"
                      value={data.stakeholders || ''}
                      onChange={(e) => updateField('stakeholders', e.target.value)}
                      className="border-gray-300 focus:border-green-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="final-goal">Final Goal of Visualization</Label>
                    <Textarea
                      id="final-goal"
                      placeholder="What is the end goal?"
                      value={data.final_goal || ''}
                      onChange={(e) => updateField('final_goal', e.target.value)}
                      className="border-gray-300 focus:border-green-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};
