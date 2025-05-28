
import { useState } from "react";
import { PricingAnalystForm } from "@/components/PricingAnalystForm";
import { QuoteDisplay } from "@/components/QuoteDisplay";
import { Calculator } from "lucide-react";

const Index = () => {
  const [quoteData, setQuoteData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (formData: any) => {
    setIsLoading(true);
    console.log("Form submitted:", formData);
    
    // Simulate API call
    setTimeout(() => {
      const mockQuote = {
        id: 1,
        project_id: 1,
        base_price: 1000.0,
        widgets_price: formData.pricing?.num_widgets * 20 || 0,
        data_sources_price: 640.0,
        integrations_price: 3200.0,
        features_price: 100.0,
        branding_price: 240.0,
        support_price: 800.0,
        hosting_price: 2950.0,
        total_price: 9230.0,
        currency: "USD"
      };
      setQuoteData(mockQuote);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-primary rounded-full">
              <Calculator className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Dashboard Quote Generator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive pricing analysis tool for dashboard development projects
          </p>
        </div>

        {!quoteData ? (
          <PricingAnalystForm onSubmit={handleFormSubmit} isLoading={isLoading} />
        ) : (
          <QuoteDisplay 
            quote={quoteData} 
            onBack={() => setQuoteData(null)} 
          />
        )}
      </div>
    </div>
  );
};

export default Index;
