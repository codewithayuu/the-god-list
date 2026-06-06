import { ProgressBar } from "./ProgressBar";
import { useTheme } from "@/hooks/useTheme";
import { Sun, Moon, X } from "lucide-react";

interface Topic {
  id: string;
  title: string;
  buckets: { problems: any[] }[];
  subtopics: { id: string }[];
}

interface SidebarProps {
  topics: Topic[];
  activeTopicId: string;
  onTopicSelect: (id: string) => void;
  completedProblems: Set<string>;
  onClose: () => void;
}

export function Sidebar({
  topics,
  activeTopicId,
  onTopicSelect,
  completedProblems,
  onClose,
}: SidebarProps) {
  const { theme, toggleTheme, isLoaded } = useTheme();

  // calc total problems
  let totalProblems = 0;
  topics.forEach((t) => {
    t.buckets.forEach((b) => {
      totalProblems += b.problems.length;
    });
  });

  return (
    <div className="sidebar">
      <div
        className="sidebar-header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div className="sidebar-title">The God's List</div>
        <div style={{ display: "flex", gap: "8px" }}>
          {isLoaded && (
            <button
              onClick={toggleTheme}
              style={{ color: "var(--text-secondary)", padding: "4px" }}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}
          <button
            className="mobile-close-btn"
            onClick={onClose}
            style={{ color: "var(--text-secondary)", padding: "4px" }}
          >
            <X size={18} />
          </button>
        </div>
      </div>

      <div className="sidebar-nav" style={{ flex: 1, overflowY: "auto" }}>
        <ul>
          {topics.map((topic) => {
            // umm to calculate progress for this specific topic........
            let topicTotal = 0;
            let topicCompleted = 0;
            topic.buckets.forEach((b) => {
              topicTotal += b.problems.length;
              b.problems.forEach((p) => {
                const id = p.url || p.linkId;
                if (completedProblems.has(id)) {
                  topicCompleted++;
                }
              });
            });

            return (
              <li key={topic.id}>
                <button
                  className={`nav-item ${activeTopicId === topic.id ? "active" : ""}`}
                  onClick={() => onTopicSelect(topic.id)}
                  style={{ width: "100%", textAlign: "left" }}
                >
                  <span
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      paddingRight: "8px",
                    }}
                  >
                    {topic.title}
                  </span>
                  {topicTotal > 0 && (
                    <span className="nav-item-progress">
                      {topicCompleted}/{topicTotal}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <ProgressBar
        completedCount={completedProblems.size}
        totalCount={totalProblems}
      />
    </div>
  );
}
