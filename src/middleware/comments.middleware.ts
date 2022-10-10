import { object, number, string, TypeOf, AnyZodObject } from "zod";
import { NextFunction, Request, Response } from 'express'
import logger from '../utils/logger';


//Will move schemas to a schema folder when middlewares get larger
export const SourceCommentSchema = object({
    query: object({
        //Validating postId as numeric string
        postId: string().regex(/^\d+$/, { message: "postId is not a valid number" }).transform((val) => Number(val)).optional(),
        //Validating id as numeric string
        id: string().regex(/^\d+$/, {message: "id is not a valid number"}).transform((val) => Number(val)).optional(),
        name: string().optional(),
        email: string().optional(),
        body: string().optional(),
    }).optional(),
});

export const validateQuery = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    const schema_validator = schema.safeParse({
        query: req.query,
    });
    if (!schema_validator.success) {
        logger.warn(schema_validator.error.errors[0].message);
        return res.status(400).json({
            message: schema_validator.error.errors[0].message,
        });
    }
    next();
    return res.status(200);
}

export type SourceCommentSchema = TypeOf<typeof SourceCommentSchema>;



