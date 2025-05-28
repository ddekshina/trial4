
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Settings } from "lucide-react";

interface FeaturesFunctionalitiesProps {
  data: any;
  onChange: (data: any) => void;
}

const interactivityOptions = [
  'Drill-down', 'Filtering', 'Real-time Updates'
];

const accessLevels = [
  'Admin', 'Viewer', 'Editor'
];

const customizationOptions = [
  'Branding/White-labeling', 'Theming (Light/Dark)', 'Language Localization'
];

export const FeaturesFunctionalities = ({ data, onChange }: FeaturesFunctionalitiesProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const updateField = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const updateInteractivity = (option: string, checked: boolean) => {
    const interactivity = data.interactivity || [];
    if (checked) {
      onChange({ ...data, interactivity: [...interactivity, option] });
    } else {
      onChange({ ...data, interactivity: interactivity.filter((i: string) => i !== option) });
    }
  };

  const updateAccessLevel = (level: string, checked: boolean) => {
    const accessLevels = data.access_levels || [];
    if (checked) {
      onChange({ ...data, access_levels: [...accessLevels, level] });
    } else {
      onChange({ ...data, access_levels: accessLevels.filter((l: string) => l !== level) });
    }
  };

  const updateCustomization = (option: string, checked: boolean) => {
    const customization = data.customization || [];
    if (checked) {
      onChange({ ...data, customization: [...customization, option] });
    } else {
      onChange({ ...data, customization: customization.filter((c: string) => c !== option) });
    }
  };

  const showLanguageField = data.customization?.includes('Language Localization');

  return (
    <Card className="animate-fade-in bg-white shadow-md hover:shadow-lg transition-shadow">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-orange-600" />
                4. Features & Functionalities
              </div>
              <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label>Interactivity Needed</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {interactivityOptions.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      checked={data.interactivity?.includes(option) || false}
                      onCheckedChange={(checked) => updateInteractivity(option, checked as boolean)}
                    />
                    <Label>{option}</Label>
                    {option === 'Real-time Updates' && (
                      <span className="text-xs text-gray-500">(DB required)</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Label>User Access Levels</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {accessLevels.map((level) => (
                  <div key={level} className="flex items-center space-x-2">
                    <Checkbox
                      checked={data.access_levels?.includes(level) || false}
                      onCheckedChange={(checked) => updateAccessLevel(level, checked as boolean)}
                    />
                    <Label>{level}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Label>Customization Needs</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {customizationOptions.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      checked={data.customization?.includes(option) || false}
                      onCheckedChange={(checked) => updateCustomization(option, checked as boolean)}
                    />
                    <Label>{option}</Label>
                  </div>
                ))}
              </div>
              
              {showLanguageField && (
                <div className="ml-6 space-y-2">
                  <Label htmlFor="language-name">Language Name</Label>
                  <Input
                    id="language-name"
                    placeholder="e.g., Spanish, French, German"
                    value={data.language_name || ''}
                    onChange={(e) => updateField('language_name', e.target.value)}
                    className="border-gray-300 focus:border-orange-500"
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
