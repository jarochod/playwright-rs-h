import { test} from "@playwright/test"
import { ProductsPage } from "../page-objects/ProoductsPage.js"
import { Navigation } from "../page-objects/Navigation.js"
import { Checkout } from "../page-objects/Checkout.js"
import { LoginPage } from "../page-objects/LoginPage.js"

test.only("New user full end-to-end test journey", async ({ page }) => {
    // ProductsPage.visit()
    const productsPage = new ProductsPage(page)
    await productsPage.visit()
    await productsPage.sortBuyCheapest()
    await productsPage.addProductToBasket(0)
    await productsPage.addProductToBasket(1)
    await productsPage.addProductToBasket(2)
    const navigation = new Navigation(page)
    await navigation.goToCheckout()
    const checkout = new Checkout(page)
    await checkout.removeChipestProduct()
    await checkout.continueToCheckout()
    const login = new LoginPage(page)
    await login.moveToSignup()
})