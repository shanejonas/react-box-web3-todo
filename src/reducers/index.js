import { WEB3_CONNECTED, JOB_ADDED, JOBS_CONTRACT_INSTANTIATED, JOBS_FETCHED, defaultState } from '../actions';

const jobs = (state = defaultState, action) => {
  switch (action.type) {
  case WEB3_CONNECTED:
    return {
      ...state,
      web3: action.payload
    };
  case JOBS_CONTRACT_INSTANTIATED:
    return {
      ...state,
      jobsContract: action.payload
    };
  case JOBS_FETCHED:
    return {
      ...state,
      jobs: action.payload
    };
  case JOB_ADDED:
    return {
      ...state,
      jobs: [
        ...state.jobs,
        action.payload
      ]
    };
  default:
    return state
  }
};

export default jobs;