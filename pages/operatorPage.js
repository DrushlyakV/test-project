const webdriver = require('selenium-webdriver');

module.exports = class OperatorPage {
    constructor (driver) {
        this.browser = driver;
    }

    fillRequiredFields (age, gender, lastName, firstName, birthDate, citizenship, passportNumber) {
        const main = this;
        main.browser.findElement(webdriver.By.xpath(`.//div[contains(@class, 'passenger ${age}')]//*[@class="button -${gender}"]`)).click()
            .then(function () {
                main.browser.findElement(webdriver.By.xpath(`.//div[contains(@class, 'passenger ${age}')]//*[@class="u-field lastname-field -default-booking-theme"]//*[@class="u-input"]`)).sendKeys(lastName)
                    .then(function (){
                        main.browser.findElement(webdriver.By.xpath(`.//div[contains(@class, 'passenger ${age}')]//*[@class="u-field firstname-field -default-booking-theme"]//*[@class="u-input"]`)).sendKeys(firstName)
                            .then(function (){
                                main.browser.findElement(webdriver.By.xpath(`.//div[contains(@class, 'passenger ${age}')]//*[@class="u-field birthdate-field -default-booking-theme"]//*[@class="u-input"]`)).sendKeys(birthDate)
                                    .then(function (){
                                        main.browser.findElement(webdriver.By.xpath(`.//div[contains(@class, 'passenger ${age}')]//*[@class="u-field citizenship-field -default-booking-theme -has-icon"]//*[@class="u-input"]`)).sendKeys(citizenship)
                                            .then(function (){
                                                main.browser.findElement(webdriver.By.xpath(`.//div[contains(@class, 'passenger ${age}')]//*[@class="u-field doc-number-field -default-booking-theme"]//*[@class="u-input"]`)).sendKeys(passportNumber)
                                            })
                                    })
                            })
                    })
            })
    }
};