import { Fragment } from 'react';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import Avatar from '@material-ui/core/Avatar';
import { GRAPHCOOL_TOKEN } from '../../constants';

const avatar = (
  <Avatar>
    <AccountCircle />
  </Avatar>
);

const logout = () => {
  localStorage.removeItem(GRAPHCOOL_TOKEN);
  window.location.reload();
};

export default ({ label }) => (
  <Fragment>
    <Chip label={label} color="primary" deleteIcon={<DoneIcon />} avatar={avatar} />
    <Button color="inherit" onClick={logout}>
      Logout
    </Button>
  </Fragment>
);
