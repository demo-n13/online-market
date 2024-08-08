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


export const deleteCategory = async(req,res)=>{
  const id = req.params.id

  const respons = await fetchData('DELETE FROM category WHERE id = $1',id)

  res.send({
      message : 'Deleted',
      data : respons
  })
}


export const updateCategory = async(req,res)=>{

  const id = req.params.id
  const {name} = req.body

  const respons = await fetchData(`
    UPDATE category
    SET name = $1
    WHERE id = $2
  `,name,id)

  res.send({
      message : 'Updated',
      data : respons
  })
}
