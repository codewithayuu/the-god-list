interface ProgressBarProps {
  completedCount: number;
  totalCount: number;
}

export function ProgressBar({ completedCount, totalCount }: ProgressBarProps) {
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="progress-container">
      <div className="progress-header">
        <span>Mastery Progress</span>
        <span>{completedCount} / {totalCount} ({percentage}%)</span>
      </div>
      <div className="progress-track">
        <div 
          className="progress-fill" 
          style={{ width: `${percentage}%` }} 
        />
      </div>
    </div>
  );
}
