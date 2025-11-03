import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

// Routes
import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import labRoutes from "./routes/labRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

// Middlewares
import { verifyToken, verifyAdmin } from "./middlewares/authMiddleware.js";

const app = express();

// ====== Middleware setup ======
app.use(cors());
app.use(express.json());

// ====== Swagger UI setup ======
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "FPT Lab Booking API",
      version: "1.0.0",
      description: "RESTful API documentation for FPT Lab Booking system",
    },
    servers: [
      {
        url: "https://lab-booking-be-1.onrender.com",
        description: "Deployed server",
      },
      {
        url: "http://localhost:5000",
        description: "Local development server",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/swagger-ui", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ====== Routes ======

// Auth (public)
app.use("/api/v1/auth", authRoutes);

// Students (student info CRUD – optional, mostly admin usage)
app.use("/api/v1/students", verifyToken, studentRoutes);

// Labs (students can view, admin can add/edit/delete)
app.use("/api/v1/labs", verifyToken, labRoutes);

// Bookings (students create/view their own, admin approve/reject)
app.use("/api/v1/bookings", verifyToken, bookingRoutes);

// ====== Default route ======
app.get("/", (req, res) => {
  res.redirect("/swagger-ui");
});

export default app;
