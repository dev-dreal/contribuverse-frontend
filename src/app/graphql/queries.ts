import { gql } from 'apollo-angular';

export const GET_BLOGS = gql`
  query Blogs {
    blogs {
      id
      title
      content
      imageUrl
      category
      userId
      createdAt
      updatedAt
      likes {
        id
        like
        blogId
      }
      tags {
        id
        tag
        blogId
      }
      comments {
        id
        comment
        blogId
      }
    }
  }
`;

export const GET_BLOG = gql`
  query Blog($id: ID!) {
    blog(id: $id) {
      id
      title
      content
      imageUrl
      category
      userId
      createdAt
      updatedAt
      likes {
        id
        like
        blogId
      }
      tags {
        id
        tag
        blogId
      }
      comments {
        id
        comment
        blogId
      }
    }
  }
`;

export const GET_USER_ID_BY_EMAIL = gql`
  query Query($email: String) {
    getUserByEmail(email: $email) {
      id
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query Query($userId: ID!) {
    user(id: $userId) {
      name
      email
      blogs {
        title
      }
      followers {
        id
        follower
        userId
      }
    }
  }
`;
