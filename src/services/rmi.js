import axios from 'axios';
import { BASE_URL } from 'globals.constans';

export const allRmiService = async () => {
    return await new Promise( async (resolve, reject) => {
        await axios.get(`${BASE_URL}rmi`).then((response) => {
            resolve(response.data)
        }).catch((error) => {
            resolve(error.response.data)
        })          
    })
};

export const getRmiService = async (id) => {
    return await new Promise( async (resolve, reject) => {
        await axios.get(`${BASE_URL}rmi/${id}`).then((response) => {
            resolve(response.data)
            console.log(response.data);
        }).catch((error) => {
            resolve(error.response.data)
        })          
    })
  };

  export const registerRmiService = async (body) => {
    return await new Promise( async (resolve, reject) => {
        await axios.post(`${BASE_URL}rmi`, body).then((response) => {
            resolve(response.data)
        }).catch((error) => {
            resolve(error.response.data)
        })          
    })
  };

  export const updateRmiService = async (id, body) => {
    return await new Promise( async (resolve, reject) => {
        await axios.put(`${BASE_URL}rmi/${id}`, body).then((response) => {
            resolve(response.data)
        }).catch((error) => {
            resolve(error.response.data)
        })          
    })
  };

  export const deleteRmiService = async (id) => {
    return await new Promise( async (resolve, reject) => {
        await axios.delete(`${BASE_URL}rmi/${id}`).then((response) => {
            resolve(response.data)
        }).catch((error) => {
            resolve(error.response.data)
        })          
    })
  };

  export const rmiByUserService = async (id) => {
    return await new Promise( async (resolve, reject) => {
        await axios.get(`${BASE_URL}rmi/byuser/${id}`).then((response) => {
            resolve(response.data)
        }).catch((error) => {
            resolve(error.response.data)
        })          
    })
  };

