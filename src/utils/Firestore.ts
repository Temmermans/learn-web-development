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
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import parserBabel from "prettier/parser-babel";
import * as prettier from "prettier/standalone";
import { ExerciseOfTheDay, PracticeHistory, User } from "../components/ExerciseOfTheDay/types";
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

  private static async formatCode(code: string) {
    return prettier.format(code, {
      semi: false,
      parser: "babel",
      plugins: [parserBabel],
    });
  }

  public static getExercise(name: string): Promise<ExerciseOfTheDay> {
    return getDoc(doc(db, "exercise-of-the-day", name)).then((doc) => {
      // any way to avoid fetching all the data?
      const exercise = doc.data() as ExerciseOfTheDay;
      return Promise.all([
        this.formatCode(exercise["Initial Code"]),
        this.formatCode(exercise["Jest Test Code"]),
        this.formatCode(exercise["Solution Code"]),
      ]).then(([initialCode, jestTestCode, solutionCode]) => {
        return {
          ...exercise,
          "Initial Code": initialCode,
          "Jest Test Code": jestTestCode,
          "Solution Code": solutionCode,
        };
      });
    });
  }

  public static getExerciseOfTheDay(n?: number): Promise<ExerciseOfTheDay> {
    return getCountFromServer(this.exerciseOfTheDayRef).then((snapshot) => {
      const arng = new (Alea as any)(n || this.dateToEpoch());
      const rand = Math.ceil(arng() * snapshot.data().count);
      const q = query(this.exerciseOfTheDayRef, orderBy("Exercise Name"));
      return getDocs(q).then((querySnapshot) => {
        // any way to avoid fetching all the data?
        const exercise = (
          querySnapshot.docs[rand] ? querySnapshot.docs[rand] : querySnapshot.docs[0]
        ).data() as ExerciseOfTheDay;
        return Promise.all([
          this.formatCode(exercise["Initial Code"]),
          this.formatCode(exercise["Jest Test Code"]),
          this.formatCode(exercise["Solution Code"]),
        ]).then(([initialCode, jestTestCode, solutionCode]) => {
          return {
            ...exercise,
            "Initial Code": initialCode,
            "Jest Test Code": jestTestCode,
            "Solution Code": solutionCode,
          };
        });
      });
    });
  }

  public static async getCurrentUser(user: FirebaseUser): Promise<User> {
    const path = doc(db, "users", user.email!);
    return getDoc(path).then((docSnap) => {
      if (docSnap.exists()) {
        const historyPath = collection(db, "users", user.email!, "history");
        return getDocs(historyPath).then((historySnap) => {
          return {
            ...user,
            practiceHistory: historySnap.docs.map((doc) => ({ name: doc.id, ...doc.data() })) as PracticeHistory[],
          };
        });
      } else {
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

  public static async updateUserHistory(
    email: string,
    exercise: string,
    values: Record<string, unknown>
  ): Promise<void> {
    const path = doc(db, "users", email, "history", exercise);
    return setDoc(
      path,
      {
        ...values,
        lastUpdate: serverTimestamp(),
      },
      { merge: true }
    );
  }
}
