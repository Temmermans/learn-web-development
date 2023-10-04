import type { User as FirebaseUser } from "firebase/auth";
import { DocumentReference } from "firebase/firestore";

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
  lastUpdate: string;
  writtenCode: string;
  exerciseRef: DocumentReference;
}

export type User = FirebaseUser & { practiceHistory: PracticeHistory[] };

export interface AuthContext {
  currentUser: User | null;
  loading: boolean;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
}
