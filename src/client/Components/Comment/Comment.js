import React, { Component } from 'react';
import './Comment.css';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ''
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnChange(e) {
    const context = e.target.value;

    this.setState(() => {
      return {
        comment: context
      };
    });
  }

  handleOnSubmit(e) {
    e.preventDefault();

    const { comment } = this.state;
    
    if (!comment.length) {
      return alert('Please type the comment');
    }

    this.props.addComment(comment);
  }

  render() {
    const { name, profile_image } = this.props.user;

    return (
      <form className="commentContainer">
        <div className="commentCover">
          <div className="commentHeader">
            <div className="profileCover">
              <img className="profileImg" src={profile_image} alt="" />
            </div>
            <div className="nameCover">
              <span>{name}</span>
            </div>
          </div>
          <div className="inputField">
            <div>Description</div>
            <textarea className="commentInput" value={this.state.comment} onChange={this.handleOnChange} />
          </div>
        </div>
        <div className="commentBtnCover">
          <button className="commentBtn" type="submit" onClick={this.handleOnSubmit}>Comment</button>
        </div>
      </form>
    );
  }
}

export default Comment;
