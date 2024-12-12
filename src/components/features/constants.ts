import { Icons } from '../icons';

export const FEATURES = [
  {
    name: 'Audio Upload',
    description: 'Upload your podcast episodes in MP3 format with support for files up to 100MB.',
    icon: Icons.FileAudio,
  },
  {
    name: 'AI Transcription',
    description: 'Get accurate transcriptions powered by OpenAI Whisper technology.',
    icon: Icons.Mic,
  },
  {
    name: 'Key Point Extraction',
    description: 'AI automatically identifies and extracts the most important points from your content.',
    icon: Icons.Brain,
  },
  {
    name: 'Timestamp Generation',
    description: 'Every key point comes with precise timestamps for easy navigation.',
    icon: Icons.Clock,
  },
  {
    name: 'Audio Clip Creation',
    description: 'Create short, shareable clips from your podcast episodes automatically.',
    icon: Icons.Waveform,
  },
  {
    name: 'Social Sharing',
    description: 'Share your clips directly to social media platforms with one click.',
    icon: Icons.Share,
  },
] as const;