import { Check } from 'lucide-react';

interface Problem {
  name: string;
  platform: string;
  rating: string;
  linkId: string;
  url: string;
}

interface ProblemTableProps {
  problems: Problem[];
  completedProblems: Set<string>;
  toggleProblem: (id: string) => void;
}

export function ProblemTable({ problems, completedProblems, toggleProblem }: ProblemTableProps) {
  if (!problems || problems.length === 0) return null;

  return (
    <table className="problem-table">
      <thead>
        <tr>
          <th style={{ width: '60px', textAlign: 'center' }}>Done</th>
          <th>Problem Name</th>
          <th>Platform</th>
          <th>Rating</th>
        </tr>
      </thead>
      <tbody>
        {problems.map((prob) => {
          // Use linkId or url as unique identifier
          const id = prob.url || prob.linkId;
          const isCompleted = completedProblems.has(id);

          return (
            <tr key={id} className={isCompleted ? 'completed' : ''}>
              <td>
                <div className="checkbox-container" onClick={() => toggleProblem(id)}>
                  <button className={`checkbox ${isCompleted ? 'checked' : ''}`}>
                    {isCompleted && <Check size={14} strokeWidth={3} />}
                  </button>
                </div>
              </td>
              <td>
                <span className="problem-name">
                  {prob.url ? (
                    <a href={prob.url} target="_blank" rel="noopener noreferrer">
                      {prob.name}
                    </a>
                  ) : (
                    prob.name
                  )}
                </span>
              </td>
              <td>
                <span className="problem-platform">{prob.platform}</span>
              </td>
              <td>
                <span className="problem-rating">{prob.rating}</span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
