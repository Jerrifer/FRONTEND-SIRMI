import axios from 'axios';
import { BASE_URL } from 'globals.constans';

export const allAssignedFormationsService = async () => {
    return await new Promise( async (resolve, reject) => {
        await axios.get(`${BASE_URL}assignedformations`).then((response) => {
            resolve(response.data)
        }).catch((error) => {
            resolve(error.response.data)
        })          
    })
};

export const getAssignedFormationService = async (id) => {
    return await new Promise( async (resolve, reject) => {
        await axios.get(`${BASE_URL}assignedformations/${id}`).then((response) => {
            resolve(response.data)
        }).catch((error) => {
            resolve(error.response.data)
        })          
    })
  };

  export const registerAssignedFormationService = async (body) => {
    return await new Promise( async (resolve, reject) => {
        await axios.post(`${BASE_URL}assignedformations`, body).then((response) => {
            resolve(response.data)
        }).catch((error) => {
            resolve(error.response.data)
        })          
    })
  };

  export const updateAssignedFormationService = async (id, body) => {
    return await new Promise( async (resolve, reject) => {
        await axios.put(`${BASE_URL}assignedformations/${id}`, body).then((response) => {
            resolve(response.data)
        }).catch((error) => {
            resolve(error.response.data)
        })          
    })
  };

  export const deleteAssignedFormationService = async (id) => {
    return await new Promise( async (resolve, reject) => {
        await axios.delete(`${BASE_URL}assignedformations/${id}`).then((response) => {
            resolve(response.data)
        }).catch((error) => {
            resolve(error.response.data)
        })          
    })
  };