export type AuthorizationData = {
  email: string;
  password: string;
};

export type Comment = {
  rating: number;
  comment: string;
}

export type CommentOptions = {
  id: string;
  commentData: Comment;
}

export type UserData = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
  token: string;
};
