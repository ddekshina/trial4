
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { KanbanBoard } from "@/components/KanbanBoard";
import { Search, Plus, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ProjectPipeline = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for demonstration
  const mockTickets = [
    {
      id: 1,
      title: "Sales Dashboard Project",
      client: "Acme Corporation",
      quote_total: 25000,
      status: "Pricing Submissions",
      tags: ["high-priority", "enterprise"],
      created_at: "2024-05-20T10:30:00.000Z"
    },
    {
      id: 2,
      title: "Marketing Analytics Dashboard",
      client: "TechStart Inc",
      quote_total: 15000,
      status: "Quote Generated",
      tags: ["demo", "marketing"],
      created_at: "2024-05-18T14:20:00.000Z"
    },
    {
      id: 3,
      title: "Financial Reporting System",
      client: "Finance Corp",
      quote_total: 45000,
      status: "Contract Signed",
      tags: ["Business Analysis", "finance"],
      created_at: "2024-05-15T09:15:00.000Z"
    }
  ];

  const columns = [
    "Pricing Submissions",
    "Quote Generated",
    "Contract Signed",
    "Contract Rejected",
    "Project Started",
    "Project Delivered",
    "Project Change Log After Delivery",
    "Change Log Pricing Accepted",
    "Change Log Pricing Rejected"
  ];

  const filteredTickets = mockTickets.filter(ticket =>
    ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <Link to="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Form
                </Button>
              </Link>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Project Pipeline
              </h1>
            </div>
            <p className="text-gray-600">
              Track and manage your dashboard development projects through the pipeline
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search projects or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-64"
              />
            </div>
            <Button className="bg-gradient-primary hover:opacity-90 text-white">
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Projects</p>
                  <p className="text-2xl font-bold">{mockTickets.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Projects</p>
                  <p className="text-2xl font-bold">
                    {mockTickets.filter(t => !['Contract Rejected', 'Project Delivered'].includes(t.status)).length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-green-600 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Value</p>
                  <p className="text-2xl font-bold">
                    ${mockTickets.reduce((sum, ticket) => sum + ticket.quote_total, 0).toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-purple-600 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold">
                    {mockTickets.filter(t => t.status === 'Project Delivered').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-orange-600 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search Results Info */}
        {searchTerm && (
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              Showing {filteredTickets.length} result(s) for "{searchTerm}"
              {filteredTickets.length !== mockTickets.length && (
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => setSearchTerm("")}
                  className="ml-2 p-0 h-auto"
                >
                  Clear search
                </Button>
              )}
            </p>
          </div>
        )}

        {/* Kanban Board */}
        <KanbanBoard 
          columns={columns} 
          tickets={filteredTickets}
          onTicketMove={(ticketId, newStatus) => {
            console.log(`Moving ticket ${ticketId} to ${newStatus}`);
            // In a real app, this would update the backend
          }}
        />
      </div>
    </div>
  );
};

export default ProjectPipeline;
