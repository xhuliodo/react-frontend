import gql from "graphql-tag";

export const GET_POSTS_QUERY = gql`
  {
    getPosts {
      id
      username
      body
      createdAt
      comments {
        id
        createdAt
        username
        body
      }
      likes {
        username
      }
      commentCount
      likeCount
    }
  }
`;

export const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      username
      body
      createdAt
      comments {
        id
        createdAt
        username
        body
      }
      likes {
        username
      }
      commentCount
      likeCount
    }
  }
`;

export const GET_SINGLE_POST = gql`
  query getPost($postId: ID!) {
    getPost(postId: $postId) {
      id
      username
      body
      createdAt
      comments {
        id
        createdAt
        username
        body
      }
      likes {
        username
      }
      commentCount
      likeCount
    }
  }
`;

export const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        username
        id
        createdAt
        body
      }
      commentCount
    }
  }
`;

export const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        body
        createdAt
      }
      commentCount
    }
  }
`;

export const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        username
        id
      }
      likeCount
    }
  }
`;

export const REGISTER_USER_MUTATION = gql`
  mutation registerUser(
    $username: String!
    $password: String!
    $confirmPassword: String!
    $email: String!
  ) {
    register(
      registerInput: {
        username: $username
        password: $password
        confirmPassword: $confirmPassword
        email: $email
      }
    ) {
      id
      email
      token
      username
      createdAt
    }
  }
`;

export const LOGIN_USER_MUTATION = gql`
  mutation loginUser($username: String!, $password: String!) {
    login(loginInput: { username: $username, password: $password }) {
      id
      email
      token
      username
      createdAt
    }
  }
`;
