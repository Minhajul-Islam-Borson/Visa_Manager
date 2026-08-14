import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import visaRoutes from "./routes/visa.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import { errorHandler } from "./middleware/errorMiddleware";

const app = express();
//middlewares
app.use(cors());
app.use(express.json());
app.use(errorHandler);

app.use("/api/auth", authRoutes);
app.use("/api/visa", visaRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.get("/", (req, res) => {
  res.send("Visa Manager Server is running...");
});

export default app;
