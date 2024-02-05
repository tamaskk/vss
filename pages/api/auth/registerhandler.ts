import { NextApiRequest, NextApiResponse } from "next/types";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/db/connectToDB";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { userData } = req.body;

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed, please use POST" });
    }

    if (!userData) {
        return res.status(400).json({ error: "No user data provided" });
    }

    const { firstName, lastName, email, password } = userData;

    if (!firstName) {
        return res.status(400).json({ error: "No first name provided" });
    }

    if (!lastName) {
        return res.status(400).json({ error: "No last name provided" });
    }

    if (!email) {
        return res.status(400).json({ error: "No email provided" });
    }

    if (!password) {
        return res.status(400).json({ error: "No password provided" });
    }

    // Validate email format (you can use a more robust validation library)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
    }

    // Validate password strength (you can implement more complex rules)
    if (password.length < 8) {
        return res.status(400).json({ error: "Password must be at least 8 characters long" });
    }

    // Hash and salt the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const client = await connectToDatabase();

    const db = client.db();

    const users = db.collection("users")

    const isUserExist = await users.findOne({ email: email });

    if (isUserExist) {
        client.close();
        return res.status(400).json({ error: "User already exist" });
    }

    const result = await db.collection("users").insertOne({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
        verifyed: false,
    });

    if (!result) {
        client.close();
        return res.status(500).json({ error: "Could not register user" });
    }

    client.close();
    res.status(201).json({ message: "Succesfully registered!" });

};

export default handler;
