// db.ts
import { Db, MongoClient } from "mongodb";
import { UserClient, ExerciseClient } from "../clients";
import { MONGO_PASSWORD, MONGO_USERNAME } from "../settings";

let db: Db;
let userClient: UserClient;
let exerciseClient: ExerciseClient;

export async function initializeClients() {
  const CONNECTION_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@fraudninja.eoeqf.mongodb.net/fraud_ninja_database?retryWrites=true&w=majority&appName=FraudNinja`;
  const client = new MongoClient(CONNECTION_URL);

  await client.connect();
  db = client.db();

  userClient = new UserClient(db);
  exerciseClient = new ExerciseClient(db);

  console.log("MongoDB connected");

  return { db, userClient, exerciseClient };
}

export { db, userClient, exerciseClient };