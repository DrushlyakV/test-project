const webdriver = require('selenium-webdriver');
const assert = require('assert');

module.exports = class SearchPage {
    constructor (driver) {
        this.browser = driver;
    }

    selectOrigin(origin, placeholder) {
        const main = this;
        main.browser.wait(
            webdriver.until.elementLocated(webdriver.By.xpath(`.//input[@placeholder="${placeholder}"]`)),
            20000
        ).then(function(element) {
            element.clear();
            element.sendKeys(origin).then(function() {
                main.browser.wait(
                    webdriver.until.elementLocated(webdriver.By.xpath(`.//div[contains(@title, "${origin}")]`)),
                    20000
                ).click().then(function() {
                    element.getAttribute("value").then(function (text) {
                        assert(text === origin, text + ' is not ' + origin);
                    });
                })
            });
        });
    }

    selectDestination(destination, placeholder) {
        this.browser.findElement(webdriver.By.xpath(`.//input[@placeholder="${placeholder}"]`)).sendKeys(destination);
        this.browser.findElement(webdriver.By.xpath(`.//input[@placeholder="${placeholder}"]`)).getAttribute("value").then(function(text) {
            assert(text === destination, text + ' is not ' + destination);
        });
    }

    selectMonthInCalendar(month) {
        const main = this;
        main.browser.wait(
            webdriver.until.elementLocated(webdriver.By.className('pika-next')),
            20000
        ).then(function (callback) {
                main.browser.findElement(webdriver.By.xpath('(.//div[@class="pika-label"])[1]'))
                    .getText()
                    .then(function(currentMonth) {
                        if (currentMonth !== month) {
                            main.browser.findElement(webdriver.By.className('pika-next'))
                                .then(function(subelement) {
                                    subelement.click().then(function() {
                                        main.selectMonthInCalendar(month)
                                    });
                                })
                        }
                    });
        });
    }

    selectDayInCalendar(day) {
        const main = this;
        main.browser.wait(
            webdriver.until.elementLocated(webdriver.By.xpath(`.//*[@data-pika-day="${day}"]`)),
            20000
        ).click()
    }

    selectAdults(adultsAmount) {
        const main = this;
        main.browser.wait(
            webdriver.until.elementLocated(webdriver.By.className('additional-fields__label')),
            20000
        ).click().then(function (callback) {
            main.browser.findElement(webdriver.By.xpath('(.//*[@class="additional-fields__passenger-value"])[1]'))
                .getText()
                .then(function(adult) {
                    if (adult < adultsAmount) {
                        main.browser.findElement(webdriver.By.xpath('.//*[@class="additional-fields__passenger-control --increment"]'))
                            .then(function(subelement) {
                                subelement.click().then(function() {
                                    main.selectAdults(adultsAmount)
                                });
                            })
                    }
                });
        });
    }

    selectChildren(childrenAmount) {
        const main = this;
        main.browser.findElement(webdriver.By.xpath('(.//*[@class="additional-fields__passenger-value"])[2]'))
            .getText()
            .then(function(children) {
                if (children < childrenAmount) {
                    main.browser.findElement(webdriver.By.xpath('(.//*[@class="additional-fields__passenger-control --increment"])[2]'))
                        .then(function(subelement) {
                            subelement.click().then(function() {
                                main.selectChildren(childrenAmount)
                            });
                        })
                }
            });
    }

    selectClass(flightClass) {
        const main = this;
        main.browser.wait(
            webdriver.until.elementLocated(webdriver.By.xpath(`.//div[contains(@class, 'additional-fields__trip-class-button') and contains(text(), "${flightClass}")]`)),
            20000
        ).click()
    }

    findTickets(){
        const main = this;
        main.browser.wait(
             webdriver.until.elementLocated(webdriver.By.xpath('(.//*[@class="of_main_form__submit"])[2]')),
            20000
        ).click();
    }

    switchToSearchResultsPage() {
        const main = this;
            main.browser.getAllWindowHandles().then(function (handles) {
                main.browser.switchTo().window(handles[1]).then(function (){
                    main.browser.wait(
                        webdriver.until.elementLocated(webdriver.By.className('loader__stripes --animation-finished')),
                        120000
                    )
                });
            });
    }
};