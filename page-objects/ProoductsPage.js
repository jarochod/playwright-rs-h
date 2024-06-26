import { expect } from "@playwright/test"

export class ProductsPage {
    constructor(page) {
        this.page = page

        this.addButtons = page.locator('[data-qa="product-button"]')
        this.basketCounter = page.locator('[data-qa="header-basket-count"]')
    }

    visit = async () => {
        await this.page.goto("/")
    }

    getBasketCount = async () => {
        await this.basketCounter.waitFor()
        const text = await this.basketCounter.innerText()
        return parseInt(text, 10)
    }

    addProductToBasket = async (index) => {
        const specificAddButon = this.addButtons.nth(index)
        await specificAddButon.waitFor()
        await expect(specificAddButon).toHaveText("Add to Basket")
        const basketCounterBeforeAdding = await this.getBasketCount()
        await specificAddButon.click()
        await expect(specificAddButon).toHaveText("Remove from Basket")
        const basketCounterAfterAdding = await this.getBasketCount()
        expect(basketCounterAfterAdding).toBeGreaterThan(basketCounterBeforeAdding)
    }
}