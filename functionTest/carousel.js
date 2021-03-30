const { By, until} = require('selenium-webdriver');
const sleep = require('../utilities/sleep');
const clickAt = require('../utilities/clickAt');

const dragAndDropCarousel = async (driver) => {
    await driver.get(`https://genflix.co.id`);
    
    await driver.manage().window().maximize();

    const currentCarouselShow = By.className(`slick-slide slick-active slick-center slick-current`);
    
    await driver.wait(until.elementLocated(currentCarouselShow), 10000);
    const currentCarousel =  await driver.findElement(currentCarouselShow);
    const titleCarousel = await currentCarousel.findElement(By.className(`title`)).getText();

    await clickAt(1037, 310, driver);
    await sleep(2000);
    const currentCarouselAfterSlide = await driver.findElement(currentCarouselShow);
    const titleCarousel2 = await currentCarouselAfterSlide.findElement(By.className(`title`)).getText();

    expect(titleCarousel1).not.toEqual(titleCarousel2);
}

module.exports = dragAndDropCarousel;