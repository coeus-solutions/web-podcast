import { 
  Mic, 
  Share2, 
  FileAudio, 
  Brain, 
  Clock,
  AudioWaveform // Using AudioWaveform instead of Wave
} from 'lucide-react';

export const Icons = {
  Mic,
  Share: Share2,
  FileAudio,
  Brain,
  Clock,
  Waveform: AudioWaveform // Map to AudioWaveform icon
} as const;