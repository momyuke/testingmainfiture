const { By, until} = require('selenium-webdriver');
const {emailGenflix, passGenflix} = require('../env');
const sleep = require('../utilities/sleep')
const clickAt = require('../utilities/clickAt');
const logout = require(`../utilities/logout`);
const {login} = require(`../utilities/login`);



async function clickWatchNow(driver){
    
    const pathWatchNow = By.xpath(`//*[@id="root"]/div[2]/div[1]/div[1]/div[2]/button`);
    await driver.wait(until.elementLocated(pathWatchNow), 15000);
    await driver.findElement(pathWatchNow).click();
}


const playVideo = async (driver) => {
    await login(driver);    

    await driver.findElement(By.xpath(`//*[@id="root"]/div[1]/ul[2]/li[1]/img`)).click();
    await driver.findElement(By.xpath(`//*[@id="root"]/div[1]/ul[2]/li[1]/form/input`)).sendKeys("a\n");
    
    const pathThumbnail = By.xpath(`//*[@id="root"]/div[3]/div[2]/div/div[1]/a/div`);
    await driver.wait(until.elementLocated(pathThumbnail), 15000);
    await driver.findElement(pathThumbnail).click();

    await clickWatchNow(driver)

    await sleep(15000);
    await clickAt(328, 294, driver)
    const modalPlayer = await driver.findElement(By.id(`modal-root`));
    const locatorTimePlayer = By.className(`shaka-current-time`);
    const timePlayer = await modalPlayer.findElement(locatorTimePlayer);
    const time1 = await timePlayer.getText(); 
    await clickAt(328, 294, driver)
    await sleep(7000);
    const time2 = await timePlayer.getText();

    expect(time1).not.toEqual(time2);

    await logout(driver);


}

const checkingSubtitle = async (driver) => {
    await login(driver);

    await driver.get(`https://genflix.co.id/episode/ecd70b34-044a-498a-a884-2a73089c4e34`);
    await clickWatchNow(driver);
    await sleep(5000);
    await clickAt(328, 294, driver);
    await driver.executeScript(`document.getElementsByTagName("video")[0].currentTime=334.7124`)
    await sleep(5000);

    const modalPlayer = await driver.findElement(By.id(`modal-root`));
    const pathSubtitle = By.className(`shaka-nested-cue`);
    const subtitle = await modalPlayer.findElement(pathSubtitle).getText();
    
    expect(subtitle).toBeTruthy();
    expect(subtitle).toEqual(`Aku sangat menyesal.`)

    await logout(driver);
}

const playResumeVideo = async (driver) => {
    const linkEpisode = `https://genflix.co.id/movie/a9ec831e-d8f1-4b1c-8687-d7d53560d127`;
    
    await login(driver);
    await driver.get(linkEpisode)
    await clickWatchNow(driver);
    await sleep(3000);
    
    await clickAt(328, 294, driver); 
    await driver.executeScript(`document.getElementsByTagName("video")[0].currentTime=1000`)
    await sleep(3000);
    await clickAt(328, 294, driver); 
    await sleep(80000);
    await clickAt(328, 294, driver); 
    
    const modalPlayer = await driver.findElement(By.id(`modal-root`));
    const locatorTimePlayer = By.className(`shaka-current-time`);
    const timePlayer = await modalPlayer.findElement(locatorTimePlayer);
    const time1 = await timePlayer.getText(); 
    console.log(time1);

    await clickAt(38,34,driver)
    await clickAt(38,34,driver)
    
    await driver.get(`https://genflix.co.id`);
    await driver.get(linkEpisode);
    await clickWatchNow(driver);
    await sleep(1800);

    
    const pathButtonResume = By.xpath(`//*[@id="modal-root"]/div/div/div/div[2]/div/div[5]/div[2]/button[1]`)
    const buttonResume = await driver.findElement(pathButtonResume);
    await buttonResume.click();
    await sleep(1800);
    
    // const timePlayer2 = await modalPlayer.findElement(locatorTimePlayer).getText();
    
}

module.exports = {playVideo, playResumeVideo, checkingSubtitle};