import { fetchData } from "../postgres/postgres.js";

export async function getAllCategory(req, res) {

  const parentCategories = await fetchData(
    "SELECT * FROM category WHERE category_id is null;"
  );

  for (const c of parentCategories) {
    const subCategories = await fetchData(
      "SELECT * FROM category WHERE category_id = $1",
      c.id
    );

    for(const sb of subCategories) {
      const allProducts = await fetchData("SELECT * FROM product WHERE category_id = $1", sb.id)

      sb.products = allProducts
    }

    c.subCategories = subCategories;
  }


  res.send({
    message: "success",
    data: parentCategories,
  });
}

export async function createCategory(req, res) {
  const data = req.body;

  const response = await fetchData(
    "INSERT INTO category (name, image_url, category_id) VALUES ($1, $2, $3)",
    data.name,
    data.image_url,
    data?.categoryId
  );

  res.send(response);
}
