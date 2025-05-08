import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
	title: "Vircadia",
	tagline: "Reactivity layer for games.",
	favicon: "img/favicon.ico",

	// Set the production url of your site here
	url: "https://vircadia.com",
	// Set the /<baseUrl>/ pathname under which your site is served
	// For GitHub pages deployment, it is often '/<projectName>/'
	baseUrl: "/",

	// GitHub pages deployment config.
	// If you aren't using GitHub pages, you don't need these.
	organizationName: "Vircadia", // Usually your GitHub org/user name.
	projectName: "vircadia-world", // Usually your repo name.

	onBrokenLinks: "throw",
	onBrokenMarkdownLinks: "warn",

	// Even if you don't use internationalization, you can use this field to set
	// useful metadata like html lang. For example, if your site is Chinese, you
	// may want to replace "en" with "zh-Hans".
	i18n: {
		defaultLocale: "en",
		locales: ["en"],
	},

	// Add the Google Fonts embed code
	headTags: [
		{
			tagName: "link",
			attributes: {
				rel: "preconnect",
				href: "https://fonts.googleapis.com",
			},
		},
		{
			tagName: "link",
			attributes: {
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossorigin: "anonymous",
			},
		},
		{
			tagName: "link",
			attributes: {
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap",
			},
		},
	],

	presets: [
		[
			"classic",
			{
				docs: {
					sidebarPath: "./sidebars.ts",
					path: "docs/vircadia-world/",
					routeBasePath: "vircadia-world",
					exclude: ["**/vircadia-world-sdk-py/**"],
					// Please change this to your repo.
					// Remove this to remove the "edit this page" links.
					editUrl: ({ docPath }) => {
						// Remove 'docs/' from the path if present
						return `https://github.com/Vircadia/vircadia-world/edit/master/${docPath}`;
					},
				},
				blog: {
					showReadingTime: true,
					feedOptions: {
						type: ["rss", "atom"],
						xslt: true,
					},
					// Useful options to enforce blogging best practices
					onInlineTags: "warn",
					onInlineAuthors: "warn",
					onUntruncatedBlogPosts: "warn",
				},
				theme: {
					customCss: "./src/css/custom.css",
				},
			} satisfies Preset.Options,
		],
	],

	themeConfig: {
		// Replace with your project's social card
		image: "img/og/vircadia.png",
		navbar: {
			title: "Vircadia",
			logo: {
				alt: "Vircadia Icon",
				src: "img/icon.svg",
			},
			items: [
				{ to: "/vircadia-world", label: "Documentation", position: "left" },
				{
					to: "/vircadia-world/cli/#quick-start",
					label: "Quick Start",
					position: "left",
				},
				{ to: "/blog", label: "Blog", position: "left" },
				{
					href: "https://github.com/Vircadia",
					label: "GitHub",
					position: "right",
				},
			],
		},
		footer: {
			// style: "light",
			// links: [
			// 	{
			// 		title: "Community",
			// 		items: [
			// 			{
			// 				label: "Discord",
			// 				href: "https://discordapp.com/invite/Pvx2vke",
			// 			},
			// 			{
			// 				label: "X",
			// 				href: "https://x.com/vircadia",
			// 			},
			// 		],
			// 	},
			// 	{
			// 		title: "Code",
			// 		items: [
			// 			{
			// 				label: "GitHub",
			// 				href: "https://github.com/vircadia/",
			// 			},
			// 		],
			// 	},
			// ],
			copyright: `Copyright © ${new Date().getFullYear()} Vircadia`,
		},
		announcementBar: {
			id: "support_us",
			content:
				'Need help integrating Vircadia? <a href="mailto:hello@vircadia.com">Get in touch!</a>',
			backgroundColor: "#fafbfc",
			textColor: "#091E42",
			isCloseable: false,
		},
		prism: {
			theme: prismThemes.github,
			darkTheme: prismThemes.dracula,
		},
	} satisfies Preset.ThemeConfig,
};

export default config;
