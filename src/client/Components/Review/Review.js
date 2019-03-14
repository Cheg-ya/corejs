import React, { Component } from 'react';
import Header from '../Header/Header';
import ReviewContainer from '../Containers/ReviewContainer';
import './Review.css';

class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetchOnProgress: false,
      displayModal: false
    };
  }

  componentDidMount() {
    const { onReviewDidMount, post } = this.props;
    const boundFetchFunc = onReviewDidMount.bind(this);

    if (!post.length) {
      this.setState(prevState => {
        return {
          fetchOnProgress: !prevState.fetchOnProgress,
          displayModal: !prevState.displayModal
        };
      }, boundFetchFunc);
    }
  }

  render() {
    console.log(this.props.post);
    return (
      <div className="reviewWrapper linenums:1">
        <Header history={this.props.history} />
        <pre className="prettyprint lang-js">
          {this.props.post[0] && this.props.post[0].code[0].code}
        </pre>
      </div>
    );
  }
}

export default ReviewContainer(Review);
