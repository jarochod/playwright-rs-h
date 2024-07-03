export class DeliveryDetails {
    constructor(page) {
        this.page = page

        this.firstNameInput = page.locator('[data-qa="delivery-first-name"]')
        this.lastNameInput = page.locator('[data-qa="delivery-last-name"]')
        this.streetInput = page.locator('[data-qa="delivery-address-street"]')
        this.postcodeInput = page.locator('[data-qa="delivery-postcode"]')
        this.cityInput = page.locator('[data-qa="delivery-city"]')
        this.countryDropdown = page.locator('[data-qa="country-dropdown"]')
    }

    fillDetails = async (userAddres) => {
        await this.firstNameInput.waitFor()
        await this.firstNameInput.fill(userAddres.firstName)
        await this.lastNameInput.waitFor()
        await this.lastNameInput.fill(userAddres.lastName)
        await this.streetInput.waitFor()
        await this.streetInput.fill(userAddres.street)
        await this.postcodeInput.waitFor()
        await this.postcodeInput.fill(userAddres.postcode)
        await this.cityInput.waitFor()
        await this.cityInput.fill(userAddres.city)
        await this.countryDropdown.waitFor()
        await this.countryDropdown.selectOption(userAddres.country)
        await this.page.pause()
    }
}