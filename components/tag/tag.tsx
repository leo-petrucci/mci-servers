import React from 'react';

interface TagPropsInterface {
  children: React.ReactNode;
  onClick?: () => void;
}

const Tag = ({ children, onClick }: TagPropsInterface): JSX.Element => (
  <button
    type="button"
    className="flex items-start mr-2 mb-2 bg-emerald-50 hover:bg-emerald-100 text-green-600 rounded-md h-6 px-2"
    onClick={onClick}
  >
    {children}
  </button>
);

Tag.defaultProps = {
  onClick: () => null,
};

export default Tag;
