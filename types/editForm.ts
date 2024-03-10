// for the page
export interface InterviewType {
  author: {
    image: string;
    name: string;
  };
  id: string;
  image: string;
  createdAt: Date;
  title: string;
  post: string;
  revenue: number;
  updates: number;
  website: string;
  category: string;
  tags: string[];
  authorclerkId: string;
}

export interface MeeupType {
  id: string;
  title: string;
  companyName: string;
  location: string;
  description: string;
  tags: string[];
  image: string;
  category: string;
  createdAt: Date;
  updateAt: Date;
  authorclerkId: string;
}

export interface PodcastType {
  author: {
    image: string;
    name: string;
  };
  id: string;
  title: string;
  location: string;
  post: string;
  category: string;
  image: string;
  audio: string;
  createdAt: Date;
  updateAt: Date;
  authorclerkId: string;
}

// for the component
export interface EditPostProps {
  image: string;
  title: string;
  post: string;
  revenue?: number;
  updates?: number;
  website?: string;
  category: string;
  tags?: string[];
  authorclerkId: string;
  createType: string;
  postId: string;
}

export interface EditMeetupProps {
  image: string;
  title: string;
  post: string;
  category: string;
  tags?: string[];
  authorclerkId: string;
  createType: string;
  postId: string;
  companyName?: string;
}

export interface EditPodcastProps {
  title: string;
  post: string;
  category: string;
  image: string;
  audio?: string;
  createType: string;
  postId: string;
  authorclerkId: string;
}
