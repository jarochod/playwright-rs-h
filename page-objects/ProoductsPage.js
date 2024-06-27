import { expect } from "@playwright/test"
import { Navigation } from "./Navigation.js"

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
        const navigation = new Navigation(this.page)
        const basketCounterBeforeAdding = await navigation.getBasketCount()
        await specificAddButon.click()
        await expect(specificAddButon).toHaveText("Remove from Basket")
        const basketCounterAfterAdding = await navigation.getBasketCount()
        expect(basketCounterAfterAdding).toBeGreaterThan(basketCounterBeforeAdding)
    }
}