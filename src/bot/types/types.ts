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
  activity: string;
  type: string;
  status: string;
  imageUrl: string;
  autoSwitch: boolean;
  autoTicket: boolean;
  autoReact: boolean;
};

export type discordConfigDetails = {
  id: number;
  activity: string;
  type: string;
  status: string;
  imageUrl: string;
  autoSwitch: boolean;
  autoTicket: boolean;
  autoReact: boolean;
};
