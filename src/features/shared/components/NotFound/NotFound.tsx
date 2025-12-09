import React from 'react';

/**
 * NotFound view used to indicate missing or empty data.
 *
 * @param message - Optional message to show.
 */
export const NotFound: React.FC<{ message?: string }> = React.memo(({ message }) => {
  return (
    <div
      style={{
        padding: 24,
        textAlign: 'center',
        opacity: 0.8,
        fontSize: 16,
      }}
    >
      <p>🔍 {message || 'No results found.'}</p>
    </div>
  );
});

NotFound.displayName = 'NotFound';
