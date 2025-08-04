import React from 'react'
import styles from './Modal.module.scss'

const Modal = ({isVisible, children, setVisible}) => {
    return (
        <div 
            className={`${styles.modal} ${isVisible ? styles.active : ''}`} 
            onClick={() => setVisible(false)}
        >
            <div 
                className={`${styles.content} ${isVisible ? styles.active : ''}`} 
                onClick={e => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    )
}

export default Modal
