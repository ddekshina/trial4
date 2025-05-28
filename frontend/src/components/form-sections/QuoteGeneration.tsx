
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Calculator } from "lucide-react";

interface QuoteGenerationProps {
  data: any;
  onChange: (data: any) => void;
}

export const QuoteGeneration = ({ data, onChange }: QuoteGenerationProps) => {
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
                <Calculator className="w-5 h-5 text-purple-600" />
                8. Quote Generation
              </div>
              <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="num-dashboards">Number of Dashboards</Label>
                <Input
                  id="num-dashboards"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={data.num_dashboards || ''}
                  onChange={(e) => updateField('num_dashboards', parseInt(e.target.value) || 0)}
                  className="border-gray-300 focus:border-purple-500"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="num-widgets">Number of Widgets</Label>
                <Input
                  id="num-widgets"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={data.num_widgets || ''}
                  onChange={(e) => updateField('num_widgets', parseInt(e.target.value) || 0)}
                  className="border-gray-300 focus:border-purple-500"
                />
                <p className="text-xs text-gray-500">$20 per widget</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-4">File Data Sources ($40 per file)</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {['csv', 'xml', 'excel', 'xls', 'xlsx', 'json'].map((fileType) => (
                  <div key={fileType} className="space-y-2">
                    <Label htmlFor={`file-${fileType}`}>{fileType.toUpperCase()} Files</Label>
                    <Input
                      id={`file-${fileType}`}
                      type="number"
                      min="0"
                      placeholder="0"
                      value={data.file_counts?.[fileType] || ''}
                      onChange={(e) => updateField('file_counts', { 
                        ...data.file_counts, 
                        [fileType]: parseInt(e.target.value) || 0 
                      })}
                      className="border-gray-300 focus:border-purple-500"
                    />
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">Only 30MB supported in total per file type</p>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};
