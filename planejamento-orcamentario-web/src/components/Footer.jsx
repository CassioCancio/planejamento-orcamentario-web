import React from 'react';
import './Footer.css';
import USP_logo from '../images/logo_usp_vert-br-e1675197771643-300x47.png'
function Footer() {
    return (
        <footer className='footerBar'>
            <div>
            <address>
                <p className='addressTitle'>Endereço</p>
                Rua da Reitoria, 374 – 3º andar<br/>
                Cidade Universitária<br/>
                CEP 05508-220<br/>
                São Paulo - SP
            </address>
            </div>
            <img src={USP_logo}/>
        </footer>
    );
}

export default Footer;