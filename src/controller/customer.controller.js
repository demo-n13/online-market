import { fetchData } from "../postgres/postgres.js";
import { unlink } from "fs";
import path from "path";
import {
  CUSTOMER_LIMIT,
  CUSTOMER_PAGE,
} from "../constants/customer.constants.js";
import formidable from "formidable";

const form = formidable({
  keepExtensions: true,
  uploadDir: "uploads",
});

export const createCustomer = async function (req, res) {
  const [fields, files] = await form.parse(req);

  await fetchData(
    `INSERT INTO customer 
      (full_name,email,phone_number,password,image_url)
      VALUES ($1,$2,$3,$4,$5)`,
    fields.full_name[0],
    fields.email[0],
    fields.phone_number[0],
    fields.password[0],
    files.image_url ? files.image_url[0].newFilename : undefined
  );

  res.status(201).send({
    message: "Customer created",
  });
};

export async function getCustomerData(req, res) {
  const { page, limit } = req.query;

  if (!(Number(page) && Number(limit))) {
    res.status(400).send({ message: `invalid page:${page} or limit:${limit}` });
    return;
  }
  const offset = page ? (page - 1) * limit : CUSTOMER_PAGE;
  const customerLimit = limit || CUSTOMER_LIMIT;
  const allCustomerData = await fetchData(
    "SELECT * FROM customer LIMIT $1 OFFSET $2",
    customerLimit,
    offset
  );

  const count = await fetchData("SELECT COUNT(*)::int FROM customer");

  res.send({
    message: "ok",
    count: count[0].count,
    data: allCustomerData,
  });
}

export async function updateCustomer(req, res) {
  const currentCustomerId = req.params?.customerId;
  const [fields, files] = await form.parse(req);


  const currentCustomer = await fetchData(
    "SELECT * FROM customer WHERE id=$1",
    currentCustomerId
  );
  let currentCustomerImage = currentCustomer[0].image_url;

  if (files.image_url) {
    unlink(path.join(process.cwd(), "uploads", currentCustomerImage), (err) => {
      console.log(err);
    });
    currentCustomerImage = files.image_url[0].newFilename;
  }

  const response = await fetchData(
    `UPDATE customer SET 
    full_name = $1,
    email = $2,
    phone_number = $3,
    password = $4,
    image_url = $5 WHERE id = $6`,
    fields.full_name ? fields.full_name[0] : currentCustomer[0].full_name,
    fields.email ? fields.email[0] : currentCustomer[0].email,
    fields.phone_number
      ? fields.phone_number[0]
      : currentCustomer[0].phone_number,
    fields.password ? fields.password[0] : currentCustomer[0].password,
    currentCustomerImage ? currentCustomerImage : undefined,
    currentCustomerId
  );

  res.status(200).send({ message: "updated" });
}

export async function deleteCustomer(req, res) {
  const { customerId } = req.params;

  const deleteCustomer = await fetchData(
    "SELECT * FROM customer WHERE id = $1",
    customerId
  );
  await fetchData("DELETE FROM customer WHERE id = $1 RETURNING *", customerId);

  // if(deleteCustomer[0].image_url){
  //   unlink(path.join(process.cwd(),"uploads",deleteCustomer[0].image_url),(err)=>{console.log(err)})

  // }
  res.status(200).send({
    message: "deleted",
    data: deleteCustomer,
  });
}
