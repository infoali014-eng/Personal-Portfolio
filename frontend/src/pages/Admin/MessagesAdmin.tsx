import React, { useState } from 'react';
import { Inbox, Trash2, Mail, MailOpen, User, MessageSquare } from 'lucide-react';
import { HelmetSEO } from '@/components/seo/HelmetSEO';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  category: 'projects' | 'community' | 'guidance' | 'general';
  subject: string;
  message: string;
  isRead: boolean;
  date: string;
}

const MessagesAdmin: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([
    { id: '1', name: 'Dr. Evelyn', email: 'evelyn@tech.edu', category: 'community', subject: 'Ethical AI Chapters coordination', message: 'Hi Ali, we would love to establish a Deep Code Chapter at our university branch. Can we schedule a call next week?', isRead: false, date: '2 hours ago' },
    { id: '2', name: 'John Doe', email: 'john@gmail.com', category: 'general', subject: 'Feedback on Study Mate AI', message: 'I have been using your PDF flashcard generator for 3 weeks and it has saved me heaps of studying time. Good job!', isRead: true, date: '1 day ago' },
    { id: '3', name: 'Recruiter Pro', email: 'recruit@company.com', category: 'projects', subject: 'Consulting opportunities inquiry', message: 'Hello Ali, we viewed your Timetable Maker algorithm case study and want to consult with you on scheduling algorithms.', isRead: false, date: '3 days ago' }
  ]);

  const [activeMessage, setActiveMessage] = useState<ContactMessage | null>(null);

  const toggleRead = (msg: ContactMessage) => {
    setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, isRead: !m.isRead } : m));
    if (activeMessage?.id === msg.id) {
      setActiveMessage(prev => prev ? { ...prev, isRead: !prev.isRead } : null);
    }
  };

  const handleDelete = (idToDelete: string) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      setMessages(prev => prev.filter(m => m.id !== idToDelete));
      if (activeMessage?.id === idToDelete) {
        setActiveMessage(null);
      }
    }
  };

  return (
    <div className="space-y-8">
      <HelmetSEO title="Messages Inbox | Creator CMS" />

      {/* Header */}
      <div className="flex justify-between items-center border-b border-primary/10 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-text flex items-center gap-2">
            <Inbox className="h-6 w-6 text-accent animate-pulse" /> Direct Inquiries Inbox
          </h2>
          <p className="text-xs text-muted mt-0.5">Read and archive contact submissions and chapters registrations requests.</p>
        </div>
      </div>

      {/* Grid: Messages list left, preview right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Messages List */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex justify-between items-center text-xs font-mono text-muted">
            <span>Inbound queue</span>
            <span>Unread: {messages.filter(m => !m.isRead).length}</span>
          </div>

          <div className="space-y-3">
            {messages.map((msg) => (
              <Card 
                key={msg.id} 
                onClick={() => setActiveMessage(msg)}
                className={`p-4 cursor-pointer hover:shadow-sm transition-all border ${
                  activeMessage?.id === msg.id ? 'border-accent bg-accent/5' : 'border-primary/5 bg-surface'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      {msg.isRead ? <MailOpen className="h-4 w-4 text-muted" /> : <Mail className="h-4 w-4 text-accent animate-bounce" />}
                      <span className={`text-xs sm:text-sm font-bold ${msg.isRead ? 'text-muted' : 'text-text'}`}>{msg.name}</span>
                    </div>
                    <span className="text-[9px] font-mono text-muted">{msg.date}</span>
                  </div>

                  <h4 className={`text-xs font-mono font-bold truncate ${msg.isRead ? 'text-muted' : 'text-text'}`}>{msg.subject}</h4>
                  <p className="text-xs text-muted line-clamp-2">{msg.message}</p>
                </div>
              </Card>
            ))}

            {messages.length === 0 && (
              <div className="text-center py-8 text-xs text-muted font-mono">
                Inbox queue is empty.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Message Preview Details */}
        <div className="lg:col-span-7">
          {activeMessage ? (
            <Card className="bg-surface border border-primary/5 p-6 space-y-6 shadow-sm">
              <div className="flex justify-between items-start border-b border-primary/5 pb-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-text">{activeMessage.subject}</h3>
                  <div className="flex items-center gap-2 text-xs font-mono text-muted">
                    <User className="h-3.5 w-3.5" />
                    <span>{activeMessage.name} &lt;{activeMessage.email}&gt;</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => toggleRead(activeMessage)}
                    className="p-1.5 border border-primary/10 rounded hover:bg-primary/5 text-muted hover:text-text transition-colors"
                    title={activeMessage.isRead ? 'Mark Unread' : 'Mark Read'}
                  >
                    {activeMessage.isRead ? <Mail className="h-4 w-4" /> : <MailOpen className="h-4 w-4" />}
                  </button>
                  <button 
                    onClick={() => handleDelete(activeMessage.id)}
                    className="p-1.5 border border-primary/10 rounded hover:bg-rose-500/10 text-rose-500 transition-colors"
                    title="Delete Message"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <Badge variant="tech" className="text-[10px]">
                  Category: {activeMessage.category}
                </Badge>

                <div className="p-4 bg-primary/5 rounded-2xl border border-primary/5">
                  <p className="text-xs sm:text-sm text-muted leading-relaxed whitespace-pre-wrap">
                    {activeMessage.message}
                  </p>
                </div>
              </div>
            </Card>
          ) : (
            <div className="border border-dashed border-primary/15 rounded-3xl p-12 text-center text-xs sm:text-sm text-muted font-mono flex flex-col justify-center items-center gap-2 bg-surface/50 h-[300px]">
              <MessageSquare className="h-8 w-8 text-muted animate-pulse" />
              <span>Select an inquiry from the queue list to preview message transcript contents.</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default MessagesAdmin;
