import { BlogModel } from './blog.model';

export interface UserModel {
  id: string;
  name: string;
  email: string;
  blogs: BlogModel[];
  followers: Follower[];
  createdAt: string;
  updatedAt: string;
}

export interface Follower {
  id: string;
  follower: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserInterface {
  id: string;
  email: string;
  username: string;
  profileImgUrl: string;
  blogs?: BlogModel[];
  followers?: Follower[];
  createdAt?: string;
  updatedAt?: string;
}
