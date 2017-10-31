import React from 'react';
import PropTypes from 'prop-types';
import JobListItem from './JobListItem';

const JobList = ({ jobs, onJobClick }) => (
    <ul>
    {jobs.map((job, i) => (
        <JobListItem key={i} {...job} onClick={() => onJobClick(job, i)} />
    ))}
  </ul>
);

JobList.propTypes = {
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      company: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      contact: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onJobClick: PropTypes.func.isRequired
};

export default JobList;