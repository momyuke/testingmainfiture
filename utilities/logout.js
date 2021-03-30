const {By, until} = require('selenium-webdriver')

async function logout(driver){
    await driver.get(`https://genflix.co.id`);
    //wait until user is logged
    let iconProfile = By.xpath(`//*[@id="root"]/div[1]/ul[2]/li[2]/img`)
    await driver.wait(until.elementLocated(iconProfile), 10000);
    //click user icon
    await driver.findElement(iconProfile).click();


    //logout for next-case
    let buttonLogout = By.xpath(`//*[@id="root"]/div[1]/div[2]/div[2]/div[4]/div[2]/img`);
    await driver.findElement(buttonLogout).click();    
}

module.exports= logout;