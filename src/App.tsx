import React from 'react';

import './App.scss';

import postsFromServer from './api/posts';
import commentsFromServer from './api/comments';
import usersFromServer from './api/users';

import { Comment } from './types/Comment';
import { Post } from './types/Post';
import { User } from './types/User';

import { PostList } from './components/PostList';

function getUserById(userId: number): User | null {
  const userInPost = usersFromServer.find(user => user.id === userId);

  return userInPost || null;
}

function getCommentsById(postId: number): Comment[] {
  const commentInPost = commentsFromServer
    .filter(comment => comment.postId === postId);

  return commentInPost;
}

export const posts: Post[] = postsFromServer.map(post => ({
  ...post,
  user: getUserById(post.userId),
  comments: getCommentsById(post.id),
}));

export const App: React.FC = () => (
  <section className="App">
    <h1 className="App__title">Static list of posts</h1>
    <PostList posts={posts}/>
  </section>
);
