import express from 'express';
import {createExperience,getExperiences,getExperienceById} from '../controllers/experienceController.js';

const router = express.Router();

router.post('/', createExperience);
router.get('/', getExperiences);
router.get('/:id', getExperienceById);

export default router;