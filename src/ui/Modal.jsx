import { cloneElement, createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';

import { useOutsideClick } from '../hooks/useOutsideClick';

const ModalContext = createContext();

function Modal({ children, setFunction }) {
  const [openName, setOpenName] = useState('');

  const close = () => {
    setOpenName('');
    if (setFunction) setFunction();
  };
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName, onClick }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, {
    onClick: () => {
      open(opensWindowName);
      if (onClick) onClick();
    },
  });
}

function Window({
  children,
  name,
  minWidth,
  height,
  overflow = 'overflow-hidden',
}) {
  const { openName, close } = useContext(ModalContext);

  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <div className="bg-[rgba(255, 255, 255, 0.1)] fixed left-0 top-0 z-[1000] h-screen w-full backdrop-blur-sm transition-all duration-500">
      <div
        ref={ref}
        className={`fixed left-1/2 top-1/2 ${height} ${minWidth} ${overflow} -translate-x-1/2 -translate-y-1/2  rounded-[9px] bg-white px-[4rem] py-[3.2rem] shadow-lg transition-all duration-500`}
      >
        <button
          onClick={close}
          className="absolute right-[1.9rem] top-[1.2rem] translate-x-[0.8rem] rounded-[5px] border-none bg-none p-[0.4rem] transition-all duration-200 hover:bg-gray-100"
        >
          <HiXMark className="h-[2.4rem] w-[2.4rem] fill-gray-500 stroke-gray-500 text-gray-500" />
        </button>

        <div className={minWidth === 'min-w-[90rem]' ? '' : 'h-full'}>
          {cloneElement(children, { onCloseModal: close })}
        </div>
      </div>
    </div>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
