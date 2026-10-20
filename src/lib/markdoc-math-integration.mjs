import markdoc from '@astrojs/markdoc';
import { normalizeDollarMath } from './markdoc-math';

/** Keep the standard Markdoc integration; normalize only its render input. */
export default function markdocWithMath(options) {
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
              getRenderModule(input) {
                const pluginContext = this;
                const resolve = pluginContext.resolve.bind(pluginContext);
                const contextWithDecodedImagePaths = Object.create(pluginContext);
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
                  contents: normalizeDollarMath(input.contents),
                });
              },
            });
          },
        }),
    },
  };
}
