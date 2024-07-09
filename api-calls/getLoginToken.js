import * as nodeFetch from "node-fetch"
export const getLoginToken = async () => {
    const reponse = await nodeFetch("http://localhost:2221/api/login", {
        metod: "POST",
        body: {"username": "admin", "password": "Admin123"}
    })
}