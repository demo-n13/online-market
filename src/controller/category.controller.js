import formidable from "formidable";
import { fetchData } from "../postgres/postgres.js";

const form = formidable({
  keepExtensions: true,
  uploadDir: "uploads",
});

export async function getAllCategory(req, res) {
  const parentCategories = await fetchData(
    "SELECT * FROM category WHERE category_id is null;"
  );

  for (const c of parentCategories) {
    const subCategories = await fetchData(
      "SELECT * FROM category WHERE category_id = $1",
      c.id
    );

    for (const sb of subCategories) {
      const allProducts = await fetchData(
        "SELECT * FROM product WHERE category_id = $1",
        sb.id
      );

      sb.products = allProducts;
    }

    c.subCategories = subCategories;
  }

  res.send({
    message: "success",
    data: parentCategories,
  });
}

export async function createCategory(req, res) {
  const [fields, files] = await form.parse(req);


  await fetchData(
    "INSERT INTO category (name, image_url, category_id) VALUES ($1, $2, $3)",
    fields.name[0],
    files.image_url[0].newFilename,
    fields?.category_id?.length ? fields.category_id[0] : null
  );

  res.status(201).send({
    message: "success",
  });
}


export async function updateCategory(req,res) {
  
  const [fields,files] = await form.parse(req)

  await fetchData("UPDATE category SET name = $1 , image_url = $2 , category_id = $3 WHERE id = $4",
    fields.name[0],
    files.image_url[0].newFilename,
    fields?.category_id?.length ? fields.category_id[0] : null,
    req.params?.categoryId || null
  )

  res.status(201).send({
    message: "success",
  });
}
