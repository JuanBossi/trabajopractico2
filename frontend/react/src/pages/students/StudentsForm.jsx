import PageContent from "../../components/pageContent/PageContent";
import {NavLink, useNavigate} from 'react-router-dom';

const StudentsForm = () => {
    const navigate = useNavigate();

    return (
        <PageContent
            headerTitle="Agregar Alumno"
            actions={ [
                <button key='back' onClick={() => navigate(-1)}>Atras</button>
              ] }
        >
            
        </PageContent>
    );
}

export default StudentsForm