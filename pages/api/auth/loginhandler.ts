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

    const { email, password } = userData;

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

    // Check if the email exists in the database

    const client = await connectToDatabase();

    const db = client.db();

    const users = db.collection("users");

    const user = await users.findOne({ email: email });

    if (!user) {
        client.close();
        return res.status(400).json({ error: "User does not exist" });
    }

    // Compare the hashed password with the stored password

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
        client.close();
        return res.status(400).json({ error: "Invalid password" });
    }

    client.close();

    // Return a JWT token upon successful registration or login
    res.status(200).json({ message: "Successfully logged in!" });
};

export default handler;
