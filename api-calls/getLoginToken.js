import * as nodeFetch from "node-fetch"

export const getLoginToken = async () => {
    const reponse = await nodeFetch("http://localhost:2221/api/login", {
        method: "POST",
        body: JSON.stringify({"username":"admin","password":"Admin123"}),
    })
    if (reponse.status != 200) {
        throw new Error("An error occured trying to retrieve the login token.")
    }
    const body = await reponse.json()
    return body.token
}