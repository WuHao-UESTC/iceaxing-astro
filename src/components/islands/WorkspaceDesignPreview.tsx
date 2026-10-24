import { useEffect, useState, type CSSProperties } from 'react';
import WorkspaceLandscape from './WorkspaceLandscape';

const groups = [
  {
    id: 'skill',
    name: '技术栈',
    english: 'THE RIDGE',
    color: '#176b8d',
    night: '#63c6e8',
    note: '冰蓝 · 从原理走向实践',
    title: '在电路之间，寻找秩序',
    folder: 'Analog IC',
    project: '二级运放搭建全流程',
    article: '从一张电路图开始',
    excerpt:
      '把一个想法，从纸上的原理推向真实的电路。记录每一次尝试，也记录那些让理解更进一步的细节。',
    paragraph:
      '电路的美，常常藏在那些不起眼的连接里。与其急着寻找答案，不妨从最简单的模型开始，看看电流如何流动，信号又如何被改变。',
  },
  {
    id: 'study',
    name: '学习笔记',
    english: 'THE TERRACE',
    color: '#247568',
    night: '#79cdb5',
    note: '青绿 · 把知识慢慢连成路',
    title: '让读过的书，成为来时的路',
    folder: '数字时代的滤波器设计',
    project: '线性系统与滤波器',
    article: '对二阶系统刨根问底',
    excerpt:
      '把读过的书、推过的公式与想明白的问题，慢慢整理成路。在反复推敲中，让零散的知识长出自己的脉络。',
    paragraph:
      '理解一个系统，往往从一个朴素的问题开始：当输入发生变化，输出为什么会这样回应？把公式放回具体的情境，抽象的符号也就有了形状。',
  },
  {
    id: 'life',
    name: '生活日常',
    english: 'THE SNOWFIELD',
    color: '#7d5600',
    night: '#f2be4a',
    note: '暖金 · 收集日常的光',
    title: '在寻常的日子里，拾起微光',
    folder: '旅行手记',
    project: '山间的几个清晨',
    article: '走进山野的那一天',
    excerpt:
      '风从山脊另一侧吹来，带着清晨的凉意。那些原本普通的片刻，在回望的时候，渐渐成了值得留下的风景。',
    paragraph:
      '出发的时候，天还没有完全亮。沿着小路慢慢往上走，树影被风轻轻拨动，远处的山线从雾里浮现。一段没有安排的路，也可以走得很远。',
  },
  {
    id: 'documents',
    name: '日志与页面',
    english: 'THE WAYSTATION',
    color: '#58458d',
    night: '#b6a2ef',
    note: '夜紫 · 留下沿途的念头',
    title: '在抵达之前，留一盏灯',
    folder: '沿途随记',
    project: '此间与同行',
    article: '写在一个安静的夜晚',
    excerpt:
      '有些念头不必急着成为文章。先把它们记下来，像在营地旁点起一盏小灯，照见今天，也照见还没走完的路。',
    paragraph:
      '整理今天的记录时，忽然发现一些微小的变化：读懂了一页书，完成了一次实验，也和很久没见的人聊了几句。日子就是这样，一点一点向前。',
  },
  {
    id: 'unassigned',
    name: '未归属内容',
    english: 'THE TRAILHEAD',
    color: '#586b66',
    night: '#afc5bd',
    note: '雾灰 · 想法的起点',
    title: '先写下来，再决定去向',
    folder: '待整理的想法',
    project: '还没有命名的路线',
    article: '一个尚未完成的想法',
    excerpt:
      '为还没有方向的文字留一点空间。让想法先自由地生长，等轮廓渐渐清晰，再为它找到合适的位置。',
    paragraph:
      '有时候，开始比完整更重要。一句话、一张草图，或是一个暂时没有答案的问题，都可以成为下一段旅程的起点。',
  },
] as const;
type Group = (typeof groups)[number];

