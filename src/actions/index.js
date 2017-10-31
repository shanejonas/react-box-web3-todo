import Web3 from 'web3';
import contract from 'truffle-contract';
import JobsContract from '../../build/contracts/JobsD.json';

export const WEB3_CONNECTED = 'WEB3_CONNECTED';
export const WEB3_DISCONNECTED = 'WEB3_DISCONNECTED';
export const JOBS_CONTRACT_INSTANTIATED = 'JOBS_CONTRACT_INSTANTIATED';
export const JOBS_FETCHED = 'JOBS_FETCHED';
export const JOB_ADDED = 'JOB_ADDED';

export const defaultState = {
  web3: null,
  jobs: []
};

export function web3connect() {
  return (dispatch) => {
    const web3 = window.web3;

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider.
      dispatch({
        type: WEB3_CONNECTED,
        payload: new Web3(web3.currentProvider)
      });
    } else {
      dispatch({
        type: WEB3_CONNECTED,
        payload: new Web3(new Web3.providers.HttpProvider('http://localhost:9545'))
      });
    }
  };
}

export function instantiateJobContract() {
  return (dispatch, getState) => {
    const web3 = getState().web3;
    const jobs = contract(JobsContract);
    jobs.setProvider(web3.currentProvider);
    return jobs.deployed().then((jobsContract) => {
      dispatch({
        type: JOBS_CONTRACT_INSTANTIATED,
        payload: jobsContract
      });
    });
  };
}

export function fetchJobs() {
  return (dispatch, getState) => {
    const state = getState();
    const web3 = state.web3;
    const jobsContract = state.jobsContract;
    jobsContract.getJobs().then((jobs) => {
      const FIELD_TITLE  = 0;
      const FIELD_COMPANY = 1;
      const FIELD_BODY  = 2;
      const FIELD_LINK = 3;
      const FIELD_CONTACT = 4;
      const numJobs = jobs[0].length;

      let jobStructs = [];
      for (let i = 0; i < numJobs; i++) {
        const job = {
          title: web3.toAscii(jobs[FIELD_TITLE][i]),
          company:  web3.toAscii(jobs[FIELD_COMPANY][i]),
          body:  web3.toAscii(jobs[FIELD_BODY][i]),
          link:  web3.toAscii(jobs[FIELD_LINK][i]),
          contact:  web3.toAscii(jobs[FIELD_CONTACT][i])
        };
        jobStructs.push(job);
      };
      dispatch({
        type: JOBS_FETCHED,
        payload: jobStructs
      });
    });
  };
}

export function addJob(title, company, body, link, contact) {
  return (dispatch, getState) => {
    const web3 = getState().web3;
    const jobsContract = getState().jobsContract;
    web3.eth.getAccounts((err, accounts) => {
      jobsContract.addJob(web3.fromAscii(title), web3.fromAscii(company), web3.fromAscii(body), web3.fromAscii(link), web3.fromAscii(contact), {
        gas: 1000000,
        value: 1e10,
        from: accounts[0]
      }).then((results) => {
        dispatch({
          type: JOB_ADDED,
          payload: {
            title,
            company,
            body,
            link,
            contact
          }
        });
      });
    });
  };
}