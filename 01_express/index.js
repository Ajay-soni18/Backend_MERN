import "dotenv/config";
import express from "express";

import logger from "./logger.js";
import morgan from "morgan";

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running at port : ${port}... `);
});

// app.get("/", (req, res) => {
//   res.send("Hello From Ajay and his fitness Tips!");
// });

// app.get("/deadlift", (req, res) => {
//   res.send("Ajay's Deadlift PR is 205Kgs on the stage");
// });

// app.get("/Squat", (req, res) => {
//   res.send("Ajay's Squat PR is 160Kgs on the stage");
// });

app.use(express.json());

const morganFormat = ":method :url :status :response-time ms";
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);
let foodData = [];
let nextId = 1;

// To add the Food
app.post("/foods", (req, res) => {
  const { name, calories } = req.body;
  const newFood = { id: nextId++, name, calories };
  foodData.push(newFood);
  res.status(201).send(newFood);
});

// To display the whole array

app.get("/foods", (req, res) => {
  res.status(200).send(foodData);
});

// Get particular food via index

app.get("/foods/:id", (req, res) => {
  const food = foodData.find((f) => f.id === parseInt(req.params.id));
  if (!food) {
    return res.status(404).send("food not found");
  }
  res.status(200).send(food);
});

// To update the food at particular index

app.put("/foods/:id", (req, res) => {
  const food = foodData.find((f) => f.id === parseInt(req.params.id));
  if (!food) {
    return res.status(404).send("food not found");
  }
  const { name, calories } = req.body;
  food.name = name;
  food.price = calories;
  res.status(200).send(food);
});

// For delete

app.delete("/foods/:id", (req, res) => {
  const index = foodData.findIndex((f) => f.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send("Food Not found");
  }
  foodData.splice(index, 1);
  return res.status(200).send("deleted");
});
