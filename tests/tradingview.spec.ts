import { test, expect } from '../testBase';

/* task:
1. Перейти на https://www.tradingview.com/
2. Выбрать Products -> Charts
3. Выбрать акцию Alphabet
4. В нижнем правом виджете прокрутить до "Technicals"
5. Сделать скриншот (как в приложении)
*/

test.beforeEach(async ({ page, siteTopMenu }) => {
  await test.step('Open Chart', async () => {
    await page.goto('/');
    await siteTopMenu.clickItem(['Products', /Chart\+/]);

    // the chart page is opened using menu as it was described in the test task
    // usually I would open it by direct url to save some time
    // await chartPage.goto()
  });
});

test('Take screenshots of technicals gauge for the alphabet stock', async ({ chartPage, browserName }, testInfo) => {
  await test.step('Switch to Alphabet stock', async () => {
    // here we have different options to choose alphabet. decided to use stock screener
    const aplhabet = 'Alphabet Inc';
    const footer = chartPage.footerWidget;
    await footer.openStockScreener();
    await footer.stockScreener.search(aplhabet);
    await footer.stockScreener.selectFirstStock();
    await chartPage.detailsWidget.waitForStock(aplhabet);
  });

  await test.step('Take screenshots of the Technicals gauge', async () => {
    const details = chartPage.detailsWidget;
    const gaugeScreenshot = await details.technicalGauge.screenshot();
    await testInfo.attach(`technical_gauge`, { body: gaugeScreenshot, contentType: 'image/png' });
    // the screenshot example I got with the test task includes both gauge and the "more technicals" button
    // these elements have no a nice wrapper that would allow to take a single screenshot of both
    // so I decided to screenshot the whole widget
    const widgetScreenshot = await details.container.screenshot();
    await testInfo.attach(`details_widget`, { body: widgetScreenshot, contentType: 'image/png' });

    // here we could also compare screenshots with baselines but I didn't find a way to mock the gauge in short time
    // await expect(chartPage.detailsWidget.technicalGauge).toHaveScreenshot();
  });
});