// src/components/layout/blog/types.ts
export interface Author {
    name: string;
    avatar: string;
  }
  
  export interface BlogPost {
    id: number;
    title: string;
    description: string;
    author: Author;
    date: string;
    image: string;
    category: string;
  }
  
  export interface BlogCardProps {
    blog: BlogPost;
    index: number;
  }