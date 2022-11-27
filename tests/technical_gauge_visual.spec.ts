import { test, expect } from './testBase';

/*
this is what I found in the source code
computeRecommendSignal: e=>{
  let t;
  return e >= -1 && e < -.5 && (t = n.STRONG_SELL),
  e >= -.5 && e < -.1 && (t = n.SELL),
  e >= -.1 && e <= .1 && (t = n.NEUTRAL),
  e > .1 && e <= .5 && (t = n.BUY),
  e > .5 && e <= 1 && (t = n.STRONG_BUY),
  t
}
*/

const recommendations = {
  'Strong Buy': 1,
  'Buy': .5,
  'Neutral': 0,
  'Sell': -.2,
  'Strong Sell': -.6
};

for (const [name, value] of Object.entries(recommendations)) {
  test(`Technicals gauge visual. ${name}`, async ({ page, chartPage }) => {
    await changeRecommendationResponse(page, value);
    await chartPage.goto();
  
    await expect(chartPage.detailsWidget.technicalGauge).toHaveScreenshot({ maxDiffPixels: 20 });
  });
}

async function changeRecommendationResponse(page, value: number) {
  await page.route('**/scan', async route => {
    const response = await page.request.fetch(route.request());
    const reqData = route.request().postDataJSON();
    const recommendFieldIndex = reqData.columns.indexOf('Recommend.All');
    const body = await response.json();
    body.data[0].d[recommendFieldIndex] = value;
    route.fulfill({
      response,
      body: JSON.stringify(body),
    });
  });
}