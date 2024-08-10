import { fetchData } from "../postgres/postgres.js";

export async function getProductsByCategory(req, res) {
    const categoryId = Number(req.params.categoryId)

    const foundedProducts = await fetchData(
        `SELECT * FROM product
        WHERE category_id = $1`,
        categoryId
    )

    if(!foundedProducts.length){
        res.status(404).send({
            message: "No products were found in the selected category"
        })
        return;
    }

    res.send({
        message: "succes",
        data: foundedProducts
    })
}

export async function getProduct(req, res) {
    const productId = Number(req.params.productId)

    const foundedProduct = await fetchData(
        `SELECT * FROM product WHERE id = $1`,
        productId
    );

    if(!foundedProduct.length){
        res.status(404).send({
            message: "Product not found"
        })
        return;
    }

    res.send({
        message: "succes",
        data: foundedProduct,
    });
}

export async function getAllProduct(req, res) {

    const foundedProducts = await fetchData(`SELECT * FROM product`);

    if(!foundedProducts.length){
        res.status(404).send({
            message: "No products found"
        })
        return;
    }

    res.send({
        message: "succes",
        data: foundedProducts,
    });
}

export async function createProduct(req, res) {
    const { title, description, price, image_url, rating, category_id } = req.body;

    const newProduct = await fetchData(
        `
        INSERT INTO product (title, description, price, image_url, rating, category_id)
        VALUES ($1, $2, $3, $4, $5, $6)
        `,
        title,
        description,
        price,
        image_url,
        rating,
        category_id
    );

    res.status(201).send({
        message: "Data created successfully",
    });
}

export async function updateProduct(req, res) {

    const updatedData = req.body
    const productId = Number(req.params.productId)

    const response = await fetchData(`
        UPDATE product
        SET title = $1, description = $2, price = $3, image_url = $4, rating = $5, category_id = $6
        WHERE id = $7
        `,
        updatedData.title, updatedData.description, updatedData.price, updatedData.image_url,
        updatedData.rating, updatedData.category_id, productId
    )

    res.send("Data updated successfully")
}

export async function removeProduct(req, res){
    const productId = Number(req.params.productId)

    fetchData(`
        DELETE FROM product
        WHERE id = $1
        `, productId)

    res.send("Data deleted successfully")
}

export async function removeAllProduct(req, res){
    fetchData(`
        TRUNCATE TABLE product
        `)

    res.send("All data deleted successfully")
}