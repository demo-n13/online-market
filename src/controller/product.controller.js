import { fetchData } from "../postgres/postgres.js";

export async function getProductsByCategory(req, res) {
  const { categoryId } = req.params;

  const foundedProducts = await fetchData(
    "SELECT * FROM product WHERE category_id = $1",
    categoryId
  );

  res.send({
    message: "success",
    data: foundedProducts,
  });
}

export async function getSingleProduct(req, res) {
  const { productId } = req.params;

  const foundedProduct = await fetchData(
    "SELECT * FROM product WHERE id = $1",
    productId
  );

  res.send({
    message: "success",
    data: foundedProduct,
  });
}

export async function createProduct(req, res) {
  const { title, description, price, image_url, rating, category_id } =
    req.body;

  const newProduct = await fetchData(
    "INSERT INTO product (title, description, price, image_url, rating, category_id) VALUES ($1, $2, $3, $4, $5, $6)",
    title,
    description,
    price,
    image_url,
    rating,
    category_id
  );

  res.status(201).send({
    message: "created",
    data: newProduct,
  });
}

export async function deleteProduct(req, res) {
  const { id } = req.params;
  const response = await fetchData("DELETE FROM products WHERE id = $1", id);
  if (response.rowCount === 0) {
      res.status(404).send({ message: "Product not found" });
  } else {
      res.send({ message: "Product deleted successfully" });
  }
}



export async function updateProduct(req, res) {
  const { id } = req.params;
  const data = req.body;
  const response = await fetchData(
      "UPDATE products SET title = $1, description = $2, price = $3, image_url = $4, rating = $5, category_id = $6 WHERE id = $7",
      data.title,
      data.description,
      data.price,
      data.image_url,
      data.rating,
      data.category_id,
      id
  );
  if (response.rowCount === 0) {
      res.status(404).send({ message: "Product not found" });
  } else {
      res.send(response);
  }
}

