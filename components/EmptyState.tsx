import React from 'react';
import Heading from './Heading';
import Link from 'next/link';

interface EmptyProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState: React.FC<EmptyProps> = ({
  title = 'No exact matches',
  subtitle = 'Try changing or removing some of your filters.',
  showReset,
}) => {
  return (
    <div className="flex h-[60vh] flex-col items-center justify-center gap-2">
      <Heading center title={title} subtitle={subtitle} />
      <div className="mt-4 w-48">
        {showReset && (
          <Link
            href="/"
            className="rounded border-[1px] border-gray-500 bg-white text-[#4e4e4e] transition hover:opacity-80"
          >
            Remove all filters
          </Link>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
