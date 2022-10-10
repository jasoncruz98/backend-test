
import { typicode_client } from '../utils/clients';
import { Post, SourcePost, TopPosts} from '../dto/posts.dto';
import { SourceComment, Comment } from '../dto/comments.dto';

const getPosts = async (): Promise<Post[]> => {
    const res = await typicode_client.get('/posts');
    return res.data.map((post: SourcePost) => {
        return {
            post_id: post.id,
            post_title: post.title,
            post_body: post.body,
        }
    });
}

const getComments = async (): Promise<Comment[]> => {
    const res = await typicode_client.get('/comments');
    return res.data.map((comment: SourceComment) => {
        return {
            comment_id: comment.id,
            post_id: comment.postId,
        }
    });
}

const getTopPosts = async (): Promise<TopPosts> => {
    
    // Note: wrapping the calls in Promise.all() make the final API response twice as fast
    // const posts = await getPosts();
    // const comments = await getComments();

    const [posts, comments] = await Promise.all([getPosts(), getComments()]);

    const top_posts = posts.map((post: Post) => {
        const posts_num_of_comments = comments.filter((comment) => comment.post_id === post.post_id);
        return {
            ...post,
            total_number_of_comments: posts_num_of_comments.length,
        }
    });
    // Sort by number of comments
    top_posts.sort((a, b) => b.total_number_of_comments - a.total_number_of_comments);

    // Sort by descending post id if number of comments are equal
    top_posts.sort((a, b) => b.post_id - a.post_id);

    return {
        data: top_posts,
    };
}

export const getTopPostsService = async (): Promise<TopPosts> => {
    return getTopPosts();
}

export default getTopPostsService;


