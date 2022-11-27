import { expect, Locator, Page } from '@playwright/test';

export class StockScreener {
  private readonly page: Page;
  readonly container: Locator;
  private readonly searchInput: Locator;
  private readonly progressBar: Locator;
  private readonly firstSearchResult: Locator;

  constructor(page: Page) {
    this.page = page;
    this.container = page.locator('.bottom-widgetbar-content.screener');
    this.searchInput = this.container.locator('input.js-search-input').first();
    this.progressBar = this.container.getByRole('progressbar');
    this.firstSearchResult = this.container.locator('tr[data-symbol]').first();
  }

  async search(searchString: string) {
    await this.searchInput.fill(searchString);
    await expect(this.firstSearchResult).toContainText(searchString, { ignoreCase: true });
  }

  async selectFirstStock() {
    await this.firstSearchResult.click();
  }
}