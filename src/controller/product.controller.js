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

export async function getAllProduct(req, res){
  const {filter, sort, order} = req.query;

  let query = "SELECT * FROM product"
  let queryparams = [];

  if (filter){
    query += `WHERE title ILIKE ${filter}`;
    queryparams.push(toUpperCase);
  }

  if (sort){
    query += ` ORDER BY ${sort}`;
    if (order){
      queryparams.push(toUpperCase);
    }
  }

  const allProducts = await fetchData(query, ...queryparams);


  res.send({
    message:"success",
    data:allProducts, 
  });
}

// export async function createProduct(req, res) {
//   const { title, description, price, image_url, rating, category_id } =
//     req.body;

//   const newProduct = await fetchData(
//     "INSERT INTO product (title, description, price, image_url, rating, category_id) VALUES ($1, $2, $3, $4, $5, $6)",
//     title,
//     description,
//     price,
//     image_url,
//     rating,
//     category_id
//   );

//   res.status(201).send({
//     message: "created",
//     data: newProduct,
//   });
// }
import formidable from "formidable";
import { categoryRoutes } from "../routes/category.routes.js";
const form = formidable({

  keepExtensions: true,
  uploadDir: "uploads"
}
)
export const createProduct = async (req, res) => {
  const [fields,files] = await form.parse(req)
  try{
    await fetchData('INSERT INTO product(title, description, price, image_url, rating,category_id, count) VALUES ($1,$2,$3,$4,$5,$6,$7);',
    fields.title[0],
    fields.description[0],
    fields.price[0],
    files.image_url[0].newFilename,
    fields.rating[0],
    fields.category_id[0],
    fields.count[0]
  )
  res.status(201).send({message: "successfully"})

  }catch(err){
    res.status(500).send({error: err.message})
  }

}


// title VARCHAR(255) NOT NULL,
//   description TEXT,
//   price INT NOT NULL,
//   image_url VARCHAR(255) NOT NULL,
//   rating INT NOT NULL,
//   category_id INT,
//   count INT,