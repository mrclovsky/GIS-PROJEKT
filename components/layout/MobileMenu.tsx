import React from 'react'
import NavbarItem from '../layout/NavbarItem';

interface MobileMenuProps {
    visible?: boolean;
    onRegisterClick?: () => void;
    onLoginClick?: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible, onRegisterClick, onLoginClick }) => {
    if (!visible) {
        return null;
    }

    return (
        <div className='bg-black w-52 absolute top-8 right-0 py-5 flex-col border-2 border-gray-800 flex mt-8 z-30'>
            <div className='flex flex-col gap-4 items-center justify-center'>
                <NavbarItem label='Rejestracja' onClick={onRegisterClick} />
                <NavbarItem label='Logowanie' onClick={onLoginClick} />
                <NavbarItem label='mapa' path='/' />
            </div>
        </div>
    );
};

export default MobileMenu;
