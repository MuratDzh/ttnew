import { Profile } from "./profile.interface";

export interface Post {
  title: string;
  content: string;
  authorId: number;
  communityId?: number;
}

export interface PostRes {
  id: number;
  title: string;
  communityId: number;
  content: string;
  author: Profile;
  images: string[];
  createdAt: string;
  updatedAt: string;
  likes: number;
  comments: CommentsRes[];
}

export interface CommentUpdate {
  text: string
  commentId: number
}

export interface CommentInt{
    text: string,
    authorId: number,
    postId: number,
    commentId: number
}

export interface CommentsRes {
    id: number,
  text: string,
  author: {
    id: number,
    username: string,
    avatarUrl: string,
    subscribersAmount: number
  },
  postId: number,
  commentId: number,
  createdAt: string,
  updatedAt: string
}