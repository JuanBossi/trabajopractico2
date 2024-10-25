import { useEffect, useState } from "react";
import {NavLink, useNavigate} from 'react-router-dom';
import PageContent from "../../components/pageContent/PageContent";

const StudentsList = () => {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [fetchingStudents, setFetchingStudents] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);


  const fetchStudents = async () => {
    try {
      setFetchingStudents(true);
      const response = await fetch('/api/students', {
        method: 'GET'
      });
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error(error);
    } finally {
      setFetchingStudents(false);
    }
  };
    return (
        <PageContent
             headerTitle="Alumnos"
             actions={ [
              <button key='add' onClick={() => navigate('/students/form')}>Agregar</button>
            ] }
        >
          {
            fetchingStudents
            ? <p>Por favor espere, recuperando información...</p>
            : <>
              {
                !students.length && <p>No posee alumnos cargados</p> 
              }
  
              <table border={ 1 }>
                <thead>
                  <tr>
                    <th>Legajo</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    students.map( student => (
                      <tr key={student.id}>
                        <td>{ student.sid }</td>
                        <td>{ student.firstname }</td>
                        <td>{ student.lastname }</td>
                        <td> <button onClick={() => navigate(``)} >Borrar</button></td>
                      </tr>
                    ))
                  
                  
                  /*
                    careers.map(career => (
                      <tr key={ career.id }>
                        <td> { career.id } </td>
                        <td> { career.name } </td>
                        <td> { career.levels.length } </td>
                        <td> <button onClick={() => navigate(`/careers/${career.id}`)} >Ver detalle</button> </td>
                      </tr>
                    ))
                    */
                  }
                </tbody>
              </table>
            </>
          }
        </PageContent>
    );
}

export default StudentsList;