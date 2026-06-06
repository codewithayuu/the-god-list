"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ProblemTable } from "./ProblemTable";
import { X } from "lucide-react";

interface Topic {
  id: string;
  title: string;
  buckets: {
    subtopicId: string | null;
    title: string;
    goal: string;
    problems: any[];
  }[];
}

interface RightSidebarProps {
  topic: Topic;
  completedProblems: Set<string>;
  toggleProblem: (id: string) => void;
  onClose: () => void;
}

export function RightSidebar({
  topic,
  completedProblems,
  toggleProblem,
  onClose,
}: RightSidebarProps) {
  const [width, setWidth] = useState(380);
  const isResizing = useRef(false);

  const startResizing = useCallback((e: React.MouseEvent) => {
    isResizing.current = true;
    document.body.style.cursor = "ew-resize";
    document.body.style.userSelect = "none";
  }, []);

  const stopResizing = useCallback(() => {
    isResizing.current = false;
    document.body.style.cursor = "default";
    document.body.style.userSelect = "auto";
  }, []);

  const resize = useCallback((e: MouseEvent) => {
    if (isResizing.current) {
      const newWidth = window.innerWidth - e.clientX;
      if (newWidth >= 250 && newWidth <= 800) {
        setWidth(newWidth);
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  if (!topic || !topic.buckets || topic.buckets.length === 0) {
    return (
      <div
        className="right-sidebar"
        style={{ width: `${width}px`, position: "relative" }}
      >
        <div
          onMouseDown={startResizing}
          style={{
            position: "absolute",
            left: -3,
            top: 0,
            bottom: 0,
            width: "6px",
            cursor: "ew-resize",
            zIndex: 100,
            backgroundColor: "transparent",
          }}
        />
        <div
          className="sidebar-header"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div className="sidebar-title">PROBLEMS</div>
          <button
            className="mobile-close-btn"
            onClick={onClose}
            style={{ color: "var(--text-secondary)", padding: "4px" }}
          >
            <X size={18} />
          </button>
        </div>
        <div
          className="flex-center"
          style={{ flex: 1, color: "var(--text-muted)" }}
        >
          No problems for this topic.
        </div>
      </div>
    );
  }

  return (
    <div
      className="right-sidebar"
      style={{ width: `${width}px`, position: "relative" }}
    >
      <div
        onMouseDown={startResizing}
        style={{
          position: "absolute",
          left: -3,
          top: 0,
          bottom: 0,
          width: "6px",
          cursor: "ew-resize",
          zIndex: 100,
          backgroundColor: "transparent",
        }}
      />
      <div
        className="sidebar-header"
        style={{
          position: "sticky",
          top: 0,
          backgroundColor: "var(--bg-sidebar)",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div className="sidebar-title">PROBLEMS</div>
        <button
          className="mobile-close-btn"
          onClick={onClose}
          style={{ color: "var(--text-secondary)", padding: "4px" }}
        >
          <X size={18} />
        </button>
      </div>

      <div style={{ padding: "24px" }}>
        {topic.buckets.map((bucket, idx) => (
          <div key={idx} className="bucket">
            <div className="bucket-header">
              <h3 className="bucket-title">{bucket.title}</h3>
            </div>
            <ProblemTable
              problems={bucket.problems}
              completedProblems={completedProblems}
              toggleProblem={toggleProblem}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
