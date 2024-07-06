import { test} from "@playwright/test"
import { v4 as uuidv4 } from 'uuid'
import { ProductsPage } from "../page-objects/ProoductsPage.js"
import { Navigation } from "../page-objects/Navigation.js"
import { Checkout } from "../page-objects/Checkout.js"
import { LoginPage } from "../page-objects/LoginPage.js"
import { RegisterPage } from "../page-objects/RegisterPage.js"
import { DeliveryDetails } from "../page-objects/DeliveryDetails.js"
import { deliveryDetails as userAddres } from "../data/deliveryDetalis.js"
import { PaymentPage } from "../page-objects/PaymentPage.js"
import { paymentDetails } from "../data/paymentDetails.js"

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

    const registerPage = new RegisterPage(page)
    const email = uuidv4() + "gmail.com"
    const password = uuidv4()
    await registerPage.singUpAsNewUser(email,password)

    const deliveryDetails = new DeliveryDetails(page)
    await deliveryDetails.fillDetails(userAddres)
    await deliveryDetails.saveDetails()
    await deliveryDetails.continueToPayment()

    const paymentPage = new PaymentPage(page)
    await paymentPage.activateDiscount()
    await paymentPage.fillPaymentDetails(paymentDetails)
})