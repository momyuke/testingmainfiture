const { By, until} = require('selenium-webdriver');
const {emailGenflix, passGenflix} = require('../env');
const sleep = require('../utilities/sleep');



const LoginWithGoogle = async (driver) => {
    let originalWindow = await driver.getWindowHandle();
    await driver.get("https://medium.com");
    let buttonSignInMedium = By.xpath(`//*[@id="top-nav-sign-in-cta-desktop"]/div/p/span/a`);
    await driver.wait(until.elementLocated(buttonSignInMedium), 20000);
    await driver.findElement(buttonSignInMedium).click();

    let buttonSignInGoogle = By.xpath(`//*[@id="susi-modal-google-button"]/a`);
    await driver.wait(until.elementLocated(buttonSignInGoogle), 20000);
    await driver.findElement(buttonSignInGoogle).click();

    await driver.wait(until.elementLocated(By.id("identifierId")), 10000);
    await driver.findElement(By.id("identifierId")).sendKeys("teguh.triprasetya@sinarmasmining.com\n")
    
    let inputPassword = By.xpath(`//input[@name="password"]`)
    await driver.wait(until.elementLocated(inputPassword), 10000);
    await expect(driver.findElement(inputPassword)).toBeTruthy()
    await sleep(5000);
    await driver.findElement(inputPassword).sendKeys("Teguh121@!\n");
    await sleep(5000);

    await driver.get("https://genflix.co.id/login");
    let buttonGoogle = By.xpath(`//*[@id="root"]/div[2]/button[4]`);
    await driver.wait(until.elementLocated(buttonGoogle), 20000);
    await driver.findElement(buttonGoogle).click();
   
    let AllWindows = await driver.getAllWindowHandles();
    await driver.switchTo().window(AllWindows[1])
    let accountLogged = By.xpath(`//*[@id="view_container"]/div/div/div[2]/div/div[1]/div/form/span/section/div/div/div/div/ul/li[1]/div`);

    await sleep(5000);
    console.log(await driver.getWindowHandle())
    console.log(originalWindow);
    await driver.findElement(accountLogged).click();
    await driver.switchTo().window(originalWindow);

    

    //cause we have been logged to facebook before. So we dont have to login to facebook anymore
    //So, we just have to wait icon profile is show up
    const iconPath = By.xpath(`//*[@id="root"]/div[1]/ul[2]/li[2]/img`);
    await driver.wait(until.elementLocated(iconPath), 15000);
    await driver.findElement(iconPath).click();

    
    //And then logout
    let buttonLogout = By.xpath(`//*[@id="root"]/div[1]/div[2]/div[2]/div[4]/div[2]/img`);
    await driver.findElement(buttonLogout).click();
}

module.exports = LoginWithGoogle;