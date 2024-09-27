export type Poll = {
  id: string;
  created_at: string;
  poll_title: string;
  poll_description: string;
  poll_option_labels: string[];
  poll_option_votes: number[];
  poll_option_image_urls: string[];
  poll_votes_total: number;
};

export type Vote = {
  option_selected: number;
};

export type PollWithUserVote = Poll & { userVote: Vote | null };
