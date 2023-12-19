const Page = require('./page');
const CommonPage = require('../pageobjects/common.page');
class MoisturizersPage extends Page {
    /**
     * define page methods under this line.
     */

    async addCheapestProducts() {
        // Getting the cheapest aloe amount
        const cheapestAloe = await CommonPage.getCheapestProductWithText('aloe');
        //Clicking the add button for the product with this amount
        await CommonPage.addButtonWithOnclickText(cheapestAloe[1]).click();
        // Getting the cheapest almond amount
        const cheapestAlmond = await CommonPage.getCheapestProductWithText('almond');
        //Clicking the add button for the product with this amount
        await CommonPage.addButtonWithOnclickText(cheapestAlmond[1]).click();
        // Clicking on cart button
        await CommonPage.cartLink.click();
        return cheapestAlmond.concat(cheapestAloe);
    }
}

module.exports = new MoisturizersPage();