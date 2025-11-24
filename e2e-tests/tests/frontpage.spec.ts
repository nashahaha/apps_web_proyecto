import { test, expect } from '@playwright/test';

test('front page muestra el encabezado y navegación básica', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /ñom ñom/i })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Create Account' })).toBeVisible();
    await expect(page.getByPlaceholder('Search by ingredient...')).toBeVisible();
});

test('navegación al login funciona', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Login' }).click();
    await expect(page.getByRole('heading', { name: /welcome back/i })).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: /login/i })).toBeVisible();
});