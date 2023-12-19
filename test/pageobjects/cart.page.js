const Page = require('./page');
class CartPage extends Page {
    /**
     * define selectors using get methods
     */

    get cartPageHeader() {
        return $('h2=Checkout');
    }

    get payWithCardButton() {
        return $('//button/span[text()="Pay with Card"]');
    }
    get cartEmail() {
        return $('#email');
    }

    get cartCardNumber() {
        return $('#card_number');
    }

    get cartCardExpiry() {
        return $('#cc-exp');
    }

    get cartCardCvc() {
        return $('#cc-csc');
    }

    get cartZipCode() {
        return $('#billing-zip');
    }

    get cartCardSubmitButton() {
        return $('#submitButton');
    }

    get paymentSuccessfulParagraph() {
        return $('p*=Your payment was successful. You should receive a follow-up call from our sales team.');
    }

    get paymentSuccessfulHeader() {
        return $('h2*=PAYMENT SUCCESS');
    }
    itemWithTitleAndPrice(title, price) {
        return $(`//td[text()='${title}']/following-sibling::td[text()='${price}']`);
    }

    totalAmountInRupees(amount) {
        const totalInRupees = `p=Total: Rupees ${amount}`;
        return $(totalInRupees);
    }

    /**
     * define page methods under this line.
     */
    async verifyCartElements(elementsInCart) {
        // Verifying page header to be displayed
        await expect(this.cartPageHeader).toBeDisplayed();

        // Verifying the selected items displayed
        const firstItemElement = await this.itemWithTitleAndPrice(elementsInCart[0], elementsInCart[1]);
        await expect(firstItemElement).toBeDisplayed();
        const secondItemElement = await this.itemWithTitleAndPrice(elementsInCart[2],elementsInCart[3]);
        await expect(secondItemElement).toBeExisting();

        // Verifying total amount written correctly
        const totalAmount = elementsInCart[1] + elementsInCart[3];
        await expect(this.totalAmountInRupees(totalAmount)).toBeDisplayed();
    }

    async fillInCreditCardInfo() {
        await this.cartEmail.setValue('dummyemail@gmail.com');
        await this.cartCardNumber.setValue('4012');
        await this.cartCardNumber.addValue('8888');
        await this.cartCardNumber.addValue('8888');
        await this.cartCardNumber.addValue('1881');
        await this.cartCardExpiry.setValue('04');
        await this.cartCardExpiry.addValue('30');
        await this.cartCardCvc.setValue('321');
        await this.cartZipCode.waitForExist();
        await this.cartZipCode.setValue('06670');
        await this.cartCardSubmitButton.click();
    }

    async verifyPaymentSuccessfulMessageDisplayed() {
        // Verifying success header displayed
        await expect(this.paymentSuccessfulHeader).toBeDisplayed();

        // Verifying success paragraph displayed
        await expect(this.paymentSuccessfulParagraph).toBeDisplayed();
    }
}

module.exports = new CartPage();