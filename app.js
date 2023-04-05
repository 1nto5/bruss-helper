import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dmcheckMgmtRoutes from "./routes/dmcheckMgmt.js";
import dmcheckProRoutes from "./routes/dmcheckPro.js";
import authRoutes from "./routes/auth.js";
import extraHoursRoutes from "./routes/extraHours.js";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(bodyParser.json());

if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: ".env.production" });
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  console.log("production");
  app.use(express.static(path.join(__dirname, "client/build")));
  app.use(
    "/",
    dmcheckMgmtRoutes,
    dmcheckProRoutes,
    authRoutes,
    extraHoursRoutes
  );
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
  });
} else {
  dotenv.config({ path: ".env.development" });
  console.log("development");
  app.use(cors({ origin: "http://localhost:3000" }));
  app.use(
    "/",
    dmcheckMgmtRoutes,
    dmcheckProRoutes,
    authRoutes,
    extraHoursRoutes
  );
}

mongoose.set("strictQuery", false);
const dbUri = process.env.DB_URI;
mongoose.connect(dbUri, { useNewUrlParser: true });

app.listen(process.env.PORT, () => {
  console.log(`Express server listening on port ${process.env.PORT}`);
});

// NODE_ENV=production node app.js
// yarn nodemon
