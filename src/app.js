import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import studentRoutes from "./routes/studentRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

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
        description: "Deployed server (Render)"
      },
      {
        url: "http://localhost:5000",
        description: "Local development server"
      }
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use("/swagger-ui", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/v1/students", studentRoutes);

app.get("/", (req, res) => {
  res.redirect("/swagger-ui");
});

export default app;
