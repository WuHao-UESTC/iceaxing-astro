import { z } from 'astro/zod';

export const profileUrlSchema = z.url().refine((value) => /^https?:\/\//i.test(value), {
  message: '请使用 http:// 或 https:// 链接。',
});
const optionalUrl = profileUrlSchema.or(z.literal('')).nullish();
const text = () => z.string().default('');
const textList = () => z.array(z.string().trim().min(1)).default([]);
const profileLinkSchema = z.object({ label: z.string().trim().min(1), url: profileUrlSchema });

export const completedProjectSchema = z.discriminatedUnion('discriminant', [
  z.object({
    discriminant: z.literal('internal'),
    value: z.object({
      project: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
      image: z.string().nullish(),
    }),
  }),
  z.object({
    discriminant: z.literal('external'),
    value: z.object({
      title: z.string().trim().min(1),
      description: z.string().trim().min(1),
      url: profileUrlSchema,
      image: z.string().nullish(),
    }),
  }),
]);

export const profileSchema = z.object({
  displayName: text(),
  headline: text(),
  location: text(),
  avatar: text(),
  email: z.email().or(z.literal('')).default(''),
  qq: z
    .string()
    .regex(/^\d{5,12}$/)
    .or(z.literal(''))
    .default(''),
  links: z.array(profileLinkSchema).default([]),
  directions: textList(),
  biography: text(),
  honors: z
    .array(
      z.object({
        title: z.string().trim().min(1),
        period: text(),
        level: text(),
        description: text(),
        url: optionalUrl,
        certificateImage: z
          .string()
          .nullish()
          .transform((value) => value ?? ''),
      }),
    )
    .default([]),
  education: z
    .array(
      z.object({
        degree: z.enum(['bachelor', 'master', 'doctor']),
        school: z.string().trim().min(1),
        department: text(),
        major: text(),
        period: text(),
        description: text(),
      }),
    )
    .default([]),
  research: z
    .array(
      z.object({
        title: z.string().trim().min(1),
        type: z.enum(['project', 'research']),
        role: text(),
        organization: text(),
        period: text(),
        summary: text(),
        image: z
          .string()
          .nullish()
          .transform((value) => value ?? ''),
        contributions: textList(),
        outcomes: textList(),
        links: z.array(profileLinkSchema).default([]),
        project: z.string().nullable().optional(),
      }),
    )
    .default([]),
  work: z
    .array(
      z.object({
        organization: z.string().trim().min(1),
        role: z.string().trim().min(1),
        employmentType: text(),
        location: text(),
        period: text(),
        contributions: textList(),
      }),
    )
    .default([]),
  completedProjects: z.array(completedProjectSchema).default([]),
});

export type Profile = z.infer<typeof profileSchema>;
export type CompletedProject = z.infer<typeof completedProjectSchema>;
