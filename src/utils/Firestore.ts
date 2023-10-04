import Alea from "alea";
import type { User as FirebaseUser } from "firebase/auth";
import {
  DocumentData,
  QuerySnapshot,
  collection,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  limit,
  or,
  orderBy,
  query,
  setDoc,
  startAt,
  where,
} from "firebase/firestore";
import { ExerciseOfTheDay, User } from "../components/ExerciseOfTheDay/types";
import { db } from "./firebase";

export default class Firestore {
  private static exerciseOfTheDayRef = collection(db, "exercise-of-the-day");

  private static snapshotToArray<T>(snapshot: QuerySnapshot<DocumentData, DocumentData>) {
    const results: T[] = [];
    snapshot.forEach((doc) => {
      results.push(doc.data() as T);
    });
    return results;
  }

  private static dateToEpoch() {
    const time = new Date().getTime();
    return time - (time % 86400000);
  }

  public static async getUserHistory(currentUser: User | null): Promise<ExerciseOfTheDay[]> {
    if (!currentUser) return [];
    const history = currentUser?.practiceHistory.map((e) => e.exerciseRef.path);
    if (Array.isArray(history) && history.length === 0) return [];
    const q = query(
      this.exerciseOfTheDayRef,
      or(...history!.map((e) => where("Exercise Name", "==", e.split("/")[1])))
    );
    const snapshot = await getDocs(q);
    return this.snapshotToArray<ExerciseOfTheDay>(snapshot);
  }

  public static async getExerciseOfTheDay(): Promise<ExerciseOfTheDay> {
    return getCountFromServer(this.exerciseOfTheDayRef).then((snapshot) => {
      const arng = new (Alea as any)(this.dateToEpoch());
      const rand = Math.ceil(arng() * snapshot.data().count);
      const q = query(this.exerciseOfTheDayRef, orderBy("Exercise Name"), startAt(rand), limit(1));
      return getDocs(q).then((querySnapshot) => {
        return this.snapshotToArray<ExerciseOfTheDay>(querySnapshot)[0];
      });
    });
  }

  public static async getCurrentUser(user: FirebaseUser): Promise<User> {
    const path = doc(db, "users", user.email!);
    return getDoc(path).then((docSnap) => {
      if (docSnap.exists()) {
        return {
          ...user,
          practiceHistory: docSnap.data()?.practiceHistory,
        };
      } else {
        console.log("Document data:", docSnap.data());
        return setDoc(path, {
          email: user.email,
          practiceHistory: [],
        }).then(() => {
          return {
            ...user,
            practiceHistory: [],
          };
        });
      }
    });
  }
}
