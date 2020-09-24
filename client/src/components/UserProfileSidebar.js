import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import { toast } from "react-toastify";
import Input from "./styles/Input";
import auth from "../service/Auth";
import axios from "axios";
import apiService from "../service/apiService";
import FormErrorMessage from "./styles/FormErrorMessage";
import ProgressBar from "./styles/ProgressBar";
import SmallText from "./styles/SmallText";

const animateButton = keyframes`
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
`;

const UserDataWrapper = styled.div`
  animation: ${animateButton} 0.4s ease;
`;

const CenterText = styled.div`
  text-align: center;
  margin-top: 30px;
`;

const WhiteInputBox = styled.div`
  background-color: white;
  width: 100%;
  padding: 15px 17px;
  border-bottom: 1px solid #e5e8ec;

  :nth-child(1) {
    border-top: 1px solid #e5e8ec;
  }
`;

const WhiteButton = styled.button`
  background-color: white;
  width: 100%;
  padding: 22px 17px;
  border-bottom: 1px solid #e5e8ec;
  border-left: none;
  border-right: none;
  border-top: none;
  outline: none;
  transition: all 0.2s ease;
  cursor: pointer;
  margin-top: ${props => props.marginTop || null};

  &:hover {
    color: white;
    background-color: ${props => props.theme.primaryColor};
    transition: all 0.2s ease;
  }
`;

const SectionHeadline = styled.h6`
  color: #fd5068;
  text-transform: uppercase;
  font-weight: 500;
  margin: 25px 0 0 0;
  padding: 0px 17px;
  font-size: 15px;
`;

class UserProfileSidebar extends Component {
  state = {
    userData: {
      id: auth.activeUser.id,
      firstname: auth.activeUser.firstname,
      lastname: auth.activeUser.lastname,
      email: auth.activeUser.email,
      location: auth.activeUser.location
    },
    errors: "",
    selectedFile: null,
    loaded: 0
  };

  handleChange = e => {
    const userData = { ...this.state.userData };
    userData[e.target.name] = e.target.value;
    this.setState({ userData });
  };

  logout = () => {
    auth.signout();
    window.location = "/";
  };

  // Update the user credentials
  handleUserDataUpdate = e => {
    e.preventDefault();
    const data = { ...this.state.userData };

    for (let i in data) {
      if (data[i] === "") {
        return this.setState({ errors: "Fields must be filled out" });
      }
    }

    try {
      const userData = {
        id: this.state.userData.id,
        firstname: this.state.userData.firstname,
        lastname: this.state.userData.lastname,
        email: this.state.userData.email,
        location: this.state.userData.location
      };

      apiService.updateUserData(userData).then(response => {
        auth.activeUser = response.user;
        toast("Profile successfully updated");
        this.setState({ errors: "" });
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({ errors: ex.response.data });
      }
    }
  };

  // Get the image out of the file select
  fileSelectedHandler = event => {
    this.setState({ selectedFile: event.target.files[0], loaded: 0 });
  };

  fileUploadHandler = e => {
    e.preventDefault();
    let fd = new FormData();
    // append the relevant data to the form
    fd.append("userImage", this.state.selectedFile);
    fd.append("userid", this.state.userData.id);

    // if the database file_id equals null then upload an image
    if (this.props.userImage.file_id === null) {
      axios
        .post("http://localhost:5000/api/users/upload", fd, {
          // Display the percentage of the upload
          onUploadProgress: ProgressEvent => {
            this.setState({
              loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100
            });
          }
        })
        .then(response => {
          toast("Image successfully uploaded");
          this.props.getUserImage();
          this.setState({ selectedFile: null });
        });
    } else {
      // if there is already an image then update it
      axios
        .post("http://localhost:5000/api/users/updateimage", fd, {
          onUploadProgress: ProgressEvent => {
            this.setState({
              loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100
            });
          }
        })
        .then(response => {
          toast("Image successfully uploaded");
          this.props.getUserImage();
          this.setState({ selectedFile: null });
        });
    }
  };

  render() {
    return (
      <UserDataWrapper>
        <CenterText>
          <FormErrorMessage>{this.state.errors}</FormErrorMessage>
        </CenterText>
        <SectionHeadline>user data</SectionHeadline>
        <form onSubmit={this.handleUserDataUpdate}>
          <WhiteInputBox>
            <Input
              width={"100%"}
              placeholder="Your Firstname"
              name="firstname"
              onChange={this.handleChange}
              value={this.state.userData.firstname}
            />
          </WhiteInputBox>
          <WhiteInputBox>
            <Input
              width={"100%"}
              placeholder="Your Lastname"
              name="lastname"
              onChange={this.handleChange}
              value={this.state.userData.lastname}
            />
          </WhiteInputBox>
          <WhiteInputBox>
            <Input
              width={"100%"}
              placeholder="Your Email"
              name="email"
              onChange={this.handleChange}
              value={this.state.userData.email}
            />
          </WhiteInputBox>
          <WhiteInputBox>
            <Input
              width={"100%"}
              placeholder="Your Location"
              name="location"
              onChange={this.handleChange}
              value={this.state.userData.location}
            />
          </WhiteInputBox>
          <WhiteButton>Update User Data</WhiteButton>
        </form>

        <SectionHeadline>Upload Profile Picture</SectionHeadline>
        <form onSubmit={this.fileUploadHandler} encType="multipart/form-data">
          <WhiteInputBox>
            <input
              type="file"
              name="userImage"
              defaultValue={this.state.selectedFile || ""}
              onChange={this.fileSelectedHandler}
            />
            <ProgressBar loaded={Math.round(this.state.loaded, 2)} />
            <SmallText color={"#9b9b9b"} margin={"8px 0"}>
              {Math.round(this.state.loaded, 2)} %
            </SmallText>
          </WhiteInputBox>
          <WhiteButton type="submit">Upload</WhiteButton>
        </form>
        <SectionHeadline>Get me outta here</SectionHeadline>
        <WhiteButton onClick={this.logout}>Logout</WhiteButton>
      </UserDataWrapper>
    );
  }
}

export default UserProfileSidebar;
