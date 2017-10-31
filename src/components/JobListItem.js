import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import './JobListItem.css';

const JobListItem = ({ onClick, title, company, body, contact, link }) => (
  <Card onClick={onClick} className="card-list-item">
      <CardHeader
        title={title}
        subtitle={company}
        avatar="https://pbs.twimg.com/profile_images/909583239823716353/VWMYddky_400x400.jpg"
        actAsExpander={true}
        showExpandableButton={true}
      />
      <CardText expandable={true}>
        <p>
          {body}
        </p>
        <FlatButton label="Contact" />
        <FlatButton label="Link" />
      </CardText>
    </Card>
);

JobListItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  contact: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default JobListItem;