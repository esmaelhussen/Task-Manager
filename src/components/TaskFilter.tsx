
import React from 'react';

type FilterType = 'all' | 'pending' | 'completed';

interface TaskFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  taskCounts: {
    all: number;
    pending: number;
    completed: number;
  };
}

const TaskFilter: React.FC<TaskFilterProps> = ({ currentFilter, onFilterChange, taskCounts }) => {
  const filters: Array<{ key: FilterType; label: string; count: number }> = [
    { key: 'all', label: 'All Tasks', count: taskCounts.all },
    { key: 'pending', label: 'Pending', count: taskCounts.pending },
    { key: 'completed', label: 'Completed', count: taskCounts.completed },
  ];

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-lg border border-white/20">
      <div className="flex gap-1 sm:gap-2 flex-wrap justify-center sm:justify-start">
        {filters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => onFilterChange(filter.key)}
            className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm flex-1 sm:flex-none justify-center ${
              currentFilter === filter.key
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <span className="hidden sm:inline">{filter.label}</span>
            <span className="sm:hidden">
              {filter.key === 'all' ? 'All' : filter.key === 'pending' ? 'Pending' : 'Done'}
            </span>
            <span className={`text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full ${
              currentFilter === filter.key
                ? 'bg-white/20 text-white'
                : 'bg-gray-300 text-gray-600'
            }`}>
              {filter.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskFilter;
