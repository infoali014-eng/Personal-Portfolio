import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React, { Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { PageLoader } from '@/components/ui/PageLoader';
import MainLayout from '@/layouts/MainLayout';
import AdminLayout from '@/layouts/AdminLayout';

// Lazy load public pages
const Home = React.lazy(() => import('@/pages/Home'));
const About = React.lazy(() => import('@/pages/About'));
const Projects = React.lazy(() => import('@/pages/Projects'));
const ProjectDetail = React.lazy(() => import('@/pages/Projects/ProjectDetail'));
const Solutions = React.lazy(() => import('@/pages/Solutions'));
const SolutionDetail = React.lazy(() => import('@/pages/Solutions/SolutionDetail'));
const Notes = React.lazy(() => import('@/pages/Notes'));
const NoteDetail = React.lazy(() => import('@/pages/Notes/NoteDetail'));
const DeepCode = React.lazy(() => import('@/pages/DeepCode'));
const Blog = React.lazy(() => import('@/pages/Blog'));
const BlogDetail = React.lazy(() => import('@/pages/Blog/BlogDetail'));
const Contact = React.lazy(() => import('@/pages/Contact'));
const Resume = React.lazy(() => import('@/pages/Resume'));

// Lazy load Creator CMS pages
const Login = React.lazy(() => import('@/pages/Admin/Login'));
const AdminDashboard = React.lazy(() => import('@/pages/Admin/Dashboard'));
const ProjectsAdmin = React.lazy(() => import('@/pages/Admin/ProjectsAdmin'));
const SolutionsAdmin = React.lazy(() => import('@/pages/Admin/SolutionsAdmin'));
const NotesAdmin = React.lazy(() => import('@/pages/Admin/NotesAdmin'));
const BlogAdmin = React.lazy(() => import('@/pages/Admin/BlogAdmin'));
const DeepCodeAdmin = React.lazy(() => import('@/pages/Admin/DeepCodeAdmin'));
const MediaAdmin = React.lazy(() => import('@/pages/Admin/MediaAdmin'));
const MessagesAdmin = React.lazy(() => import('@/pages/Admin/MessagesAdmin'));
const SettingsAdmin = React.lazy(() => import('@/pages/Admin/SettingsAdmin'));

const NotFound = React.lazy(() => import('@/pages/NotFound'));
const ServerError = React.lazy(() => import('@/pages/ServerError'));

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <Suspense fallback={<PageLoader />}>
            <Router>
              <Routes>
                {/* Public Layout */}
                <Route path="/" element={<MainLayout />}>
                  <Route index element={<Home />} />
                  <Route path="about" element={<About />} />
                  <Route path="projects" element={<Projects />} />
                  <Route path="projects/:slug" element={<ProjectDetail />} />
                  <Route path="solutions" element={<Solutions />} />
                  <Route path="solutions/:slug" element={<SolutionDetail />} />
                  <Route path="notes" element={<Notes />} />
                  <Route path="notes/:slug" element={<NoteDetail />} />
                  <Route path="deep-code" element={<DeepCode />} />
                  <Route path="deep-code/:section" element={<DeepCode />} />
                  <Route path="blog" element={<Blog />} />
                  <Route path="blog/:slug" element={<BlogDetail />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="resume" element={<Resume />} />
                  <Route path="500" element={<ServerError />} />
                  <Route path="*" element={<NotFound />} />
                </Route>

                {/* Admin Creator CMS Layout */}
                <Route path="/admin/login" element={<Login />} />
                
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute>
                      <AdminLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Navigate to="/admin/dashboard" replace />} />
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="projects" element={<ProjectsAdmin />} />
                  <Route path="solutions" element={<SolutionsAdmin />} />
                  <Route path="notes" element={<NotesAdmin />} />
                  <Route path="blog" element={<BlogAdmin />} />
                  <Route path="deep-code" element={<DeepCodeAdmin />} />
                  <Route path="media" element={<MediaAdmin />} />
                  <Route path="messages" element={<MessagesAdmin />} />
                  <Route path="settings" element={<SettingsAdmin />} />
                </Route>
              </Routes>
            </Router>
          </Suspense>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
