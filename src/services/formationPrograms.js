import axios from 'axios';
import { BASE_URL } from 'globals.constans';

export const allFormationProgramsService = async () => {
    return await new Promise( async (resolve, reject) => {
        await axios.get(`${BASE_URL}formationprograms`).then((response) => {
            resolve(response.data)
        }).catch((error) => {
            resolve(error.response.data)
        })          
    })
};

export const getFormationProgramService = async (id) => {
    return await new Promise( async (resolve, reject) => {
        await axios.get(`${BASE_URL}formationprograms/${id}`).then((response) => {
            resolve(response.data)
        }).catch((error) => {
            resolve(error.response.data)
        })          
    })
  };

  export const registerFormationProgramService = async (body) => {
    return await new Promise( async (resolve, reject) => {
        await axios.post(`${BASE_URL}formationprograms`, body).then((response) => {
            resolve(response.data)
        }).catch((error) => {
            resolve(error.response.data)
        })          
    })
  };

  export const updateFormationProgramService = async (id, body) => {
    return await new Promise( async (resolve, reject) => {
        await axios.put(`${BASE_URL}formationprograms/${id}`, body).then((response) => {
            resolve(response.data)
        }).catch((error) => {
            resolve(error.response.data)
        })          
    })
  };

  export const deleteFormationProgramService = async (id) => {
    return await new Promise( async (resolve, reject) => {
        await axios.delete(`${BASE_URL}formationprograms/${id}`).then((response) => {
            resolve(response.data)
        }).catch((error) => {
            resolve(error.response.data)
        })          
    })
  };


  export const assignCompetencesService = async (id, competences) => {
    return await new Promise( async (resolve, reject) => {
        await axios.post(`${BASE_URL}formationprograms/assign/${id}`, competences).then((response) => {
            resolve(response.data)
        }).catch((error) => {
            resolve(error.response.data)
        })          
    })
  };

  export const deallocateCompetencesService = async (id, competence) => {
    return await new Promise( async (resolve, reject) => {
        await axios.post(`${BASE_URL}/formationprograms/deallocate/${id}`, competence).then((response) => {
            resolve(response.data)
        }).catch((error) => {
            resolve(error.response.data)
        })          
    })
  };
  