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

















export async function deleteProduct(req,res) {
  const { productId } = req.params;

  const result = await fetchData('DELETE FROM products WHERE id = $1',productId)

  if (result.rows.length === 0) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.json({ message: 'Product deleted successfully' });
}



export async function updateProductPatch(req,res) {
  const { productId } = req.params;
  const updates = req.body;

  const setClause = Object.keys(updates)
    .map((key, idx) => `${key} = $${idx + 1}`)
    .join(', ');

  const values = Object.values(updates);

  const result = await fetchData(`UPDATE products SET ${setClause} WHERE id = $${values.length + 1} RETURNING *`,...values , productId)

  if (result.rows.length === 0) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.json(result.rows[0]);
}