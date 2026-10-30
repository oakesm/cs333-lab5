import express from "express";
import fs from "fs";

const app = express();
const port = 3000;

// Read recipes.json each time, so new recipes show up without a restart
function getRecipes() {
  const text = fs.readFileSync("recipes.json", "utf8");
  return JSON.parse(text);
}

// Turn one recipe object into a small web page
function recipePage(recipe) {
  return `
    <h1>${recipe.title}</h1>
    <h2>Ingredients</h2>
    <ul>
      ${recipe.ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
    </ul>
    <h2>Instructions</h2>
    <p>${recipe.instructions}</p>
  `;
}

app.get("/", function (req, res) {
  const recipes = getRecipes();
  res.send(recipePage(recipes[0]));
});

// Your routes go here
app.get("/recipes", function (req, res) {
  res.json(getRecipes());
});

app.get("/recipes/:index", function (req, res) {
  const index = parseInt(req.params.index);
  const recipe = getRecipes()[index];
  if (!recipe) return res.status(404).send("No recipe number " + index);
  res.send(recipePage(recipe));
});

app.get("/search", function (req, res) {
  const ingredient = req.query.ingredient;
  const found = getRecipes().filter((recipe) => recipe.ingredients.includes(ingredient));
  res.json(found);
});

app.listen(port, function () {
  console.log("Listening on http://localhost:" + port);
});
