"use server";
import admin from "firebase-admin";
import { applicationDefault } from "firebase-admin/app";

export default async function getFirebaseDatabase() {
  if (!admin.apps.length) {
    if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      throw Error(
        "[ME] firebase application credentials not found, did you configure .env file(s)?"
      );
    }
    try {
      admin.initializeApp({
        credential: applicationDefault(), // pulls from $GOOGLE_APPLICATION_CREDENTIALS
        databaseURL: "https://linkless-454dc-default-rtdb.firebaseio.com",
      });
      console.log("firebase initialized successfully");
    } catch (error) {
      console.error("firebase failed to initialize:", error);
    }
  }
  return admin.database();
}
