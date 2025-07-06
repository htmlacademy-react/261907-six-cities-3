export type Comment = {
  rating: number;
  comment: string;
};

export type CommentOptions = {
  id: string;
  commentData: Comment;
};

type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type Review = {
  id: string;
  date: string;
  user: User;
  comment: string;
  rating: number;
};


