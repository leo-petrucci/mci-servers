import React from 'react';

const Paragraph = ({
  children,
  lines,
}: {
  children: React.ReactNode;
  lines?: number;
}): JSX.Element => (
  <div
    className="overflow-hidden text-gray-500"
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

export default Paragraph;
