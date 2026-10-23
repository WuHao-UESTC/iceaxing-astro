import markdoc from '@astrojs/markdoc';
import { normalizeDollarMath } from './markdoc-math';
import { normalizeWikiLinks } from './wikilinks';

const normalizeContent = (source) => normalizeWikiLinks(normalizeDollarMath(source));

/** Keep the standard Markdoc integration; extend prose syntax at its input. */
export default function markdocWithContentExtensions(options) {
  const integration = markdoc(options);
  const setup = integration.hooks['astro:config:setup'];
  return {
    ...integration,
    hooks: {
      ...integration.hooks,
      'astro:config:setup': (context) =>
        setup({
          ...context,
          addContentEntryType(entry) {
            context.addContentEntryType({
              ...entry,
              getEntryInfo(input) {
                const info = entry.getEntryInfo(input);
                return { ...info, body: normalizeContent(info.body) };
              },
              getRenderModule(input) {
                const resolve = this.resolve.bind(this);
                const contextWithDecodedImagePaths = Object.create(this);
                contextWithDecodedImagePaths.resolve = async (id, ...args) => {
                  const result = await resolve(id, ...args);
                  if (result || typeof id !== 'string') return result;
                  let decodedId;
                  try {
                    decodedId = decodeURI(id);
                  } catch {
                    return result;
                  }
                  return decodedId === id ? result : resolve(decodedId, ...args);
                };
                return entry.getRenderModule.call(contextWithDecodedImagePaths, {
                  ...input,
                  contents: normalizeContent(input.contents),
                });
              },
            });
          },
        }),
    },
  };
}
