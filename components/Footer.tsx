import { AiOutlineCopyright } from 'react-icons/ai';

const Footer = () => {
    return ( 
        <div className='w-full flex flex-col md:flex-row p-3 mt-7 items-center justify-center'>
            <div className='flex flex-row items-center justify-center mr-auto gap-1'>
                <AiOutlineCopyright/>
            <p className=''>Wszelkie prawa zastrzeżone</p>
            </div>
            <p className='flex mr-auto md:ml-auto md:mr-0 uppercase'>MAPA. Kebabów</p>
        </div>
     );
}
 
export default Footer;