const { By, until} = require('selenium-webdriver');
const {emailGenflix, passGenflix} = require('../env');

const loginPositive = async (driver) => {
    //open the browser and search genflix web on login with email page
    await driver.get("https://genflix.co.id/login/email");

    //validate the page with check the title
    let title = await driver.getTitle();
    expect(title).toEqual("Genflix");

    //Wait the browser load the whole content
    let pathEmail = By.xpath(`//*[@id="email"]`);
    let pathPassword = By.xpath(`//*[@id="password"]`);
    await driver.wait(until.elementLocated(pathEmail), 15000);

    //type email and password and then click the login Button
    //update the password if the password has been changed.
    await driver.findElement(pathEmail).sendKeys(emailGenflix);
    await driver.findElement(pathPassword).sendKeys(`${passGenflix}\n`);

    //wait until user is logged
    let iconProfile = By.xpath(`//*[@id="root"]/div[1]/ul[2]/li[2]/img`)
    await driver.wait(until.elementLocated(iconProfile), 10000);
    //click user icon
    await driver.findElement(iconProfile).click();


    //logout for next-case
    let buttonLogout = By.xpath(`//*[@id="root"]/div[1]/div[2]/div[2]/div[4]/div[2]/img`);
    await driver.findElement(buttonLogout).click();    
}

const loginNegative = async (driver) => {
    await driver.get("https://genflix.co.id/login/email");

    let pathEmail = By.xpath(`//*[@id="email"]`);
    let pathPassword = By.xpath(`//*[@id="password"]`);

    await driver.wait(until.elementLocated(pathEmail), 10000);
    await driver.findElement(pathEmail).sendKeys("triprasetyat@asd.com");
    await driver.findElement(pathPassword).sendKeys("aasdsad#");
    
    let pathButtonLogin = By.xpath(`//*[@id="root"]/div[2]/form/button`);
    await driver.findElement(pathButtonLogin).click();

    await driver.wait(until.elementLocated(pathButtonLogin), 10000);

    let pathErrorMessage = By.xpath(`//*[@id="root"]/div[2]/form/div`);
    let errorMessage = await driver.findElement(pathErrorMessage).getText();
    expect(errorMessage).toEqual('Invalid Credentials')
}



module.exports = {loginPositive, loginNegative}