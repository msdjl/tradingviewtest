import { test as base } from '@playwright/test';
import { SiteTopMenu } from '../components/SiteTopMenu';
import { ChartPage } from '../components/chartPage/ChartPage';

type MyFixtures = {
  siteTopMenu: SiteTopMenu;
  chartPage: ChartPage;
};

export const test = base.extend<MyFixtures>({
  siteTopMenu: async ({ page }, use) => {
    await use(new SiteTopMenu(page));
  },
  chartPage: async ({ page }, use) => {
    await use(new ChartPage(page));
  },
});
export { expect } from '@playwright/test';