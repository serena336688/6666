export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface Task {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  completed: boolean;
  category: "water" | "exercise" | "mood" | "diet";
  points: number;
}

export interface MoodEntry {
  id: string;
  emoji: string;
  name: string;
  intensity: number;
  causes: string[];
  note?: string;
  timestamp: string;
}

export interface StretchWorkout {
  id: string;
  title: string;
  subtitle: string;
  duration: number; // in seconds
  image: string;
  energyBoost: number;
  description: string;
  steps: string[];
}

export interface UserStats {
  name: string;
  streak: number;
  vitality: number; // 0 to 100
  totalWaterCups: number;
  completedWorkoutsCount: number;
  moodEntriesCount: number;
  focusMessage: string;
}
