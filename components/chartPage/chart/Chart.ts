import { expect, Locator, Page } from '@playwright/test';
import { ChartLegend } from './ChartLegend';

export class Chart {
  private readonly page: Page;
  readonly legend: ChartLegend;

  constructor(page: Page) {
    this.page = page;
    this.legend = new ChartLegend(page);
  }

  /**
   * Wait for chart data to load after switching between stocks
   * 
   * @param stock Stock title
   */
  async waitForStock(stock: string) {
    await expect(this.legend.stockTitle).toContainText(stock, { ignoreCase: true });
  }
}