import { fetchData } from "../postgres/postgres.js";

export async function getCategory(req, res){
    const categoryId = Number(req.params.categoryId)

    const selectedCategory = await fetchData(
        `SELECT * FROM category
        WHERE id = $1`,
        categoryId
    )

    res.send({
        message: "succes",
        data: selectedCategory,
    });
}

export async function getAllCategory(req, res){
    const allCategories = await fetchData("SELECT * FROM category ORDER BY id")

    res.send({
        message: "succes",
        data: allCategories,
    });
}

export async function createCategory(req, res) {
    const data = req.body;

    const response = await fetchData(
        "INSERT INTO category(name, image_url) VALUES ($1, $2)",
        data.name,
        data.image_url
    );

    res.send("Data created successfully")
}

export async function updateCategory(req, res) {
    const updatedData = req.body
    const categoryId = Number(req.params.categoryId)
    
    const response = await fetchData(
        `UPDATE category 
        SET name = $1, image_url = $2 
        WHERE id = $3`,
        updatedData.name,
        updatedData.image_url,
        categoryId
    )

    res.send("Data updated successfully")
}

export async function removeCategory(req, res) {
    const categoryId = Number(req.params.categoryId)

    const response = await fetchData(
        `DELETE FROM category
        WHERE id = $1`,
        categoryId
    )

    res.send("Data deleted successfully")
}

export async function removeAllCategory(req, res) {
    const response = await fetchData(
        `DELETE FROM category`
    )

    res.send("All data deleted successfully")
}