export interface SourceComment {
    postId: number
    id: number
    name: string
    email: string
    body: string
}
export interface Comments {
    data: Comment[]
}

export interface Comment {
    comment_id: number
    post_id: number
}