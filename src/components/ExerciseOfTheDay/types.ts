import type { User as FirebaseUser } from "firebase/auth";

export interface ExerciseOfTheDay {
  "Exercise Name": string;
  Description: string;
  "Initial Code": string;
  "Expected Output": string;
  "Jest Test Code": string;
  "Solution Code": string;
  "Difficulty Score (1-10)": number;
}

export interface PracticeHistory {
  name: string;
  lastUpdate: string;
  codeWritten: string;
  complete: boolean;
}

export type User = FirebaseUser & { practiceHistory: PracticeHistory[] };

export interface AuthContext {
  currentUser: User | null;
  loading: boolean;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
}
