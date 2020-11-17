// Back-end codes
import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import Template from "../template";

// Codes for development phase
import path from "path";
import devBundle from "./devBundle"; // Comment out when in production

// Server-side rendering

const app = express();
const CURRENT_WORKING_DIR = process.cwd();

app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));
devBundle.compile(app); // Comment out when in production

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(compression());
app.use(cookieParser());
app.use(helmet());
app.use(cors());

app.get("/", (req, res) => {
    res.send(Template());
});

export default app;