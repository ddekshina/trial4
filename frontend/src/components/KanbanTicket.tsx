
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical, DollarSign, Calendar, User } from "lucide-react";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Ticket {
  id: number;
  title: string;
  client: string;
  quote_total: number;
  status: string;
  tags: string[];
  created_at: string;
}

interface KanbanTicketProps {
  ticket: Ticket;
  onMove: (newStatus: string) => void;
  availableStatuses: string[];
}

export const KanbanTicket = ({ ticket, onMove, availableStatuses }: KanbanTicketProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: ticket.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getTagColor = (tag: string) => {
    if (tag.includes('demo')) return 'bg-blue-100 text-blue-800';
    if (tag.includes('Business Analysis')) return 'bg-green-100 text-green-800';
    if (tag.includes('high-priority')) return 'bg-red-100 text-red-800';
    if (tag.includes('enterprise')) return 'bg-purple-100 text-purple-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <Card 
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="cursor-grab hover:shadow-md transition-shadow bg-white border border-gray-200 active:cursor-grabbing"
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-medium text-sm text-gray-900 line-clamp-2 pr-2">
            {ticket.title}
          </h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <MoreVertical className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <div className="px-2 py-1 text-xs font-medium text-gray-500 border-b">
                Move to:
              </div>
              {availableStatuses
                .filter(status => status !== ticket.status)
                .map((status) => (
                  <DropdownMenuItem
                    key={status}
                    onClick={() => onMove(status)}
                    className="text-xs"
                  >
                    {status}
                  </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <User className="w-3 h-3" />
            <span className="truncate">{ticket.client}</span>
          </div>
          
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <DollarSign className="w-3 h-3" />
            <span className="font-medium">${ticket.quote_total.toLocaleString()}</span>
          </div>
          
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(ticket.created_at)}</span>
          </div>
        </div>
        
        {ticket.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {ticket.tags.slice(0, 2).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className={`text-xs px-2 py-0 ${getTagColor(tag)}`}
              >
                {tag}
              </Badge>
            ))}
            {ticket.tags.length > 2 && (
              <Badge variant="secondary" className="text-xs px-2 py-0 bg-gray-100 text-gray-600">
                +{ticket.tags.length - 2}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
