import Link from "next/link";
import Image from "next/image";
import React from "react";
import {RiFacebookLine, RiInstagramLine, RiLinkedinLine} from 'react-icons/ri'

const Socials = () => {
    return ( 
        <div className="flex items-center gap-x-4 text-2xl">
            <Link href={'/'} target='_blank' rel='noopener noreferrer' className='hover:text-yellow-400 transition-all duration-300'>
                <RiFacebookLine/>
            </Link>
            <Link href={'/'} target='_blank' rel='noopener noreferrer' className='hover:text-yellow-400 transition-all duration-300'>
                <RiInstagramLine/>
            </Link>
        </div>
     );
}
 
export default Socials;