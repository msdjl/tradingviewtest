import { expect, Locator, Page } from '@playwright/test';

export class DetailsWidget {
  private readonly page: Page;
  readonly container: Locator;
  readonly technicalGauge: Locator;
  readonly stockDetails: Locator;

  constructor(page: Page) {
    this.page = page;
    this.container = page.locator('.widgetbar-widget-detail');
    this.technicalGauge = this.container.locator('[data-name="details-technicals"]');
    this.stockDetails = this.container.locator('[data-name="details-description"]');
  }

  /**
   * Wait for chart data to load after switching between stocks
   * 
   * @param stock Stock title
   */
  async waitForStock(stock: string) {
    await expect(this.stockDetails).toContainText(stock, { ignoreCase: true });
  }
}