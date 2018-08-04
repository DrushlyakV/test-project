const webdriver = require('selenium-webdriver');
const assert = require('assert');

module.exports = class ResultPage {
    constructor (driver) {
        this.browser = driver;
    }

    checkRecommendations (origin, destination, originIata, destinationIata) {
        const main = this;
        main.browser.wait(
            webdriver.until.elementLocated(webdriver.By.className('loader__stripes --animation-finished')),
            120000
        ).then(function(){
            main.browser.findElements(webdriver.By.xpath('.//*[@class="ticket__wrapper"]')).then(function (blocks){
                blocks.forEach(block => {
                        block.findElements(webdriver.By.xpath('.//*[@class="segment-route__city"]')).then(function (segments){
                        segments[0].getText().then(text => {
                            assert(text === origin);
                        });
                        segments[1].getText().then(text => {
                            assert(text === destination);
                        });
                        segments[2].getText().then(text => {
                            assert(text === destination);
                        });
                        segments[3].getText().then(text => {
                            assert(text === origin);
                        });
                    });
                        block.findElements(webdriver.By.xpath('.//*[@class="segment-route__path-iata"]')).then(function (iatas){
                        iatas[0].getText().then(text => {
                            assert(originIata.includes(text));
                        });
                        iatas[1].getText().then(text => {
                            assert(destinationIata.includes(text));
                        });
                        iatas[2].getText().then(text => {
                            assert(destinationIata.includes(text));
                        });
                        iatas[3].getText().then(text => {
                            assert(originIata.includes(text));
                        });
                    })
                })
            })
        });
    }

    clickOperatorFromRecommendation (operator){
        const main = this;
        this.browser.findElement(webdriver.By.xpath(`(.//*[@class="proposals__item --all"])[1]`)).click()
            .then(function (){
                main.browser.wait(
                    webdriver.until.elementLocated(webdriver.By.xpath(`.//*[contains(text(), "${operator}")]`)),
                    20000
                ).click();
            })
    }

    switchToOperatorPage() {
        const main = this;
            main.browser.getAllWindowHandles().then(function (handles) {
                main.browser.switchTo().window(handles[2]).then(function (){
                    main.browser.wait(
                        webdriver.until.elementLocated(webdriver.By.className('btn btn-orange button is-primary')),
                        120000
                    )
                });
            });
    }
};