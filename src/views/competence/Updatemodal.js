import React from 'react'
import { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import axios from 'axios';


import './input.css'

function UpdateModalComponent(data) {
    const [isShow, invokeModal] = useState(false);
    // const [APIData, setAPIData] = useState([]);

    const initModal = () => {
        return invokeModal(!isShow);
    }

    // form updating data
    const [id] = useState(data.id);
    const [name, setName] = useState(data.name);
    const [competition_code, setCompetition_code] = useState(data.competition_code);
    const [norm, setNorm] = useState(data.norm);
    const [duration, setDuration] = useState(data.duration);
    const [formationprograms, setFormationprograms] = useState(data.formationprograms);





    
    const onSubmit2 = async (_id) => {
        try {
            const data = new FormData();
            data.append('_id', data.id);
            data.append('name', data.name);
            data.append('competition_code', data.competition_code);
            data.append('norm', data.norm);
            data.append('duration', data.duration);
            data.append('formationprograms', data.formationprograms);




            const saveData = ( _id, name, competition_code, norm,duration ,formationprograms) => {
                return { name: name, competition_code: competition_code, _id: id ,norm:norm ,duration:duration,formationprograms:formationprograms};
            }

            const save = saveData(_id, name, competition_code,norm, duration, formationprograms);
            console.log(save);
            
            //
            const res = await axios.put(`http://localhost:3000/api/v1/competences/${id}`, save);
            console.log(res);
        } catch (error) {
            console.log(error);
        }

      
    }

    return (
        <>
            <Button  variant='' onClick={initModal}>
            <i class="fas fa-pen-alt"></i>
            </Button>

            <Modal show={isShow}>
                <Modal.Header closeButton onClick={initModal}>
                    <Modal.Title>Update User</Modal.Title>
                </Modal.Header>

                <form onSubmit={onSubmit2}>
                    <Modal.Body>
                        <p>Are you sure you want to update this user?</p>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control  type='text'
                                    name='name'
                                    placeholder='Enter name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>competition_code</Form.Label>
                            <Form.Control  type='text'
                                    name='competition_code'
                                    placeholder='Enter email'
                                    value={competition_code}
                                    onChange={(e) => setCompetition_code(e.target.value)}
                                    required
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>norm</Form.Label>
                            <Form.Control  type='text'
                                    name='norm'
                                    placeholder='norm'
                                    value={norm}
                                    onChange={(e) => setNorm(e.target.value)}
                                    required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>duration</Form.Label>
                            <Form.Control  type='text'
                                    name='duration'
                                    placeholder='duration'
                                    value={duration}
                                    onChange={(e) => setDuration(e.target.value)}
                                    required
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>formationprograms</Form.Label>
                            <Form.Control  type='text'
                                    name='formationprograms'
                                    placeholder='formationprograms'
                                    value={formationprograms}
                                    onChange={(e) => setFormationprograms(e.target.value)}
                                    required
                            />
                        </Form.Group>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant='danger' onClick={initModal}>
                            Close
                        </Button>
                        <Button type='submit' variant='dark' onSubmit={onSubmit2}>
                            Update
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}

export default UpdateModalComponent
