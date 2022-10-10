import { NextFunction, Request, Response } from 'express'
import getTopPostsService from '../service/posts.service'

export const getTopPosts = async (req: Request, res: Response, next: NextFunction) => {
    const top_posts = await getTopPostsService()
    if (!top_posts) {
        return res.status(404)
    }
    return res.status(200).json(top_posts)
};  