function Icon({
  name,
  size = 16,
}: {
  name:
    | 'tree'
    | 'sliders'
    | 'sun'
    | 'moon'
    | 'plus'
    | 'search'
    | 'chevron'
    | 'check'
    | 'image'
    | 'link'
    | 'close'
    | 'arrow';
  size?: number;
}) {
  const paths = {
    tree: 'M4 4h5v5H4zM4 15h5v5H4zM15 9h5v5h-5zM9 6h3v12H9M12 12h3',
    sliders: 'M4 7h7m4 0h5M4 17h3m4 0h9M11 4v6M7 14v6',
    sun: 'M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
    moon: 'M20 15A9 9 0 0 1 9 3a9 9 0 1 0 11 12',
    plus: 'M12 5v14M5 12h14',
    search: 'M16 16l5 5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0',
    chevron: 'm9 5 7 7-7 7',
    check: 'm5 12 4 4L19 6',
    image: 'M3 3h18v18H3zM3 16l6-6 5 5 3-3 4 4M15 7h.01',
    link: 'm10 14 4-4M8 16l-2 2a4 4 0 0 1-5-5l4-4a4 4 0 0 1 5 0M14 8l2-2a4 4 0 0 1 5 5l-4 4a4 4 0 0 1-5 0',
    close: 'm6 6 12 12M6 18 18 6',
    arrow: 'M4 12h16m-5-5 5 5-5 5',
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}

function Landscape({ group }: { group: Group }) {
  return <WorkspaceLandscape group={group.id} className="wp-landscape" />;
}

function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <h3 className="wp-section-label">
      <span>{number}</span>
      {children}
      <i />
    </h3>
  );
}

function formatSelection(tag: 'strong' | 'em' | 'blockquote') {
  const selection = window.getSelection();
  if (!selection?.rangeCount || selection.isCollapsed) return;
  const range = selection.getRangeAt(0);
  const body = document.querySelector('.wp-body');
  if (!body?.contains(range.startContainer) || !body.contains(range.endContainer)) return;
  const formatted = document.createElement(tag);
  formatted.append(range.extractContents());
  range.insertNode(formatted);
  selection.removeAllRanges();
  range.selectNodeContents(formatted);
  selection.addRange(range);
}

