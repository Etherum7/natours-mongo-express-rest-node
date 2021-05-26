import express from 'express';
import fs from 'fs';
import { promisify } from 'util';

//local
import type { SimpleTour } from '@projectTypes/tours';

const writeFile = promisify(fs.writeFile);

const tours: Partial<SimpleTour>[] = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8')
);

export const getTour = (req: express.Request, res: express.Response) => {
  const { tourId } = req.params;
  const requestedTour = tours.find((tour) => tour.id === +tourId);
  //tourId*1 to convert
  if (requestedTour) {
    res.status(200).json({ status: 'success', data: { tour: requestedTour } });
  } else {
    res.status(404).json({ status: 'fail', message: 'Not found' });
  }
};
export const getAllTours = (req: express.Request, res: express.Response) => {
  res
    .status(200)
    .json({ status: 'success', results: tours.length, data: { tours } });
};

export const createTour = async (
  req: express.Request,
  res: express.Response
) => {
  const newId = tours.length;
  const newTour = { ...req.body, id: newId } as Partial<SimpleTour>;
  tours.push(newTour);
  try {
    await writeFile(
      `${__dirname}/dev-data/data/tours-simple.json`,
      JSON.stringify(tours)
    );
    res.status(201).json({ status: 'success', data: { tour: newTour } });
  } catch (err) {
    res.status(400).json({ status: 'err', message: err.message });
  }
};

export const updateTour = async (
  req: express.Request,
  res: express.Response
) => {
  const { tourId } = req.params;
  if (+tourId < tours.length) {
    console.log(req.body);
    const updatedTours = tours.map((tour) => {
      if (tour.id !== +tourId) {
        return tour;
      } else {
        return { ...tour, ...req.body };
      }
    });
    try {
      await writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(updatedTours)
      );
      res
        .status(200)
        .json({ status: 'success', data: { tour: updatedTours[+tourId] } });
    } catch (err) {
      res.status(500).json({
        status: 'fail',
        message: 'Could not update \nInternal Server error',
      });
    }
  } else {
    res.status(404).json({ status: 'fail', message: 'Not found' });
  }
};

export const deleteTour = async (
  req: express.Request,
  res: express.Response
) => {
  const { tourId } = req.params;

  if (+tourId < tours.length) {
    const updatedTours = tours.filter((tour) => tour.id !== +tourId);
    try {
      await writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(updatedTours)
      );
      res.status(204).json({ status: 'success', data: null });
    } catch (err) {
      res.status(500).json({
        status: 'fail',
        message: 'Could not delete \nInternal Server error',
      });
    }
  } else {
    res.status(404).json({ status: 'fail', message: 'Not found' });
  }
};
