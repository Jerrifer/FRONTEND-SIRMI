import axios from 'axios';
import { BASE_URL } from 'globals.constans';

export const allUsersService = async () => {
    return await new Promise( async (resolve, reject) => {
        await axios.get(`${BASE_URL}users`).then((response) => {
            resolve(response.data)
        }).catch((error) => {
            resolve(error.response.data)
        })          
    })
};

export const getUserService = async (id) => {
    return await new Promise( async (resolve, reject) => {
        await axios.get(`${BASE_URL}users/${id}`).then((response) => {
            resolve(response.data)
            console.log(response.data);
        }).catch((error) => {
            resolve(error.response.data)
        })          
    })
  };

  export const registerUserService = async (body) => {
    return await new Promise( async (resolve, reject) => {
        await axios.post(`${BASE_URL}users`, body).then((response) => {
            resolve(response.data)
        }).catch((error) => {
            resolve(error.response.data)
        })          
    })
  };

  export const updateUserService = async (id, body) => {
    return await new Promise( async (resolve, reject) => {
        await axios.put(`${BASE_URL}users/${id}`, body).then((response) => {
            resolve(response.data)
        }).catch((error) => {
            resolve(error.response.data)
        })          
    })
  };

  export const deleteUserService = async (id) => {
    return await new Promise( async (resolve, reject) => {
        await axios.delete(`${BASE_URL}users/${id}`).then((response) => {
            resolve(response.data)
        }).catch((error) => {
            resolve(error.response.data)
        })
    })
  };