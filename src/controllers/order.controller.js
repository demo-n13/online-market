import { fetchData } from "../database/postgrel.js";

export async function gettAllOrder(req, res) {
    const response = await fetchData("SELECT * FROM orders");
    res.send(response);
}

export async function getCustumerOrders(req, res) {
    const response = await fetchData(
        "SELECT * FROM orders WHERE id = $1",
        req.params.id
    );
    res.send(response);
}

export async function deleteOrder(req, res) {
    const orderId = req.params;
    const response = await fetchData(
        "DELETE FROM orders WHERE id = $1 returning *",
        orderId
        );
    res.send(response);
}