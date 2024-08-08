import { fetchData } from "../postgres/postgres.js"

export async function authSignIn(req, res) {
    const { phone, password } = req.body

    const result = await fetchData(
        "SELECT * FROM users WHERE phone=$1 AND password=$2 RETURNING *",
        phone, password
    )

    if (!result) {
        res.send({
            status: 404,
            message: "User not found!"
        });
        return;
    }

    res.send({
        status: 200,
        message: "Successfully sign in",
        data: result
    })
    return;
}