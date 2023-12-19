const allure = require('allure-commandline');
exports.config = {
    runner: 'local',
    specs: ['./test/specs/**/*.spec.js'],
    exclude: [],
    maxInstances: 1,
    capabilities: [
        {
            maxInstances: 2,
            browserName: 'chrome',
            'goog:chromeOptions': {
                args: ['headless', 'disable-gpu']
            },
            acceptInsecureCerts: true,
        },
    ],
    logLevel: 'warn',
    bail: 0,
    baseUrl: 'https://weathershopper.pythonanywhere.com/',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: ['chromedriver'],
    before: async function () {
        await browser.maximizeWindow();
    },
    afterEach: async function (
        step,
        scenario,
        { error, duration, passed },
        context,
    ) {
        if (error) {
            await browser.takeScreenshot();
        }
    },
    framework: 'mocha',
    reporters: [
        'spec',
        [
            'allure',
            {
                outputDir: 'allure-results',
                disableWebdriverStepsReporting: false,
                disableWebdriverScreenshotsReporting: false,
            },
        ],
    ],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000,
    },

    // onComplete Allure will be executed
    onComplete: function () {
        const reportError = new Error('Could not generate Allure report');
        const generation = allure(['generate', 'allure-results', '--clean']);
        return new Promise((resolve, reject) => {
            const generationTimeout = setTimeout(
                () => reject(reportError),
                5000,
            );

            generation.on('exit', function (exitCode) {
                clearTimeout(generationTimeout);

                if (exitCode !== 0) {
                    return reject(reportError);
                }

                // eslint-disable-next-line no-console
                console.log('Allure report successfully generated');
                resolve();
            });
        });
    },
};
