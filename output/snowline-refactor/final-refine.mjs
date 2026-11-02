import fs from 'node:fs';
let p='src/components/WelcomePage.astro',s=fs.readFileSync(p,'utf8');s=s.replace("const avatar = profile?.data.profile?.avatar || '/media/profile/profile-zh/profile/avatar.jpg';", `const fallbackProfile = pages.find(entry => entry.data.locale === 'zh' && entry.data.pageKind === 'profile' && isPublicContent(entry.data));
const avatar = profile?.data.profile?.avatar || fallbackProfile?.data.profile?.avatar || '/favicon.svg';`);fs.writeFileSync(p,s);
p='src/components/home/TechnicalRidge.astro';s=fs.readFileSync(p,'utf8').replace('<small>{card.meta}</small>','<small>{card.meta} <span class="journey-progress-value">{card.progress ?? 0}%</span></small>');fs.writeFileSync(p,s);
