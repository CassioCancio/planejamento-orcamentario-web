import React from 'react';
import './NavBar.css';
import LogoReitoria from '../images/logo-prp-usp.png'
import LogoUsuario from '../images/logo-usuario-minimalista.png'

function NavBar() {
    return (
        <div className="no-print">
            <div className='navigationBar'>
                <div className='leftNavigationBar'>
                <a href="/" className='logoNavBar'><img src={LogoReitoria} alt='logo da pró reitoria de pesquisa'/></a>
                <a href="/" className='buttonNavBar'>Home       </a>
                <a href="/despesas" className='buttonNavBar'>Despesas   </a>
                <a href="/creditos" className='buttonNavBar'>Créditos   </a>
                <a href="/relatorios" className='buttonNavBar'>Relatórios </a>
                </div>

                <div className='rightNavigationBar'>
                <a href="/" className='userNavButton'><img src={LogoUsuario} alt='logo da pró reitoria de pesquisa'/>Cássio Cancio</a>
                </div>
            </div>
        </div>
    );
}

export default NavBar;