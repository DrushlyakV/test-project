const webdriver = require('selenium-webdriver');
const test = require('selenium-webdriver/testing');
const SearchPage = require('./pages/searchPage');
const ResultPage = require('./pages/resultPage');
const OperatorPage = require('./pages/operatorPage');

let browser = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

const search = new SearchPage(browser);
const result = new ResultPage(browser);
const operator = new OperatorPage(browser);

const url = 'https://aviasales.ru';
const origin = 'Москва';
const originPlaceholder = 'Откуда';
const originIata = ['DME', 'SVO', 'VKO', 'ZIA'];
const destination = 'Краснодар';
const destinationPlaceholder = 'Куда';
const destinationIata = 'KRR';

const departureDay = '10';
const departureMonth = 'НОЯБРЬ';
const arrivalDay = '20';
const arrivalMonth = 'НОЯБРЬ';
const adultsAmount = 1;
const childrenAmount = 1;
const flightClass = 'Эконом';

const operatorName = 'OZON.travel';

const adultGender = 'male';
const adultLastName = 'Петров';
const adultFirstName = 'Иван';
const adultBirthDate = '12.12.1980';
const adultCitizenship = 'Россия';
const adultPassportNumber = '123457890';
const childGender = 'female';
const childLastName = 'Петрова';
const childFirstName = 'Жанна';
const childBirthDate = '12.12.2015';
const childCitizenship = 'Россия';
const childPassportNumber = 'XXX-ББ123456';


test.describe('Test is started!', function () {
    this.timeout(120000);
    this.bail(true);
    test.it(`Open page ${url}`, async function () {
        await browser.get(url);
    });
    test.it(`Select origin: ${origin}, IATA: ${originIata}`, function () {
        search.selectOrigin(origin, originPlaceholder);
    });
    test.it(`Select destination: ${destination}, IATA: ${destinationIata}`, function () {
        search.selectDestination(destination, destinationPlaceholder);
    });
    test.it(`Select departure date: ${departureDay}, ${departureMonth}`, function () {
        search.selectMonthInCalendar(departureMonth);
        search.selectDayInCalendar(departureDay);
    });
    test.it(`Select arrival date: ${arrivalDay}, ${arrivalMonth}`, function () {
        search.selectDayInCalendar(arrivalDay);
    });
    test.it(`Select additional parameters: ${adultsAmount} adult(s), ${childrenAmount} child(ren), ${flightClass}`, function () {
        search.selectAdults(adultsAmount);
        search.selectChildren(childrenAmount);
        search.selectClass(flightClass);
    });
    test.it(`Click find tickets button`, function () {
        search.findTickets();
    });
    test.it(`Switch to results page and wait when page is loaded`, function () {
        search.switchToSearchResultsPage();
    });
    test.it(`Check search result`, function () {
        result.checkRecommendations(origin, destination, originIata, destinationIata);
    });
    test.it(`Select operator from recomendation`, function () {
        result.clickOperatorFromRecommendation(operatorName);
    });
    test.it(`Switch to operator page and wait when page is loaded`, function () {
        result.switchToOperatorPage();
    });
    test.it(`Fill required fields for adult passenger(s)`, function () {
        operator.fillRequiredFields('adult', adultGender, adultLastName, adultFirstName, adultBirthDate, adultCitizenship, adultPassportNumber);
    });
    test.it(`Fill required fields for child(ren)`, function () {
        operator.fillRequiredFields('child', childGender, childLastName, childFirstName, childBirthDate, childCitizenship, childPassportNumber);
    });
    test.it(`Test is ended!`, function () {
    });
});