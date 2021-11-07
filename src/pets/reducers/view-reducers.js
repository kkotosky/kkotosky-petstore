import { LOADING_STATES } from '../../globals/globals';
import { 
  REQUEST_PETS, 
  GET_PETS, 
  GET_NEXT_PETS,
  FAILED_PET_FETCH
} from '../actions/view-actions';

const initialState = {
  pets: [],
  loadingPetsState: LOADING_STATES.loading,
  hasNext: true
};

export const petHandling = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_PETS:
      return {
        ...state,
        loadingPetsState: LOADING_STATES.loading
      }
    case GET_PETS:
      return Object.assign({}, {
        ...state,
        loadingPetsState: LOADING_STATES.completed,
        pets: action.pets,
        hasNext: !(action.pets.length < 100)
      });
    case GET_NEXT_PETS:
        return Object.assign({}, {
          ...state,
          loadingPetsState: LOADING_STATES.completed,
          pets: state.pets.concat(action.newPets),
          hasNext: !(action.newPets.length < 100)
        });
    case FAILED_PET_FETCH:
      return {
        ...state,
        loadingPetsState: LOADING_STATES.failed
      }
    default:
      return state
  }
};