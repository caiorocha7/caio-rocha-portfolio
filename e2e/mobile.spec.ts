import { expect, test } from '@playwright/test';

test('mobile: sem rolagem horizontal e menu acessível', async ({ page }) => {
  for (const path of [
    'pt/',
    'en/projects/routeops/',
    'pt/projects/connecthub/',
    'pt/experience/crmundi/',
  ]) {
    await page.goto(path);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, path).toBeLessThanOrEqual(0);
  }

  await page.goto('pt/');
  const menuButton = page.getByRole('button', { name: 'Menu' });
  await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  await menuButton.click();
  await expect(page.getByRole('button', { name: 'Fechar menu' })).toHaveAttribute(
    'aria-expanded',
    'true',
  );
  await page.locator('#mobile-menu').getByRole('link', { name: 'Projetos' }).click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(page.locator('#mobile-menu')).toHaveCount(0);
  await expect(page.getByRole('heading', { level: 3, name: 'DocPilot AI' })).toBeVisible();
});
