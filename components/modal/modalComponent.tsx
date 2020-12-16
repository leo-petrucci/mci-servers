/* eslint-disable react/require-default-props */
import React, { useEffect, useRef } from 'react';
import { animated, useTransition, config } from 'react-spring';
import Button from '../button';

export interface ModalFuncProps {
  title?: string;
  children?: React.ReactNode;
  visible?: boolean;
  onCancel?: () => void;
  onOk?: () => void;
  close?: () => void;
}

const ModalComponent: React.FC<ModalFuncProps> = (props: ModalFuncProps) => {
  const bgRef = useRef<HTMLDivElement>(document.createElement('div'));
  const { children, visible, onCancel, title, onOk, close } = props;

  useEffect(() => {
    const bg = bgRef.current;

    const handler = (e: KeyboardEvent) => {
      if ((e.isComposing || e.keyCode === 27) && close !== undefined) {
        close();
      }
    };

    if (bg) bg.addEventListener('keydown', handler);
    return () => {
      if (bg) bg.removeEventListener('keydown', handler);
    };
  }, [close]);

  const transition = useTransition(visible, {
    from: { opacity: 0, transform: `translate(-50%, -50%) scale(0.75)` },
    enter: { opacity: 1, transform: `translate(-50%, -50%) scale(1)` },
    leave: { opacity: 0, transform: `translate(-50%, -50%) scale(0.75)` },
    config: config.stiff,
  });

  return (
    <>
      {transition((style, item) =>
        item ? (
          <>
            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
            <animated.div
              ref={bgRef}
              role="dialog"
              className="fixed top-0 bottom-0 left-0 right-0 z-40 flex items-center bg-gray-900 bg-opacity-50 h-full justify-center origin-center"
              onKeyDown={onCancel}
              style={{ opacity: style.opacity.to((o) => o) as never }}
            />
            <animated.div
              className="fixed z-50 flex items-center justify-center left-2/4 top-2/4"
              style={style as never}
            >
              <div className="relative bg-white rounded-lg border-gray-400 border">
                <div className="flex justify-center items-center h-12 text-black font-medium border-b border-gray-100">
                  <button
                    className="absolute right-3 border-none text-gray-600"
                    aria-label="close"
                    type="button"
                    onClick={close}
                  >
                    <svg
                      width="20"
                      height="20"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {title}
                </div>
                <div className="p-4">{children}</div>
                <div className="flex justify-end items-center text-black font-medium border-t border-gray-100 px-2 py-2">
                  <Button
                    size="small"
                    type="secondary"
                    ariaLabel="Cancel"
                    onClick={onCancel}
                    className="mr-2"
                  >
                    Cancel
                  </Button>
                  <Button size="small" faded ariaLabel="Confirm" onClick={onOk}>
                    Confirm
                  </Button>
                </div>
              </div>
            </animated.div>
          </>
        ) : null
      )}
    </>
  );
};

export default ModalComponent;
