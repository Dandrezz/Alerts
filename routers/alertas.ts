import { Router } from "express";
import { sendMessageLogstash, sendMessagePrometheus } from "../controllers/alertas";

const router = Router();

router.post('/prometheus', sendMessagePrometheus ); 
router.post('/logstash/ssh', sendMessageLogstash );

export default router;