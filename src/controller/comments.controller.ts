import { Request, Response } from 'express'
import { searchCommentsService } from '../service/comments.service';

export const searchComments = async (req: Request, res: Response) => {
    const searchComments = await searchCommentsService(req);
    if (!searchComments) {
        return res.status(404)
    }
    return res.status(200).json(searchComments)
};  