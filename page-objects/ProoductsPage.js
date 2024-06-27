import { expect } from "@playwright/test"
import { NavigationPage } from "./NavigationPage.js"

export class ProductsPage {
    constructor(page) {
        this.page = page

        this.addButtons = page.locator('[data-qa="product-button"]')
    }

    visit = async () => {
        await this.page.goto("/")
    }

    addProductToBasket = async (index) => {
        const specificAddButon = this.addButtons.nth(index)
        await specificAddButon.waitFor()
        await expect(specificAddButon).toHaveText("Add to Basket")
        const navigationPage = new NavigationPage(this.page)
        const basketCounterBeforeAdding = await navigationPage.getBasketCount()
        await specificAddButon.click()
        await expect(specificAddButon).toHaveText("Remove from Basket")
        const basketCounterAfterAdding = await navigationPage.getBasketCount()
        expect(basketCounterAfterAdding).toBeGreaterThan(basketCounterBeforeAdding)
    }
}