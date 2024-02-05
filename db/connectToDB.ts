import { MongoClient } from "mongodb";
export const connectToDatabase = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://voyagestack:JiPEtJ4VC9SHFWlw@voyagestack.3ebvsog.mongodb.net/"
  );
  return client;
};