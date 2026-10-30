const { chromium } = require('./welcome-browser-tools/node_modules/playwright-core');
(async () => {
  const browser = await chromium.launch({ executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true });
  try {
    const page = await browser.newPage({viewport:{width:1440,height:1000}});
    const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto('http://127.0.0.1:4323/keystatic/collection/pagesZh/item/profile-zh',{waitUntil:'networkidle'});
    await page.getByLabel('个人简介（标题区右侧）',{exact:true}).waitFor();
    const biography=await page.getByLabel('个人简介（标题区右侧）',{exact:true}).inputValue();
    if(!biography.includes('我关注技术')) throw Error('Biography failed to load');
    await page.getByText('two-stage-ota',{exact:true}).click();
    const dialog=page.getByRole('dialog');
    await dialog.waitFor();
    console.log('PROJECT_DIALOG',JSON.stringify({text:await dialog.innerText(),selects:await dialog.locator('select').evaluateAll(els=>els.map(el=>({value:el.value,html:el.outerHTML}))),buttons:await dialog.locator('button').allTextContents()}));
    await page.screenshot({path:'.tmp/profile-cms-project-dialog.png'});
    await dialog.locator('button').first().click();
    await page.getByRole('option',{name:'自行填写项目',exact:true}).click();
    console.log('EXTERNAL_FIELDS', await dialog.innerText());
    await dialog.getByLabel(/项目名称/).fill('站外项目测试（不保存）');
    await dialog.getByLabel(/项目简介/).fill('验证自填项目字段。');
    await dialog.getByLabel(/项目链接/).fill('https://example.org/project');
    await page.screenshot({path:'.tmp/profile-cms-external-dialog.png'});
    await dialog.getByRole('button',{name:'Done',exact:true}).click();
    await page.getByText('站外项目测试（不保存）',{exact:true}).waitFor();
    console.log('CMS_CONDITIONAL', 'External source fields and item preview passed; file not saved.');
    await page.getByText('电子科技大学',{exact:true}).click();
    await page.getByRole('dialog').waitFor();
    const education = page.getByRole('dialog');
    if(await education.getByLabel(/院校名称/).inputValue() !== '电子科技大学') throw Error('Education migration failed to load');
    await education.locator('select').selectOption('master');
    await education.getByLabel('补充说明（可选）',{exact:true}).fill('验证可选说明字段（不保存）');
    await education.getByRole('button',{name:'Done',exact:true}).click();
    console.log('CMS_EDUCATION', 'Degree selection and optional description passed; file not saved.');
    console.log('ERRORS',JSON.stringify(errors));
  } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
