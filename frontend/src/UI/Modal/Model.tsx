import React from 'react';
import c from './Modal.module.scss';


interface ModalProps extends React.PropsWithChildren {
    className?: string
    active: boolean
    setActive: (bool: boolean) => void
    onClose?: () => void
}

const Modal: React.FC<ModalProps> = ({children, className, active, setActive, onClose }) => {

    return (
        <div 
            className={active ? `${c['modal-window']} ${c['modal-active']}` : `${c['modal-window']}`} 
            onMouseUp={() => {
                setActive(false)
                if (onClose) {
                    onClose()
                }
            }}
        >   
            <div
                className={
                    className && active 
                    ? `${c['modal-window-content']} ${className} ${c['modal-content-active']}` 
                    : active ? `${c['modal-window-content']} ${c['modal-content-active']}` 
                    : className ? `${className} ${c['modal-window-content']}` 
                    : `${c['modal-window-content']}`
                }
                onMouseUp={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    )
}

export default Modal;