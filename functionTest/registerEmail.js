const { By, until} = require('selenium-webdriver');

const registerPositive = async (driver) => {
    await driver.get("https://genflix.co.id/register/email");
    
    let namePath = By.xpath(`//*[@id="name"]`);
    await driver.wait(until.elementLocated(namePath), 10000);
    
    let randomMath = Math.floor(Math.random() * 1000) + 1;

    let randomEmail = `test${randomMath}@testing.com`

    await driver.findElement(namePath).sendKeys("testing");
    await driver.findElement(By.xpath(`//*[@id="email"]`)).sendKeys(randomEmail);
    await driver.findElement(By.xpath(`//*[@id="password"]`)).sendKeys(`testing123`);
    await driver.findElement(By.xpath(`//*[@id="repassword"]`)).sendKeys(`testing123\n`);
    
    let iconProfile = By.xpath(`//*[@id="root"]/div[1]/ul[2]/li[2]/img`)
    await driver.wait(until.elementLocated(iconProfile), 10000);
    await driver.findElement(iconProfile).click();



    let buttonLogout = By.xpath(`//*[@id="root"]/div[1]/div[2]/div[2]/div[4]/div[2]/img`);
    await driver.findElement(buttonLogout).click();  
}

const registerNegative = async (driver) => {
    await driver.get("https://genflix.co.id/register/email");

    let namePath = By.xpath(`//*[@id="name"]`);
    await driver.wait(until.elementLocated(namePath), 10000);

    let errorPath = By.xpath(`//*[@id="root"]/div[2]/form/div`);

    await driver.findElement(By.xpath(`//*[@id="root"]/div[2]/form/button`)).click();
    let errorName = await driver.findElement(errorPath).getText();
    expect(errorName).toEqual(`Invalid name!`);

    await driver.findElement(namePath).sendKeys("test\n");
    let errorEmail = await driver.findElement(errorPath).getText();
    expect(errorEmail).toEqual(`Invalid email!`);
    
    await driver.findElement(By.xpath(`//*[@id="email"]`)).sendKeys("test@test.com\n");
    let errorPassword = await driver.findElement(errorPath).getText();
    expect(errorPassword).toEqual(`Invalid password!`);
    
    await driver.findElement(By.xpath(`//*[@id="password"]`)).sendKeys("test\n");
    let errorRePassword = await driver.findElement(errorPath).getText();
    expect(errorRePassword).toEqual(`Invalid repassword!`);
    
    await driver.findElement(By.xpath(`//*[@id="repassword"]`)).sendKeys("test\n");
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="root"]/div[2]/form/button`)), 10000);
    let errorMinimalCharacter = await driver.findElement(errorPath).getText();
    expect(errorMinimalCharacter).toEqual(`Password should be at least 8 characters`);
    
    
}

module.exports = {registerPositive, registerNegative};