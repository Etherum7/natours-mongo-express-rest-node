//packages
import fs from 'fs';
import express from 'express';
import { promisify } from 'util';

//local
import type { SimpleTour } from '@projectTypes/tours';

//constants
const PORT = 3000;
const app = express();
const writeFile = promisify(fs.writeFile);
const tours: Partial<SimpleTour>[] = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8')
);
//middlewares
app.use(express.json());

//routes
//send all tours
app.get('/api/v1/tours', (req, res) => {
  res
    .status(200)
    .json({ status: 'success', results: tours.length, data: { tours } });
});
//create new tour
app.post('/api/v1/tours', async (req, res) => {
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
});

//server
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
