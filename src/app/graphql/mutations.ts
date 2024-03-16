import { gql } from 'apollo-angular';

export const CREATE_BLOG = gql`
  mutation CreateBlog(
    $category: Category
    $title: String
    $content: String
    $imageUrl: String
    $userId: String
  ) {
    createBlog(
      category: $category
      title: $title
      content: $content
      imageUrl: $imageUrl
      userId: $userId
    ) {
      id
      category
      title
      content
      imageUrl
      userId
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_USER = gql`
  mutation Mutation($name: String, $email: String) {
    createUser(name: $name, email: $email) {
      id
      name
      email
      profileImage
      updatedAt
      createdAt
    }
  }
`;

export const ADD_FOLLOWER = gql`
  mutation Mutation($userId: String, $follower: Int) {
    addFollower(userId: $userId, follower: $follower) {
      id
      follower
      userId
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_FOLLOWER = gql`
  mutation Mutation($deleteFollowerId: ID!) {
    deleteFollower(id: $deleteFollowerId) {
      id
      follower
      userId
      createdAt
      updatedAt
    }
  }
`;
