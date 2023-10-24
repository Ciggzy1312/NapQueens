
export interface PostInput {
    title: string;
    content: string;
}

export interface CreatePostInput extends PostInput {
    category_id: string;
}

export interface CreateCategoryInput {
    name: string;
}