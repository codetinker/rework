import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Search,
  User,
  Info,
  Mail,
  Clock,
  MoreVertical,
  Phone,
  Globe,
  Check,
  CheckCheck,
  Circle
} from "lucide-react";
import { 
  ChatMessage, 
  User as CMSUser 
} from "@/lib/index";
import { 
  mockChatMessages, 
  chatAPI, 
  mockUsers 
} from "@/services/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface Conversation {
  id: string;
  visitorName: string;
  visitorEmail?: string;
  visitorRole?: string;
  visitorCompany?: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  status: "online" | "offline";
  assignedTo?: string; // Staff member handling this chat
  priority?: "low" | "medium" | "high";
}

export default function Chat() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConvId, setActiveConvId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser] = useState<CMSUser>(mockUsers[2]); // Default to Support Staff
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate fetching conversation list
    const derivedConvs: Conversation[] = [
      {
        id: "conv1",
        visitorName: "Ahmad Rahman",
        visitorEmail: "ahmad.rahman@petronas.com",
        visitorRole: "Senior Engineer",
        visitorCompany: "PETRONAS",
        lastMessage: "Hello, I am interested in your W3P Enclosure system...",
        timestamp: "2026-02-14T09:47:00Z",
        unreadCount: 0,
        status: "online",
        assignedTo: "Sarah Chen",
        priority: "high",
      },
      {
        id: "conv2",
        visitorName: "Lisa Wong",
        visitorEmail: "lisa.wong@shell.com",
        visitorRole: "Operations Manager",
        visitorCompany: "Shell Malaysia",
        lastMessage: "Do you provide on-site machining services...",
        timestamp: "2026-02-14T10:15:00Z",
        unreadCount: 1,
        status: "offline",
        assignedTo: "John Smith",
        priority: "medium",
      }
    ];
    setConversations(derivedConvs);
    setActiveConvId("conv1");
  }, []);

  useEffect(() => {
    if (activeConvId) {
      chatAPI.getMessages(activeConvId).then(setMessages);
    }
  }, [activeConvId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeConvId) return;

    const msg: ChatMessage = {
      id: `m-${Date.now()}`,
      conversationId: activeConvId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      message: newMessage,
      timestamp: new Date().toISOString(),
      isStaff: true,
      status: "sent",
    };

    setMessages((prev) => [...prev, msg]);
    setNewMessage("");

    // Simulated socket emission
    await chatAPI.sendMessage(msg);
    
    // Simulate delivery status update
    setTimeout(() => {
      setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, status: "delivered" } : m));
    }, 1500);
  };

  const activeConv = conversations.find(c => c.id === activeConvId);

  return (
    <div className="flex h-[calc(100vh-10rem)] bg-background rounded-xl border border-border overflow-hidden shadow-xl">
      {/* Sidebar: Chat List */}
      <div className="w-80 flex flex-col border-r border-border bg-card/50">
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search conversations..."
              className="pl-9 bg-muted/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setActiveConvId(conv.id)}
                className={cn(
                  "w-full flex items-start gap-3 p-3 rounded-lg transition-all text-left group",
                  activeConvId === conv.id 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                    : "hover:bg-accent"
                )}
              >
                <div className="relative">
                  <Avatar className="w-10 h-10 border border-border/50">
                    <AvatarFallback className={activeConvId === conv.id ? "bg-white/20" : ""}>
                      {conv.visitorName.substring(8)}
                    </AvatarFallback>
                  </Avatar>
                  <span className={cn(
                    "absolute bottom-0 right-0 w-3 h-3 border-2 border-background rounded-full",
                    conv.status === "online" ? "bg-green-500" : "bg-slate-400"
                  )} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm truncate">{conv.visitorName}</span>
                      {conv.visitorRole && conv.visitorCompany && (
                        <span className={cn(
                          "text-[10px] truncate",
                          activeConvId === conv.id ? "text-primary-foreground/60" : "text-muted-foreground/80"
                        )}>
                          {conv.visitorRole} • {conv.visitorCompany}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col items-end">
                      <span className={cn(
                        "text-[10px]",
                        activeConvId === conv.id ? "text-primary-foreground/70" : "text-muted-foreground"
                      )}>
                        {new Date(conv.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      {conv.priority && (
                        <Badge 
                          variant="outline" 
                          className={cn(
                            "text-[9px] px-1 py-0 mt-0.5",
                            conv.priority === "high" ? "border-red-500 text-red-600" :
                            conv.priority === "medium" ? "border-amber-500 text-amber-600" :
                            "border-green-500 text-green-600"
                          )}
                        >
                          {conv.priority.toUpperCase()}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className={cn(
                    "text-xs truncate",
                    activeConvId === conv.id ? "text-primary-foreground/80" : "text-muted-foreground"
                  )}>
                    {conv.lastMessage}
                  </p>
                  {conv.assignedTo && (
                    <div className={cn(
                      "text-[10px] mt-1 flex items-center gap-1",
                      activeConvId === conv.id ? "text-primary-foreground/60" : "text-muted-foreground/70"
                    )}>
                      <User className="w-2.5 h-2.5" />
                      Assigned to: {conv.assignedTo}
                    </div>
                  )}
                </div>
                {conv.unreadCount > 0 && activeConvId !== conv.id && (
                  <Badge className="bg-red-500 hover:bg-red-600 px-1.5 min-w-[1.25rem] h-5">
                    {conv.unreadCount}
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-background">
        {activeConv ? (
          <>
            <div className="p-4 border-b border-border flex items-center justify-between bg-card/30">
              <div className="flex items-center gap-3">
                <Avatar className="w-9 h-9">
                  <AvatarFallback className="bg-primary/10 text-primary">{activeConv.visitorName.substring(8)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold text-sm leading-none mb-1">{activeConv.visitorName}</h3>
                  <div className="flex items-center gap-1.5">
                    <Circle className={cn("w-2 h-2 fill-current", activeConv.status === "online" ? "text-green-500" : "text-muted-foreground")} />
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                      {activeConv.status === "online" ? "Online" : "Offline"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4 max-w-4xl mx-auto">
                <div className="flex justify-center">
                  <Badge variant="secondary" className="text-[10px] font-normal uppercase tracking-tighter opacity-70">
                    Today, {new Date().toLocaleDateString()}
                  </Badge>
                </div>
                
                <AnimatePresence initial={false}>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className={cn(
                        "flex w-full",
                        msg.isStaff ? "justify-end" : "justify-start"
                      )}
                    >
                      <div className={cn(
                        "max-w-[70%] group",
                        msg.isStaff ? "items-end" : "items-start"
                      )}>
                        <div className={cn(
                          "px-4 py-2.5 rounded-2xl text-sm",
                          msg.isStaff 
                            ? "bg-primary text-primary-foreground rounded-tr-none" 
                            : "bg-muted text-foreground rounded-tl-none"
                        )}>
                          {msg.message}
                        </div>
                        <div className={cn(
                          "flex items-center gap-1 mt-1 px-1",
                          msg.isStaff ? "justify-end" : "justify-start"
                        )}>
                          {msg.isStaff && (
                            <span className="text-[10px] text-muted-foreground opacity-70 mr-2">
                              {msg.senderName} • {currentUser.role}
                            </span>
                          )}
                          <span className="text-[10px] text-muted-foreground opacity-70">
                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          {msg.isStaff && (
                            <span className="text-muted-foreground ml-1">
                              {msg.status === "read" ? (
                                <CheckCheck className="w-3 h-3 text-primary" />
                              ) : msg.status === "delivered" ? (
                                <CheckCheck className="w-3 h-3" />
                              ) : (
                                <Check className="w-3 h-3" />
                              )}
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="p-4 border-t border-border bg-card/30">
              <form onSubmit={handleSendMessage} className="flex items-center gap-2 max-w-4xl mx-auto">
                <Input
                  placeholder="Type your message here..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 bg-background border-border/60 focus:ring-1 focus:ring-primary"
                />
                <Button type="submit" size="icon" disabled={!newMessage.trim()} className="shrink-0">
                  <Send className="w-4 h-4" />
                </Button>
              </form>
              <p className="text-[10px] text-center text-muted-foreground mt-2">
                Press Enter to send. This chat is monitored for quality assurance.
              </p>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Send className="w-8 h-8 text-muted-foreground opacity-50" />
            </div>
            <h3 className="text-lg font-semibold">Select a conversation</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Choose a visitor from the list to start chatting or viewing their inquiry history.
            </p>
          </div>
        )}
      </div>

      {/* Right Sidebar: Visitor Info */}
      {activeConv && (
        <div className="w-72 border-l border-border bg-card/30 hidden xl:flex flex-col">
          <div className="p-6 flex flex-col items-center text-center">
            <Avatar className="w-20 h-20 mb-4 border-4 border-background shadow-lg">
              <AvatarFallback className="text-2xl bg-primary/5 text-primary">
                {activeConv.visitorName.substring(8)}
              </AvatarFallback>
            </Avatar>
            <h4 className="font-bold text-lg">{activeConv.visitorName}</h4>
            <Badge variant="outline" className="mt-1 text-[10px] uppercase font-bold tracking-widest text-primary">
              New Prospect
            </Badge>
          </div>

          <Separator className="opacity-50" />

          <div className="p-4 space-y-6 overflow-y-auto">
            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <Info className="w-3 h-3" /> Contact Details
              </h5>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="truncate">visitor_{activeConv.id}@example.com</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Globe className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>Kuala Lumpur, MY (IP: 182.xx.xx.xx)</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <Clock className="w-3 h-3" /> Session Activity
              </h5>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">First Seen</span>
                  <span>10:15 AM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration</span>
                  <span>12m 45s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Current Page</span>
                  <span className="text-primary truncate font-medium underline cursor-pointer">
                    /services/subsea-cutting
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" className="w-full justify-start gap-2 h-9 text-xs">
                      <User className="w-3.5 h-3.5" /> Assign to Expert
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Transfer chat to specialized engineer</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          
          <div className="mt-auto p-4">
            <Card className="bg-primary/5 border-primary/20 p-3">
              <h6 className="text-[10px] font-bold text-primary uppercase mb-1">Internal Notes</h6>
              <p className="text-[10px] text-muted-foreground italic">
                "Inquired about subsea diamond wire saw capabilities for deepwater decommissioning."
              </p>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
