import React from 'react'
import Link from 'next/link'

interface NavbarItemProps {
    label: string
    path: string
}

const NavbarItem: React.FC<NavbarItemProps> = ({
    label, path
}) => {
    return ( 
        <div className="text-white cursor-pointer transition duration-300 group">
            <Link href={path}>{label}</Link>
            <div className="w-1/4 border-b-2 group-hover:w-full group-hover:border-yellow-400 
            transition-width duration-300 ease-in-out">
            </div>
        </div>
     )
}
 
export default NavbarItem;