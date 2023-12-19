const Page = require('./page');
const CommonHelper = require('../helperfiles/common.helper');
class CommonPage extends Page {
    /**
     * define selectors using get methods
     */

    lowercaseMatchingXpathForAddButton(textToCheck) {
        return `//button[contains(translate(@onclick, "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz"), "${textToCheck}")]`;
    }
    addButtonsWithOnclickText(textToCheck) {
        return $$(this.lowercaseMatchingXpathForAddButton(textToCheck));
    }

    addButtonWithOnclickText(textToCheck) {
        return $(this.lowercaseMatchingXpathForAddButton(textToCheck));
    }

    get cartLink() {
        return $('button*=Cart');
    }

    /**
     * define page methods under this line.
     */

    async getCheapestProductWithText(textToCheck) {
        let i = 0;
        let cheapestPrice = 0;
        let currentPrice = 0;
        let onclickText = '';
        let elementName = '';
        let elementList = await this.addButtonsWithOnclickText(textToCheck);

        for (const element of elementList) {
            // Splitting the element onclick text from comma.
            onclickText = (await element.getAttribute('onclick')).split(',');

            // Passing the second one to get the price from string.
            currentPrice = CommonHelper.getNumberFromString(onclickText[1]);

            // Looping each element to check if the new price is lower than the current. If it is current is set to new.
            if (i == 0) {
                cheapestPrice = currentPrice;
                elementName = onclickText[0].match(/'([^']+)'/)[1];
            } else {
                if(currentPrice < cheapestPrice) {
                    cheapestPrice = currentPrice;
                    elementName = onclickText[0].match(/'([^']+)'/)[1];
                }
            }
            i++;
        }
        return [elementName, cheapestPrice];
    }
}

module.exports = new CommonPage();