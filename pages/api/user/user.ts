import { connectToDatabase } from "@/db/connectToDB";
import { NextApiRequest, NextApiResponse } from "next/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed, please use GET" });
  }

  try {
    // Check if the email exists in the database
    const client = await connectToDatabase();
    const db = client.db();
    const usersCollection = db.collection("users");

    if (!usersCollection) {
      throw new Error("Users collection does not exist");
    }

    // Perform any necessary operations on the 'users' collection here

    // For example, fetching all users
    const users = await usersCollection.find({}).toArray();

    // Close the database connection
    client.close();

    return res.status(200).json({ users });
  } catch (error) {
    console.error("Error in API route:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default handler;
