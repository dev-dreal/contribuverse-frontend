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
      updatedAt
      createdAt
    }
  }
`;