export default function WorkspaceDesignPreview() {
  const [groupId, setGroupId] = useState<Group['id']>('study');
  const group = groups.find((g) => g.id === groupId)!;
  const [dark, setDark] = useState(false);
  const [treeOpen, setTreeOpen] = useState(true);
  const [propertiesOpen, setPropertiesOpen] = useState(true);
  const [filter, setFilter] = useState('');
  const [activeEntry, setActiveEntry] = useState(0);
  const [editedTitle, setEditedTitle] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [type, setType] = useState('article');
  const [dialog, setDialog] = useState(false);
  useEffect(() => {
    if (window.innerWidth <= 850) {
      setTreeOpen(false);
      setPropertiesOpen(false);
    }
  }, []);
  useEffect(() => {
    if (!dialog) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setDialog(false);
      if (event.key !== 'Tab') return;
      const controls = Array.from(
        document.querySelectorAll<HTMLElement>('.wp-modal button, .wp-modal input'),
      );
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [dialog]);
  const entries = [group.article, '理解、验证与新的问题', '一点尚未完成的探索'];
  const title = editedTitle ?? entries[activeEntry];
  const theme = { '--wp-accent': dark ? group.night : group.color } as CSSProperties;
  const chooseGroup = (id: Group['id']) => {
    setGroupId(id);
    setEditedTitle(null);
    setActiveEntry(0);
    setFilter('');
    setSaved(false);
  };
  return (
    <main className="wp" data-mode={dark ? 'dark' : 'light'} data-group={groupId} style={theme}>
      <div className="wp-design-bar">
        <a href="/" className="wp-wordmark">
          <img src="/favicon.svg" alt="" />
          iceaxing<span> / 工作区设计提案</span>
        </a>
        <div>
          <span className="wp-preview-badge">临时预览 · 不写入内容</span>
          <button
            className="wp-icon-button"
            aria-label={dark ? '切换浅色' : '切换深色'}
            onClick={() => setDark(!dark)}
          >
            <Icon name={dark ? 'sun' : 'moon'} />
          </button>
          <a href="/keystatic/workspace" className="wp-back">
            返回工作区 <Icon name="arrow" />
          </a>
        </div>
      </div>
      <header className="wp-intro">
        <div>
          <p className="wp-eyebrow">FIELD NOTES / DESIGN STUDY 01</p>
          <h1>
            在自己的风景里，
            <br className="wp-mobile-break" />
            慢慢写作。
          </h1>
          <p>把首页的山脊、梯田与沿途微光，带回每一次书写。</p>
        </div>
        <div className="wp-intro-note">
          <span>少一点界面的喧闹</span>
          <span>多一点文字的呼吸</span>
          <i>留白 · 细线 · 纸感 · 章节</i>
        </div>
      </header>
      <section className="wp-palette-grid" aria-label="工作区主题选择">
        {groups.map((g, index) => (
          <button
            key={g.id}
            onClick={() => chooseGroup(g.id)}
            aria-pressed={groupId === g.id}
            className="wp-palette"
            style={{ '--wp-accent': dark ? g.night : g.color } as CSSProperties}
          >
            <Landscape group={g} />
            <div className="wp-palette-top">
              <span>
                0{index + 1} / {g.english}
              </span>
              {groupId === g.id && <Icon name="check" size={14} />}
            </div>
            <strong>{g.name}</strong>
            <p>{g.note}</p>
            <div className="wp-swatch-row">
              <i />
              <i />
              <i />
              <code>{dark ? g.night : g.color}</code>
            </div>
          </button>
        ))}
      </section>
      <div className="wp-preview-caption">
        <p>
          <span className="wp-live-dot" />
          交互预览 <span>切换主题，体验完整编辑区域的配色联动</span>
        </p>
        <span>01 — WORKSPACE</span>
      </div>
      <section
        className="wp-workbench"
        aria-label="工作区交互预览"
        data-tree={treeOpen}
        data-properties={propertiesOpen}
      >
        <aside className="wp-sidebar" hidden={!treeOpen}>
          <div className="wp-brand">
            <img src="/favicon.svg" alt="" />
            <div>
              <strong>内容工作区</strong>
              <small>
                <span className="wp-live-dot" />
                本地文件
              </small>
            </div>
          </div>
          <label className="wp-group-select">
            <span>当前章节</span>
            <select
              aria-label="选择内容 group"
              value={groupId}
              onChange={(e) => chooseGroup(e.target.value as Group['id'])}
            >
              {groups.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
          </label>
          <div className="wp-sidebar-scene">
            <Landscape group={group} />
            <p>{group.english}</p>
            <strong>{group.name}</strong>
            <span>{group.note.split(' · ')[1]}</span>
          </div>
          <div className="wp-tree-tools">
            <label>
              <Icon name="search" size={14} />
              <input
                aria-label="搜索文件树"
                placeholder="寻找一篇文字…"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </label>
            <button
              className="wp-icon-button"
              aria-label="新建内容"
              onClick={() => setDialog(true)}
            >
              <Icon name="plus" />
            </button>
          </div>
          <div className="wp-tree-caption">
            <span>目录</span>
            <span>03 篇</span>
          </div>
          <details className="wp-folder" open>
            <summary>
              <Icon name="chevron" size={12} />
              {group.folder}
              <span>3</span>
            </summary>
            <div className="wp-tree-branch">
              <p>{group.project}</p>
              {entries
                .filter((e) => e.includes(filter))
                .map((entry) => (
                  <button
                    key={entry}
                    className={entry === entries[activeEntry] ? 'is-active' : ''}
                    onClick={() => {
                      setActiveEntry(entries.indexOf(entry));
                      setEditedTitle(null);
                      setSaved(false);
                    }}
                  >
                    <span className="wp-file-mark">◇</span>
                    <span>{entry}</span>
                    <small>{entries.indexOf(entry) === 0 ? 'ZH' : '草稿'}</small>
                  </button>
                ))}
              {!entries.some((e) => e.includes(filter)) && (
                <p className="wp-tree-empty">
                  这里还没有找到文字。
                  <br />
                  试着换一个关键词。
                </p>
              )}
            </div>
          </details>
          <div className="wp-sidebar-foot">
            <p>每一次整理，都是向前一步。</p>
            <div>
              <a href="/">
                回到首页 <Icon name="arrow" size={12} />
              </a>
              <span>ICEAXING</span>
            </div>
          </div>
        </aside>
        <div className="wp-editor-shell">
          <header className="wp-toolbar">
            <div className="wp-toolbar-toggles">
              <button onClick={() => setTreeOpen(!treeOpen)} aria-expanded={treeOpen}>
                <Icon name="tree" />
                <span>{treeOpen ? '收起目录' : '展开目录'}</span>
              </button>
              <button
                onClick={() => setPropertiesOpen(!propertiesOpen)}
                aria-expanded={propertiesOpen}
              >
                <Icon name="sliders" />
                <span>{propertiesOpen ? '收起属性' : '展开属性'}</span>
              </button>
            </div>
            <span className="wp-breadcrumb">
              {group.name}
              <span> / </span>
              {title}
            </span>
            <div className="wp-save-area">
              <span className="wp-save-note">{saved ? '本次预览已暂存' : '仅在本页预览'}</span>
              <button className="wp-primary" onClick={() => setSaved(true)}>
                <Icon name="check" size={14} />
                {saved ? '已暂存' : '暂存预览'}
              </button>
            </div>
          </header>
          <div className="wp-editor-columns">
            <div className="wp-document">
              <div className="wp-format-bar" aria-label="示例格式工具">
                <select aria-label="文本样式">
                  <option>正文</option>
                  <option>二级标题</option>
                  <option>三级标题</option>
                </select>
                <span />
                <button
                  title="粗体"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => formatSelection('strong')}
                >
                  <b>B</b>
                </button>
                <button
                  title="斜体"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => formatSelection('em')}
                >
                  <em>I</em>
                </button>
                <button
                  title="引用"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => formatSelection('blockquote')}
                >
                  ❞
                </button>
                <span />
                <button
                  aria-label="图片示例"
                  onClick={() =>
                    document
                      .getElementById('wp-image-sample')
                      ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                  }
                >
                  <Icon name="image" />
                </button>
                <button
                  aria-label="查看链接样式"
                  onClick={() => document.getElementById('wp-link-sample')?.focus()}
                >
                  <Icon name="link" />
                </button>
                <small>MARKDOC</small>
              </div>
              <article className="wp-paper">
                <p className="wp-eyebrow">
                  {group.english} <span>/</span> FIELD NOTE 001
                </p>
                <h2>{title}</h2>
                <div className="wp-document-meta">
                  <span>2026.10.25</span>
                  <i />
                  <span>iceaxing</span>
                  <i />
                  <span>中文</span>
                </div>
                <p className="wp-lead">{group.excerpt}</p>
                <div
                  className="wp-body"
                  contentEditable
                  suppressContentEditableWarning
                  role="textbox"
                  aria-label="预览正文"
                  aria-multiline="true"
                  key={`${groupId}-${activeEntry}`}
                >
                  <h3>
                    01 <span>从一个简单的问题开始</span>
                  </h3>
                  <p>{group.paragraph}</p>
                  <blockquote>
                    把想明白的事情记下来，
                    <br />
                    让下一次出发，有迹可循。
                  </blockquote>
                  <p>
                    将复杂的问题拆开，
                    <a href="#wp-components" id="wp-link-sample">
                      回到最初的假设
                    </a>
                    ，再一步步验证。在记录与回望之间，给思考留出一点余地。
                  </p>
                  <h3>
                    02 <span>在尝试中，长出自己的理解</span>
                  </h3>
                  <p>
                    文字、图形与公式，是整理想法的不同方式。一段推导，也可以像一条山间的小路，带我们看见新的风景。
                  </p>
                  <pre>
                    <code>H(s) = ω₀² / (s² + 2ζω₀s + ω₀²)</code>
                  </pre>
                  <p>于是，零散的线索渐渐相连。那些看起来细小的进步，最终构成了自己的路线。</p>
                </div>
                <figure className="wp-image-sample" id="wp-image-sample">
                  <Landscape group={group} />
                  <figcaption>Fig. 01 / 把思考连成自己的地形</figcaption>
                </figure>
                <footer className="wp-paper-footer">
                  <span>未完，待续。</span>
                  <span>— {group.name}</span>
                </footer>
              </article>
              <div className="wp-document-footer">
                <span>
                  <span className="wp-live-dot" />
                  写作预览
                </span>
                <span>正文可试写 · 刷新后还原</span>
              </div>
            </div>
            <aside className="wp-properties" hidden={!propertiesOpen} aria-label="属性编辑预览">
              <div className="wp-properties-heading">
                <span>文稿属性</span>
                <select
                  aria-label="属性布局示例"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="article">文章</option>
                  <option value="project">项目</option>
                  <option value="category">分类</option>
                </select>
              </div>
              <SectionLabel number="01">基本信息</SectionLabel>
              <label className="wp-field">
                <span>
                  稳定{type === 'article' ? '内容' : type === 'project' ? '项目' : '分类'} ID
                </span>
                <input defaultValue="a-path-of-understanding" key={type} />
                <small>文件键 / {type === 'article' ? '翻译组 ID / ' : ''}URL slug</small>
              </label>
              <SectionLabel number="02">
                {type === 'article' ? '标题与摘要' : '多语言信息'}
              </SectionLabel>
              <label className="wp-inline-title">
                <span>标题：</span>
                <input
                  aria-label="文稿标题"
                  value={title}
                  onChange={(e) => {
                    setEditedTitle(e.target.value);
                    setSaved(false);
                  }}
                />
              </label>
              <textarea
                className="wp-notebook"
                aria-label="摘要"
                defaultValue={group.excerpt}
                key={groupId}
                onInput={(e) => {
                  e.currentTarget.style.height = '112px';
                  e.currentTarget.style.height = `${Math.max(112, e.currentTarget.scrollHeight)}px`;
                }}
              />
              {type !== 'article' && (
                <>
                  <label className="wp-inline-title">
                    <span>Title:</span>
                    <input placeholder="An unfolding path" />
                  </label>
                  <textarea
                    className="wp-notebook"
                    aria-label="English description"
                    placeholder="A few thoughts along the way…"
                  />
                  <label className="wp-inline-title">
                    <span>Titel:</span>
                    <input placeholder="Ein eigener Weg" />
                  </label>
                </>
              )}
              <SectionLabel number="03">
                {type === 'article' ? '发布设置' : '标签与设置'}
              </SectionLabel>
              <div className="wp-field-pair">
                <label className="wp-field">
                  <span>语言</span>
                  <select defaultValue="zh">
                    <option value="zh">中文 · ZH</option>
                    <option>English · EN</option>
                    <option>Deutsch · DE</option>
                  </select>
                </label>
                <label className="wp-field">
                  <span>状态</span>
                  <select>
                    <option>草稿</option>
                    <option>已发布</option>
                    <option>定时发布</option>
                    <option>已归档</option>
                  </select>
                </label>
              </div>
              <label className="wp-field">
                <span>发布时间</span>
                <input type="datetime-local" defaultValue="2026-10-25T09:30" />
              </label>
              <label className="wp-field">
                <span>更新时间</span>
                <input type="datetime-local" />
              </label>
              <label className="wp-field">
                <span>标签</span>
                <input defaultValue="思考  /  探索" placeholder="添加标签" />
              </label>
              <div className="wp-field-pair">
                <label className="wp-field">
                  <span>作者</span>
                  <input defaultValue="iceaxing" />
                </label>
                <label className="wp-field">
                  <span>排序</span>
                  <input type="number" defaultValue={0} />
                </label>
              </div>
              <label className="wp-checkbox">
                <input type="checkbox" defaultChecked />
                <span>{type === 'article' ? '首页列表精选' : '首页卡片精选'}</span>
              </label>
              {type === 'project' && (
                <label className="wp-field">
                  <span>项目进度</span>
                  <input type="range" defaultValue={45} />
                </label>
              )}
              <SectionLabel number="04">归属信息</SectionLabel>
              <label className="wp-field">
                <span>直属分类</span>
                <select key={`${groupId}-category`}>
                  <option>{group.folder}</option>
                  <option>其他分类</option>
                </select>
              </label>
              {type !== 'category' && (
                <>
                  <label className="wp-field">
                    <span>所属项目</span>
                    <select key={`${groupId}-project`}>
                      <option>{group.project}</option>
                      <option>不指定项目</option>
                    </select>
                  </label>
                  <label className="wp-field">
                    <span>所属合集</span>
                    <input placeholder="搜索合集…" list="wp-collections" />
                    <datalist id="wp-collections">
                      <option>思考的路径</option>
                      <option>探索与实践</option>
                    </datalist>
                  </label>
                </>
              )}
              <SectionLabel number="05">图片与其他</SectionLabel>
              <label className="wp-upload">
                <Icon name="image" size={22} />
                <span>选择一张封面</span>
                <small>让文字，也有自己的风景</small>
                <input type="file" accept="image/*" aria-label="预览封面选择" />
              </label>
              <details className="wp-details">
                <summary>
                  SEO 与属性填写说明 <Icon name="plus" size={12} />
                </summary>
                <label className="wp-field">
                  <span>SEO 标题</span>
                  <input placeholder="留空时使用文章标题" />
                </label>
                <p>摘要用于文章列表与搜索展示。归属字段决定内容在网站中的位置。</p>
              </details>
            </aside>
          </div>
        </div>
      </section>
      <section className="wp-design-system" id="wp-components">
        <div className="wp-section-heading">
          <div>
            <p className="wp-eyebrow">02 / THE DETAILS</p>
            <h2>让细节，安静地连在一起。</h2>
          </div>
          <p>
            以下元素随所选主题同步变化。
            <br />
            操作使用清晰的无衬线字体，文字保留衬线字体的温度。
          </p>
        </div>
        <div className="wp-component-grid">
          <div className="wp-specimen">
            <SectionLabel number="A">字体与层次</SectionLabel>
            <p className="wp-type-display">沿途，皆是序章。</p>
            <p className="wp-type-body">
              正文以舒展的行距，承接每一次思考。
              <br />
              章节轻轻分开，文字慢慢相连。
            </p>
            <p className="wp-type-meta">说明 12 px / 操作 13 px / 正文 16 px · 行高 1.9</p>
            <div className="wp-specimen-rule">
              <span>01 / CHAPTER</span>
              <i />
            </div>
          </div>
          <div className="wp-specimen">
            <SectionLabel number="B">按钮与状态</SectionLabel>
            <div className="wp-button-samples">
              <button className="wp-primary" onClick={() => setSaved(true)}>
                <Icon name="check" size={14} />
                暂存预览
              </button>
              <button className="wp-secondary" onClick={() => setDialog(true)}>
                <Icon name="plus" size={14} />
                新建文章
              </button>
              <button disabled className="wp-secondary">
                暂不可用
              </button>
            </div>
            <div className="wp-state-row">
              <span className="wp-state is-published">已发布</span>
              <span className="wp-state">草稿</span>
              <span className="wp-state is-scheduled">定时发布</span>
              <span className="wp-state is-archived">已归档</span>
            </div>
            <div className="wp-inline-success">
              <Icon name="check" size={14} />
              已保存 · 所有改动都留在这次预览中
            </div>
          </div>
          <div className="wp-specimen">
            <SectionLabel number="C">输入与选择</SectionLabel>
            <label className="wp-field">
              <span>普通输入</span>
              <input placeholder="写下一个标题…" />
            </label>
            <label className="wp-field">
              <span>需要关注的输入</span>
              <input aria-invalid="true" defaultValue="A New Idea" />
              <small className="wp-error">ID 使用小写字母、数字和连字符。</small>
            </label>
            <div className="wp-sample-checks">
              <label className="wp-checkbox">
                <input type="checkbox" defaultChecked />
                首页精选
              </label>
              <label className="wp-checkbox">
                <input type="checkbox" />
                暂不展示
              </label>
            </div>
          </div>
          <div className="wp-specimen">
            <SectionLabel number="D">留白与边界</SectionLabel>
            <div className="wp-spacing-samples">
              {[4, 8, 12, 16, 24, 32].map((n) => (
                <div key={n}>
                  <span style={{ width: `${n * 2}px` }} />
                  <code>{n}</code>
                </div>
              ))}
            </div>
            <p className="wp-type-meta">
              4 px 为节奏单位。字段间距 12–16 px，
              <br />
              章节间距 24–32 px，正文宽度约 65 字符。
            </p>
            <p className="wp-design-note">
              主题色落在选中、焦点、路线与少量文字上；用纸面的明暗区分区域。
            </p>
          </div>
        </div>
      </section>
      <footer className="wp-page-footer">
        <span>ICEAXING / A QUIET PLACE TO WRITE</span>
        <span>设计预览 · 正式工作区尚未更改</span>
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          回到起点 ↑
        </a>
      </footer>
      {dialog && (
        <div
          className="wp-modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setDialog(false);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="wp-dialog-title"
            className="wp-modal"
            onKeyDown={(e) => {
              if (e.key === 'Escape') setDialog(false);
            }}
          >
            <button
              className="wp-icon-button wp-modal-close"
              autoFocus
              aria-label="关闭新建预览"
              onClick={() => setDialog(false)}
            >
              <Icon name="close" />
            </button>
            <p className="wp-eyebrow">A NEW BEGINNING</p>
            <h2 id="wp-dialog-title">一段新的记录。</h2>
            <p>先为这段想法，取一个名字。</p>
            <label className="wp-field">
              <span>文章标题</span>
              <input placeholder="从这里开始…" />
            </label>
            <p className="wp-type-meta">仅展示弹窗样式，不会创建真实文章。</p>
            <button className="wp-primary" onClick={() => setDialog(false)}>
              完成预览 <Icon name="arrow" size={14} />
            </button>
          </section>
        </div>
      )}
    </main>
  );
}
