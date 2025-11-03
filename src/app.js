import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import labRoutes from "./routes/labRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import { verifyToken } from "./middlewares/authMiddleware.js";

const app = express();

app.use(cors());
app.use(express.json());


const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "FPT Lab Booking API",
      version: "1.0.0",
      description: "RESTful API for FPT University Lab Booking System",
    },
    servers: [
      { url: "https://lab-booking-be-1.onrender.com", description: "Render Deployment" },
      { url: "http://localhost:5000", description: "Localhost" },
    ],
  },

  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/swagger-ui", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/labs", verifyToken, labRoutes);
app.use("/api/v1/bookings", verifyToken, bookingRoutes);

app.get("/", (req, res) => {
  res.redirect("/swagger-ui");
});

export default app;
