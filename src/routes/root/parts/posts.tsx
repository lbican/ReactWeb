import React, { ReactElement, useEffect, useState } from 'react';
import { Post, PostProps, PostSkeleton } from './post';
import { pb } from '../../../utils/database.utils';
import { Follower, User } from '../../../context/DataContext';

interface ResponseObject {
  id: string
  author: string
  content: string
  created: string
  updated: string
  expand: { author: User }
  score: number
}
export const Posts = (props: { userId?: string, sort?: string }): ReactElement => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPosts(props.userId, props.sort).then((res) => {
      const posts: PostProps[] = [];
      res.forEach((post: ResponseObject) => {
        posts.push({
          refresh: () => {},
          id: post.id,
          score: post.score,
          content: post.content,
          created: new Date(post.created),
          updated: new Date(post.updated),
          user: post.expand.author
        });
      });
      setPosts(posts);
      setLoading(false);
    }).catch((e) => {
      console.error(e);
    }).finally(() => { setLoading(false); });
  }, [refresh]);

  if (loading) {
    return <PostSkeleton/>;
  }

  return (
      <React.Fragment>
        {
          posts.length > 0
            ? posts.map((post, index) => {
              return <Post key={index}
                             user={post.user}
                             content={post.content}
                             score={post.score}
                             created={post.created}
                             updated={post.updated}
                             id={post.id}
                             refresh={() => { setRefresh(!refresh); }}
              />;
            })
            : 'No posts to display, start following users, or add a new post!'
        }
      </React.Fragment>
  );
};

const getPosts = async (id?: string, sort?: string, follower?: boolean): Promise<any> => {
  if (id) {
    return await pb.collection('posts').getFullList(200 /* batch size */, {
      sort: '-created',
      expand: 'author',
      filter: `author="${id}"`
    });
  }
  return await pb.collection('posts').getFullList(200 /* batch size */, {
    sort: sort ?? '-created',
    expand: 'author'
  });
};
/*

const getFollowerPosts = async (userId: string): Promise<any> => {
  let followerIds: string[] = [];

  return await getFollowers(userId).then((res) => {
    followerIds = res.map((follower) => follower.follows.id);
    console.log(followerIds);
  }).catch((e) => console.log(e));

  return await pb.collection('posts').getFullList(200 /!* batch size *!/, {
    sort: '-created',
    expand: 'author',
    filter: createFilter(followerIds)
  });
};

const createFilter = (ids: string[]): string => {
  const filter = '';

  ids.forEach((id, index) => {
    filter.concat(`author="${id}"`);
    if (index < ids.length) {
      filter.concat(' || ');
    }
  });

  return filter;
};

const getFollowers = async (userId: string): Promise<Follower[]> => {
  return await pb.collection('followers').getFullList(200 /!* batch size *!/, {
    expand: 'follows',
    sort: '-created',
    filter: `user="${userId}"`
  });
};
*/
