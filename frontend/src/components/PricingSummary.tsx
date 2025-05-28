
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface PricingSummaryProps {
  formData: any;
}

export const PricingSummary = ({ formData }: PricingSummaryProps) => {
  const calculateTotal = () => {
    let total = 0;
    
    // Base pricing
    const numWidgets = Number(formData?.quote?.num_widgets) || 0;
    const numDashboards = Number(formData?.quote?.num_dashboards) || 0;
    
    // Widget pricing
    total += numWidgets * 20;
    
    // File sources pricing
    const fileCounts = formData?.technical?.file_counts || {};
    Object.values(fileCounts).forEach(count => {
      total += Number(count) * 40;
    });
    
    // Database pricing
    const databases = formData?.technical?.databases || [];
    databases.forEach((db: any) => {
      const tables = db?.tables || [];
      tables.forEach((table: any) => {
        const records = Number(table?.records) || 0;
        if (records < 1000) total += 40;
        else if (records < 10000) total += 100;
        else if (records < 100000) total += 200;
        else if (records < 1000000) total += 300;
        else total += 700;
      });
    });
    
    // Integration pricing
    const integrations = formData?.technical?.integrations || {};
    total += (Number(integrations?.custom_apis) || 0) * 1200;
    total += (Number(integrations?.cloud_integrations) || 0) * 1200;
    total += (Number(integrations?.software_integrations) || 0) * 1200;
    
    // Features pricing
    const features = formData?.features || {};
    total += (Number(features?.drilldowns) || 0) * numWidgets * 20;
    
    // Branding pricing
    const branding = formData?.features?.branding || {};
    if (branding?.logo) total += 40;
    if (branding?.widget_color) total += numWidgets * 20;
    if (branding?.dashboard_color) total += numDashboards * 20;
    if (branding?.widget_font) total += numWidgets * 20;
    if (branding?.dashboard_style) total += numDashboards * 20;
    
    // Support pricing
    const supportHours = Number(formData?.pricing?.support_hours) || 0;
    total += supportHours * 40;
    
    // Hosting pricing
    const hosting = formData?.pricing?.hosting || {};
    total += Math.ceil(numWidgets / 10) * 1000; // Frontend
    total += Math.ceil((Number(hosting?.api_count) || 0) / 10) * 1000; // Backend
    total += 500; // Frontend deployment
    total += 500; // Frontend testing
    total += 500; // Backend deployment
    total += 500; // Backend testing
    total += (Number(hosting?.tables_count) || 0) * 150; // DB integration
    
    return total;
  };

  const total = calculateTotal();

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="text-lg">Quote Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Widgets ({formData?.quote?.num_widgets || 0})</span>
            <span>${((Number(formData?.quote?.num_widgets) || 0) * 20).toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Dashboards ({formData?.quote?.num_dashboards || 0})</span>
            <span>Included</span>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${total.toLocaleString()}</span>
          </div>
        </div>
        
        <Button className="w-full" onClick={() => console.log('Generate quote', { total, formData })}>
          <Download className="w-4 h-4 mr-2" />
          Generate Quote
        </Button>
        
        <p className="text-xs text-gray-500">
          * Pricing excludes hosting and support costs
        </p>
      </CardContent>
    </Card>
  );
};
