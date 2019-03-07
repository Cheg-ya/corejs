import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Posts.css';
import axios from 'axios';
import Header from '../Header/Header';

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayModal: false
    };
  }

  componentDidMount() {
    const { posts, onPostsComponentMount } = this.props;

    if (posts.length) {
      onPostsComponentMount();
    }
  }

  render() {
    return (
      <Fragment>
        <Header history={this.props.history} />
        <div className="postsContainer">
          <div className="postsCover">
          123
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapState = state => {
  const posts = state.posts;

  return {
    posts
  };
};

const mapDispatch = dispatch => {
  return {
    onPostsComponentMount() {
      axios.get('/api/posts').then(result => {
        debugger;
        dispatch()
      }).catch(err => alert(err.message));
    }
  }
};

export default connect(mapState, mapDispatch)(Posts);
