import { expect, Locator, Page } from '@playwright/test';
import { Chart } from './chart/Chart';
import { DetailsWidget } from './DetailsWidget';
import { ChartFooterWidget } from './footerWidget/ChartFooterWidget';

export class ChartPage {
  private readonly page: Page;
  readonly chart: Chart;
  readonly detailsWidget: DetailsWidget;
  readonly footerWidget: ChartFooterWidget;

  constructor(page: Page) {
    this.page = page;
    this.chart = new Chart(page);
    this.detailsWidget = new DetailsWidget(page);
    this.footerWidget = new ChartFooterWidget(page);
  }

  async goto() {
    await this.page.goto('/chart');
  }
}