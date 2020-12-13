import React from 'react';

const Paragraph = ({
  children,
  lines,
}: {
  children: React.ReactNode;
  lines?: number;
}): JSX.Element => (
  <div
    className="overflow-hidden"
    style={{
      WebkitLineClamp: lines,
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
    }}
  >
    {children}
  </div>
);

Paragraph.defaultProps = {
  lines: 0,
};

// overflow: hidden;
// font-weight: 600;
// margin-bottom: 0.25rem;
// width: 100%;
// display: -webkit-box;
// -webkit-line-clamp: 3;
// -webkit-box-orient: vertical;

export default Paragraph;
