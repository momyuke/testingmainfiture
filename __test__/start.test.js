const webdriver = require('selenium-webdriver');
const chromedriver = require('chromedriver');
const chrome = require('selenium-webdriver/chrome');
const {Builder, By, until} = require('selenium-webdriver');

describe('Template Testing', () => {
    let driver;
    jest.setTimeout(30000);
    beforeAll(async () => {
        chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());
        driver = await new Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
    });

    afterAll(async () => {
        await driver.quit();
    });

    it('test get title', async ()=> {
        await driver.get("https://genflix.co.id");
        let title = await driver.getTitle();
        expect(title).toEqual("Genflix");
    }, 30000);
});