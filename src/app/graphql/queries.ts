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

export const GET_USER_BY_EMAIL = gql`
  query Query($email: String) {
    getUserByEmail(email: $email) {
      id
      name
      email
      followers {
        id
        follower
        userId
        createdAt
        updatedAt
      }
      blogs {
        id
        title
        userId
        category
        imageUrl
        likes {
          id
          like
          blogId
          createdAt
          updatedAt
        }
        tags {
          id
          tag
          blogId
          createdAt
          updatedAt
        }
        content
        comments {
          id
          comment
          blogId
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query Query($userId: ID!) {
    user(id: $userId) {
      id
      name
      email
      followers {
        id
        follower
        userId
        createdAt
        updatedAt
      }
      blogs {
        id
        title
        userId
        category
        imageUrl
        likes {
          id
          like
          blogId
          createdAt
          updatedAt
        }
        tags {
          id
          tag
          blogId
          createdAt
          updatedAt
        }
        content
        comments {
          id
          comment
          blogId
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
    }
  }
`;
