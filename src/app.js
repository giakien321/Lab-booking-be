import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import studentRoutes from "./routes/studentRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "FPT Lab Booking API",
      version: "1.0.0",
      description: "RESTful API documentation for FPT Lab Booking system",
    },
    servers: [
      { url: "https://fpt-lab-booking-be.onrender.com/api/v1" }, // URL sau khi deploy
      { url: "http://localhost:5000/api/v1" }, // URL khi chạy local
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/swagger-ui", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/v1/students", studentRoutes);

export default app;
