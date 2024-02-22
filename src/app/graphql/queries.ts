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