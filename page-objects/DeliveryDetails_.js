export class DeliveryDetails {
    constructor(page) {
        this.page = page

        this.firstNameInput = page.getByPlaceholder('First name')
        this.lastNameInput = page.getByPlaceholder('Last name')
        this.streetInput = page.getByPlaceholder('Street')
        this.postCodeInput = page.getByPlaceholder('Post code')
        this.cityInput = page.getByPlaceholder('City')
        this.cityList=page.locator('[data-qa="country-dropdown"]')
        this.continueToPaymentButton = page.getByRole('button', { name: 'Continue to payment' })
    }

    fillDetails = async () => {
        await this.firstNameInput.waitFor()
        await this.firstNameInput.fill("FirstName")
        await this.lastNameInput.waitFor()
        await this.lastNameInput.fill("LastName")
        await this.streetInput.waitFor()
        await this.streetInput.fill("Street")
        await this.postCodeInput.waitFor()
        await this.postCodeInput.fill("80354")
        await this.cityInput.waitFor()
        await this.cityInput.fill("City")
        await this.cityList.waitFor()
        await this.cityList.selectOption("Poland")
        await this.continueToPaymentButton.waitFor()
        await this.continueToPaymentButton.click()
    }
}