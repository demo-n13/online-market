import { fetchData } from "../postgres/postgres.js";

export async function createBanner(req, res) {
    const {title, image_url, product_id } = req.body;
  
    const newProduct = await fetchData(
      "INSERT INTO banner (title, image_url, product_id) VALUES ($1, $2, $3)",
      title,
      image_url,
      product_id
    );
  
    res.status(201).send({
      message: "created",
      data: newProduct,
    });
}


export async function getSingleBanner(req, res) {
    const { bannerId } = req.params;
  
    const foundedProduct = await fetchData(
      "SELECT * FROM banner WHERE id = $1",
      bannerId
    );
  
    res.send({
      message: "success",
      data: foundedProduct,
    });
  }




export async function getAllBanners(req, res) {
  
    const foundedProduct = await fetchData(
      "SELECT * FROM banner",
    );
  
    res.send({
      message: "success",
      data: foundedProduct,
    });
  }


export async function deleteBannerById(req, res) {
  const { bannerId } = req.params
    const foundedProduct = await fetchData(
      "DROP * FROM banner WHERE id = $1",
      bannerId
    );
  
    res.send({
      message: "deleted",
      data: foundedProduct,
    });
  }

