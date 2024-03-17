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
  mutation Mutation($name: String, $email: String, $profileImage: String) {
    createUser(name: $name, email: $email, profileImage: $profileImage) {
      id
      name
      email
      profileImage
      createdAt
      updatedAt
    }
  }
`;

export const ADD_FOLLOWER = gql`
  mutation Mutation($userId: String, $follower: Int, $followingUserId: String) {
    addFollower(
      userId: $userId
      follower: $follower
      followingUserId: $followingUserId
    ) {
      id
      userId
      follower
      followingUserId
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
