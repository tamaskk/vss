import { connectToDatabase } from '@/db/connectToDB'
import { compare } from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  // object used to configure NextAuth's behaviour
  session: {
    strategy: "jwt",
  },
  secret: "asd",
  providers: [
    CredentialsProvider({
      name: "credentials",
      authorize: async (credentials) => {
        const client = await connectToDatabase();

        const usersCollection = client.db().collection("users");

        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          // no user with the entered email
          client.close();
          throw new Error("No user found!");
        }

        // found a user with that email address, check for password
        const isValid = await compare(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error("Invalid password! Try again!");
        }

        client.close();

        // authorization succeeded
        // return object that is encoded for JWT token
        return { email: user.email };
      },
      credentials: {
        email: {},
        password: {},
      },
    }),
  ],
};

// NextAuth() executes and returns a handler function
export default NextAuth(authOptions);
