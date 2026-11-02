import fs from 'node:fs';
const p='src/components/WelcomePage.astro';let s=fs.readFileSync(p,'utf8');const start=s.indexOf('    <footer class="welcome-footer"');const end=s.indexOf('</footer>',start)+9;s=s.slice(0,end)+'\n </div>\n</main>\n'+s.slice(s.lastIndexOf('<script>'));fs.writeFileSync(p,s);
const q='src/components/home/SnowlineHero.astro';s=fs.readFileSync(q,'utf8').replaceAll('\r\n','\n');
if(!s.includes('<ExpeditionMountain'))s=s.replace('    </div>\n  </div>\n\n  {destinations','    </div>\n    <div class="journey-hero-art"><ExpeditionMountain id="home-mountain" /></div>\n  </div>\n\n  {destinations');
s=s.replace('<strong>{card.title}</strong>\n              <i','<small>{card.meta}</small><strong>{card.title}</strong><p>{card.description}</p>\n              <i');
if(!s.includes('data-featured-controls'))s=s.replace('        </div>\n      </section>',`        </div>
        {featured.length > 1 && <div class="edition-controls" data-featured-controls hidden><button type="button" data-featured-direction="-1" aria-controls="hero-featured-list" aria-label={locale === 'zh' ? '上一篇精选' : 'Previous article'}>←</button><span data-featured-status aria-live="polite"></span><button type="button" data-featured-direction="1" aria-controls="hero-featured-list" aria-label={locale === 'zh' ? '下一篇精选' : 'Next article'}>→</button></div>}
      </section>`);
fs.writeFileSync(q,s);
