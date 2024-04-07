import type { AstroIntegration } from 'astro';
import {getApi} from '@astrojs/sitemap';

export default function createIntegration(): AstroIntegration {
	// See the Integration API docs for full details
	// https://docs.astro.build/en/reference/integrations-reference/
	return {
		name: '@example/my-integration',
		hooks: {
			'astro:config:setup': ({config}) => {
				// See the @astrojs/react integration for an example
				// https://github.com/withastro/astro/blob/main/packages/integrations/react/src/index.ts

				const sitemapApi = getApi(config);
				if (sitemapApi) {
					sitemapApi.addPage(new URL('./foo', config.base).toString());

					sitemapApi.addFilter(page => {
						const pageUrl = new URL(page);

						if (pageUrl.pathname.startsWith('/foo/hidden/')) {
							// filter out our internal pages
							return false;
						}
					})
				}
			},
			'astro:build:setup': () => {
				// See the @astrojs/lit integration for an example
				// https://github.com/withastro/astro/blob/main/packages/integrations/lit/src/index.ts
			},
			'astro:build:done': () => {
				// See the @astrojs/partytown integration for an example
				// https://github.com/withastro/astro/blob/main/packages/integrations/partytown/src/index.ts
			},
		},
	};
}
