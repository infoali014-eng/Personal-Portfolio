import React, { useState, useEffect } from 'react';
import { Inbox, Trash2, Mail, MailOpen, User, CheckSquare, Clock } from 'lucide-react';
import { HelmetSEO } from '@/components/seo/HelmetSEO';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { messagesService } from '@/services/MessagesService';
import type { ContactMessage, Subscriber } from '@/repositories/supabase/SupabaseMessagesRepository';

const MessagesAdmin: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [activeMessage, setActiveMessage] = useState<ContactMessage | null>(null);
  const [activeTab, setActiveTab] = useState<'messages' | 'subscribers'>('messages');
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const msgs = await messagesService.getMessages();
      setMessages(msgs);
      const subs = await messagesService.getSubscribers();
      setSubscribers(subs);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const toggleRead = async (msg: ContactMessage) => {
    if (!msg.id) return;
    try {
      const newStatus = !msg.isRead;
      await messagesService.markAsRead(msg.id, newStatus);
      setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, isRead: newStatus } : m));
      if (activeMessage?.id === msg.id) {
        setActiveMessage(prev => prev ? { ...prev, isRead: newStatus } : null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteMessage = async (idToDelete: string) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await messagesService.deleteMessage(idToDelete);
        setMessages(prev => prev.filter(m => m.id !== idToDelete));
        if (activeMessage?.id === idToDelete) {
          setActiveMessage(null);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleDeleteSubscriber = async (idToDelete: string, email: string) => {
    if (window.confirm(`Unsubscribe and remove ${email} from newsletter list?`)) {
      try {
        await messagesService.deleteSubscriber(idToDelete);
        setSubscribers(prev => prev.filter(s => s.id !== idToDelete));
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (loading) {
    return <div className="text-center py-12 font-mono text-xs text-muted">Loading inquiries queue...</div>;
  }

  return (
    <div className="space-y-8">
      <HelmetSEO title="Inbox & Subscribers | Creator CMS" />

      {/* Header */}
      <div className="flex justify-between items-center border-b border-primary/10 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-text flex items-center gap-2">
            <Inbox className="h-6 w-6 text-accent animate-pulse" /> CMS Inquiries Workspace
          </h2>
          <p className="text-xs text-muted mt-0.5">Read contact submissions, manage university chapters, and view newsletter growth.</p>
        </div>
      </div>

      {/* Tab Selectors */}
      <div className="flex gap-2 border-b border-primary/5 pb-2">
        <button
          onClick={() => setActiveTab('messages')}
          className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all border ${
            activeTab === 'messages'
              ? 'bg-accent/15 text-accent border-accent/20 font-bold'
              : 'text-muted bg-surface border-primary/5 hover:border-primary/20'
          }`}
        >
          Direct Messages ({messages.length})
        </button>
        <button
          onClick={() => setActiveTab('subscribers')}
          className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all border ${
            activeTab === 'subscribers'
              ? 'bg-accent/15 text-accent border-accent/20 font-bold'
              : 'text-muted bg-surface border-primary/5 hover:border-primary/20'
          }`}
        >
          Newsletter Subscribers ({subscribers.length})
        </button>
      </div>

      {/* Tab content */}
      {activeTab === 'messages' ? (
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
                        {msg.isRead ? <MailOpen className="h-4 w-4 text-muted" /> : <Mail className="h-4 w-4 text-accent" />}
                        <span className={`text-xs sm:text-sm font-bold ${msg.isRead ? 'text-muted' : 'text-text'}`}>{msg.name}</span>
                      </div>
                      <span className="text-[9px] font-mono text-muted">
                        {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : 'N/A'}
                      </span>
                    </div>

                    <h4 className={`text-xs font-mono font-bold truncate ${msg.isRead ? 'text-muted' : 'text-text'}`}>{msg.subject}</h4>
                    <p className="text-xs text-muted line-clamp-2">{msg.message}</p>
                  </div>
                </Card>
              ))}

              {messages.length === 0 && (
                <div className="text-center py-8 text-xs text-muted font-mono bg-surface border border-primary/5 rounded-3xl">
                  Inbox queue is empty.
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Message Preview Details */}
          <div className="lg:col-span-7">
            {activeMessage ? (
              <Card className="bg-surface border border-primary/5 p-6 space-y-6 shadow-sm">
                
                {/* Message Header */}
                <div className="flex justify-between items-start border-b border-primary/5 pb-4">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-text">{activeMessage.subject || '(No Subject)'}</h3>
                    <div className="flex items-center gap-2 text-xs text-muted">
                      <User className="h-3.5 w-3.5" />
                      <span>{activeMessage.name} &lt;{activeMessage.email}&gt;</span>
                    </div>
                  </div>
                  <Badge variant="tech">
                    {activeMessage.category}
                  </Badge>
                </div>

                {/* Body Content */}
                <div className="text-xs sm:text-sm text-muted leading-relaxed whitespace-pre-wrap min-h-[150px]">
                  {activeMessage.message}
                </div>

                {/* Footer Controls */}
                <div className="border-t border-primary/5 pt-4 flex justify-between items-center gap-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs" 
                    onClick={() => toggleRead(activeMessage)}
                  >
                    <CheckSquare className="mr-1.5 h-4 w-4" /> 
                    Mark as {activeMessage.isRead ? 'Unread' : 'Read'}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs text-rose-500 hover:bg-rose-500/10 border-primary/5" 
                    onClick={() => activeMessage.id && handleDeleteMessage(activeMessage.id)}
                  >
                    <Trash2 className="mr-1.5 h-4 w-4" /> Delete Message
                  </Button>
                </div>

              </Card>
            ) : (
              <div className="text-center py-12 text-xs text-muted font-mono bg-surface border border-primary/5 rounded-3xl">
                Select a message from the queue to view details.
              </div>
            )}
          </div>

        </div>
      ) : (
        /* Subscribers Tab Panel */
        <div className="space-y-4">
          <div className="flex justify-between items-center text-xs font-mono text-muted">
            <span>Registered Emails</span>
            <span>Count: {subscribers.length}</span>
          </div>

          <Card className="bg-surface border border-primary/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-primary/5 bg-primary/5 text-[10px] font-mono text-muted uppercase tracking-wider">
                    <th className="p-4">Subscriber Email</th>
                    <th className="p-4"><span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> Subscribed At</span></th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/5 text-xs sm:text-sm">
                  {subscribers.map((sub) => (
                    <tr key={sub.id} className="hover:bg-primary/5 transition-colors">
                      <td className="p-4 font-bold text-text">{sub.email}</td>
                      <td className="p-4 font-mono text-xs text-muted">
                        {sub.subscribedAt ? new Date(sub.subscribedAt).toLocaleString() : 'N/A'}
                      </td>
                      <td className="p-4 text-right">
                        <button 
                          onClick={() => sub.id && handleDeleteSubscriber(sub.id, sub.email)}
                          className="p-1.5 text-rose-500 hover:bg-rose-500/10 border border-primary/5 rounded transition-colors"
                          aria-label="Remove subscriber"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}

                  {subscribers.length === 0 && (
                    <tr>
                      <td colSpan={3} className="text-center py-8 text-xs text-muted font-mono">
                        No newsletter subscribers found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MessagesAdmin;
