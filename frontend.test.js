const { Builder, By, until } = require('selenium-webdriver');
const fs = require('fs');
const path = require('path');

let driver;

beforeAll(async () => {
  driver = await new Builder()
    .forBrowser('chrome')
    .build();
  await driver.get('http://localhost:5173/login');
}, 30000);

afterAll(async () => {
  await driver.quit();
}, 30000);

test('should login successfully', async () => {
  await driver.wait(until.elementLocated(By.id('email-input')), 10000);
  const emailInput = await driver.findElement(By.id('email-input'));
  const passwordInput = await driver.findElement(By.id('password-input'));
  const loginButton = await driver.findElement(By.id('login-button'));

  await emailInput.sendKeys('admin@admin.com');
  await passwordInput.sendKeys('admin');
  await loginButton.click();

  await driver.wait(until.elementLocated(By.id('products-button')), 20000);
  const productsButton = await driver.findElement(By.id('products-button'));
  expect(await productsButton.isDisplayed()).toBe(true);
});

test('should display the correct title', async () => {
  const title = await driver.getTitle();
  expect(title).toBe('Vet Manager HC');
});

test('should navigate to products page', async () => {
  await driver.wait(until.elementLocated(By.id('products-button')), 20000);
  const productsButton = await driver.findElement(By.id('products-button'));
  await productsButton.click();
  await driver.wait(until.elementLocated(By.id('products-page')), 20000);
  const productsPage = await driver.findElement(By.id('products-page'));
  expect(await productsPage.isDisplayed()).toBe(true);
});

test('should navigate to sales page', async () => {
  await driver.wait(until.elementLocated(By.id('sales-button')), 20000);
  const salesButton = await driver.findElement(By.id('sales-button'));
  await salesButton.click();
  await driver.wait(until.elementLocated(By.id('sales-page')), 20000);
  const salesPage = await driver.findElement(By.id('sales-page'));
  expect(await salesPage.isDisplayed()).toBe(true);
});

test('should navigate to appointments page', async () => {
  await driver.wait(until.elementLocated(By.id('appointments-button')), 20000);
  const appointmentsButton = await driver.findElement(By.id('appointments-button'));
  await appointmentsButton.click();
  await driver.wait(until.elementLocated(By.id('appointments-page')), 20000);
  const appointmentsPage = await driver.findElement(By.id('appointments-page'));
  expect(await appointmentsPage.isDisplayed()).toBe(true);
});

test('should navigate to record page', async () => {
  await driver.wait(until.elementLocated(By.id('record-button')), 20000);
  const recordButton = await driver.findElement(By.id('record-button'));
  await recordButton.click();
  await driver.wait(until.elementLocated(By.id('record-page')), 20000);
  const recordPage = await driver.findElement(By.id('record-page'));
  expect(await recordPage.isDisplayed()).toBe(true);
});

test('should navigate to clients page', async () => {
  await driver.wait(until.elementLocated(By.id('clients-button')), 20000);
  const clientsButton = await driver.findElement(By.id('clients-button'));
  await clientsButton.click();
  await driver.wait(until.elementLocated(By.id('clients-page')), 20000);
  const clientsPage = await driver.findElement(By.id('clients-page'));
  expect(await clientsPage.isDisplayed()).toBe(true);
});

test('should logout successfully', async () => {
  await driver.wait(until.elementLocated(By.id('logout-button')), 20000);
  const logoutButton = await driver.findElement(By.id('logout-button'));
  await logoutButton.click();

  try {
    await driver.wait(until.alertIsPresent(), 5000);
    const alert = await driver.switchTo().alert();
    await alert.accept();
  } catch (e) {

  }

  await driver.wait(until.elementLocated(By.id('login-button')), 20000);
  const loginButton = await driver.findElement(By.id('login-button'));
  const isDisplayed = await loginButton.isDisplayed();
  expect(isDisplayed).toBe(true);
});