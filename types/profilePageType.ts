export interface ProfilePostsResult<T> {
  data: T[];
  totalPages: number;
}

export interface Interview {
  id: string;
  image: string;
  createdAt: Date;
  title: string;
  revenue: number;
  updates: number;
  website: string;
  category: string;
  authorclerkId: string;
  author: {
    name: string;
    image: string;
  };
}

export interface Post {
  id: string;
  image: string;
  createdAt: Date;
  title: string;
  post: string;
  category: string;
  tags: string[];
  views: number;
  authorclerkId: string;
  likes: string[];
  author: {
    email: string;
    name: string;
  };
}
