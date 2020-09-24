import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Moment from "react-moment";
import styled from "styled-components";
import auth from "../service/Auth";
import apiService from "../service/apiService";
import ButtonGradient from "../components/styles/ButtonGradient";
import Like from "./like";

const CenterContent = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #fff;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
`;

const CenterComment = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
`;

const CommentWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
`;

const Comment = styled.div`
  color: ${props => props.theme.secondaryColor};
  font-size: 16px;
  background-color: ${props => props.theme.backgroundApp};
  margin: 10px 17px;
  padding: 17px;
  border-radius: 20px 20px 20px 0;

  &:last-child {
    margin-bottom: 130px;
  }

  p {
    margin: 0;
    color: ${props => props.theme.black};
    line-height: 1.8;
  }

  h6 {
    font-size: 16px;
    font-weight: 600;
    margin: 0;
    color: ${props => props.theme.black};

    span {
      font-weight: 300;
    }
  }
`;

const EmptyComment = styled.div`
  color: ${props => props.theme.secondaryColor};
  font-size: 16px;
  margin: 10px 17px;
  padding: 17px;

  p {
    margin: 0;
    color: ${props => props.theme.black};
    line-height: 1.8;
  }

  h6 {
    font-size: 16px;
    font-weight: 600;
    margin: 0;
    color: ${props => props.theme.black};

    span {
      font-weight: 300;
    }
  }
`;

const Form = styled.form`
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid ${props => props.theme.borderColor};
  height: 80px;
  padding: 0 17px;
  display: flex;
  align-items: center;
  outline: none;
  background: white;

  input {
    background: white;
    border: none;
    width: 100%;
    padding: 10px 0;

    &:focus {
      outline: 0;
    }
  }
`;

class CommentSection extends Component {
  state = {
    comment: "",
    allComments: [],
    dirty: false,
    like: false
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.dirty !== this.state.dirty) {
      this.getAllComments();
    }

    if (prevProps.activeRestaurantId !== this.props.activeRestaurantId) {
      this.getAllComments();
    }
  }

  handleChange = e => {
    this.setState({ comment: e.target.value });
  };

  // get all submitted comments for a particular restaurant
  getAllComments = () => {
    let yelp_id = this.props.activeRestaurantId;

    if (yelp_id) {
      apiService
        .getAllCommentsById(yelp_id, auth.activeUser.id)
        .then(response =>
          this.setState({ allComments: response, dirty: false })
        );
    } else {
      this.setState({ allComments: [], dirty: false });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const data = {
      comment: this.state.comment,
      user_id: auth.activeUser.id,
      yelp_id: this.props.activeRestaurantId
    };

    apiService
      .addComment(data)
      .then(response => this.setState({ comment: "", dirty: true }))
      .catch(err => console.log(err));
  };

  addLike = comment => {
    apiService
      .addLike(comment.id, auth.activeUser.id)
      .then(response => this.getAllComments());
  };

  deleteLike = comment => {
    apiService
      .deleteLike(comment.id, comment.user_id)
      .then(response => this.getAllComments())
      .catch(err => console.log(err));
  };

  render() {
    if (
      this.state.allComments.length === 0 ||
      this.props.activeRestaurantId === null
    ) {
      return (
        <CenterComment>
          <EmptyComment>
            {this.props.activeRestaurantId === null
              ? "Please pick a new restaurant"
              : "No one submitted a review yet. Be the first one!"}
          </EmptyComment>
          <CommentWrapper>
            <Form onSubmit={this.handleSubmit}>
              <input
                type="text"
                name="comment"
                onChange={this.handleChange}
                value={this.state.comment}
              />
              <ButtonGradient height={"50px"}>Send</ButtonGradient>
            </Form>
          </CommentWrapper>
        </CenterComment>
      );
    }

    // Variable that renders all Comments from state
    let comments = this.state.allComments.map(comment => (
      <Comment key={comment.id}>
        <h6>
          {comment.firstname} {comment.lastname} •{" "}
          <span>
            <Moment format="DD/MM/YYYY">{comment.timestamp}</Moment>
          </span>
        </h6>
        <p>{comment.comment_content}</p>
        <Like
          liked={comment.user_has_liked}
          count={comment.count}
          deleteLike={() => this.deleteLike(comment)}
          onLikeToggle={() => this.addLike(comment)}
        />
      </Comment>
    ));

    return (
      <CenterContent>
        <CommentWrapper>{comments}</CommentWrapper>
        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="comment"
            onChange={this.handleChange}
            value={this.state.comment}
          />
          <ButtonGradient height={"50px"}>Send</ButtonGradient>
        </Form>
      </CenterContent>
    );
  }
}

export default withRouter(CommentSection);
