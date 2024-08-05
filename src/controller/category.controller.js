import { fetchData } from "../postgres/postgres.js";

export async function getAllCategory(req, res) {
  const allCategories = await fetchData("SELECT * FROM category;");

  res.send({
    message: "success",
    data: allCategories,
  });
}

export async function createCategory(req, res) {
  const data = req.body;

  const response = await fetchData(
    "INSERT INTO category (name, image_url) VALUES ($1, $2)",
    data.name,
    data.image_url
  );

  res.send(response);
}
