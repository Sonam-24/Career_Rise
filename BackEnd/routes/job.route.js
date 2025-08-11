import express from 'express';
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getJobById, getJobs, getJobsByAdmin, postJob } from '../controllers/job.controller.js';


const router = express.Router();

router.route("/post").post(isAuthenticated, postJob); 
router.route("/get").get(getJobs);
router.route("/get/:id").get(getJobById);
router.route("/getadmin").get(isAuthenticated, getJobsByAdmin);

export default router;