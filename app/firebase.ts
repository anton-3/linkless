"use server";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

for (const value of Object.values(firebaseConfig)) {
  if (!value) {
    throw new Error(
      "missing firebase environment variables, did you set them in .env?"
    );
  }
}

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

async function getValue(key: string): Promise<string | null> {
  try {
    const snapshot = await get(ref(database, key));
    return snapshot.exists() ? (snapshot.val() as string) : null;
  } catch (error) {
    console.error(`firebase error fetching key ${key}`, error);
    return null;
  }
}

async function setValue(key: string, value: string): Promise<boolean> {
  try {
    await set(ref(database, key), value);
    return true;
  } catch (error) {
    console.error(`firebase error setting key ${key} = ${value}`, error);
    return false;
  }
}

export { getValue, setValue };
