import {NavLink, useNavigate} from 'react-router-dom';
import PageContent from "../../components/pageContent/PageContent";

const Students = () => {
    return (
        <PageContent
             headerTitle="Alumnos"
        >
            <table border={ 1 }>
              <thead>
                <tr>
                  <th>Legajo</th>
                  <th>Nombre</th>
                  <th>Apelludi</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {
                  /*careers.map(career => (
                    <tr key={ career.id }>
                      <td> { career.id } </td>
                      <td> { career.name } </td>
                      <td> { career.levels.length } </td>
                      <td> <button onClick={() => navigate(`/careers/${career.id}`)} >Ver detalle</button> </td>
                    </tr>
                  ))*/
                }
              </tbody>
            </table>
        </PageContent>
    );
}

export default Students;