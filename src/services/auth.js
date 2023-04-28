import axios from 'axios';
import { BASE_URL } from 'globals.constans';

export const signInService = async (data) => {
    return await new Promise( async (resolve, reject) => {
        await axios.post(`${BASE_URL}auth/login`, data).then((response) => {
            resolve(response.data)
        }).catch((error) => {
            resolve(error.response.data)
        })          
    })
};

export const signUpService = async (data) => {
    return await new Promise( async (resolve, reject) => {
        await axios.post(`${BASE_URL}auth/register`, data).then((response) => {
            resolve(response.data)
            console.log(response.data);
        }).catch((error) => {
            resolve(error.response.data)
        })          
    })
  };