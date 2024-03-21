export interface AddBlogModel {
  category: string;
  title: string;
  content: string;
  imageUrl: string;
  userId: string;
}

export interface BlogModel {
  id: string;
  title: string;
  content: string;
  userId: string;
  imageUrl: string;
  category: string;
  comments: Comment[];
  likes: Like[];
  tags: Tag[];
  createdAt: string;
  updatedAt: string;
  shortDescription?: string;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  userId: string;
  blogId: string;
}

export interface Like {
  id: string;
  like: number;
  blogId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Tag {
  id: string;
  name: string;
  blogId: string;
}
