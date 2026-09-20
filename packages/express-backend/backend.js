// backend.js
import cors from "cors";
import express from "express";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello ThereThere World!");
});

const findUserByName = (name) => {
  return users["users_list"].filter((user) => user["name"] === name);
};

app.get("/users", (req, res) => {
  const name = req.query.name;
  if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});


app.get("/users/:job/:name", (req, res) => {
  const job = req.params.job; //or req.params.id
  const name = req.params.name;
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    const result = users.users_list.filter(
      (user) => user.name === name && user.job === job
    );
    res.send({ users_list: result });
  }
});

// function to delete a user by their id
app.delete("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  const result = users.users_list.findIndex((user) => user.id === id);
  if (result === -1) {
    res.status(404).send("Resource not found.");
  } else {
    users.users_list.splice(result, 1)[0];
    return res.status(204).send();
  }

});

const addUser = (user) => { // adds a user with ID now
  const userWithId = {
    ...user,
    id: generateId(),
  };

  users["users_list"].push(userWithId);

  return userWithId;
};

app.post("/users", (req, res) => {
  const addedUser = addUser(req.body); // add the user now with its id
  res.status(201).send(addedUser); // give it the status 201
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const generateId = () => {
  return Math.random().toString().slice(2, 10);
};


const users = {
  users_list: [
    {
      id: "xyz789",
      name: "ChaRRRRRRRRRRRrlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};
