import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Compass, 
  Users, 
  Calendar, 
  GitBranch, 
  Map, 
  Flag, 
  ChevronRight 
} from 'lucide-react';
import { HelmetSEO } from '@/components/seo/HelmetSEO';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageLoader } from '@/components/ui/PageLoader';
import { DEEPCODE_DATA } from '@/data/deepCode';
import { useChapters } from '@/hooks/useChapters';
import { deepCodeService } from '@/services/DeepCodeService';

type SectionType = 'mission' | 'chapters' | 'contributors' | 'events' | 'roadmap';

const DeepCode: React.FC = () => {
  const { section = 'mission' } = useParams<{ section?: string }>();
  const navigate = useNavigate();
  const activeSection = section as SectionType;

  const { data: chapters, loading: loadingChapters } = useChapters();
  const [mission, setMission] = useState(DEEPCODE_DATA.mission);
  const [loadingMission, setLoadingMission] = useState(true);

  useEffect(() => {
    const fetchMission = async () => {
      try {
        const text = await deepCodeService.getMission();
        setMission(text);
      } catch (err) {
        console.error('Error fetching mission statement:', err);
      } finally {
        setLoadingMission(false);
      }
    };
    fetchMission();
  }, []);

  const menuItems = [
    { id: 'mission', label: 'Mission & Vision', icon: <Flag className="h-4 w-4" /> },
    { id: 'chapters', label: 'University Chapters', icon: <Compass className="h-4 w-4" /> },
    { id: 'contributors', label: 'Contributors Directory', icon: <Users className="h-4 w-4" /> },
    { id: 'events', label: 'Events & Workshops', icon: <Calendar className="h-4 w-4" /> },
    { id: 'roadmap', label: 'Growth Roadmap', icon: <Map className="h-4 w-4" /> }
  ];

  if (loadingChapters && loadingMission) {
    return <PageLoader />;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-8">
      <HelmetSEO 
        title="Deep Code Community | Platform" 
        description="Empowering university students through software, AI, collaboration, and open-source."
      />

      <div className="border-b border-primary/10 pb-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-text">Deep Code Platform</h1>
        <p className="text-sm text-muted mt-1">
          Scaling student-built technologies solving real academic issues.
        </p>
      </div>

      {/* Main mini-platform layout: Sidebar + content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Sidebar Menu */}
        <div className="lg:col-span-3 space-y-2">
          {menuItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigate(`/deep-code/${item.id}`)}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
                  isActive 
                    ? 'bg-accent text-white font-bold shadow-sm' 
                    : 'text-muted bg-surface border border-primary/5 hover:border-primary/20 hover:text-text'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${isActive ? 'translate-x-1' : 'opacity-40'}`} />
              </button>
            );
          })}
        </div>

        {/* Right Content Panel */}
        <div className="lg:col-span-9">
          
          {/* Mission & Vision Section */}
          {activeSection === 'mission' && (
            <div className="space-y-8">
              <Card className="bg-surface border border-primary/5 p-6 space-y-4">
                <h3 className="text-lg font-bold text-accent font-mono flex items-center gap-2">
                  <Flag className="h-5 w-5" /> Our Mission statement
                </h3>
                <p className="text-sm sm:text-base text-muted leading-relaxed">
                  {mission}
                </p>
              </Card>

              <div className="space-y-4">
                <h4 className="text-xs font-mono uppercase text-muted tracking-wider">Vision Benchmarks</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {DEEPCODE_DATA.vision.map((vis, idx) => (
                    <Card key={idx} className="bg-surface border border-primary/5 p-5 space-y-2">
                      <h4 className="font-bold text-text text-sm sm:text-base">{vis.title}</h4>
                      <p className="text-xs sm:text-sm text-muted leading-relaxed">{vis.desc}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Chapters Section */}
          {activeSection === 'chapters' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-text flex items-center gap-2">
                <Compass className="h-5 w-5 text-accent" /> Active Chapters Directory
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {chapters.map((chap, idx) => (
                  <Card key={idx} className="bg-surface border border-primary/5 p-6 space-y-4 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-text text-base sm:text-lg">{chap.name}</h4>
                        <Badge variant="status" className={chap.status === 'Active' ? 'bg-success/15 text-success' : 'bg-accent/5 text-accent border-accent/10'}>
                          {chap.status}
                        </Badge>
                      </div>
                      <p className="text-xs font-mono text-muted">University: {chap.university}</p>
                      <p className="text-xs font-mono text-muted">Chapter Lead: {chap.lead}</p>
                    </div>

                    <div className="border-t border-primary/5 pt-4 flex justify-between items-center text-xs font-mono text-muted">
                      <span>Members Count</span>
                      <span className="text-accent font-bold">{chap.memberCount}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Contributors Section */}
          {activeSection === 'contributors' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-text flex items-center gap-2">
                <Users className="h-5 w-5 text-accent" /> Contributors Directory
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {DEEPCODE_DATA.contributors.map((contrib, idx) => (
                  <Card key={idx} className="bg-surface border border-primary/5 p-5 text-center space-y-4 hover:-translate-y-0.5 transition-transform duration-200">
                    <div className="h-16 w-16 rounded-full bg-accent/10 overflow-hidden flex items-center justify-center font-bold text-accent mx-auto text-xl">
                      {contrib.name.charAt(0)}
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-text text-sm sm:text-base">{contrib.name}</h4>
                      <p className="text-[10px] text-muted font-mono uppercase tracking-wider">{contrib.role}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Events Section */}
          {activeSection === 'events' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-text flex items-center gap-2">
                <Calendar className="h-5 w-5 text-accent" /> Upcoming events & workshops
              </h3>

              <div className="space-y-4">
                {DEEPCODE_DATA.events.map((ev, idx) => (
                  <Card key={idx} className="bg-surface border border-primary/5 p-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                    <div className="space-y-2 max-w-xl">
                      <div className="flex items-center gap-3">
                        <Badge variant="tech" className="bg-accent/15 text-accent border-accent/20">
                          {ev.type}
                        </Badge>
                        <span className="text-xs font-mono text-muted">{ev.date}</span>
                      </div>
                      <h4 className="font-bold text-text text-base sm:text-lg">{ev.title}</h4>
                      <p className="text-xs sm:text-sm text-muted leading-relaxed">{ev.desc}</p>
                    </div>
                    <button className="flex items-center gap-1 text-xs font-mono font-bold uppercase tracking-wider text-accent hover:text-highlight">
                      Register &rarr;
                    </button>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Roadmap Section */}
          {activeSection === 'roadmap' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-text flex items-center gap-2">
                <GitBranch className="h-5 w-5 text-accent" /> Community roadmap
              </h3>

              <div className="space-y-6 relative pl-6 border-l border-primary/10">
                {DEEPCODE_DATA.roadmap.map((road, idx) => (
                  <div key={idx} className="space-y-1 relative">
                    <div className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full bg-accent border-2 border-background" />
                    <span className="text-xs font-mono font-bold text-accent">{road.phase}</span>
                    <h4 className="font-bold text-text text-sm sm:text-base">{road.title}</h4>
                    <p className="text-xs sm:text-sm text-muted leading-relaxed">{road.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default DeepCode;
