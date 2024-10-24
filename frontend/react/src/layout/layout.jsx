import { Outlet, NavLink } from 'react-router-dom';
import './layout.css';

const Layout = () => {
    return (
        <div className='layout-root'>
            <div className='layout-menu'>
                <h2>Menu</h2>
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
            <div className='layout-main-content'>
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;