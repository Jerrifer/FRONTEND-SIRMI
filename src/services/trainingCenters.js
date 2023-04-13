import axios from 'axios';
import { BASE_URL } from 'globals.constans';

export const allTrainingCentersService = async () => {
    return await new Promise( async (resolve, reject) => {
        await axios.get(`${BASE_URL}trainingcenters`).then((response) => {
            resolve(response.data)
        }).catch((error) => {
            resolve(error.response.data)
        })          
    })
};

export const getTrainingCenterService = async (id) => {
    return await new Promise( async (resolve, reject) => {
        await axios.get(`${BASE_URL}trainingcenters/${id}`).then((response) => {
            resolve(response.data)
            console.log(response.data);
        }).catch((error) => {
            resolve(error.response.data)
        })          
    })
  };
