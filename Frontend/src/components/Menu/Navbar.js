import React, {useState} from 'react';
import { AiOutlineMenu, AiOutlineClose  } from "react-icons/ai";
import { BiLogIn} from 'react-icons/bi';
import { useAuth } from '../../hooks/auth';
import { Link } from "react-router-dom";
import { SidebarData } from './SidebarData';
import './Navbar.css';

function Navbar() {
    const [sidebar, setSidebar]= useState(false)

    const showSidebar = () => setSidebar(!sidebar)
    const { signOut } = useAuth();
    return (
        <>
        <div className="navbar">
        <Link to="#" className='menu-bars'>
            <AiOutlineMenu onClick={showSidebar}/>
        </Link>
        <Link className="sair" onClick={()=> signOut()}><BiLogIn />Sair</Link>
        </div>
        <nav className={sidebar ? 'nav-menu active': 'nav-menu'}>
            <ul className='nav-menu-items'>
                <li className="navbar-toggle">
                    <Link to='#' className='menu-bars'>
                        <AiOutlineClose onClick={showSidebar}/>
                    </Link>
                </li>
                {SidebarData.map((item, index) =>{
                   return(
                       <li key={index} className={item.cName}>
                          <Link to={item.path}>
                              {item.icon}
                              <span>{item.title}</span>
                          </Link>
                       </li>
                   ) 
                })}  
            </ul>
        </nav>
        </>
    )
}

export default Navbar
