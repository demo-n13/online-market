import {fetchData} from '../database/postgrel.js'

export async function getAllCategory(req,res){

    const parentCategories = await fetchData(
        "SELECT * FROM category WHERE category_id is NULL;"
    );

    console.log(parentCategories)
    for(const c of parentCategories){
        const subCategories = await fetchData(
            "SELECT * FROM category WHERE category_id = $1;",
            c.id
        );
        c.subCategories = subCategories
    }
    res.send({
        message:"Success",
        data:parentCategories
    })
}

export async function createCategory(req,res){
    const data = req.body
    console.log(req.body)
    const response = await fetchData(
        "INSERT INTO category(name,image_url) VALUES($1,$2)",
        data.name,
        data.image_url
    );
    res.send(response)
}

export async function deleteCategory(req,res){
    const data = req.body
    const response = await fetchData(
        "DELETE FROM category WHERE id = $1",
        data.id
    )
    res.send(response)
}


export async function updateCategory(req,res){
    const data = req.body
    const response = await fetchData(
        "UPDATE category SET name = $1, image_url = $2 WHERE id = $3",
        data.name,
        data.image_url,
        data.id
    )
    res.send(response)
}

