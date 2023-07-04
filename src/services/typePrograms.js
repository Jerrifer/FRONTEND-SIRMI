import axios from 'axios';
import { BASE_URL } from 'globals.constans';

export const allTypeProgramsService = async () => {
    return await new Promise( async (resolve, reject) => {
        await axios.get(`${BASE_URL}typeprograms`).then((response) => {
            resolve(response.data)
        }).catch((error) => {
            resolve(error.response.data)
        })          
    })
};

export const getTypeProgramService = async (id) => {
    return await new Promise( async (resolve, reject) => {
        await axios.get(`${BASE_URL}typeprograms/${id}`).then((response) => {
            resolve(response.data)
        }).catch((error) => {
            resolve(error.response.data)
        })          
    })
  };