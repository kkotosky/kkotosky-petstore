import { LOADING_STATES } from '../../globals/globals';

import { 
  COMPLETE_PET_CREATION, 
  FAILED_PET_CREATION, 
  START_PET_CREATION
} from '../actions/create-actions';

const initialStateCreation = {
  name: '',
  tag: '',
  creationProcessState: LOADING_STATES.notStarted,
  error: ''
};

export const petCreation = (state = initialStateCreation, action) => {
  switch (action.type) {
    case COMPLETE_PET_CREATION:
      return Object.assign({}, {
        ...state,
        name: initialStateCreation.name,
        tag: initialStateCreation.tag,
        creationProcessState: LOADING_STATES.completed,
        error: ''
      });
    case FAILED_PET_CREATION:
      return {
        ...state,
        creationProcessState: LOADING_STATES.failed,
        error: action.error
      }
    case START_PET_CREATION:
        return {
          ...state,
          creationProcessState: LOADING_STATES.loading,
          tag: action.tag,
          name: action.name
        }
      case 'clearNameAndTag':
        return {
          ...state,
          tag: '',
          name: ''
        }
    default:
      return state
  }
};