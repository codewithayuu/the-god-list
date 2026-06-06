import { ProblemTable } from "./ProblemTable";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { Check } from "lucide-react";

interface Topic {
  id: string;
  title: string;
  phase: string;
  subtopics: { id: string; title: string; bullets: string[] }[];
  buckets: {
    subtopicId: string | null;
    title: string;
    goal: string;
    problems: any[];
  }[];
}

interface TopicSectionProps {
  topic: Topic;
  completedSyllabus: Set<string>;
  toggleSyllabus: (id: string) => void;
}

export function TopicSection({
  topic,
  completedSyllabus,
  toggleSyllabus,
}: TopicSectionProps) {
  // If no topic selected........
  if (!topic) return null;

  return (
    <div className="content-body">
      <div style={{ marginBottom: "40px" }}>
        <div className="topic-meta">{topic.phase}</div>
        <h1 className="topic-title">{topic.title}</h1>
      </div>

      {/* Render Subtopics */}
      {topic.subtopics.map((sub) => {
        const subtopicBuckets = topic.buckets.filter(
          (b) => b.subtopicId === sub.id,
        );

        return (
          <div key={sub.id} className="subtopic">
            <h2 className="subtopic-title">{sub.title}</h2>
            <ul
              className="subtopic-bullets"
              style={{ listStyle: "none", paddingLeft: 0 }}
            >
              {sub.bullets.map((bullet, idx) => {
                const bulletId = `${sub.id}-${idx}`;
                const isCompleted = completedSyllabus.has(bulletId);

                return (
                  <li
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px",
                      marginBottom: "12px",
                      opacity: isCompleted ? 0.6 : 1,
                      transition: "opacity 0.2s",
                    }}
                  >
                    <div
                      className="checkbox-container"
                      onClick={() => toggleSyllabus(bulletId)}
                      style={{ marginTop: "2px" }}
                    >
                      <button
                        className={`checkbox ${isCompleted ? "checked" : ""}`}
                      >
                        {isCompleted && <Check size={14} strokeWidth={3} />}
                      </button>
                    </div>
                    <div
                      style={{
                        flex: 1,
                        color: isCompleted
                          ? "var(--text-muted)"
                          : "var(--text-secondary)",
                      }}
                    >
                      <ReactMarkdown
                        remarkPlugins={[remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                        components={{
                          p: ({ node, ...props }) => <span {...props} />,
                        }}
                      >
                        {bullet}
                      </ReactMarkdown>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
