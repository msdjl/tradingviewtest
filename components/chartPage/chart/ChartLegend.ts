import { expect, Locator, Page } from '@playwright/test';

export class ChartLegend {
  private readonly page: Page;
  private readonly container: Locator;
  readonly stockTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.container = page.locator('[data-name="legend"]');
    this.stockTitle = this.container.locator('[data-name="legend-source-title"]').first();
  }
}