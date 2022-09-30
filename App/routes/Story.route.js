import multer from 'multer';
import express from 'express';
import { videos } from '../../helper/cloudinaryUtils.js';
import { getUserStories, getStoryById, createStory, viewStory } from '../controllers/Story.controller.js';

const storyRouter = express.Router();

storyRouter.route('/story/userStories').get(getUserStories);
storyRouter.route('/story/viewStory').post(viewStory);
storyRouter.route('/story/:id').get(getStoryById);
storyRouter.route('/story/create').post(createStory);

export default storyRouter;
