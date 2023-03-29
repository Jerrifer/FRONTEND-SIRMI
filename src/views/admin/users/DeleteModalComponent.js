/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { useState } from 'react'
import { Modal, Button, Form, Alert } from 'react-bootstrap'
import axios from 'axios';
import { Icon } from 'semantic-ui-react';




function DeleteModalComponent(data) {
    const [isShow, invokeModal] = useState(false);

    const initModal = () => {
        return invokeModal(!isShow);
    }

    // // form updating data
    const [id] = useState(data.id);
    // const [name, setName] = useState(data.name);
    // const [email, setEmail] = useState(data.email);


    const handleDelete = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.delete(`http://localhost:3005/api/v1/users/${id}`).then(res => {
                console.log(res);
                initModal();
            });
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }
    
    // const onSubmit2 = async (e,_id) => {
    //     try {
    //         e.preventDefault();
    //         const data = new FormData();
    //         data.append('id', data.id);
    //         data.append('name', data.name);
    //         data.append('email', data.email);

    //         const saveData = ( id, name, email ) => {
    //             return { name: name, email: email, id: id };
    //         }

    //         const save = saveData(id, name, email);
    //         console.log(save);
            
    //         //
    //         const res = await axios.put(`http://localhost:3005/api/v1/users/${id}`, save).then(res => {
    //             console.log(res);
    //             initModal();
    //         });
    //         console.log(res);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    return (
        <>
            <Icon onClick={initModal}>
            <i className="fas fa-prescription-bottle-alt text-red"  />
            </Icon>

            <Modal show={isShow}>
            <Modal.Header closeButton>
                <Modal.Title>Delete User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert variant="danger">
                    <Alert.Heading>Are you sure you want to delete this user?</Alert.Heading>
                </Alert>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={initModal}>Cancel</Button>
                <Button variant="danger" onClick={handleDelete}>Delete User</Button>
            </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteModalComponent
