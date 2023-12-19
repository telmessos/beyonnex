const Page = require('./page');
const CommonPage = require('./common.page');
class SunscreensPage extends Page {
    /**
     * define page methods under this line.
     */
    async addCheapestProducts() {
        // Getting the cheapest aloe amount
        const cheapestSpfFifty = await CommonPage.getCheapestProductWithText('spf-50');

        //Clicking the add button for the product with this amount
        await CommonPage.addButtonWithOnclickText(cheapestSpfFifty[1]).click();

        // Getting the cheapest almond amount
        const cheapestSpfThirty = await CommonPage.getCheapestProductWithText('spf-30');

        // Clicking the add button for the product with this amount
        await CommonPage.addButtonWithOnclickText(cheapestSpfThirty[1]).click();

        // Clicking on cart button
        await CommonPage.cartLink.click();
        return cheapestSpfFifty.concat(cheapestSpfThirty);
    }
}

module.exports = new SunscreensPage();