import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { pageTransitionVariants } from '@/animations/pageTransition';

export const MainLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col bg-background transition-colors duration-300">
      <Navbar />

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={pageTransitionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
