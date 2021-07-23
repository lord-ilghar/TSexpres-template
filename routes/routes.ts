import {Router} from "express";
import Upload from "./../shared/Multer";

const router = Router();

//gets data at BaseURL:PORT/
router.get("/", (req, res) => {
    res.json({data:"hello word"});
});


// multer set up
const {upload} = new Upload();
router.post("save/", upload("file"), (req, res) => {
    console.log(req?.file);
})

export default router;
