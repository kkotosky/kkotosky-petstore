import axios from 'axios';

export const COMPLETE_PET_CREATION = 'COMPLETE_PET_CREATION';
export const FAILED_PET_CREATION = 'FAILED_PET_CREATION';
export const START_PET_CREATION = 'START_PET_CREATION';

export const completedPetCreation = (state) => ({
  type: COMPLETE_PET_CREATION,
  state
});

export const failedPetCreation = (state, error) => ({
  type: FAILED_PET_CREATION,
  state,
  error
});

export const clearNameAndTag = (state, error) => ({
  type: 'clearNameAndTag',
  state
});

export const startPetCreation = (state) => ({
  type: START_PET_CREATION,
  state,
  name: state.name,
  tag: state.tag
});

export const createPet = state => dispatch => {
  dispatch(startPetCreation(state));
  return axios.post(`/pets`, {
    name: state.name,
    tag: state.tag
  }).then(response => response.data)
  .then(pets => dispatch(completedPetCreation(state)))
  .catch(error => dispatch(failedPetCreation(state, error)))
};
