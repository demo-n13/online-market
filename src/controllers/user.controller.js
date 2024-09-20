import {fetchData} from '../database/postgrel.js'
import { readFileCustom } from '../utils/fs.js';
export async function getAllUser(req,res){
    const response = await fetchData(
        "SELECT * FROM custumers"
    );
    res.send(response)
}

export async function createUser(req,res){
    const data = req.body
    const response = await fetchData(
        "INSERT INTO custumers(full_name,email,password) VALUES($1,$2,$3)",
        data.full_name,
        data.email,
        data.password
    );

    const products = JSON.parse(readFileCustom('products.json'));
    res.render('index_2', { data: products });
}