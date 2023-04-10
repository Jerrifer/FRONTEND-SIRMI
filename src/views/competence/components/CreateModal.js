import React from 'react'
import { useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { Modal, Button, Form } from 'react-bootstrap'
import axios from 'axios';
// import { Input } from "reactstrap";
// eslint-disable-next-line no-unused-vars
import { toast } from 'react-toastify';
import {BASE_URL} from 'globals.constans'
import { swalWithBootstrapButtons } from 'plugins/alerts';


function CreateModal() {

    const [isShow, invokeModal] = useState(false);
    const initModal = () => {
        return invokeModal(!isShow);
    }

    const [data, setData] = useState({
        labor_competence_code: '',
        labor_competition: '',
        labor_competition_version: '',
        duration: 0
    });

    // const [programs, setPrograms] = useState([]);

    // eslint-disable-next-line no-unused-vars
    const [error, setError] = useState(null);

    const mensajes = () => {
        toast.success('Typo de programa creado correctamente!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
    }

    const handleChange = (e) => {
        setData({...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        console.log(data);
        e.preventDefault();
        axios.post(`${BASE_URL}competences`, data)
            .then(res => {
                console.log(res.data);
                mensajes();
                initModal();
                swalWithBootstrapButtons.fire(
                    'Registro exitoso',
                    'La competencia laboral se registro con éxito.',
                    'success'
                  )
            })
            .catch(err => {
                console.log(err);
                setError(err);
            })
    }

    // const getPrograms = async () => {
    //     const response = await fetch(`${BASE_URL}formationprograms`);
    //     const data = await response.json();
    //     setPrograms(data.results);
    // }

    // useEffect(() => {
    //     getPrograms();
    // }, []);

    // const options = programs.map((program) => {
    //     return {
    //         key: program._id,
    //         text: program.programs_name,
    //         value: program.programs_name
    //     }
    // })

    // eslint-disable-next-line no-unused-vars
    const handleChangePrograms = (e, { value }) => {
        setData({
            ...data,
            formation_program: value
        })
    }

    return (

        <div>
            <Button className='btn btn-success' variant="" onClick={initModal}>
             agregar
            </Button>

            <Modal show={isShow} onHide={initModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Crear Tipo de Programa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {isShow &&
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Nombre de la competencia Laboral</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese el nombre de la competencia Laboral" name="labor_competition" onChange={handleChange} />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Código de Competencia Laboral</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese el código de competencia laboral" name="labor_competence_code" onChange={handleChange} />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Versión de la Competencia Laboral</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese la versión de la competencia laboral" name="labor_competition_version" onChange={handleChange} />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Duración estimada</Form.Label>
                                <Form.Control type="number" placeholder="Ingrese la duración de la competencia laboral" name="duration" onChange={handleChange} />
                            </Form.Group>
                            {/* <Form.Group controlId="formBasicEmail">
                                <Form.Label>Programa de Formación</Form.Label>
                                <select name="formation_program" onChange={handleChange}>
                                    {programs.map((program) => (
                                        <option key={program._id} value={program._id}>{program.name}</option>
                                    ))}
                                </select>
                                <select>
                                    {options.map((option) => (
                                        <option key={option.key} value={option.value}>{option.text}</option>
                                    ))}
                                </select>
                                
                                <Input type="select" name="formation_program" onChange={handleChange}>
                                    {programs.map((program) => (
                                        <option key={program._id} value={program._id}>{program.name}</option>
                                    ))}
                                </Input>

                            </Form.Group> */}
                            <Button variant="primary" type="submit">
                                Crear
                            </Button>
                        </Form>
                    }
                </Modal.Body>
            </Modal>
        </div>
    )


    // return (

    //     <div>
    //         <Button variant="primary" onClick={initModal}>
    //             <Icon name='plus' />
    //         </Button>

    //         <Modal show={isShow} onHide={initModal}>
    //             <Modal.Header closeButton>
    //                 <Modal.Title>Crear Tipo de Programa</Modal.Title>
    //             </Modal.Header>
    //             <Modal.Body>
    //                 {isShow &&
    //                     <Form onSubmit={handleSubmit}>
    //                         <Form.Group controlId="formBasicEmail">
    //                             <Form.Label>Nombre del Tipo de Programa</Form.Label>
    //                             <Form.Control type="text" placeholder="Ingrese el nombre del tipo de programa" name="type_program" onChange={handleChange} />
    //                         </Form.Group>
    //                         <Form.Group controlId="formBasicEmail">
    //                             <Form.Label>Código de Competencia Laboral</Form.Label>
    //                             <Form.Control type="text" placeholder="Ingrese el código de la competencia laboral" name="labor_competence_code" onChange={handleChange} />
    //                         </Form.Group>
    //                         <Form.Group controlId="formBasicEmail">
    //                             <Form.Label>Competencia Laboral</Form.Label>
    //                             <Form.Control type="text" placeholder="Ingrese la competencia laboral" name="labor_competition" onChange={handleChange} />
    //                         </Form.Group>
    //                         <Form.Group controlId="formBasicEmail">
    //                             <Form.Label>Versión de la Competencia Laboral</Form.Label>
    //                             <Form.Control type="text" placeholder="Ingrese la versión de la competencia laboral" name="labor_competition_version" onChange={handleChange} />
    //                         </Form.Group>
    //                         <Form.Group controlId="formBasicEmail">
    //                             <Form.Label>Programa de Formación</Form.Label>
    //                             <select>
    //                                 {
    //                                     data.formation_program.map((program) => {
    //                                         return (
    //                                             <option key={program._id} value={program._id}>{program.program_name}</option>
    //                                         )
    //                                     })
    //                                 }
    //                             </select>
    //                         </Form.Group>
    //                         <Button variant="primary" type="submit">
    //                             Crear
    //                         </Button>
    //                     </Form>

    //                 }
    //             </Modal.Body>
    //             <Modal.Footer>
    //                 <Button variant="secondary" onClick={initModal}>
    //                     Cerrar
    //                 </Button>
    //             </Modal.Footer>
    //         </Modal>
    //     </div>

    // )
}

export default CreateModal
