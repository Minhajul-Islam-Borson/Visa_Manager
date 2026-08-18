import deotenv from "dotenv";
deotenv.config();
import app from "./app";
import connectDB from "./config/database";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
};

startServer();
