import { test } from "@playwright/test"
import { MyAccountPage } from "../page-objects/MyAccountPage.js"
import { getLoginToken } from "../api-calls/getLoginToken.js"

test.only("My Account using cookie injection", async ({ page }) => {
    // Make a request to get login token
    const loginToken = await getLoginToken()
    console.warn({loginToken})
    // Inject the login into the browser
    const myAccount = new MyAccountPage(page)
    await myAccount.visit()
})