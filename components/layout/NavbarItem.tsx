import React from 'react'
import Link from 'next/link'

interface NavbarItemProps {
    label: string
    path?: string
    onClick?: () => void
}

const NavbarItem: React.FC<NavbarItemProps> = ({
    label, path, onClick
}) => {
    const baseClasses = "text-white cursor-pointer transition duration-300 group";
    const underlineClasses = "w-1/4 border-b-2 group-hover:w-full group-hover:border-yellow-400 transition-width duration-300 ease-in-out";

    if (path) {
        return (
            <div className={baseClasses}>
                <Link href={path}>{label}</Link>
                <div className={underlineClasses}></div>
            </div>
        );
    }

    return (
        <div onClick={onClick} className={baseClasses}>
            <span>{label}</span>
            <div className={underlineClasses}></div>
        </div>
    );
};

export default NavbarItem;
