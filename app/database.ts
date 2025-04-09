"use server";
import getFirebaseDatabase from "./firebaseAdmin";

const cache = new Map<string, string>();
const database = await getFirebaseDatabase();
const linksRef = database.ref(
  process.env.NODE_ENV === "production" ? "links" : "devlinks"
);

async function getValue(key: string): Promise<string | null> {
  if (cache.has(key)) {
    return cache.get(key)!;
  }

  try {
    const snapshot = await linksRef.child(key).get();
    if (snapshot.exists()) {
      const value = String(snapshot.val());
      cache.set(key, value);
      return value;
    } else {
      return null;
    }
  } catch (error) {
    console.error(`firebase error fetching key ${key}`, error);
    return null;
  }
}

async function setValue(key: string, value: string): Promise<boolean> {
  try {
    await linksRef.child(key).set(value);
    cache.set(key, value);
    return true;
  } catch (error) {
    console.error(`firebase error setting key ${key} = ${value}`, error);
    return false;
  }
}

export { getValue, setValue };
