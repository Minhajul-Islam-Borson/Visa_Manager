"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const visa_routes_1 = __importDefault(require("./routes/visa.routes"));
const dashboard_routes_1 = __importDefault(require("./routes/dashboard.routes"));
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const report_routes_1 = __importDefault(require("./routes/report.routes"));
const app = (0, express_1.default)();
//middlewares
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        "https://visa-manager-eight.vercel.app"
    ],
    credentials: true,
}));
app.use(express_1.default.json());
app.use(errorMiddleware_1.errorHandler);
app.use("/api/auth", authRoutes_1.default);
app.use("/api/visa", visa_routes_1.default);
app.use("/api/dashboard", dashboard_routes_1.default);
app.use("/api/report", report_routes_1.default);
app.get("/", (req, res) => {
    res.send("Visa Manager Server is running...");
});
exports.default = app;
