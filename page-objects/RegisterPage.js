export class RegisterPage {
    constructor(page) {
        this.page = page
        this.emailInput = page.getByPlaceholder('E-Mail')
        this.passwordInput = page.getByPlaceholder('Password')
        this.registerButton = page.getByRole('button', { name: 'Register' })
    }

    singUpAsNewUser = async () => {
        await this.emailInput.waitFor()
        await this.emailInput.fill("testymctesterson@testers.com")
        await this.passwordInput.fill("supersecretpassword")
        await this.registerButton.waitFor()
        await this.registerButton.click()
        await this.page.pause()
    }
}