async (page) => {
 await page.setViewportSize({width:390,height:844});
 await page.goto('http://127.0.0.1:4321/blog');
 await page.locator('[data-ridge-expand]').click();
 await page.screenshot({path:'output/playwright/sidebar-redesign-expanded-390.png'});
 return await page.locator('.ridge-primary-links').innerText();
}
