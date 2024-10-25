import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import PageContent from "../../components/pageContent/PageContent";

const defaultValues = {
    inputNameValue: '',
    inputLastNameValue: ''
}

const StudentsForm = (id = null, values = defaultValues) => {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: values })

    const onSubmit = async (values) => {
        try {
          const body = {
            name: values.inputNameValue,
            lastname: values.inputLastNameValue,
            dni: values.inputDniValue,
            email: values.inputEmailValue
          };
          if (id === null) {
            await fetch(`/api/students/${id}`, {
              method: 'PUT',
              body
            }
            );
          } else {
            await fetch('/api/students', {
              method: 'POST',
              body: JSON.stringify(body),
              headers: {
                'Content-type' : 'application/json'
              }
            });
          }
        } catch (error) {
          alert(error);
        }
      }

    return (
        <PageContent
            headerTitle="Agregar Alumno"
            actions={ [
                <button key='back' onClick={() => navigate(-1)}>Atras</button>
              ] }
        >
            <form onSubmit={ handleSubmit(onSubmit) }>
                <div>
                    <label>Nombre:</label>
                    <input { ...register('inputNameValue')} />
                </div>
                <div>
                    <label>Apellido:</label>
                    <input { ...register('inputLastNameValue') } />
                </div>
                <div>
                    <label>DNI: </label>
                    <input { ...register('inputDniValue') } />
                </div>
                <div>
                    <label>Email: </label>
                    <input { ...register('inputEmailValue') } />
                </div>
                <button type='submit'>Guardar</button>
            </form>    
        </PageContent>
    );
}

export default StudentsForm