import { compose } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import withUser from '../../lib/with-user';
import Login from './Login';
import User from './User';

const styles = {
  root: {
    display: 'flex'
  },
  grow: { flexGrow: 1 }
};

const Header = ({ classes, user, title }) => {
  const authenticated = !!user.id;

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" color="inherit" className={classes.grow}>
          {title || 'Books'}
        </Typography>
        {authenticated ? <User label={user.label} /> : <Login />}
      </Toolbar>
    </AppBar>
  );
};

export default compose(
  withUser,
  withStyles(styles)
)(Header);
