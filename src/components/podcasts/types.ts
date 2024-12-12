import { Podcast } from '../../types/podcast';

export interface PodcastItemProps {
  podcast: Podcast;
  onDelete: (id: string) => void;
}

export interface StatusBadgeProps {
  status: Podcast['status'];
}

export interface KeyPointsProps {
  podcast: Podcast;
}

export interface KeyPoint {
  id: number;
  timestamp: string;
  text: string;
  duration: string;
}