export interface PhotoSize {
  file_id: string;
  width: number;
  height: number;
}

export interface ChannelPost {
  photo?: PhotoSize[] | undefined;
}

export interface Update {
  update_id: number;
  channel_post?: ChannelPost;
}

export interface ApiResponse {
  ok: boolean;
  result: Update[];
}
