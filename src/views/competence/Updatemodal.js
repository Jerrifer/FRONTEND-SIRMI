import React from "react";
import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

import "./input.css";
import { BASE_URL } from "globals.constans";

function UpdateModalComponent(data) {
  const [isShow, invokeModal] = useState(false);
  // const [APIData, setAPIData] = useState([]);

  const initModal = () => {
    return invokeModal(!isShow);
  };

  // form updating data
  const [id] = useState(data.id);
  const [labor_competence_code, setLabor_competence_code] = useState(data.name || '');
  const [labor_competition, setLabor_competition] = useState(data.competition_code|| '');
  const [labor_competition_version, setLabor_competition_version] = useState(data.labor_competition_version||'');
 
  const [duration, setDuration] = useState(data.duration||'');
  const [ formation_programs, setFormation_programs] = useState(data.formationprograms||'');

  const onSubmit2 = async (e,_id) => {
    try {
      e.preventDefault();
      const data = new FormData();
      data.append("_id", data.id);
      data.append("labor_competence_code", data.labor_competence_code);
      data.append("labor_competition", data.labor_competition);
      data.append("labor_competition_version", data.labor_competition_version);
      data.append("duration", data.duration);
      data.append("formation_programs", data.formation_programs);

      const saveData = (
        _id,
        labor_competence_code,
        labor_competition,
        labor_competition_version,
        duration,
        formation_programs
      ) => {
        return {
          labor_competence_code: labor_competence_code,
          labor_competition: labor_competition,
          _id: id,
          labor_competition_version: labor_competition_version,
          duration: duration,
          formation_programs: formation_programs,
        };
      };

      const save = saveData(
        _id,
        labor_competence_code,
        labor_competition,
        formation_programs,
        duration,
        labor_competition_version
      );
     console.log(save);

      //
      const res = await axios.put(`${BASE_URL}competences/${id}`,save).then (res =>{
          console.log(res);
                initModal();
        })
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button variant="" onClick={initModal}>
      <i class="fa-solid fa-file-pen"></i>
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
              <Form.Control
                type="text"
                name="labor_competence_code"
                placeholder="Enter name"
                value={labor_competence_code}
                onChange={(e) => setLabor_competence_code(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>competition_code</Form.Label>
              <Form.Control
                type="text"
                name="labor_competition"
                placeholder="Enter email"
                value={labor_competition}
                onChange={(e) => setLabor_competition(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>norm</Form.Label>
              <Form.Control
                type="text"
                name="labor_competition_version"
                placeholder="norm"
                value={labor_competition_version}
                onChange={(e) => setLabor_competition_version(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>duration</Form.Label>
              <Form.Control
                type="text"
                name="duration"
                placeholder="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>formationprograms</Form.Label>
              <Form.Control
                type="text"
                name="formation_programs"
                placeholder="formationprograms"
                value={formation_programs}
                onChange={(e) => setFormation_programs(e.target.value)}
                required
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={initModal}>
              Close
            </Button>
            <Button type="submit" variant="dark" onSubmit={onSubmit2}>
              Update
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default UpdateModalComponent;
