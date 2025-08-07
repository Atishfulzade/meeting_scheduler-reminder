import express from 'express';
import { createMeeting } from '../controllers/meeting.controller.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create', authenticate, createMeeting);
router.get('/summary', authenticate, getMeetingSummary); 


export default router;
