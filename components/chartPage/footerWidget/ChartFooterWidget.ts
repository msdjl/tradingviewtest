import { expect, Locator, Page } from '@playwright/test';
import { StockScreener } from './StockScreener';

export class ChartFooterWidget {
  private readonly page: Page;
  private readonly panelHeaderContainer: Locator;
  private readonly stockScreenerButton: Locator;
  private readonly toggleVisibilityButton: Locator;
  private readonly panelContentContainer: Locator;
  readonly stockScreener: StockScreener;

  constructor(page: Page) {
    this.page = page;
    this.panelHeaderContainer = page.locator('#footer-chart-panel');
    this.stockScreenerButton = this.panelHeaderContainer.locator('[data-name="screener"]');
    this.toggleVisibilityButton = this.panelHeaderContainer.locator('[data-name="toggle-visibility-button"]');
    this.panelContentContainer = this.panelHeaderContainer.locator('#bottom-area');
    this.stockScreener = new StockScreener(page);
  }

  async showPanel() {
    await this.toggleVisibilityButton.click();
    await expect(this.panelContentContainer).toBeVisible();
  }

  async hidePanel() {
    await this.toggleVisibilityButton.click();
    await expect(this.panelContentContainer).not.toBeVisible();
  }

 async openStockScreener() {
    await this.stockScreenerButton.click();
    await expect(this.stockScreener.container).toBeVisible();
 }
}