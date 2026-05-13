import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

prisma
  .$connect()
  .then(() => {
    console.log("📦 Successfully connected with database");
  })
  .catch((error: unknown) => {
    console.log("❌ Error connecting to database", error);
  });

export default prisma;
