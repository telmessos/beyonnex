const HomePage = require('../pageobjects/home.page');
const MoisturizersPage = require('../pageobjects/moisturizers.page');
const SunscreensPage = require('../pageobjects/sunscreens.page');
const CartPage = require('../pageobjects/cart.page');

describe('Weather shopper application end to end scenario', () => {
    it('Select the least expensive products according to the temperature', async () => {
        // Checking the temperature and selecting the product type accordingly.
        const temperature = await HomePage.goToHomePageAndSelectProductTypeAccordingly();
        let elementsInCart = [];

        // Calling the necessary page according to the temperature value and adding required the cheapest products
        if(temperature < 19) {
            elementsInCart = await MoisturizersPage.addCheapestProducts();
        } else if (temperature > 34) {
            elementsInCart = await SunscreensPage.addCheapestProducts();
        } else {
            // eslint-disable-next-line no-console
            console.log('Well test must fail with the next step as there is no action to take in the requirements.');
        }

        // Verifying if the cart elements displayed and total amount is correct.
        await CartPage.verifyCartElements(elementsInCart);

        // Clicking Pay with card button
        await CartPage.payWithCardButton.click();

        // Switching to payment iframe (stripe_checkout_app)
        const iframeElement = await $('iframe[name="stripe_checkout_app"]');
        await browser.switchToFrame(iframeElement);

        // Filling the card information and clicking submit button
        await CartPage.fillInCreditCardInfo();

        // Switching back to main frame
        await browser.switchToParentFrame();

        // Verifying payment successful message displayed. (Fails the test when the transaction fails with 5%)
        await CartPage.verifyPaymentSuccessfulMessageDisplayed();
    });
});
