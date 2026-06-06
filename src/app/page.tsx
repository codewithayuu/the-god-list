'use client';

import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { TopicSection } from '@/components/TopicSection';
import { RightSidebar } from '@/components/RightSidebar';
import { useProgress } from '@/hooks/useProgress';
import syllabusData from '@/data/data.json';
import { PanelLeftClose, PanelLeftOpen, PanelRightClose, PanelRightOpen } from 'lucide-react';

export default function Home() {
  const { completedProblems, toggleProblem, completedSyllabus, toggleSyllabus, isLoaded } = useProgress();
  const [activeTopicId, setActiveTopicId] = useState<string>('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);

  useEffect(() => {
    // Load persisted state
    const savedTopic = localStorage.getItem('conqueror_activeTopic');
    if (savedTopic && syllabusData.find(t => t.id === savedTopic)) {
      setActiveTopicId(savedTopic);
    } else if (syllabusData && syllabusData.length > 0) {
      setActiveTopicId(syllabusData[0].id);
    }

    const savedSidebar = localStorage.getItem('conqueror_sidebarOpen');
    const savedRightSidebar = localStorage.getItem('conqueror_rightSidebarOpen');

    // Mobile responsive: close sidebars by default on small screens
    if (typeof window !== 'undefined' && window.innerWidth <= 1024) {
      setIsSidebarOpen(false);
      setIsRightSidebarOpen(false);
    } else {
      if (savedSidebar !== null) setIsSidebarOpen(savedSidebar === 'true');
      if (savedRightSidebar !== null) setIsRightSidebarOpen(savedRightSidebar === 'true');
    }
  }, []);

  const handleTopicSelect = (id: string) => {
    setActiveTopicId(id);
    localStorage.setItem('conqueror_activeTopic', id);
    if (typeof window !== 'undefined' && window.innerWidth <= 1024) {
      setIsSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    const newVal = !isSidebarOpen;
    setIsSidebarOpen(newVal);
    localStorage.setItem('conqueror_sidebarOpen', String(newVal));
  };

  const toggleRightSidebar = () => {
    const newVal = !isRightSidebarOpen;
    setIsRightSidebarOpen(newVal);
    localStorage.setItem('conqueror_rightSidebarOpen', String(newVal));
  };

  const activeTopic = syllabusData.find((t) => t.id === activeTopicId);

  // Avoid hydration mismatch by waiting for load
  if (!isLoaded) {
    return (
      <div className="flex-center" style={{ height: '100vh', backgroundColor: 'var(--bg-main)' }}>
        <div style={{ color: 'var(--text-muted)' }}>Loading Syllabus...</div>
      </div>
    );
  }

  return (
    <div className="app-container">
      {isSidebarOpen && (
        <Sidebar 
          topics={syllabusData} 
          activeTopicId={activeTopicId} 
          onTopicSelect={handleTopicSelect} 
          completedProblems={completedProblems} 
          onClose={() => {
            setIsSidebarOpen(false);
            localStorage.setItem('conqueror_sidebarOpen', 'false');
          }}
        />
      )}
      
      <div className="main-content">
        <div style={{ position: 'sticky', top: 0, padding: '24px 48px 0 48px', zIndex: 100, backgroundColor: 'var(--bg-main)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button 
            onClick={toggleSidebar} 
            style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px', borderRadius: '6px', backgroundColor: 'var(--bg-hover)' }}
            title={isSidebarOpen ? "Hide Left Sidebar" : "Show Left Sidebar"}
          >
            {isSidebarOpen ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
          </button>
          
          <button 
            onClick={toggleRightSidebar} 
            style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px', borderRadius: '6px', backgroundColor: 'var(--bg-hover)' }}
            title={isRightSidebarOpen ? "Hide Problems" : "Show Problems"}
          >
            {isRightSidebarOpen ? <PanelRightClose size={20} /> : <PanelRightOpen size={20} />}
          </button>
        </div>
        {activeTopic ? (
          <TopicSection 
            topic={activeTopic} 
            completedSyllabus={completedSyllabus} 
            toggleSyllabus={toggleSyllabus} 
          />
        ) : (
          <div className="flex-center" style={{ flex: 1, color: '#666' }}>
            No Topic Selected
          </div>
        )}
      </div>

      {isRightSidebarOpen && activeTopic && (
        <RightSidebar 
          topic={activeTopic}
          completedProblems={completedProblems}
          toggleProblem={toggleProblem}
          onClose={() => setIsRightSidebarOpen(false)}
        />
      )}
    </div>
  );
}
