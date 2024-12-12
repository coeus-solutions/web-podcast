export interface User {
  email: string;
  id: number;
  created_at: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface KeyPoint {
  id: number;
  content: string;
  start_time: number;
  end_time: number;
  file_path: string;
  podcast_id: number;
  created_at: string;
}

export interface Podcast {
  id: number;
  title: string;
  file_path: string;
  transcript: string;
  created_at: string;
  owner_id: number;
  key_points: KeyPoint[];
}

export interface ShareResponse {
  share_url: string;
}

export interface ApiError {
  detail: string;
} 