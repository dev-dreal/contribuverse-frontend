import { BlogModel } from './blog.model';

export interface CreateUserModel {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  blogs: BlogModel[];
  followers: Follower[];
}
export interface Follower {
  id: string;
  follower: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserInterface {
  email: string;
  username: string;
}
