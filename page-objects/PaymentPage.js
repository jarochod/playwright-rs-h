import { expect } from "@playwright/test"

export class PaymentPage {
    constructor(page) {
        this.page = page

        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]')
                                .locator('[data-qa="discount-code"]')
        this.discountInput = page.getByPlaceholder('Discount code')
        this.activateDiscountButton = page.locator('[data-qa="submit-discount-button"]')
        this.totalValue = page.locator('[data-qa="total-value"]')
        this.discountedValue = page.locator('[data-qa="total-with-discount-value"]')
        this.discountActiveMessage = page.locator('[data-qa="discount-active-message"]')
    }

    activateDiscount = async () => {
        await this.discountCode.waitFor()
        const code = await this.discountCode.innerText()
        await this.discountInput.waitFor()

        // Option 1 for laggy inputs: using .fill() with await expect()
        await this.discountInput.fill(code)
        await expect(this.discountInput).toHaveValue(code)
        // Option 2 for laggy inputs: slow typing
        // await this.discountInput.focus()
        // await this.page.keyboard.type(code, {delay: 1000})
        // expect(await this.discountInput.inputValue()).toBe(code)
        expect(await this.discountActiveMessage.isVisible()).toBe(false)
        expect(await this.discountedValue.isVisible()).toBe(false)
        await this.activateDiscountButton.waitFor()
        await this.activateDiscountButton.click()
        //check that it display "Discount activated"
        await this.discountActiveMessage.waitFor()
        //check that there is now a discounted price total showing
        await this.discountedValue.waitFor()
        const discountValueText = await this.discountedValue.innerText()
        const discountValueOnlyStringNumber = discountValueText.replace("$","")
        const discountValueOnlyNumber = parseInt(discountValueOnlyStringNumber, 10)

        await this.totalValue.waitFor()
        const totalValueText = await this.totalValue.innerText()
        const totalValueOnlyStringNumber = totalValueText.replace("$","")
        const totalValueOnlyNumber = parseInt(totalValueOnlyStringNumber, 10)

        //check that the discounted price total is smaller than the regular one
        expect(discountValueOnlyNumber).toBeLessThan(totalValueOnlyNumber)

        //short version
        const totalValueOnlyNumber_ = parseInt((await this.totalValue.innerText()).replace("$",""), 10)
        console.log(totalValueOnlyNumber_)
        const discountValueOnlyNumber_ = parseInt((await this.discountedValue.innerText()).replace("$",""), 10)
        console.log(discountValueOnlyNumber_)
        //check that the discounted price total is smaller than the regular one
        expect(discountValueOnlyNumber_).toBeLessThan(totalValueOnlyNumber_)
    }
}