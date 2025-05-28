
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Download, Share2, CheckCircle } from "lucide-react";

interface QuoteDisplayProps {
  quote: any;
  onBack: () => void;
}

export const QuoteDisplay = ({ quote, onBack }: QuoteDisplayProps) => {
  const handleDownload = () => {
    const quoteData = JSON.stringify(quote, null, 2);
    const blob = new Blob([quoteData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'quote.json';
    link.click();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Dashboard Quote',
          text: `Generated quote: $${quote.total_price.toLocaleString()}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(`Quote Total: $${quote.total_price.toLocaleString()}`);
      alert('Quote details copied to clipboard!');
    }
  };

  const lineItems = [
    { label: "Base Price", amount: quote.base_price },
    { label: "Widgets", amount: quote.widgets_price },
    { label: "Data Sources", amount: quote.data_sources_price },
    { label: "Integrations", amount: quote.integrations_price },
    { label: "Features", amount: quote.features_price },
    { label: "Branding", amount: quote.branding_price },
    { label: "Support", amount: quote.support_price },
    { label: "Hosting", amount: quote.hosting_price }
  ].filter(item => item.amount > 0);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button onClick={onBack} variant="outline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Form
        </Button>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-6 h-6 text-green-600" />
          <h2 className="text-2xl font-bold">Quote Generated Successfully</h2>
        </div>
      </div>

      <Card className="bg-white shadow-lg">
        <CardHeader className="bg-gradient-primary text-white">
          <CardTitle className="text-center text-2xl">
            Dashboard Development Quote
          </CardTitle>
          <p className="text-center text-blue-100">
            Quote ID: {quote.id} | Generated on {new Date().toLocaleDateString()}
          </p>
        </CardHeader>
        <CardContent className="p-8">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">Cost Breakdown</h3>
                <div className="space-y-3">
                  {lineItems.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-gray-700">{item.label}</span>
                      <Badge variant="secondary" className="font-mono">
                        ${item.amount.toLocaleString()}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-center">
                  <p className="text-lg text-gray-600 mb-2">Total Quote</p>
                  <p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    ${quote.total_price.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">{quote.currency}</p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Important Notes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="space-y-2">
                  <p>• Prices are estimates based on provided requirements</p>
                  <p>• Support plans are monthly recurring charges</p>
                  <p>• Hosting costs include setup and deployment</p>
                </div>
                <div className="space-y-2">
                  <p>• Final pricing may vary based on detailed requirements</p>
                  <p>• Quote valid for 30 days from generation date</p>
                  <p>• Custom integrations subject to technical feasibility</p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex flex-wrap gap-4 justify-center">
              <Button onClick={handleDownload} className="bg-gradient-secondary hover:opacity-90">
                <Download className="w-4 h-4 mr-2" />
                Download Quote
              </Button>
              <Button onClick={handleShare} variant="outline">
                <Share2 className="w-4 h-4 mr-2" />
                Share Quote
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
