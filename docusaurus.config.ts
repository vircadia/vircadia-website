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
	onBrokenAnchors: "log",

	// Even if you don't use internationalization, you can use this field to set
	// useful metadata like html lang. For example, if your site is Chinese, you
	// may want to replace "en" with "zh-Hans".
	i18n: {
		defaultLocale: "en",
		locales: ["en"],
	},

	// Add the Google Fonts embed code
	headTags: [],

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
				{
					to: "/vircadia-world/",
					label: "Docs",
					position: "right",
				},
				{
					to: "/vircadia-world/",
					label: "Get Started",
					position: "right",
				},
				{
					to: "/blog",
					label: "Blog",
					position: "right",
				},
				{
					label: "Case Studies",
					position: "right",
					items: [
						{
							label: "Linux Professional Institute",
							to: "/stories/vircadia-x-lpi",
						},
					],
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
			id: "need_help_announcement_bar",
			content:
				'Need help integrating Vircadia? <a href="mailto:hello@vircadia.com">Get in touch!</a>',
			isCloseable: false,
		},
		defaultMode: "light",
		prism: {
			theme: prismThemes.github,
			darkTheme: prismThemes.dracula,
		},
	} satisfies Preset.ThemeConfig,
};

export default config;
