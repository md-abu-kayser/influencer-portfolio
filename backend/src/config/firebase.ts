import admin from "firebase-admin";

let serviceAccount;
try {
  if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    throw new Error(
      "FIREBASE_SERVICE_ACCOUNT_KEY environment variable is missing"
    );
  }

  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
} catch (error) {
  console.error("Error parsing Firebase service account:", error);
  try {
    serviceAccount = require("../../serviceAccountKey.json");
  } catch (fileError) {
    console.error("Also failed to load service account from file:", fileError);
    throw new Error(
      "Firebase authentication failed. Please check your service account configuration."
    );
  }
}

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log("Firebase Admin initialized successfully");
} catch (error) {
  console.error("Error initializing Firebase Admin:", error);
}

export default admin;
