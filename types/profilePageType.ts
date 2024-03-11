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
  comments: string[];
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

export interface Meetup {
  id: string;
  title: string;
  companyName: string;
  location: string;
  description: string;
  tags: string[];
  image: string;
  category: string;
  updateAt: Date;
  author: {
    email: string;
    name: string;
  };
}

export interface Podcast {
  id: string;
  title: string;
  location: string;
  post: string;
  category: string;
  image: string;
  audio: string;
  tags: string[];
  author: {
    email: string;
    name: string;
  };
}
