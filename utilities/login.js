const {By, until} = require('selenium-webdriver')
const {emailGenflix, passGenflix, emailNonPremium, passNonPremium} = require('../env');


const login = async (driver) => {
    await driver.get("https://genflix.co.id/login/email");
    
    let title = await driver.getTitle();
    expect(title).toEqual("Genflix");

    let pathEmail = By.xpath(`//*[@id="email"]`);
    let pathPassword = By.xpath(`//*[@id="password"]`);
    await driver.wait(until.elementLocated(pathEmail), 10000);

    await driver.findElement(pathEmail).sendKeys(emailGenflix);
    await driver.findElement(pathPassword).sendKeys(`${passGenflix}\n`);

    let iconProfile = By.xpath(`//*[@id="root"]/div[1]/ul[2]/li[2]/img`)
    await driver.wait(until.elementLocated(iconProfile), 10000);
    expect(await driver.findElement(iconProfile)).toBeTruthy();
}

const loginNonPremium = async () => {
    await driver.get("https://genflix.co.id/login/email");
    
    let title = await driver.getTitle();
    expect(title).toEqual("Genflix");

    let pathEmail = By.xpath(`//*[@id="email"]`);
    let pathPassword = By.xpath(`//*[@id="password"]`);
    await driver.wait(until.elementLocated(pathEmail), 10000);

    await driver.findElement(pathEmail).sendKeys(emailNonPremium);
    await driver.findElement(pathPassword).sendKeys(`${passNonPremium}\n`);

    let iconProfile = By.xpath(`//*[@id="root"]/div[1]/ul[2]/li[2]/img`)
    await driver.wait(until.elementLocated(iconProfile), 10000);
    expect(await driver.findElement(iconProfile)).toBeTruthy();
}

module.exports = {login, loginNonPremium};