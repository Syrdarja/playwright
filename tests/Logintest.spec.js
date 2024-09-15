const { test, expect } = require("@playwright/test");
const { email, password } = require("../user");

test("Successful authorization", async ({ page }) => {

  await page.goto("https://netology.ru/");
  await page.screenshot({ path: "screenshot0.png" });

  await page.click("text=Войти");
  await page.screenshot({ path: "screenshot1.png" });

  await page.click('[placeholder="Email"]');

  await page.fill('[placeholder="Email"]', email);

  await page.click('[placeholder="Пароль"]');

  await page.fill('[placeholder="Пароль"]', password);

  await page.click('[data-testid="login-submit-btn"]');
  await page.screenshot({ path: "screenshot2.png" });

  const locator = page.locator('[data-testid="menu-userface"]');
  await expect(locator).toHaveText("МП");
});


test("authorization with an invalid password", async ({ page }) => {

  await page.goto("https://netology.ru/");

  await page.click("text=Войти");

  await page.click('[placeholder="Email"]');

  await page.fill('[placeholder="Email"]', email);

  await page.click('[placeholder="Пароль"]');

  await page.fill('[placeholder="Пароль"]', "123456");

  await page.click('[data-testid="login-submit-btn"]');
  await page.screenshot({ path: "screenshot3.png" });

  const locator = page.locator('[data-testid="login-error-hint"]');
  await expect(locator).toContainText("Вы ввели неправильно логин или пароль");
});
