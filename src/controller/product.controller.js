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


export const deleteProduct = async(req,res)=>{
  const id = req.params.id

  const respons = await fetchData('DELETE FROM product WHERE id = $1',id)

  res.send({
      message : 'Deleted',
      data : respons
  })
}


export const updateProduct = async(req,res)=>{

  const id = req.params.id

  const respons = await fetchData(`
    UPDATE product
    SET name = $1 , price = $2 , rating = $3 , category_id = $4
    WHERE id = $5
  ` ,
  req.body.name,
  req.body.price,
  req.body.rating,
  req.body.category_id,
  id
)};


