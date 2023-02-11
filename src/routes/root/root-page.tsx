import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import Sidebar from '../../components/sidebar/sidebar';
import { Post, PostProps, PostSkeleton } from './post';
import { User, UserContext } from '../../context/UserContext';
import { pb } from '../../utils/database.utils';

interface ResponseObject {
  author: string
  content: string
  created: string
  updated: string
  expand: { author: User }
  score: number
}

export const RootPage = (): ReactElement => {
  const user = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<PostProps[]>([]);

  useEffect(() => {
    setLoading(true);
    getPosts().then((res) => {
      res = res.items;
      return res;
    }).then((items) => {
      const posts: PostProps[] = [];
      items.forEach((post: ResponseObject) => {
        posts.push({
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
  }, []);

  return (
    <Box textAlign="center" fontSize="xl">
      <Sidebar>
        {
          loading
            ? <PostSkeleton/>
            : (
                posts.map((post, index) => {
                  return <Post key={index}
                               user={post.user}
                               content={post.content}
                               score={post.score}
                               created={post.created}
                               updated={post.updated}/>;
                })
              )

        }
      </Sidebar>
    </Box>
  );
};

const getPosts = async (): Promise<any> => {
  const records = await pb.collection('posts').getList(1, 50 /* batch size */, {
    sort: '-created',
    expand: 'author'
  });
  return records;
};
