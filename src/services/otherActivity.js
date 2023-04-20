import axios from "axios"
import { BASE_URL } from 'globals.constans';

export const allOtherActivityService = async () => {
    return await new Promise( async (resolve, reject) => {
        await axios.get(`${BASE_URL}otheractivity`).then((response) => {
            resolve(response.data)
        }).catch((error) => {
            resolve(error.response.data)
        })          
    })
};

export const getOtherActivityService = async (id) => {
    return await new Promise( async (resolve, reject) => {
        await axios.get(`${BASE_URL}otheractivity/${id}`).then((response) => {
            resolve(response.data)
            console.log(response.data);
        }).catch((error) => {
            resolve(error.response.data)
        })          
    })
  };

  export const registerOtherActivityService = async (body) => {
    return await new Promise( async (resolve, reject) => {
        await axios.post(`${BASE_URL}otheractivity`, body).then((response) => {
            resolve(response.data)
        }).catch((error) => {
            resolve(error.response.data)
        })          
    })
  };

  export const updateOtherActivityService = async (id, body) => {
    return await new Promise( async (resolve, reject) => {
        await axios.put(`${BASE_URL}otheractivity/${id}`, body).then((response) => {
            resolve(response.data)
        }).catch((error) => {
            resolve(error.response.data)
        })          
    })
  };

  export const deleteOtheractivityService = async (id) => {
    return await new Promise( async (resolve, reject) => {
        await axios.delete(`${BASE_URL}otheractivity/${id}`).then((response) => {
            resolve(response.data)
        }).catch((error) => {
            resolve(error.response.data)
        })          
    })
  };