import React from 'react';

/**
 * Skeleton placeholder for slow loading data.
 * A simple gray block structure that simulates content.
 */
export const SkeletonView: React.FC = React.memo(() => {
  return (
    <div style={{ padding: 24 }}>
      <div style={block} />
      <div style={block} />
      <div style={block} />
      <div style={{ ...block, width: '60%' }} />
    </div>
  );
});

const block = {
  backgroundColor: '#e0e0e0',
  height: 18,
  marginBottom: 12,
  borderRadius: 4,
};

SkeletonView.displayName = 'SkeletonView';
