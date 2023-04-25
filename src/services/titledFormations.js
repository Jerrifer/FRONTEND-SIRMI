import axios from 'axios';
import { BASE_URL } from 'globals.constans';

export const allTitledFormationsService = async () => {
    return await new Promise( async (resolve, reject) => {
        await axios.get(`${BASE_URL}titledformations`).then((response) => {
            resolve(response.data)
        }).catch((error) => {
            resolve(error.response.data)
        })          
    })
};

export const getTitledFormationService = async (id) => {
    return await new Promise( async (resolve, reject) => {
        await axios.get(`${BASE_URL}titledformations/${id}`).then((response) => {
            resolve(response.data)
        }).catch((error) => {
            resolve(error.response.data)
        })          
    })
  };

  export const registerTitledFormationService = async (body) => {
    return await new Promise( async (resolve, reject) => {
        await axios.post(`${BASE_URL}titledformations`, body).then((response) => {
            resolve(response.data)
        }).catch((error) => {
            resolve(error.response.data)
        })          
    })
  };

  export const updateTitledFormationService = async (id, body) => {
    return await new Promise( async (resolve, reject) => {
        await axios.put(`${BASE_URL}titledformations/${id}`, body).then((response) => {
            resolve(response.data)
        }).catch((error) => {
            resolve(error.response.data)
        })          
    })
  };

  export const deleteTitledFormationService = async (id) => {
    return await new Promise( async (resolve, reject) => {
        await axios.delete(`${BASE_URL}titledformations/${id}`).then((response) => {
            resolve(response.data)
        }).catch((error) => {
            resolve(error.response.data)
        })          
    })
  };