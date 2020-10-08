const { By, until} = require('selenium-webdriver');
const {emailFacebook, passFacebook} = require('../env');

const registerWithFacebook = async (driver) => {
    try {
         //open windows and go to genflix
         await driver.get("https://genflix.co.id/register");

         //Save ID of original windows and check there is just 1 windows
         const originalWindow = await driver.getWindowHandle();
         let numbersOfTab = await driver.getAllWindowHandles();
         expect(numbersOfTab.length).toEqual(1);
         
         //find button Login with Facebook and click it
         let pathLoginWithFacebook = By.xpath(`//*[@id="root"]/div[2]/button[3]`);
         await driver.wait(until.elementLocated(pathLoginWithFacebook), 10000);
         await driver.findElement(pathLoginWithFacebook).click();

         //wait until new windows for login with facebook is open up
         //we check it with check of number of windows
         await driver.wait(
             async () => (await driver.getAllWindowHandles()).length === 2,
             10000
         );
         
         //when new windows is already open up, we search it and move to new windows
         const windows = await driver.getAllWindowHandles();
         windows.forEach(async handle => {
             if (handle !== originalWindow) {
               await driver.switchTo().window(handle);
             }
         });

         //wait until form to login is available and we start to login with some account
         await driver.wait(until.elementLocated(By.id("email")), 10000);
         await driver.findElement(By.id("email")).click()
         await driver.findElement(By.id("email")).sendKeys(`${emailFacebook}`);
         await driver.findElement(By.id("pass")).sendKeys(`${passFacebook}\n`);
         //if we had been logged, the windows automatically closed

         //So switch to the original windows, and wait until login has accepted on Genflix with validate the icon of profile is show up
         //and then click it      
         await driver.switchTo().window(originalWindow);
         const iconPath = By.xpath(`//*[@id="root"]/div[1]/ul[2]/li[2]/img`);
         await driver.wait(until.elementLocated(iconPath), 15000);
         await driver.findElement(iconPath).click();
         
         //Then we check the email that logged, with email that you input on facebook
         let accountLogged = await driver.findElement(By.xpath(`//*[@id="root"]/div[1]/div[2]/div/p[1]`), 10000).getText();
         expect(accountLogged).toEqual(`${emailFacebook}`);

         //And then logout
         let buttonLogout = By.xpath(`//*[@id="root"]/div[1]/div[2]/div/p[2]`);
         await driver.findElement(buttonLogout).click();
    } catch (error) {
        throw new Error(error.message);
    }
}


const loginWithFacebook = async (driver)=>{
    try {
        //go to page register
        await driver.get("https://genflix.co.id/login");
                
        //wait until button is available and click it
        const pathRegisterWithFacebook = By.xpath(`//*[@id="root"]/div[2]/button[3]`);
        await driver.wait(until.elementLocated(pathRegisterWithFacebook), 10000);
        await driver.findElement(pathRegisterWithFacebook).click();

        //cause we have been logged to facebook before. So we dont have to login to facebook anymore
        //So, we just have to wait icon profile is show up
        const iconPath = By.xpath(`//*[@id="root"]/div[1]/ul[2]/li[2]/img`);
        await driver.wait(until.elementLocated(iconPath), 15000);
        await driver.findElement(iconPath).click();

        //Then we check the email that logged, with email that you input on facebook
        //We just check that email just already logged
        let accountLogged = await driver.findElement(By.xpath(`//*[@id="root"]/div[1]/div[2]/div/p[1]`), 10000).getText();
        expect(accountLogged).toBeTruthy();
        
        //And then logout
        let buttonLogout = By.xpath(`//*[@id="root"]/div[1]/div[2]/div/p[2]`);
        await driver.findElement(buttonLogout).click();
    } catch (error) {
        throw new Error(error.message);
    }
    
}

module.exports = {loginWithFacebook, registerWithFacebook};