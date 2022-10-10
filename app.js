import express from "express";
import "dotenv/config";
import { fileURLToPath } from "url";
import path from "path";
import router from "./router/index.js";
import { PORT } from "./lib/index.js";
import fileUpload from "express-fileupload";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ createParentPath: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname + "/public")));
app.use(router);

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
});
