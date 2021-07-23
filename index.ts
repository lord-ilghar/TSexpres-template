import express from "express";
import cors from "cors";
import path from "path";
import {config} from "dotenv";
// local imports
import routes from "./routes/routes";
import terminate from './termanitPort'

config();

// setup express server
const app = express();
// 5000 means it is connected to env file and 6000 means not connected
const PORT = Number.parseInt(process.env.PORT || "6000");

// middle wars
app.use(cors()); // cors
app.use(express.json({limit: "500kb"})); // get json data
app.use("/static", express.static(path.join(__dirname, "static"))); // static files
// routs
app.use("/", routes);

// 404 page
app.use((req, res) => {
    res.status(404).json({msg: "Page Not found"});
});

// terminate any busy server in $PORT file
terminate(PORT).then(()=> app.listen(PORT));
