  import { fetchData } from "../postgres/postgres.js";
  import { CUSTOMER_LIMIT, CUSTOMER_PAGE } from "../constants/customer.constants.js";



  export async function getCustomerData(req, res){
    const { page, limit } = req.query;

    if (!(Number(page) && Number(limit))){
      res.status(400).send({ message: `invalid page:${page} or limit:${limit}` });
      return;
    }
    const offset = page ? (page-1)*limit : CUSTOMER_PAGE;
    const  customerLimit = limit || CUSTOMER_LIMIT;
    const allCustomerData = await fetchData(
      "SELECT * FROM customer LIMIT $1 OFFSET $2",
      customerLimit, offset
    )
    
    const count = await fetchData(
      "SELECT COUNT(*)::int FROM customer"
    )

  res.send({
    message: 'ok',
    data: allCustomerData,
    count: count[0].count
  })
  }
