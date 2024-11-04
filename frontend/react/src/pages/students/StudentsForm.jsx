import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import PageContent from "../../components/pageContent/PageContent";
import './StudentsForm.css';

const defaultValues = {
    inputNameValue: '',
    inputLastNameValue: '',
    inputDniValue: '',
    inputEmailValue: ''
}

const StudentsForm = (id = null, values = defaultValues) => {
    const navigate = useNavigate();

    const { register, handleSubmit, watch, formState: { errors } } = useForm({ defaultValues: values })

    const onSubmit = async (values) => {
        try {
          const body = {
            name: values.inputNameValue,
            lastname: values.inputLastNameValue,
            dni: values.inputDniValue,
            email: values.inputEmailValue
          };
          let response;
          if (id === null) {
            response = await fetch(`/api/students/${id}`, {
              method: 'PUT',
              body
            }
            );
          } else {
            response = await fetch('/api/students', {
              method: 'POST',
              body: JSON.stringify(body),
              headers: {
                'Content-type' : 'application/json'
              }
            });
            
          }
          if (!response.ok) {
            const errorData = await response.json(); 
            console.error("Error:", errorData.message); 
            alert(`Ocurrió un error: ${errorData.message}`); 
            return;
          }
          alert("El estudiante ha sido agregado exitosamente.");
          navigate(-1);
        } catch (error) {
          console.error("Error de red o del servidor:", error);
          alert("Ocurrió un error al intentar agregar el estudiante.");
        }
      }

    const emailValue = watch('inputEmailValue');

    return (
        <PageContent
            headerTitle="Agregar Alumnos"
            actions={ [
                <button key='back' className='button-back' onClick={() => navigate(-1)}>Atras</button>
              ] }
        >
            <form className="student-form" onSubmit={ handleSubmit(onSubmit) }>
                <div className="form-group">
                    <label>Nombre:</label>
                    <div className="input-container">
                    <input
                        {...register('inputNameValue', { required: 'El nombre es requerido', maxLength: {value: 100,
                                message: 'El nombre no puede exceder los 100 caracteres'
                            }
                        })}
                    />
                    {errors.inputNameValue && (<span className="error-message">{errors.inputNameValue.message}</span>)}
                </div>
                </div>
                <div className="form-group">
                    <label>Apellido:</label>
                    <div className="input-container">
                    <input
                        {...register('inputLastNameValue', {
                            required: 'El apellido es requerido',
                            maxLength: {
                                value: 100,
                                message: 'El apellido no puede exceder los 100 caracteres'
                            }
                        })}
                    />
                    {errors.inputLastNameValue && (<span className="error-message">{errors.inputLastNameValue.message}</span>)}
                </div>
                </div>
                <div className="form-group">
                    <label>DNI: </label>
                    <div className="input-container">
                    <input
                        {...register('inputDniValue', {
                            required: 'El DNI es requerido',
                            pattern: {
                              value: /^[0-9]{1,10}$/,
                              message: 'DNI inválido'
                          }, 
                            maxLength: {
                                value: 10,
                                message: 'El email no puede exceder los 10 caracteres'
                            }
                        })}
                    />
                    {errors.inputDniValue && (<span className="error-message">{errors.inputDniValue.message}</span>)}
                </div>
                </div>
                <div className="form-group">
                    <label>Email: </label>
                    <div className="input-container">
                    <input
                        {...register('inputEmailValue', {
                            required: 'El email es requerido',
                            pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: 'Email inválido'
                          }, 
                            maxLength: {
                                value: 100,
                                message: 'El email no puede exceder los 100 caracteres'
                            }
                        })}
                    />
                    {errors.inputEmailValue && (<span className="error-message">{errors.inputEmailValue.message}</span>)}
                     {/* Mensaje en tiempo real mientras el usuario escribe */}
                     {emailValue && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue) && (
                        <span className="error-message">Email inválido</span>
                    )}
                </div>
                </div>
                <button className='button-add' type='submit'>Agregar</button>
            </form>    
        </PageContent>
    );
}

export default StudentsForm