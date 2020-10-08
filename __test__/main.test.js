    const webdriver = require('selenium-webdriver');
    const chromedriver = require('chromedriver');
    const chrome = require('selenium-webdriver/chrome');
    const {Builder, By, until, Key } = require('selenium-webdriver');
    const SeleniumUtils = require('selenium-webdriver');
    const Facebook = require('../functionTest/login&regFB');
    const LoginEmail = require('../functionTest/loginEmail');
    const RegisterEmail = require(`../functionTest/registerEmail`);

    describe('Main Feature Test', () => {
        let driver;
        jest.setTimeout(30000);
        beforeAll(async () => {
            chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());
            driver = await new Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
            
        });

        afterAll(async () => {
            await driver.quit();
        });

        it('Register with facebook', async ()=> {
            await Facebook.registerWithFacebook(driver);
        }, 40000);

        it('login with facebook account', async ()=> {
            await Facebook.loginWithFacebook(driver);
        }, 40000);
        

        it('Positive Test Login with Email', async () => {
            await LoginEmail.loginPositive(driver);
        }, 40000);

        it('Negative Test Login with Email', async () => {
            await LoginEmail.loginNegative(driver);
        }, 40000);

        it(`Positive Test Register with Email`, async () => {
            await RegisterEmail.registerPositive(driver);
        }, 40000);

        it(`Negative Test Register with Email`, async () => {
            await RegisterEmail.registerNegative(driver);
        }, 40000);
        
    })