import { Component, Fragment } from 'react';
import { graphql, compose } from 'react-apollo';
import List, { ListItem, ListItemText, ListItemMeta } from '@material/react-list';
import CircularProgress from '@material-ui/core/CircularProgress';
import Checkbox from '@material-ui/core/Checkbox';
import withUser from '../../lib/with-user';
import allBooksQuery from './allBooksQuery.gql';
import upsertLikeMutation from './upsertLikeMutation.gql';
import { withStyles } from '@material-ui/core/styles';
import NoSsr from '@material-ui/core/NoSsr';

import '@material/react-list/index.scss';

const styles = {
  hidden: {
    visibility: 'hidden'
  }
};

class Books extends Component {
  handleLike = (book, userLike) => async evt => {
    const userId = this.props.user.id;
    const bookId = book.id;
    const liked = evt.target.checked;
    const id = userLike ? userLike.id : 'whatever';
    await this.props.upsertLike({ variables: { id, bookId, userId, liked } });
    this.props.books.refetch();
  };

  render() {
    const {
      classes,
      user,
      books: { error, loading, allBooks }
    } = this.props;
    const authenticated = !!user.id;

    if (error) return <div>{error}</div>;

    return (
      <Fragment>
        <NoSsr>
          <CircularProgress className={loading ? classes.root : classes.hidden} />
        </NoSsr>
        <List twoLine>
          {allBooks.map(book => {
            let toggleLike = [];
            if (authenticated) {
              const userLike = book.likes.find(like => like.user && like.user.id === user.id);
              const checked = userLike && userLike.liked;
              toggleLike = (
                <ListItemMeta meta="info">
                  <Checkbox checked={checked} onChange={this.handleLike(book, userLike)} />
                </ListItemMeta>
              );
            }
            return (
              <ListItem key={book.id}>
                <ListItemText
                  primaryText={`${book.title} (likes: ${book._likesMeta.count})`}
                  secondaryText={book.author.name}
                />
                {toggleLike}
              </ListItem>
            );
          })}
        </List>
      </Fragment>
    );
  }
}

export default compose(
  withStyles(styles),
  withUser,
  graphql(allBooksQuery, { name: 'books' }),
  graphql(upsertLikeMutation, { name: 'upsertLike' })
)(Books);
