require("dotenv").config();
const express = require("express");
const app = express();
const Phonebook = require("./models/persons");

app.use(express.static("dist"));
app.use(express.json());

app.get("/api/persons", (request, response) => {
  Phonebook.find({}).then((person) => response.json(person));
});

app.get("/api/persons/:id", (request, response, next) => {
  Phonebook.findById(request.params.id)
    .then((person) =>
      person ? response.json(person) : response.status(404).end(),
    )
    .catch((error) => {
      next(error);
    });
});

app.get("/info", (request, response) => {
  const date = new Date();
  Phonebook.find({}).then((person) => {
    response.send(`Phonebook had info for ${person.length} people \n ${date}`);
  });
});

app.delete("/api/persons/:id", (request, response) => {
  Phonebook.findByIdAndDelete(request.params.id)
    .then((person) => {
      response
        .status(200)
        .send(`deleted ${person.name} with ID: ${request.params.id}`);
    })
    .catch((error) => {
      response.status(400).json({ error: "Error,wrong id" });
    });
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!body.name) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const person = new Phonebook({
    name: body.name,
    number: body.number,
  });

  person.save().then((savePerson) => {
    response.json(savePerson);
  });
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
