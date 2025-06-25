// importy...
import Image from 'next/image';
import NavbarItem from './NavbarItem';
import { BsChevronDown } from 'react-icons/bs';
import MobileMenu from './MobileMenu';
import { useCallback, useEffect, useState } from "react";

const TOP_OFFSET = 66;

const Navbar = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showBackground, setShowBackground] = useState(false);
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userLogin, setUserLogin] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= TOP_OFFSET) {
                setShowBackground(true);
            } else {
                setShowBackground(false);
            }
        };

        const checkCookies = () => {
            const cookies = document.cookie;
            const loginMatch = cookies.match(/login=([^;]+)/);
            const authMatch = cookies.match(/Authorization=([^;]+)/);
            if (loginMatch && authMatch) {
                setIsLoggedIn(true);
                setUserLogin(decodeURIComponent(loginMatch[1]));
            } else {
                setIsLoggedIn(false);
            }
        };

        checkCookies();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = useCallback(() => setShowMobileMenu(current => !current), []);
    const toggleRegisterForm = () => { setShowRegisterForm(prev => !prev); setShowLoginForm(false); };
    const toggleLoginForm = () => { setShowLoginForm(prev => !prev); setShowRegisterForm(false); };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8888/api/v1/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ login, email, password, role: 'USER' }),
            });

            if (response.ok) {
                alert("Rejestracja zakończona sukcesem!");
                setShowRegisterForm(false);
            } else {
                alert("Błąd podczas rejestracji");
            }
        } catch (error) {
            console.error(error);
            alert("Wystąpił błąd");
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8888/api/v1/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ login, password }),
            });

            if (response.ok) {
                const data = await response.json();
                const authHeader = response.headers.get('set-cookie');
                const allHeaders = Array.from(response.headers.entries());
                const cookies = document.cookie;

                // symulujemy zapis cookies z backendu
                const authCookie = response.headers.get("Authorization");
                const refreshCookie = response.headers.get("refresh");

                document.cookie = `Authorization=${data.token}; path=/`;
                document.cookie = `refresh=${data.refreshToken}; path=/`;
                document.cookie = `login=${encodeURIComponent(data.login)}; path=/`;

                setIsLoggedIn(true);
                setUserLogin(data.login);
                setShowLoginForm(false);
            } else {
                alert("Błąd logowania");
            }
        } catch (error) {
            console.error(error);
            alert("Wystąpił błąd logowania");
        }
    };

    const logout = () => {
        document.cookie = "Authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "refresh=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "login=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setIsLoggedIn(false);
        setUserLogin('');
    };

    return (
        <nav className={`w-full fixed z-10 ${showBackground ? '' : 'mt-6 transition-transform ease-out duration-1200 delay-300'}`}>
            <div className={`
                px-4 py-2 lg:px-6 xl:px-12 flex flex-row transition duration-500
                ${showBackground ? 'bg-zinc-900 bg-opacity-80 rounded-lg' : ''}
            `}>
                <div className='w-[120px]'>
                    <Image src={'/logo.svg'} width={80} height={10} className='bg-white absolute top-2 left-16' alt='' />
                </div>

                <div className="flex-row gap-x-4 items-center justify-center hidden lg:flex ml-auto">
                    {!isLoggedIn ? (
                        <>
                            <NavbarItem label='Rejestracja' onClick={toggleRegisterForm} />
                            <NavbarItem label='Logowanie' onClick={toggleLoginForm} />
                        </>
                    ) : (
                        <>
                            <p className="text-white mr-4">Zalogowano jako: <strong>{userLogin}</strong></p>
                            <NavbarItem label='Wyloguj się' onClick={logout} />
                        </>
                    )}
                    <NavbarItem label='Mapa' path='/' />
                </div>

                <div onClick={toggleMobileMenu} className="lg:hidden flex flex-row items-center gap-2 ml-auto cursor-pointer relative">
                    <p className="text-white">Przeglądaj</p>
                    <BsChevronDown className={`text-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`} />
                    <div>
                        <MobileMenu 
                            visible={showMobileMenu} 
                            onRegisterClick={toggleRegisterForm}
                            onLoginClick={toggleLoginForm}
                        />
                    </div>
                </div>
            </div>

            {showRegisterForm && (
                <div className="absolute top-[60px] left-1/2 transform -translate-x-1/2 bg-zinc-800 p-4 rounded-lg shadow-lg z-20 text-white w-80">
                    <h3 className="mb-2 font-semibold text-lg">Rejestracja</h3>
                    <form className="flex flex-col gap-2" onSubmit={handleRegister}>
                        <input className="bg-zinc-700 p-2 rounded" type="text" placeholder="Login" onChange={e => setLogin(e.target.value)} />
                        <input className="bg-zinc-700 p-2 rounded" type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                        <input className="bg-zinc-700 p-2 rounded" type="password" placeholder="Hasło" onChange={e => setPassword(e.target.value)} />
                        <button type="submit" className="bg-gradient-to-r from-yellow-400 via-orange-500 to-amber-600 hover:bg-cyan-700 p-2 rounded mt-2">Zarejestruj się</button>
                    </form>
                </div>
            )}

            {showLoginForm && (
                <div className="absolute top-[60px] left-1/2 transform -translate-x-1/2 bg-zinc-800 p-4 rounded-lg shadow-lg z-20 text-white w-80">
                    <h3 className="mb-2 font-semibold text-lg">Logowanie</h3>
                    <form className="flex flex-col gap-2" onSubmit={handleLogin}>
                        <input className="bg-zinc-700 p-2 rounded" type="text" placeholder="Login" onChange={e => setLogin(e.target.value)} />
                        <input className="bg-zinc-700 p-2 rounded" type="password" placeholder="Hasło" onChange={e => setPassword(e.target.value)} />
                        <button type="submit" className="bg-gradient-to-r from-yellow-400 via-orange-500 to-amber-600 hover:bg-cyan-700 p-2 rounded mt-2">Zaloguj się</button>
                    </form>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
