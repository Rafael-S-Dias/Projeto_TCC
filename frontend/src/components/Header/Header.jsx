

// import logo from '@/assets/imgs/logowithtext.png';
import logo from '@/assets/imgs/logo.png';

import './Header.css';

export default function Header() {
  return (
    <>
        <header className="header">
        <div className="header__wrapper">
        <div className="header__top">
            <button className="hamburger">Open menu</button>
            <div className="header__logo" styles="display: flex;">
            <a href="/" title="Evermore">
                <img src={`${logo}`} alt="Evermore Logo"  loading="lazy" />
            </a>
            
            </div>
            <a href="/#request" className="header__chat">
            Write us a message
            </a>
        </div>
        <nav className="header__nav">
            <a href="#services" className="header__nav-link" title="Services">
           Home
            </a>
            <a href="#wecare" className="header__nav-link" title="Services">
            Especialidade
            </a>
            <a href="#plans" className="header__nav-link" title="Evermore Plans">
            Consulta
            </a>
            <a href="#wedo" className="header__nav-link" title="What we do">
            Exames
            </a>
            <a href="#weare" className="header__nav-link" title="About Us">
            Medicamento
            </a>
            <a href="#weare" className="header__nav-link" title="About Us">
            Mapa saúde
            </a>
            <a href="#weare" className="header__nav-link" title="About Us">
            Login
            </a>
        </nav>
        <div className="header__info">
            <div className="header__contacts">
            <a href="tel:+18445434443" className="header__contacts-link" id="PhoneClickPageHeader"
                onclick="trackPhoneClick()">
                <span className="header__contacts-icon">
                <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                    d="M8.38028 8.85335C9.07627 10.303 10.0251 11.6616 11.2266 12.8632C12.4282 14.0648 13.7869 15.0136 15.2365 15.7096C15.3612 15.7694 15.4235 15.7994 15.5024 15.8224C15.7828 15.9041 16.127 15.8454 16.3644 15.6754C16.4313 15.6275 16.4884 15.5704 16.6027 15.4561C16.9523 15.1064 17.1271 14.9316 17.3029 14.8174C17.9658 14.3864 18.8204 14.3864 19.4833 14.8174C19.6591 14.9316 19.8339 15.1064 20.1835 15.4561L20.3783 15.6509C20.9098 16.1824 21.1755 16.4481 21.3198 16.7335C21.6069 17.301 21.6069 17.9713 21.3198 18.5389C21.1755 18.8242 20.9098 19.09 20.3783 19.6214L20.2207 19.779C19.6911 20.3087 19.4263 20.5735 19.0662 20.7757C18.6667 21.0001 18.0462 21.1615 17.588 21.1601C17.1751 21.1589 16.8928 21.0788 16.3284 20.9186C13.295 20.0576 10.4326 18.4332 8.04466 16.0452C5.65668 13.6572 4.03221 10.7948 3.17124 7.76144C3.01103 7.19699 2.93092 6.91477 2.9297 6.50182C2.92833 6.0436 3.08969 5.42311 3.31411 5.0236C3.51636 4.66357 3.78117 4.39876 4.3108 3.86913L4.46843 3.7115C4.99987 3.18006 5.2656 2.91433 5.55098 2.76999C6.11854 2.48292 6.7888 2.48292 7.35636 2.76999C7.64174 2.91433 7.90747 3.18006 8.43891 3.7115L8.63378 3.90637C8.98338 4.25597 9.15819 4.43078 9.27247 4.60655C9.70347 5.26945 9.70347 6.12403 9.27247 6.78692C9.15819 6.96269 8.98338 7.1375 8.63378 7.4871C8.51947 7.60142 8.46231 7.65857 8.41447 7.72538C8.24446 7.96281 8.18576 8.30707 8.26748 8.58743C8.29048 8.66632 8.32041 8.72866 8.38028 8.85335Z"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                </span>
                +55(71) 000-0000
            </a>
            <a href="mailto:info@tending.app" className="header__contacts-link">
                <span className="header__contacts-icon">
                <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                    d="M21.4997 18L14.8569 12M9.14261 12L2.49979 18M1.99976 7L10.1647 12.7154C10.8258 13.1783 11.1564 13.4097 11.516 13.4993C11.8337 13.5785 12.1659 13.5785 12.4835 13.4993C12.8431 13.4097 13.1737 13.1783 13.8348 12.7154L21.9998 7M6.79976 20H17.1998C18.8799 20 19.72 20 20.3617 19.673C20.9262 19.3854 21.3852 18.9265 21.6728 18.362C21.9998 17.7202 21.9998 16.8802 21.9998 15.2V8.8C21.9998 7.11984 21.9998 6.27976 21.6728 5.63803C21.3852 5.07354 20.9262 4.6146 20.3617 4.32698C19.72 4 18.8799 4 17.1998 4H6.79976C5.1196 4 4.27952 4 3.63778 4.32698C3.0733 4.6146 2.61436 5.07354 2.32674 5.63803C1.99976 6.27976 1.99976 7.11984 1.99976 8.8V15.2C1.99976 16.8802 1.99976 17.7202 2.32674 18.362C2.61436 18.9265 3.0733 19.3854 3.63778 19.673C4.27952 20 5.1196 20 6.79976 20Z"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                </span>
                info@nuza.com
            </a>
            <a href="#contactUs" className="button button_dark header__button">
                Fale conosco
            </a>
            </div>
            <p className="header__slogan">We help preserve what matters most</p>
        </div>
        </div>
        </header>
     
    </>

  );
};

