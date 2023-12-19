const Page = require('./page');
const CommonHelper = require('../helperfiles/common.helper');

/**
 * sub-page containing specific selectors and methods for a specific page
 */
class HomePage extends Page {

    /**
     * define selectors using get methods
     */
    get temperature() {
        return $('#temperature');
    }

    buttonByText(buttonText) {
        return $(`//a/button[contains(text(),"${buttonText}")]`);
    }

    /**
     * define home page methods under this line.
     */

    async goToHomePageAndSelectProductTypeAccordingly() {
        await browser.url('https://weathershopper.pythonanywhere.com/');
        // getting the temperature string
        const temperatureString = await this.temperature.getText();
        // converting it to number
        let temperature = CommonHelper.getNumberFromString(temperatureString);
        if(temperature < 19) {
            await this.buttonByText('Buy moisturizers').click();
        } else if (temperature > 34) {
            await this.buttonByText('Buy sunscreens').click();
        } else {
            temperature = 0;
        }
        return temperature;
    }
}

module.exports = new HomePage();
