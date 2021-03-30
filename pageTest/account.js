const { By, until} = require('selenium-webdriver');
const {login} = require('../utilities/login');
const logout = require('../utilities/logout');


const TabMyAccount = async (driver) => {
    await login(driver);
    
    const iconPath = By.xpath(`//*[@id="root"]/div[1]/ul[2]/li[2]/img`);
    await driver.findElement(iconPath).click();
    
    const buttonAccountPath = By.xpath(`//*[@id="root"]/div[1]/div[2]/div[2]/div[4]/div[1]/a`);
    await driver.findElement(buttonAccountPath).click();
    
    await driver.wait(until.urlContains("profile"));
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).toContain("profile");
    
    await driver.findElement(iconPath).click();
    const formPath = By.className(`profileForm_inputLabel__2-VFn`);
    await driver.wait(until.elementsLocated(formPath), 10000);
    
    const navigationBar = await driver.findElement(By.className(`tab_navigator__aQ43Z profile_navigator__2dk2s`));
    const tabNavigations = await navigationBar.findElements(By.css("li"));
    const navigationsTitle = ["My Account", "Subscription", "Redeem Voucher", "Watch History", "Transaction History"];
    
    for(let i = 0; i < navigationsTitle.length; i++){
        let navigation = await tabNavigations[i].getText();
        expect(navigation).toEqual(navigationsTitle[i]);
    }


    const formAccountDetails = await driver.findElements(formPath);
    
    let formTitle = ["Profile Picture", "Name", "Bio", "Email", "Mobile No.", "Password"];
    
    for(let i = 0; i < formTitle.length; i++){
        let textFormTitle = await formAccountDetails[i].getText();
        expect(textFormTitle).toEqual(formTitle[i]);
    }
}


module.exports = {TabMyAccount};
