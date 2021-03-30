    const webdriver = require('selenium-webdriver');
    const chromedriver = require('chromedriver');
    const chrome = require('selenium-webdriver/chrome');
    const firefox = require('selenium-webdriver/firefox');
    const {Builder, By, until, Key, WebElement } = require('selenium-webdriver');
    const SeleniumUtils = require('selenium-webdriver');
    const Facebook = require('../functionTest/login&regFB');
    const LoginEmail = require('../functionTest/loginEmail');
    const RegisterEmail = require(`../functionTest/registerEmail`);
    const {playVideo, playResumeVideo, checkingSubtitle} = require('../functionTest/playVideo');
    const LoginWithGoogle = require('../functionTest/loginWithGoogle');
    const CheckCarousel = require('../functionTest/carousel');
    const AccountPage = require('../pageTest/account');

    describe('Main Feature Test', () => {
        let driver;
        jest.setTimeout(30000);
        beforeAll(async () => {
            chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());
            driver = await new Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
            
        })
        afterAll(async () => {
            await driver.quit();
        });

        // it('Register with facebook', async ()=> {
        //     await Facebook.registerWithFacebook(driver);
        // }, 40000);

        // it('login with facebook account', async ()=> {
        //     await Facebook.loginWithFacebook(driver);        
        // }, 40000);
        

        // it('Positive Test Login with Email', async () => {
        //     await LoginEmail.loginPositive(driver);
        // }, 40000);

        // it('Negative Test Login with Email', async () => {
        //     await LoginEmail.loginNegative(driver);
        // }, 40000);

        // it(`Positive Test Register with Email`, async () => {
        //     await RegisterEmail.registerPositive(driver);
        // }, 40000);

        // it(`Negative Test Register with Email`, async () => {
        //     await RegisterEmail.registerNegative(driver);
        // }, 40000);

        // it(`Login With Google`, async () => {
        //     await LoginWithGoogle(driver);
        // }, 60000);

        // it('Positive Test Play Video', async () => {
        //     await playVideo(driver);
        // }, 40000);

        // it('Positive Test  Play Resume Video', async () => {
        //     await playResumeVideo(driver);
        // }, 3000000);

        // it(`Checking subtitle`, async () => {
        //        await checkingSubtitle(driver);
        // }, 40000)
        
        // it(`Checking Carousel`, async () => {
        //     await CheckCarousel(driver);
        // }, 40000);

        it(`[Page Test] Account Page`, async () => {
            await AccountPage.TabMyAccount(driver)
        }, 40000);
    })