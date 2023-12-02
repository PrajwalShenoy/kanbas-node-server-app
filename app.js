import express from "express";
import session from "express-session";
import Hello from "./hello.js";
import Lab5 from "./lab5.js";
import CourseRoutes from "./courses/routes.js";
import cors from "cors";
import ModuleRoutes from "./modules/routes.js";
import "dotenv/config";
import mongoose from "mongoose";
import UserRoutes from "./users/routes.js";

mongoose.connect("mongodb://localhost:27017/kanbas");

const app = express();
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000",
}
));
const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
};
app.use(
    session(sessionOptions)
);

app.use(express.json());
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
Hello(app);
Lab5(app);
app.listen(process.env.PORT || 4000);