import express from "express";

const app = express();
const port = 3000;

app.use(express.urlencoded());

// 1. Get a random joke
app.get("/random", function (req, res) {
  const randomIndex = Math.floor(Math.random() * jokes.length);
  res.json(jokes[randomIndex]);
});

// 2. Get a specific joke

// 3. Filter jokes by type

// 4. Post a new joke

// 5. Put a joke

// 6. Patch a joke

// 7. Delete a joke

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
