import { fields } from '@keystatic/core';

const requiredText = (label: string) => fields.text({ label, validation: { isRequired: true } });
const optionalText = (label: string) => fields.text({ label });
const longText = (label: string) => fields.text({ label, multiline: true });
const completedProjectImage = () =>
  fields.image({
    label: '卡片背景图片（可选）',
    directory: 'public/media/profile',
    publicPath: '/media/profile/',
    description:
      '作为深色毛玻璃下的虚化背景。站内项目留空时复用项目封面，均未设置时使用默认低多边形占位图。',
  });
const period = (label: string) =>
  fields.text({ label, description: '例如：2024.09 — 至今，或 2026.06。' });
const textList = (label: string) =>
  fields.array(requiredText('内容'), {
    label,
    itemLabel: (props) => props.value || '新增条目',
  });
const webUrl = (label: string) =>
  fields.text({
    label,
    validation: {
      isRequired: true,
      pattern: {
        regex: /^https?:\/\/[^\s]+$/i,
        message: '请输入完整的 http:// 或 https:// 链接。',
      },
    },
  });
const optionalWebUrl = (label: string) =>
  fields.text({
    label,
    validation: {
      pattern: {
        regex: /^https?:\/\/[^\s]+$|^$/i,
        message: '请输入 http:// 或 https:// 链接，或留空。',
      },
    },
  });
const links = (label: string) =>
  fields.array(
    fields.object({
      label: requiredText('名称'),
      url: webUrl('链接'),
    }),
    { label, itemLabel: (props) => props.fields.label.value || '新链接' },
  );

export const profileFields = () =>
  fields.object(
    {
      displayName: fields.text({
        label: '显示名称',
        description: '顶部标题；留空时使用站点作者名称。',
      }),
      headline: optionalText('身份 / 一句话定位（可选）'),
      location: optionalText('所在地区（可选）'),
      avatar: fields.image({
        label: '头像',
        directory: 'public/media/profile',
        publicPath: '/media/profile/',
        description: '建议正方形图片；未上传时使用站点图标。',
      }),
      email: fields.text({
        label: '公开邮箱',
        validation: {
          pattern: {
            regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$|^$/,
            message: '请输入有效的邮箱地址，或留空。',
          },
        },
      }),
      qq: fields.text({
        label: 'QQ',
        validation: {
          pattern: { regex: /^\d{5,12}$|^$/, message: '请输入 5–12 位 QQ 号码，或留空。' },
        },
      }),
      links: links('其他联系方式 / 社交链接'),
      directions: textList('当前方向（显示在标题区）'),
      biography: fields.text({
        label: '个人简介（标题区右侧）',
        multiline: true,
        description: '纯文字，保留换行；以透明、无框横线本展示，不进入正文目录。',
      }),
      honors: fields.array(
        fields.object({
          title: requiredText('荣誉名称'),
          period: period('获奖时间'),
          level: optionalText('获奖等级（可选）'),
          description: longText('补充说明（可选）'),
          url: optionalWebUrl('证书链接（可选）'),
          certificateImage: fields.image({
            label: '获奖证书图片（可选）',
            directory: 'public/media/profile',
            publicPath: '/media/profile/',
            description: '画廊中等比完整展示，不裁切；获奖时间与等级叠在左上角。',
          }),
        }),
        {
          label: '01 所获荣誉',
          itemLabel: (props) => props.fields.title.value || '新荣誉',
          description: '证书画廊，每页三张。日期与等级显示在图片左上角，名称在下方居中。',
        },
      ),
      education: fields.array(
        fields.object({
          degree: fields.select({
            label: '学历阶段',
            defaultValue: 'bachelor',
            options: [
              { label: '本科', value: 'bachelor' },
              { label: '硕士', value: 'master' },
              { label: '博士', value: 'doctor' },
            ],
          }),
          school: requiredText('院校名称'),
          department: optionalText('院系（可选）'),
          major: optionalText('专业（可选）'),
          period: period('就读时间'),
          description: longText('补充说明（可选）'),
        }),
        {
          label: '02 教育背景',
          itemLabel: (props) => props.fields.school.value || '新学历',
          description: '按本科、硕士、博士添加；未填写的学历不显示。拖动调整顺序。',
        },
      ),
      research: fields.array(
        fields.object({
          title: requiredText('项目 / 课题名称'),
          type: fields.select({
            label: '经历类型',
            defaultValue: 'project',
            options: [
              { label: '重要项目', value: 'project' },
              { label: '科研经历', value: 'research' },
            ],
          }),
          role: optionalText('个人角色（可选）'),
          organization: optionalText('机构 / 团队（可选）'),
          period: period('时间范围'),
          summary: longText('概述'),
          image: fields.image({
            label: '明信片图片（可选）',
            directory: 'public/media/profile',
            publicPath: '/media/profile/',
            description: '优先使用此图片，留空时复用关联站内项目的封面；均未设置则显示线稿。',
          }),
          contributions: textList('个人贡献'),
          outcomes: textList('成果记录（可选）'),
          links: links('相关链接（可选）'),
          project: fields.relationship({ label: '关联站内项目（可选）', collection: 'projects' }),
        }),
        {
          label: '03 重要项目与科研经历',
          itemLabel: (props) => props.fields.title.value || '新经历',
        },
      ),
      work: fields.array(
        fields.object({
          organization: requiredText('公司 / 机构名称'),
          role: requiredText('岗位名称'),
          employmentType: optionalText('任职类型（可选，如实习 / 全职）'),
          location: optionalText('工作地点（可选）'),
          period: period('任职时间'),
          contributions: textList('职责与成果'),
        }),
        {
          label: '04 工作经历',
          itemLabel: (props) => props.fields.organization.value || '新工作经历',
          description: '公司与岗位同行展示，以 | 分隔，字体字号相同。',
        },
      ),
      completedProjects: fields.array(
        fields.conditional(
          fields.select({
            label: '项目来源',
            defaultValue: 'internal',
            options: [
              { label: '选择站内项目', value: 'internal' },
              { label: '自行填写项目', value: 'external' },
            ],
          }),
          {
            internal: fields.object({
              image: completedProjectImage(),
              project: fields.relationship({
                label: '站内项目',
                collection: 'projects',
                validation: { isRequired: true },
                description: '复用项目名称、简介与站内链接；前台仅展示已完成且公开的项目。',
              }),
            }),
            external: fields.object({
              image: completedProjectImage(),
              title: requiredText('项目名称'),
              description: fields.text({
                label: '项目简介',
                multiline: true,
                validation: { isRequired: true },
              }),
              url: webUrl('项目链接'),
            }),
          },
        ),
        {
          label: '05 完结项目',
          itemLabel: (props) =>
            props.discriminant === 'internal'
              ? props.value.fields.project.value || '选择站内项目'
              : props.value.fields.title.value || '自行填写项目',
          description: '两种来源可混排、拖动排序。三列卡片展示；外部链接在新标签页打开。',
        },
      ),
    },
    {
      label: '个人资料（仅个人档案页使用）',
      description:
        '先填写顶部身份、联系、方向与简介，再依次填写五个正文板块。空板块及其目录入口自动隐藏。个人档案不使用下方正文编辑器。',
    },
  );
