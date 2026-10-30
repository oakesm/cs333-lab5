import express from "express";

const app = express();
const port = 3000;

app.use(express.urlencoded());

// 1. Get a random joke
// uses the random function to get a random joke from the jokes array
app.get("/random", function (req, res) {
  const randomIndex = Math.floor(Math.random() * jokes.length);
  res.json(jokes[randomIndex]);
});


// 2. Get a specific joke
// uses the id parameter to find a specific joke in the jokes array
app.get("/jokes/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const foundJoke = jokes.find((joke) => joke.id === id);
  if (!foundJoke) return res.status(404).send("No joke found with ID " + id);
  res.json(foundJoke);
});


//console.log(req.params);
//console.log(req.params.id);
//console.log(typeof req.params.id);
//console.log(typeof parseInt(req.params.id));
 

// 3. Filter jokes by type
// Filters the jokes array by jokeType and returns the matching joke, if not joke matches 404 is returned. 
app.get("/filter", function (req, res) {
  const type = req.query.type;
  const filteredJokes = jokes.filter(
    (joke) => joke.jokeType.toLowerCase() === type?.toLowerCase()
  );
  console.log("Matching jokes count:", filteredJokes.length);
  if (filteredJokes.length === 0) {
    return res.status(404).json({ error: `No jokes found for type: ${type}` });
  }
  res.json(filteredJokes);
});

// 4. Post a new joke
// Adds a new joke to the jokes array with an id, text and type. New joke is returned
app.post("/jokes", function (req, res) {
  const newJoke = {
    id: jokes.length + 1,
    jokeText: req.body.text,
    jokeType: req.body.type,
  };
  jokes.push(newJoke);
  res.json(newJoke);
});


// 5. Put a joke
// replaces an existing joke with a new joke using id to find the joke to replace
app.put("/jokes/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const replacementJoke = {
    id: id,
    jokeText: req.body.text,
    jokeType: req.body.type,
  };
  const searchIndex = jokes.findIndex((joke) => joke.id === id);
  jokes[searchIndex] = replacementJoke;
  res.json(replacementJoke);
});


// 6. Patch a joke
// updates an existing joke with new text or type using id. 
app.patch("/jokes/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const existingJoke = jokes.find((joke) => joke.id === id);
  const replacementJoke = {
    id: id,
    jokeText: req.body.text || existingJoke.jokeText,
    jokeType: req.body.type || existingJoke.jokeType,
  };
  const searchIndex = jokes.findIndex((joke) => joke.id === id);
  jokes[searchIndex] = replacementJoke;
  res.json(replacementJoke);
});

// 7. Delete a joke
// deletes a joke from the array using id
app.delete("/jokes/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const searchIndex = jokes.findIndex((joke) => joke.id === id);
  if (searchIndex === -1) {
    return res.status(404).json({ error: "No joke with id " + id });
  }
  jokes.splice(searchIndex, 1);
  res.sendStatus(200);
});



app.listen(port, function () {
  console.log("Listening on http://localhost:" + port);
});

// The data. No database yet, so it lives in this array.
let jokes = [
  { id: 1, jokeText: "Why don't scientists trust atoms? Because they make up everything.", jokeType: "Science" },
  { id: 2, jokeText: "I told a chemistry joke once. There was no reaction.", jokeType: "Science" },
  { id: 3, jokeText: "A photon checks into a hotel. 'Any luggage?' 'No, I'm travelling light.'", jokeType: "Science" },
  { id: 4, jokeText: "Why do programmers prefer dark mode? Because light attracts bugs.", jokeType: "Programming" },
  { id: 5, jokeText: "There are 10 kinds of people: those who understand binary and those who don't.", jokeType: "Programming" },
  { id: 6, jokeText: "A SQL query walks into a bar, goes up to two tables and asks: 'Can I join you?'", jokeType: "Programming" },
  { id: 7, jokeText: "I'm reading a book about anti-gravity. It's impossible to put down.", jokeType: "Puns" },
  { id: 8, jokeText: "I used to be a banker, but I lost interest.", jokeType: "Puns" },
  { id: 9, jokeText: "Why did the scarecrow win an award? He was outstanding in his field.", jokeType: "Puns" },
  { id: 10, jokeText: "What do you call cheese that isn't yours? Nacho cheese.", jokeType: "Food" },
  { id: 11, jokeText: "Why did the tomato blush? It saw the salad dressing.", jokeType: "Food" },
  { id: 12, jokeText: "I'm on a seafood diet. I see food and I eat it.", jokeType: "Food" },
];

const joke = jokes[0];
const jsonString = JSON.stringify(joke);
console.log(joke);
console.log(jsonString);
console.log(typeof jsonString);
const parsed = JSON.parse(jsonString);
console.log(typeof parsed);
console.log(parsed.jokeText);
