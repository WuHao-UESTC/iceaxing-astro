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
                return entry.getRenderModule.call(this, {
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
