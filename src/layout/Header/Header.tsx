import React, { useState, useEffect, useRef } from 'react';
import './Header.scss';
import appInfo from '@/assets/appInfo.json';
import profilePic from '@/assets/logo-white.svg';
import { useUser } from '../../context/UserContext';
import { googleLogout } from '@react-oauth/google';

interface UserDetails {
    name: string;
    email: string;
    picture?: string;
}
const userDetailsInitialState: UserDetails = {
    name: '',
    email: '',
    picture: ''
}
const Header: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);
    const { user, setUser, setIsLoggedIn, isLoggedIn } = useUser();
    const [userDetails, setUserDetails] = useState<UserDetails>(userDetailsInitialState);

    useEffect(() => {
        if (user && isLoggedIn) {
            
            setUserDetails({
                name: `${user?.given_name} ${user?.family_name}`,
                email: user?.email,
                picture: user?.picture || ''
            })
        }
    }, [user]);
    const handleLogout = () => {
        setIsLoggedIn(false); // from context
        setUserDetails(userDetailsInitialState)
        setUser(null);
        setMenuOpen(false)
        googleLogout();
        localStorage.removeItem("google_token");
        
    };

    const handleSettings = () => {
        setMenuOpen(false)
        console.log('Settings clicked');
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="header">
            <div className="header-left">
                <img src={profilePic} alt="Logo" className="logo" />
                <span className="app-name">{appInfo.name}</span>
            </div>
            <div className="header-right">
                <div
                    className="profile-container"
                    ref={profileRef}
                    onMouseEnter={() => setMenuOpen(true)}
                >
                    <span>{userDetails?.name}</span>
                    <img
                        src={userDetails?.picture || profilePic}
                        alt="User Profile"
                        className="profile-pic"
                    />
                    {menuOpen && (
                        <div className="profile-menu">
                            <button onClick={handleSettings}>Settings</button>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;