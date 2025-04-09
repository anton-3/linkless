"use server";
import getFirebaseDatabase from "./firebaseAdmin";

const database = await getFirebaseDatabase();
const linksRef = database.ref(
  process.env.NODE_ENV === "production" ? "links" : "devlinks"
);

async function getValue(key: string): Promise<string | null> {
  try {
    const snapshot = await linksRef.child(key).get();
    return snapshot.exists() ? String(snapshot.val()) : null;
  } catch (error) {
    console.error(`firebase error fetching key ${key}`, error);
    return null;
  }
}

async function setValue(key: string, value: string): Promise<boolean> {
  try {
    await linksRef.child(key).set(value);
    return true;
  } catch (error) {
    console.error(`firebase error setting key ${key} = ${value}`, error);
    return false;
  }
}

export { getValue, setValue };
