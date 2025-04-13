import React from 'react';
import './Popup.scss';

interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-container" onClick={(e) => e.stopPropagation()}>
                <div className="popup-header">
                    <h2>{title}</h2>
                    <button className="popup-close" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className="sc-popup-content">{children}</div>
            </div>
        </div>
    );
};

export default Popup;