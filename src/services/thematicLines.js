import axios from 'axios';
import { BASE_URL } from 'globals.constans';

export const allThematicLinesService = async () => {
    return await new Promise( async (resolve, reject) => {
        await axios.get(`${BASE_URL}thematiclines`).then((response) => {
            resolve(response.data)
        }).catch((error) => {
            resolve(error.response.data)
        })          
    })
};

export const getThematicLineservice = async (id) => {
    return await new Promise( async (resolve, reject) => {
        await axios.get(`${BASE_URL}thematiclines/${id}`).then((response) => {
            resolve(response.data)
            console.log(response.data);
        }).catch((error) => {
            resolve(error.response.data)
        })          
    })
  };