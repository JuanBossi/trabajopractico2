import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import PageContent from "../../components/pageContent/PageContent";
import './StudentsList.css';

const StudentsList = () => {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [fetchingStudents, setFetchingStudents] = useState(false);
  const [search, setSearch] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); 
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchStudents();
  }, [search,currentPage, pageSize]);

  const fetchStudents = async () => {
    try {
      setFetchingStudents(true);

      const response = await fetch(`/api/students?search=${search}&currentPage=${currentPage}&pageSize=${pageSize}`);
      if (!response.ok) throw new Error("Error en la respuesta del servidor");

      const data = await response.json();
      setStudents(data.data);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error al recuperar los estudiantes:", error);
      setStudents([]);  
    } finally {
      setFetchingStudents(false);
    }
  };

  const deleteStudent = async (id, sid) => {
    const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar el estudiante con legajo ${sid}?`);
    
    if (confirmDelete) {  
        try {
            await fetch(`/api/students/${id}`, { method: 'DELETE' });

            
            const remainingStudents = students.filter(student => student.id !== id);
            if (remainingStudents.length === 0 && currentPage > 1) {
                setCurrentPage(currentPage - 1);  na
            } else {
                setStudents(remainingStudents);  
            }
            alert("La eliminación ha sido realizada exitosamente.");
            fetchStudents();
        } catch (error) {
            console.error("Error al borrar el estudiante:", error);
            alert("Ocurrió un error al intentar eliminar el estudiante.");
        }
    }
};


  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); 
  };

  const handleSearchClick = () => {
    if (searchQuery.trim() === '') {
     
      setSearch('');
    } else {
      
      setSearch(searchQuery);
    }
    setCurrentPage(1); 
  };

  const handlePageSizeChange = (e) => {
    setPageSize(parseInt(e.target.value));
    setCurrentPage(1); 
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    
    pageNumbers.push(
      <button key={1} onClick={() => handlePageClick(1)} className={currentPage === 1 ? 'active' : ''}>
        1
      </button>
    );

    
    if (currentPage > 3) {
      pageNumbers.push(<span key="start-ellipsis">...</span>);
    }

    
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i !== 1 && i !== totalPages) { 
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageClick(i)}
            className={i === currentPage ? 'active' : ''}
          >
            {i}
          </button>
        );
      }
    }

    
    if (currentPage < totalPages - 2) {
      pageNumbers.push(<span key="end-ellipsis">...</span>);
    }

    
    if (totalPages > 1) {
      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => handlePageClick(totalPages)}
          className={currentPage === totalPages ? 'active' : ''}
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  
  return (
    <PageContent
      headerTitle="Alumnos"
      actions={[
        <button key='add' className='button-add' onClick={() => navigate('/students/form')}>Agregar</button>
      ]}
    >
      <div className="search-pagination">
        <input 
          type="text" 
          value={searchQuery} 
          onChange={handleSearchChange} 
          placeholder="Buscar por apellido" 
        />
        <button className='button-add' onClick={handleSearchClick}>Buscar</button>
      </div>

      {fetchingStudents ? (
        <p>Cargando estudiantes...</p>
      ) : (
        <>
          {!students.length && <p>No se encontraron estudiantes.</p>}

          <table border={1}>
            <thead>
              <tr>
                <th>Legajo</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
    {students?.map(student => (
        <tr key={student.id}>
            <td>{student.sid}</td>
            <td>{student.firstname}</td>
            <td>{student.lastname}</td>
            <td>
                <button className='button-back' onClick={() => deleteStudent(student.id, student.sid)}>Borrar</button>
            </td>
        </tr>
    ))}
</tbody>
          </table>

          <div className="pagination">
            <button 
              onClick={() => handlePageClick(currentPage - 1)} 
              disabled={currentPage === 1}
            >
              Anterior
            </button>

            {renderPageNumbers()}

            <button 
              onClick={() => handlePageClick(currentPage + 1)} 
              disabled={currentPage === totalPages}
            >
              Siguiente
            </button>

            <select value={pageSize} onChange={handlePageSizeChange}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            </select>
          </div>

        </>
      )}
    </PageContent>
  );
}

export default StudentsList;