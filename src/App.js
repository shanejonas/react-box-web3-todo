import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import contract from 'truffle-contract';
import { web3connect, fetchJobs, addJob, instantiateJobContract} from './actions';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';

import './css/oswald.css';
import './css/open-sans.css';
import './App.css';
import JobList from './components/JobList';

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See actions/index.js => web3connect for more info.
    window.addEventListener('load', () => {
      this.props.web3connect();
      this.props.instantiateJobContract().then(() => {
        this.props.fetchJobs();
      });
    });
  }
  renderJobs(jobs) {
    return (
      <JobList jobs={jobs} onJobClick={() => console.log('clicked')}/>
    )
  }
  addNewJob() {
    this.props.addJob(
      this.state.title,
      this.state.company,
      this.state.body,
      this.state.contact,
      this.state.link
    )
  }
  onTitleChange(event, title) {
    this.setState({title});
  }
  onCompanyChange(event, company) {
    this.setState({company});
  }
  onBodyChange(event, body) {
    this.setState({body});
  }
  onContactChange(event, contact) {
    this.setState({contact});
  }
  onLinkChange(event, link) {
    this.setState({link});
  }
  render() {
    if (!this.props.web3) {
      return (
        <div> Loading web3 </div>
      );
    }

    if (!this.props.jobs) {
      return (
        <div> no jobs </div>
      );
    }
    return (
      <div className="App">
        <AppBar
            title="Cryptocurrency Careers"
          />
        <main className="container">
          <TextField underlineStyle={{backgroundColor: 'black'}} floatingLabelText="Title" onChange={this.onTitleChange.bind(this)} />
          <br />
          <TextField floatingLabelText="Company" onChange={this.onCompanyChange.bind(this)} />
          <br />
          <TextField floatingLabelText="Body" multiline={true} onChange={this.onBodyChange.bind(this)} />
          <br />
          <TextField floatingLabelText="Contact" onChange={this.onContactChange.bind(this)} />
          <br />
          <TextField floatingLabelText="Link" onChange={this.onLinkChange.bind(this)} />
          <br />
          <RaisedButton onClick={this.addNewJob.bind(this)} label="Add Job" primary={true}/>
          <br />
        </main>
        <Divider />
        <div>
          {this.renderJobs(this.props.jobs)}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  web3connect,
  instantiateJobContract,
  fetchJobs,
  addJob
};

const mapStateToProps = (state) => ({
  web3: state.web3,
  jobs: state.jobs
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
