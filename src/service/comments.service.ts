
import { typicode_client } from '../utils/clients';
import { Comment, SourceComment } from '../dto/comments.dto';
import { Request } from 'express'

const escapeBackslash = (str: string) => {
    return str.replace(/\\/g, '\\\\');
}

//TODO: implement fuzzy search
export const searchCommentsService = async (req: Request): Promise<Comment[]> => {
    const { postId, id, name, email, body } = req.query;
    const res = await typicode_client.get('/comments');

    let comments = res.data;

    if (postId) {
        comments = comments.filter((comment: SourceComment) => comment.postId === Number(postId));
    }

    if (id) {
        comments = comments.filter((comment: SourceComment) => comment.id === Number(id));
    }

    if (name) {
        comments = comments.filter((comment: SourceComment) => comment.name === name);
    }

    if (email) {
        comments = comments.filter((comment: SourceComment) => comment.email === email);
    }

    if (body) { 
        comments = comments.filter((comment: SourceComment) => {
            return escapeBackslash(JSON.stringify(comment.body)) === JSON.stringify(body);
        });
    }
    
    return comments;
}

export default searchCommentsService;



