export interface SourcePost {
    userId: number
    id: number
    title: string
    body: string
}

export interface Post {
    post_id: number
    post_title: string
    post_body: string
}

export interface TopPosts {
    data: TopPost[]
}
export interface TopPost {
    post_id: number
    post_title: string
    post_body: string
    total_number_of_comments: number
}