const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  
  // Scroll to BentoGrid
  await page.evaluate(() => {
    document.getElementById('offerings').scrollIntoView();
  });
  
  // Wait a bit for animations
  await new Promise(r => setTimeout(r, 1000));
  
  await page.screenshot({ path: 'screenshot_bento.png' });
  
  await browser.close();
})();
