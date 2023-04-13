import axios from 'axios';
import { BASE_URL } from 'globals.constans';

export const allProgramLevelsService = async () => {
    return await new Promise( async (resolve, reject) => {
        await axios.get(`${BASE_URL}programlevels`).then((response) => {
            resolve(response.data)
        }).catch((error) => {
            resolve(error.response.data)
        })          
    })
};

export const getProgramLevelService = async (id) => {
    return await new Promise( async (resolve, reject) => {
        await axios.get(`${BASE_URL}programlevels/${id}`).then((response) => {
            resolve(response.data)
            console.log(response.data);
        }).catch((error) => {
            resolve(error.response.data)
        })          
    })
  };