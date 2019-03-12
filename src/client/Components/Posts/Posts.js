import { countReviewers } from '../utils/utils';
import React, { Component, Fragment } from 'react';
import PostsContainer from '../Containers/PostsContainer';
import Spinner from '../Spinner/Spinner';
import Header from '../Header/Header';
import Modal from '../Modals/Modal';
import NewPost from '../NewPost/NewPost';
import PropTypes from 'prop-types';
import './Posts.css';

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchOnProgress: false,
      displayModal: false
    };
    
    this.toggleModal = this.toggleModal.bind(this);
    this.displayPosts = this.displayPosts.bind(this);
    this.handleNewPostSubmit = this.handleNewPostSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { fetchOnProgress } = this.state;
    const prevParams = this.props.match.params;
    const nextParams = nextProps.match.params;

    if (!_.isEqual(prevParams, nextParams) && !fetchOnProgress) {
      const { onPostsComponentMount } = this.props;
      const boundFetchFunc = onPostsComponentMount.bind(this);

      return this.setState(prevState => {
        return {          
          fetchOnProgress: !prevState.fetchOnProgress
        };
      }, boundFetchFunc);
    }
  }

  componentDidMount() {
    const { onPostsComponentMount } = this.props;
    const boundFetchFunc = onPostsComponentMount.bind(this);

    this.setState(prevState => {
      return {
        fetchOnProgress: !prevState.fetchOnProgress
      };
    }, boundFetchFunc);
  }

  handleNewPostSubmit(data) {
    const { createNewPost } = this.props;
    const boundFetchFunc = createNewPost.bind(this, data);

    this.setState(prevState => {
      return {
        fetchOnProgress: !prevState.fetchOnProgress
      };
    }, boundFetchFunc);
  }

  displayPosts() {
    const { posts } = this.props;

    return posts.map((post, i) => {
      const { postedBy, created_at, title, description, reviewers, stacks } = post;
     const participants = countReviewers(reviewers);

      return (
        <div className="publicPostContainer" key={i}>
          <div className="publicPostCover">
            <div className="postBy">
              <div className="authorProfileCover">
                <img className="authorProfileImage" src={postedBy.profileImage || './public/default_profile.png'} alt="" />
              </div>
              <div className="postDateInfo">
                <div className="author">{postedBy.name}</div>
                <div className="created_at">{created_at}</div>
              </div>
            </div>
            <div className="postTitle">{title}</div>
            <p className="postDescription">{description}</p>
            <div className="reviewerState">{participants}</div>
          </div>
          <div className="postReviewInfo">
            <div className="stackTags">{stacks.map(({ name })=> name).join(' ')}</div>
          </div>
          <div className="reviewBtnCover">
            <button className="reviewStartBtn">Review Start</button>
          </div>
        </div>
      );
    });
  }

  toggleModal() {
    this.setState(prevState => {
      return {
        displayModal: !prevState.displayModal
      };
    });
  }

  render() {
    const { posts, loginUser } = this.props;
    const { fetchOnProgress, displayModal } = this.state;
    const profileUrl = loginUser ? loginUser.profile_image : './public/user_default.jpg';

    return (
      <Fragment>
        <Header history={this.props.history} />
        <Spinner color="#f5474b" loading={fetchOnProgress} />
        {displayModal &&
        (<Modal closeModal={this.toggleModal}>
          <NewPost userImage={profileUrl} onSubmit={this.handleNewPostSubmit}/>
        </Modal>)}
        <div className="dump"></div>
        <div className="wrapper">
          <div className="newPostContainer" onClick={this.toggleModal}>
            <div className="header">
              <span>Create Review Post</span>
            </div>
            <div className="postInfoContainer">
              <div className="profileCover">
                <img className="profileImage" src={profileUrl} alt="" />
              </div>
              <div className="message">
                <span>What is the matter with your code?</span>
              </div>
            </div>
          </div>
          <div className="postsWrapper">
            {posts.length > 0 && this.displayPosts()}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default PostsContainer(Posts);
