
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { KanbanTicket } from "./KanbanTicket";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useState } from 'react';

interface Ticket {
  id: number;
  title: string;
  client: string;
  quote_total: number;
  status: string;
  tags: string[];
  created_at: string;
}

interface KanbanBoardProps {
  columns: string[];
  tickets: Ticket[];
  onTicketMove: (ticketId: number, newStatus: string) => void;
}

export const KanbanBoard = ({ columns, tickets, onTicketMove }: KanbanBoardProps) => {
  const [activeTicket, setActiveTicket] = useState<Ticket | null>(null);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const getTicketsForColumn = (columnName: string) => {
    return tickets.filter(ticket => ticket.status === columnName);
  };

  const getColumnColor = (index: number) => {
    const colors = [
      'border-blue-200 bg-blue-50',
      'border-green-200 bg-green-50',
      'border-purple-200 bg-purple-50',
      'border-red-200 bg-red-50',
      'border-yellow-200 bg-yellow-50',
      'border-indigo-200 bg-indigo-50',
      'border-pink-200 bg-pink-50',
      'border-orange-200 bg-orange-50',
      'border-gray-200 bg-gray-50'
    ];
    return colors[index % colors.length];
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const ticket = tickets.find(t => t.id === Number(active.id));
    setActiveTicket(ticket || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) {
      setActiveTicket(null);
      return;
    }

    const ticketId = Number(active.id);
    const newStatus = String(over.id);
    
    // Only move if the status is different
    const currentTicket = tickets.find(t => t.id === ticketId);
    if (currentTicket && currentTicket.status !== newStatus) {
      onTicketMove(ticketId, newStatus);
    }
    
    setActiveTicket(null);
  };

  return (
    <DndContext 
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart} 
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-6 overflow-x-auto pb-6">
        {columns.map((column, index) => {
          const columnTickets = getTicketsForColumn(column);
          
          return (
            <div key={column} className="flex-shrink-0 w-80">
              <SortableContext items={columnTickets.map(t => t.id)} strategy={verticalListSortingStrategy}>
                <Card className={`${getColumnColor(index)} min-h-[600px]`} id={column}>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center justify-between text-sm font-medium">
                      <span className="truncate pr-2">{column}</span>
                      <Badge variant="secondary" className="ml-2">
                        {columnTickets.length}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {columnTickets.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <p className="text-sm">No tickets in this column</p>
                      </div>
                    ) : (
                      columnTickets.map((ticket) => (
                        <KanbanTicket
                          key={ticket.id}
                          ticket={ticket}
                          onMove={(newStatus) => onTicketMove(ticket.id, newStatus)}
                          availableStatuses={columns}
                        />
                      ))
                    )}
                  </CardContent>
                </Card>
              </SortableContext>
            </div>
          );
        })}
      </div>
      
      <DragOverlay>
        {activeTicket ? (
          <KanbanTicket
            ticket={activeTicket}
            onMove={() => {}}
            availableStatuses={columns}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
