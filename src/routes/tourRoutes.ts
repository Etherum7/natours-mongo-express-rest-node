import {
  createTour,
  deleteTour,
  getAllTours,
  getTour,
  updateTour,
} from '@controllers/tourController';
import express from 'express';

const router = express.Router();
router.route('/').get(getAllTours).post(createTour);

router.route('/:tourId').get(getTour).patch(updateTour).delete(deleteTour);

export default router;
