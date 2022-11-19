import { expect, Locator, Page } from '@playwright/test';

export class SiteTopMenu {
  private readonly page: Page;
  private readonly menuContainer: Locator;
  private readonly popupMenuContainer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuContainer = page.locator('.tv-header__middle-content');
    this.popupMenuContainer = page.locator('[data-name="popup-menu-container"]');
  }

  private async hoverMainMenuItem(name: string|RegExp) {
    await this.menuContainer.getByRole('button', { name }).hover();
  }

  private async clickPopupMenuItem(name: string|RegExp) {
    await this.popupMenuContainer.getByRole('link', { name }).click();
  }

  private async hoverPopupMenuItem(name: string|RegExp) {
    await this.popupMenuContainer.getByRole('link', { name }).hover();
  }

  /**
   * Click a nested menu item, hover parent menu items if needed
   * 
   * @param menuItemsNames Array of 2-3 strings or RegExps that match menu items
   */
  async clickItem(menuItemsNames: (string|RegExp)[]) {
    if (menuItemsNames.length < 2 || menuItemsNames.length > 3) {
        throw new Error('from 2 to 3 menu items are supported');
    }
    await this.hoverMainMenuItem(menuItemsNames[0]);
    if (menuItemsNames.length > 2) {
        await this.hoverPopupMenuItem(menuItemsNames[1]);
    }
    await this.clickPopupMenuItem(menuItemsNames.at(-1) as string)
  }
}