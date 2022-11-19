import { expect, Locator, Page } from '@playwright/test';

export class StockScreener {
  private readonly page: Page;
  readonly container: Locator;
  private readonly searchInput: Locator;
  private readonly progressBar: Locator;

  constructor(page: Page) {
    this.page = page;
    this.container = page.locator('.bottom-widgetbar-content.screener');
    this.searchInput = this.container.locator('input.js-search-input').first();
    this.progressBar = this.container.getByRole('progressbar');
  }

  async search(searchString: string) {
    await this.searchInput.fill(searchString);
    await expect(this.container.locator('tr[data-symbol]').first()).toContainText(searchString, { ignoreCase: true });
  }

  async selectFirstStock() {
    await this.container.locator('tr[data-symbol]').first().click();
  }
}