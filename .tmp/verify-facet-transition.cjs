const { chromium } = require('./welcome-browser-tools/node_modules/playwright-core');
const assert = require('node:assert/strict');
const base = 'http://127.0.0.1:4321';
const ids = ['base-camp','technical-ridge','study-terrace','snowfield-traverse','night-camp'];
(async () => {
  const browser = await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
  try {
    for (const mode of ['desktop','mobile','reduced','fallback','light']) {
      const page = await browser.newPage({viewport: mode === 'mobile' ? {width:390,height:844} : {width:1440,height:900},reducedMotion:mode==='reduced'?'reduce':'no-preference',hasTouch:mode==='mobile',isMobile:mode==='mobile'});
      const errors = [];
      page.on('pageerror', e=>errors.push(e.message));
      await page.addInitScript((mode) => {
        if(mode==='light')localStorage.setItem('theme','light');
        if(mode==='fallback')Document.prototype.startViewTransition = undefined;
        else {
          const original = document.startViewTransition.bind(document);
          document.startViewTransition = (...args) => {
            const t = original(...args);
            window.facetTransitions = (window.facetTransitions || 0) + 1;
            t.ready.catch(e => {window.facetFailure = e.message});
            return t;
          };
        }
      }, mode);
      await page.goto(base+'/blog', {waitUntil:'networkidle'});
      await page.waitForTimeout(900);
      const select = async id => page.locator(`[data-journey-link="${id}"]`).evaluate(e=>e.click());
      await select(ids[1]);
      if (!['reduced','fallback'].includes(mode)) {
        await page.waitForFunction(()=>document.getAnimations().some(a=>a.effect?.pseudoElement==='::view-transition-new(journey-canvas)'));
        const animation = await page.evaluate(()=>{
          const a=document.getAnimations().find(a=>a.effect?.pseudoElement==='::view-transition-new(journey-canvas)');
          return {duration:a.effect.getTiming().duration,frames:a.effect.getKeyframes(),top:document.querySelector('[data-journey]').scrollTop};
        });
        assert.equal(animation.duration,860);
        assert.match(animation.frames[0].clipPath,/polygon/);
        assert(animation.top>0);
        if(mode==='desktop') {
          await page.evaluate(()=>document.getAnimations().filter(a=>a.effect?.pseudoElement).forEach(a=>{a.pause();a.currentTime=430}));
          await page.screenshot({path:'.tmp/facet-midpoint-desktop.png'});
          await page.evaluate(()=>document.getAnimations().filter(a=>a.effect?.pseudoElement).forEach(a=>a.play()));
        }
      }
      await page.waitForFunction(()=>!document.querySelector('[data-chapter-transition]'));
      assert.equal(await page.locator('.snowline-panel.is-active').getAttribute('id'),ids[1]);
      await select(ids[4]);
      if(mode!=='reduced')await page.waitForFunction(()=>!!document.querySelector('[data-chapter-transition]'));
      await select(ids[2]);
      await page.waitForFunction(()=>!document.querySelector('[data-chapter-transition]'));
      assert.equal(await page.locator('.snowline-panel.is-active').getAttribute('id'),ids[2]);
      await select(ids[0]);
      await page.waitForFunction(()=>!document.querySelector('[data-chapter-transition]'));
      await page.waitForTimeout(80);
      assert.equal(await page.locator('.snowline-panel.is-active').getAttribute('id'),ids[0]);
      assert.equal(await page.locator('.journey-facet-seam').count(),0);
      assert.equal(await page.evaluate(()=>window.facetFailure),undefined);
      assert.deepEqual(errors,[]);
      console.log(mode,'polygon, reverse, latest queued request and cleanup OK');
      if(mode==='desktop'){
        await select(ids[1]);
        await page.waitForFunction(()=>document.getAnimations().some(a=>a.effect?.pseudoElement));
        await page.setViewportSize({width:1280,height:800});
        await page.waitForFunction(()=>!document.querySelector('[data-chapter-transition]'));
        assert.equal(await page.locator('.snowline-panel.is-active').getAttribute('id'),ids[1]);
        console.log('Resize interruption OK');
      }
      if(mode==='mobile'){
        await page.evaluate(()=>{const home=document.querySelector('[data-journey]');const hero=document.getElementById('base-camp');home.scrollTo({top:Math.max(0,hero.offsetHeight-home.clientHeight),behavior:'instant'})});
        await page.waitForTimeout(100);
        await page.evaluate(()=>{
          const e=document.querySelector('[data-journey]');
          const emit=(type,y)=>e.dispatchEvent(new TouchEvent(type,{bubbles:true,cancelable:true,touches:type==='touchend'?[]:[new Touch({identifier:1,target:e,clientX:190,clientY:y})]}));
          emit('touchstart',500);emit('touchmove',430);emit('touchend',430);
        });
        await page.waitForFunction(()=>!document.querySelector('[data-chapter-transition]'));
        assert.equal(await page.locator('.snowline-panel.is-active').getAttribute('id'),ids[1]);
        console.log('Mobile vertical swipe OK');
      }
      await page.close();
    }
  } finally { await browser.close(); }
})().catch(e=>{console.error(e);process.exit(1)});
