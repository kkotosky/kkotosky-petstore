import axios from 'axios';

export const REQUEST_PETS = 'REQUEST_PETS';
export const FAILED_PET_FETCH = 'FAILED_PET_FETCH';
export const GET_PETS = 'GET_PETS';
export const GET_NEXT_PETS = 'GET_NEXT_PETS';

export const requestPets = state => ({
  type: REQUEST_PETS,
  state
});

export const failedPetsFetch = (state, pets) => ({
  type: FAILED_PET_FETCH,
  state
});

export const receivedPets = (state, pets) => ({
  type: GET_PETS,
  state,
  pets
});

export const receivedNextPets = (state, newPets) => ({
  type: GET_NEXT_PETS,
  state,
  newPets
});

export const fetchPets = state => dispatch => {
  dispatch(requestPets(state));
  return axios.get(`/pets?limit=100`)
    .then(response => response.data)
    .then(pets => dispatch(receivedPets(state, pets)))
    .catch(error => dispatch(failedPetsFetch(state, error)))
};

export const fetchNextPets = state => dispatch => {
  dispatch(requestPets(state));
  return axios.get(`/pets?limit=100&page=${state}`)
    .then(response => response.data)
    .then(pets => dispatch(receivedNextPets(state, pets)))
    .catch(error => dispatch(failedPetsFetch(state, error)))
};