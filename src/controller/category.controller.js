import fs from "fs";
import formidable from "formidable";
import { fetchData } from "../postgres/postgres.js";
import path from "path";

const form = formidable({
  keepExtensions: true,
  uploadDir: "uploads",
});

export async function getAllCategory(req, res) {
  const parentCategories = await fetchData(
    `SELECT pc.id as id, pc.name as name, pc.image_url as image_url, 
    json_agg(json_build_object('id', ch.id, 'name', ch.name, 'image_url', ch.image_url)) as subcategories 
    FROM (SELECT * FROM category WHERE category_id is null) pc 
    FULL JOIN (SELECT * FROM category WHERE category_id is not null) ch 
    ON ch.category_id = pc.id GROUP BY pc.id, pc.name, pc.image_url`
  );

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

export async function deleteCategory(req, res) {
  const { categoryId } = req.params;

  const foundedCategory = await fetchData(
    "SELECT * FROM category WHERE id = $1",
    categoryId
  );

  if (!foundedCategory.length) {
    res.status(404).send({
      message: "Category not found",
    });
    return;
  }

  if (foundedCategory[0]?.image_url) {
    fs.unlink(
      path.join(process.cwd(), "uploads", foundedCategory[0]?.image_url),
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
  }

  await fetchData("DELETE FROM category WHERE id = $1", categoryId);

  res.status(204).send();
}
