import request from "./request";

function get(url) {
  return request({
    url: url,
    method: "GET"
  });
}

function post(url, data) {
  return request({
    url: url,
    method: "POST",
    data: {
      data: data
    }
  });
}

function login(user) {
  return request({
    url: "auth/login",
    method: "POST",
    data: {
      user: user
    }
  });
}

function register(user) {
  return request({
    url: "/users/register",
    method: "POST",
    data: {
      user: user
    }
  });
}

function checkToken(token) {
  return request({
    url: "/users/checktoken",
    method: "POST",
    data: {
      token: token
    }
  });
}

function likedPosts(data) {
  return request({
    url: "/users/likedposts",
    method: "POST",
    data: {
      data: data
    }
  });
}

function getYelpData(data) {
  return request({
    url: "users/yelpdata",
    method: "POST",
    data: {
      data: data
    }
  });
}

function getRestaurantById(id) {
  return request({
    url: "yelp/getrestaurantbyid",
    method: "POST",
    data: {
      id: id
    }
  });
}

function sendRestaurantToPhone(restaurantData, userNumber) {
  return request({
    url: "twilio/sendMessage",
    method: "POST",
    data: {
      restaurantData: restaurantData,
      userNumber: userNumber
    }
  });
}

function getRestaurants(offset, location) {
  return request({
    url: "/yelp/",
    method: "POST",
    data: {
      offset: offset,
      location: location
    }
  });
}

function deleteRestaurantById(yelpId) {
  return request({
    url: "users/deleterestaurant",
    method: "POST",
    data: {
      yelpId: yelpId
    }
  });
}

function addComment(comment) {
  return request({
    url: "comments/addcomment",
    method: "POST",
    data: {
      comment: comment
    }
  });
}

function getAllCommentsById(yelpId, userId) {
  return request({
    url: "comments/getcomments",
    method: "POST",
    data: {
      yelpId: yelpId,
      userId: userId
    }
  });
}

function addLike(commentId, userId) {
  return request({
    url: "likes/addlike",
    method: "POST",
    data: {
      commentId: commentId,
      userId: userId
    }
  });
}

function countLikes() {
  return request({
    url: "likes/countlikes",
    method: "POST"
  });
}

function deleteLike(commentId, userId) {
  return request({
    url: "likes/deletelike",
    method: "POST",
    data: {
      commentId: commentId,
      userId: userId
    }
  });
}

function updateUserData(userData) {
  return request({
    url: "users/updateuser",
    method: "POST",
    data: {
      userData: userData
    }
  });
}

function uploadImage(id) {
  return request({
    method: "post",
    url: "users/upload",
    data: {
      id: id
    }
  });
}

function getUserImage(id) {
  return request({
    method: "POST",
    url: "users/userimg",
    data: {
      id: id
    }
  });
}

const apiService = {
  get,
  login,
  register,
  checkToken,
  likedPosts,
  getYelpData,
  getRestaurantById,
  deleteRestaurantById,
  addComment,
  getAllCommentsById,
  addLike,
  countLikes,
  deleteLike,
  updateUserData,
  getRestaurants,
  uploadImage,
  post,
  getUserImage,
  sendRestaurantToPhone
};

export default apiService;
