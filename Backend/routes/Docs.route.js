import express from "express";
import { ReadDocs } from "../controllers/docs.controller.js";

import { ShowDocs } from "../controllers/docs.controller.js";
import { DeleteDocs } from "../controllers/docs.controller.js";
import { UpdateDocs } from "../controllers/docs.controller.js";
import {FeedbackForm } from "../controllers/docs.controller.js";
import  auth  from "../middleware/isloggedin.js";

const router = express.Router();

router.post("/create", auth, ReadDocs);
router.get("/show", auth, ShowDocs);
router.delete("/delete/:id", auth, DeleteDocs);
router.put("/update/:id", auth, UpdateDocs);
router.post("/v2/feedback", auth, FeedbackForm);


export default router;
