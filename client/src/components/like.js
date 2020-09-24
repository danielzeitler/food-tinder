import React, { Component } from "react";
import styled from "styled-components";

const LikesCount = styled.span`
  margin-left: 10px;
`;

class Like extends Component {
  render() {
    let classes = "fa fa-heart";
    if (!this.props.liked) classes += "-o";

    return (
      <div>
        <i
          onClick={
            !this.props.liked ? this.props.onLikeToggle : this.props.deleteLike
          }
          className={classes}
          aria-hidden="true"
          style={{ cursor: "pointer " }}
        />
        <LikesCount>
          {this.props.count} {this.props.count === 1 ? "Like" : "Likes"}
        </LikesCount>
      </div>
    );
  }
}

export default Like;
