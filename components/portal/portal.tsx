import React from 'react';
import ReactDOM from 'react-dom';

interface PortaPropsInterface {
  children: React.ReactNode;
}

const Portal = ({ children }: PortaPropsInterface): JSX.Element => {
  const portal = document.getElementById('staffscanner-portal');
  let div: HTMLElement;
  if (portal === null) {
    div = document.createElement('div');
    div.id = 'staffscanner-portal';
    document.body.appendChild(div);
  } else {
    div = portal;
  }
  return ReactDOM.createPortal(children, div);
};

export default Portal;
