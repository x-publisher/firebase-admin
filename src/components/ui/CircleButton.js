import React from 'react';
// Material UI
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

const CircleButton = props => (
  <Button
    {...props}
    variant="fab"
    color="primary"
  >
    <AddIcon />
  </Button>
);

export default CircleButton;
