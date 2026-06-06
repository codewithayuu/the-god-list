'use client';

import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check localStorage or system preference
    const saved = localStorage.getItem('conqueror_theme') as Theme | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.className = saved;
    } else {
      // Default to dark
      setTheme('dark');
      document.documentElement.className = 'dark';
    }
    setIsLoaded(true);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('conqueror_theme', newTheme);
      document.documentElement.className = newTheme;
      return newTheme;
    });
  };

  return { theme, toggleTheme, isLoaded };
}

export function useProgress() {
  const [completedProblems, setCompletedProblems] = useState<Set<string>>(new Set());
  const [completedSyllabus, setCompletedSyllabus] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load from localStorage on mount
    const savedProbs = localStorage.getItem('conqueror_progress');
    if (savedProbs) {
      try {
        setCompletedProblems(new Set(JSON.parse(savedProbs)));
      } catch (e) {
        console.error('Failed to parse progress', e);
      }
    }

    const savedSyllabus = localStorage.getItem('conqueror_syllabus');
    if (savedSyllabus) {
      try {
        setCompletedSyllabus(new Set(JSON.parse(savedSyllabus)));
      } catch (e) {
        console.error('Failed to parse syllabus progress', e);
      }
    }
    
    setIsLoaded(true);
  }, []);

  const toggleProblem = (problemId: string) => {
    setCompletedProblems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(problemId)) newSet.delete(problemId);
      else newSet.add(problemId);
      localStorage.setItem('conqueror_progress', JSON.stringify(Array.from(newSet)));
      return newSet;
    });
  };

  const toggleSyllabus = (bulletId: string) => {
    setCompletedSyllabus((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(bulletId)) newSet.delete(bulletId);
      else newSet.add(bulletId);
      localStorage.setItem('conqueror_syllabus', JSON.stringify(Array.from(newSet)));
      return newSet;
    });
  };

  return {
    completedProblems,
    toggleProblem,
    completedSyllabus,
    toggleSyllabus,
    isLoaded
  };
}
