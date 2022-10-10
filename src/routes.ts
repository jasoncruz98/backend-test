import { Express, Request, Response } from 'express';
import { searchComments } from './controller/comments.controller';
import { getTopPosts } from './controller/posts.controller';
import { SourceCommentSchema, validate } from './middleware/comments.middleware';

const routes = (app: Express) => {
    app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

    app.get('/api/posts/get-top-posts', getTopPosts)

    app.get('/api/comments/search', validate(SourceCommentSchema), searchComments)
};
export default routes;