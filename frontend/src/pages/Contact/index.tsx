import React, { useState } from 'react';
import { HelmetSEO } from '@/components/seo/HelmetSEO';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { messagesService } from '@/services/MessagesService';
import { Mail, Clock, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('general');
  const [message, setMessage] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setFormStatus('error');
      return;
    }
    setFormStatus('loading');
    try {
      await messagesService.createMessage({
        name,
        email,
        subject: subject || '',
        category,
        message
      });
      setFormStatus('success');
      setName('');
      setEmail('');
      setSubject('');
      setCategory('general');
      setMessage('');
    } catch (err) {
      console.error('Error submitting message:', err);
      setFormStatus('error');
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
      <HelmetSEO title="Contact" description="Get in touch for software consultations or community chapters registrations." />

      {/* Header */}
      <div className="border-b border-primary/10 pb-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-text">Get In Touch</h1>
        <p className="text-sm text-muted mt-1">Submit direct inquiries for university workshops collaborations or software building.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left info column */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="bg-surface border border-primary/5 p-6 space-y-4 shadow-sm">
            <h3 className="text-lg font-bold text-accent font-mono flex items-center gap-2">
              <Mail className="h-5 w-5" /> Contact Details
            </h3>
            
            <div className="space-y-4 text-xs sm:text-sm text-muted">
              <div className="flex gap-3">
                <MapPin className="h-5 w-5 text-accent shrink-0" />
                <div>
                  <h4 className="font-bold text-text">Workspace Location</h4>
                  <p>Switzerland</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Clock className="h-5 w-5 text-accent shrink-0" />
                <div>
                  <h4 className="font-bold text-text">Response Time</h4>
                  <p>Usually within 24-48 business hours</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Form column */}
        <div className="lg:col-span-7">
          <form onSubmit={handleFormSubmit} className="bg-surface border border-primary/5 p-6 rounded-3xl space-y-4 shadow-sm text-xs sm:text-sm">
            <h3 className="text-base font-bold text-text border-b border-primary/5 pb-2">Direct Inquiry Gateway</h3>
            
            {formStatus === 'success' && (
              <div className="p-3 bg-success/15 border border-success/20 text-success rounded-lg font-mono text-xs">
                Message sent successfully! I will reach out shortly.
              </div>
            )}

            {formStatus === 'error' && (
              <div className="p-3 bg-rose-500/15 border border-rose-500/20 text-rose-500 rounded-lg font-mono text-xs">
                Inquiry submission failed. Please fill out all required fields.
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Your Name *</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="e.g. John Doe"
                  className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Email Address *</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="e.g. john@gmail.com"
                  className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Topic Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 text-muted focus:outline-none"
              >
                <option value="general">General Inquiries</option>
                <option value="projects">Software Consulting</option>
                <option value="community">Deep Code Chapter registration</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Subject Line</label>
              <input 
                type="text" 
                value={subject} 
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Inquiry theme summary"
                className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Message Details *</label>
              <textarea 
                value={message} 
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
                placeholder="Details of your request..."
                className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none"
              />
            </div>

            <Button variant="primary" type="submit" disabled={formStatus === 'loading'} className="w-full">
              {formStatus === 'loading' ? 'Submitting...' : 'Send Message Gateway'}
            </Button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Contact;
