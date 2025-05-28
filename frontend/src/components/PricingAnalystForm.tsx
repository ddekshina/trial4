
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ClientInformation } from "./form-sections/ClientInformation";
import { ProjectOverview } from "./form-sections/ProjectOverview";
import { TechnicalScope } from "./form-sections/TechnicalScope";
import { FeaturesFunctionalities } from "./form-sections/FeaturesFunctionalities";
import { PricingFactors } from "./form-sections/PricingFactors";
import { CompetitiveInputs } from "./form-sections/CompetitiveInputs";
import { AnalystNotes } from "./form-sections/AnalystNotes";
import { QuoteGeneration } from "./form-sections/QuoteGeneration";
import { DemoAnalysis } from "./form-sections/DemoAnalysis";
import { DocumentAttachments } from "./form-sections/DocumentAttachments";
import { PricingSummary } from "./PricingSummary";
import { Send, Download, Share2 } from "lucide-react";

interface PricingAnalystFormProps {
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

export const PricingAnalystForm = ({ onSubmit, isLoading }: PricingAnalystFormProps) => {
  const [formData, setFormData] = useState({
    client: {},
    project: {},
    technical: {},
    features: {},
    pricing: {},
    competitive: {},
    analyst: {},
    quote: {},
    demo: {},
    documents: []
  });

  const updateSection = (section: string, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  const handleSubmit = () => {
    console.log("Submitting form data:", formData);
    onSubmit(formData);
  };

  const handleDownload = () => {
    const dataStr = JSON.stringify(formData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'pricing-analysis.json';
    link.click();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Pricing Analysis',
          text: 'Dashboard pricing analysis form',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {/* Form Sections - 2/3 width */}
      <div className="lg:col-span-2 space-y-6">
        <ClientInformation 
          data={formData.client} 
          onChange={(data) => updateSection('client', data)} 
        />
        <ProjectOverview 
          data={formData.project} 
          onChange={(data) => updateSection('project', data)} 
        />
        <TechnicalScope 
          data={formData.technical} 
          onChange={(data) => updateSection('technical', data)} 
        />
        <FeaturesFunctionalities 
          data={formData.features} 
          onChange={(data) => updateSection('features', data)} 
        />
        <PricingFactors 
          data={formData.pricing} 
          onChange={(data) => updateSection('pricing', data)} 
        />
        <CompetitiveInputs 
          data={formData.competitive} 
          onChange={(data) => updateSection('competitive', data)} 
        />
        <AnalystNotes 
          data={formData.analyst} 
          onChange={(data) => updateSection('analyst', data)} 
        />
        <QuoteGeneration 
          data={formData.quote} 
          onChange={(data) => updateSection('quote', data)} 
        />
        <DemoAnalysis 
          data={formData.demo} 
          onChange={(data) => updateSection('demo', data)} 
        />
        <DocumentAttachments 
          data={formData.documents} 
          onChange={(data) => updateSection('documents', data)} 
        />

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 pt-6 border-t">
          <Button 
            onClick={handleSubmit} 
            disabled={isLoading}
            className="flex-1 min-w-[120px] bg-gradient-primary hover:opacity-90 text-white"
          >
            <Send className="w-4 h-4 mr-2" />
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
          <Button 
            onClick={handleDownload} 
            variant="outline"
            className="flex-1 min-w-[120px]"
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button 
            onClick={handleShare} 
            variant="outline"
            className="flex-1 min-w-[120px]"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* Pricing Summary - 1/3 width */}
      <div className="lg:col-span-1">
        <PricingSummary formData={formData} />
      </div>
    </div>
  );
};
