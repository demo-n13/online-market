import { fetchData } from "../postgres/postgres.js"

export async function authSignUp(req, res) {
    const { name, phone, password } = req.body;

    const result = await fetchData(
        "INSERT INTO users (name, phone, password) VALUES ($1, $2, $3) RETURNING *",
        name, phone, password
    )

    res.send({
        status: 201,
        message: "Successfully sign up",
        data: result
    })
    return;
}
