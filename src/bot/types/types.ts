export type LogDetails = {
  id: number;
  username: string;
  message: string;
  subreddit: string;
  time: string;
  subId: string;
  pm: boolean;
};

export type configDetails = {
  id: number;
  clientId: string;
  clientSecret: string;
  username: string;
  password: string;
  userAgent: string;
  title: string;
  pmBody: string;
  subreddits: string;
  forbiddenWords: string;
};
