const fs = require('node:fs');
const path = require('node:path');
const yaml = require('yaml');
const backupRoot = 'doc/design/backups/profile-before-refactor';
fs.mkdirSync(backupRoot, { recursive: true });
for (const locale of ['zh', 'en', 'de']) {
  const file = `src/content/pages/${locale}/profile-${locale}/index.mdoc`;
  const source = fs.readFileSync(file, 'utf8');
  const backup = path.join(backupRoot, `profile-${locale}.mdoc`);
  if (fs.existsSync(backup)) throw new Error('Backup already exists: ' + backup);
  fs.writeFileSync(backup, source);
  const [, frontmatter, body] = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  const data = yaml.parse(frontmatter);
  const profile = data.profile ?? {};
  profile.biography = body.split(/^## /m)[0].trim();
  profile.directions = [...body.matchAll(/^- (.+)$/gm)].map(match => match[1].trim());
  if (locale === 'zh') {
    profile.headline = '电子科技大学 · 本科在读';
    profile.education = [{ degree: 'bachelor', school: '电子科技大学', department: '英才实验学院', period: '2024 — 至今' }];
    profile.research = [{
      title: '用于光电流检测的模拟前端', type: 'project', period: '2026',
      organization: '2026 年集创赛（研究生组）',
      summary: '2026 年集创赛作品：用于光电流检测的模拟前端。',
      contributions: ['完成 FDA、PGA、TIA、比较器的相关设计。'],
      outcomes: ['项目中积累的设计思路与笔记。'],
      project: '2026-cicc',
    }];
    delete profile.experience;
  }
  profile.honors = [];
  profile.work = [];
  profile.completedProjects = ['two-stage-ota', '2026-cicc'].map(project => ({ discriminant: 'internal', value: { project } }));
  data.profile = profile;
  data.updatedAt = new Date().toISOString();
  fs.writeFileSync(file, '---\n' + yaml.stringify(data, { lineWidth: 0 }) + '---\n');
}
console.log('Migrated three profiles. Originals preserved in ' + backupRoot);
