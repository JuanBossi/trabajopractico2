import {NavLink, useNavigate} from 'react-router-dom';
import PageContent from "../components/pageContent/PageContent";
import './mainPage.css';

const MainPage = () => {
    const navigate = useNavigate();

    const handleOnClickGoToPage = () => {
        navigate('');
    };

    return (
        <PageContent
            headerTitle="Página Principal"
        >
        <div>
            <div className="card">
              <NavLink
              to={'/students'}>
                <h1>Módulo Alumnos</h1>
              </NavLink>
            </div>
        </div>
        </PageContent>
        );
};

export default MainPage;