const {Actions, By, WebDriver} = require('selenium-webdriver')

async function clickAt (valueX,valueY,driver){

    await driver.actions().move({ x: valueX, y: valueY}).click().perform()
    // element(By.className(locator)), x,y).click().perform()
   
}

module.exports = clickAt;