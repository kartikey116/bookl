import Experience from '../models/Experience.js';
import { asyncHandler } from '../middleware/ErrorHandler.js';


const getExperiences = asyncHandler(async (req, res, next) => {
  const experiences = await Experience.find({}, 'title location price imageUrl');
  
  res.status(200).json(experiences);
});

const getExperienceById = asyncHandler(async (req, res, next) => {  
  const experience = await Experience.findById(req.params.id);

  if (!experience) {
    res.status(404);
    throw new Error('Experience not found');
  }

  res.status(200).json(experience);
});

const createExperience = asyncHandler(async (req, res) => {
  const {
    title,
    location,
    price,
    imageUrl,
    description,
    duration,
    rating,
    includes,
    availableSlots,
  } = req.body;

  const experience = new Experience({
    title,
    location,
    price,
    imageUrl,
    description,
    duration,
    rating,
    includes,
    availableSlots,
  });

  // Save to database
  const createdExperience = await experience.save();
  res.status(201).json(createdExperience); // 201 = Created
});

export {createExperience,getExperiences,getExperienceById};