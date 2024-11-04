import { Outlet, NavLink } from 'react-router-dom';
import './layout.css';

const Layout = () => {
    return (
        <div className='sidebar-layout'>
            <div className='sidebar'>
                <h3>Trabajo Práctico 2</h3>
                <nav>
                    <ul>
                        <li>
                            <NavLink 
                                to={'/'}
                                className={ ({isActive}) => ( isActive ? 'menu-selected' : '' )}
                            >
                            Pagina Principal
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to={'/students'}
                                className={ ({isActive}) => ( isActive ? 'menu-selected' : '' )}
                            >
                            Alumnos
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className='main-content'>
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;