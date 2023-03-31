import React from 'react'
import { useState, useEffect } from 'react'
import { Modal, Button, Form, Dropdown } from 'react-bootstrap'
import axios from 'axios';
import { Input } from "reactstrap";
import { Checkbox, Icon, Select } from 'semantic-ui-react';
import { toast } from 'react-toastify';


function CreateModal() {

    const [isShow, invokeModal] = useState(false);
    const initModal = () => {
        return invokeModal(!isShow);
    }

    const [data, setData] = useState({
        type_program: '',
        _id: '',
        labor_competence_code: '',
        labor_competition: '',
        labor_competition_version: '',
        formation_program: []
    });

    const [programs, setPrograms] = useState([]);

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
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:4000/api/competence', data)
            .then(res => {
                console.log(res);
                console.log(res.data);
                mensajes();
                initModal();
            })
            .catch(err => {
                console.log(err);
                setError(err);
            })
    }

    const getPrograms = async () => {
        const response = await fetch('http://localhost:3500/api/v1/formationprograms');
        const data = await response.json();
        setPrograms(data.results);
    }

    useEffect(() => {
        getPrograms();
    }, []);

    const options = programs.map((program) => {
        return {
            key: program._id,
            text: program.programs_name,
            value: program.programs_name
        }
    })

    const handleChangePrograms = (e, { value }) => {
        setData({
            ...data,
            formation_program: value
        })
    }

    return (

        <div>
            <Button variant="primary" onClick={initModal}>
                <Icon name='plus' />
            </Button>

            <Modal show={isShow} onHide={initModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Crear Tipo de Programa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {isShow &&
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Nombre del Tipo de Programa</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese el nombre del tipo de programa" name="type_program" onChange={handleChange} />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Código de Competencia Laboral</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese el código de competencia laboral" name="labor_competence_code" onChange={handleChange} />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Competencia Laboral</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese la competencia laboral" name="labor_competition" onChange={handleChange} />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Versión de la Competencia Laboral</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese la versión de la competencia laboral" name="labor_competition_version" onChange={handleChange} />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
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

                            </Form.Group>
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
