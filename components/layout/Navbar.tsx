import Image from 'next/image';
import NavbarItem from './NavbarItem';
import { BsChevronDown } from 'react-icons/bs'
import MobileMenu from './MobileMenu';
import { useCallback, useEffect, useState } from "react";
const TOP_OFFSET = 66

const Navbar = () => {
    const [ showMobileMenu, setShowMobileMenu ] = useState(false)
    const [ showBackground, setShowBackground ] = useState(false)
    
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= TOP_OFFSET){
                setShowBackground(true)
            }else{
                setShowBackground(false)
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
        }, [])

    const toggleMobileMenu = useCallback(() => {
        setShowMobileMenu((current) => !current)
    }, [])

    return ( 
        <nav className={`w-full fixed z-10 ${showBackground ? '' : 'mt-6 transition-transform ease-out duration-1200 delay-300'}`}>
            <div className={`
                px-4
                py-2
                lg:px-6
                xl:px-12
                flex
                flex-row
                transition
                duration-500
                ${showBackground ? 'bg-zinc-900 bg-opacity-80 rounded-lg' : ''}
            `}>
                <div className='w-[120px]'>
                    <Image src={'/logo.svg'} width={90} height={10} className='ml-8 bg-white' alt=''/>
                </div>
                <div className="
                    flex-row
                    ml-auto
                    gap-x-12
                    items-center
                    justify-center
                    hidden
                    lg:flex
                ">
                    <NavbarItem label='mapa' path='/'/>
                </div>
                <div onClick={toggleMobileMenu} className="lg:hidden flex flex-row items-center gap-2 ml-auto cursor-pointer relative">
                    <p className="text-white">Przeglądaj</p>
                    <BsChevronDown className={`text-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`}/>
                    <div>
                        <MobileMenu visible={showMobileMenu}/>
                    </div>
                </div>
            </div>
        </nav>
     );
}
 
export default Navbar;