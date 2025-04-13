import { Button } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { MoreOutlined } from '@ant-design/icons';
import './Menu.scss';

interface HoverMenuProps {
    options?: { title: string; action: () => void }[];
}

const HoverMenu: React.FC<HoverMenuProps> = ({
    options
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div
            ref={menuRef}
            className='menu-container'
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <Button
                style={{ padding: '10px', cursor: 'pointer' }}
                icon={<MoreOutlined />}
            />
            {isOpen && (
                <div className='hover-menu'>
                    {options?.map((option, index) => (
                        <button onClick={() => option.action()} key={index}>
                            {option.title}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HoverMenu;