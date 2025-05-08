import * as fs from "node:fs";
import * as path from "node:path";
import puppeteer from "puppeteer";
import type * as htmlToImageType from "html-to-image";

import docusaurusConfig from "../docusaurus.config.js";

declare global {
	interface Window {
		htmlToImage: typeof htmlToImageType;
	}
}

const LOGO_PATH = path.resolve(__dirname, "../static/img/logo.png");
const OG_IMAGE_PATH = path.resolve(__dirname, "../static/img/og/vircadia.png");
const TAGLINE = docusaurusConfig.tagline;

(async () => {
	// Launch headless browser
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	// Load logo from static/img directory as data URI
	const logoDataUri = `data:image/png;base64,${fs.readFileSync(LOGO_PATH, "base64")}`;

	// Load Manrope font from static/font directory as data URI
	const fontDataUri = `data:font/ttf;base64,${fs.readFileSync(path.resolve(__dirname, "../static/font/Manrope/Manrope-VariableFont_wght.ttf"), "base64")}`;

	// Define HTML content for the OG image
	const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <style>
          @font-face {
            font-family: 'Manrope';
            src: url('${fontDataUri}') format('truetype');
            font-weight: 100 900;
            font-style: normal;
          }
          body,html { margin: 0; padding: 0; }
          #og-container {
            width: 1200px;
            height: 630px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-color: #ffffff;
          }
          #og-container img {
            max-width: 50%;
            max-height: 50%;
          }
          #slogan {
            font-family: 'Manrope', sans-serif;
            font-size: 64px;
            color: #000000;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div id="og-container">
          <img src="${logoDataUri}" alt="Logo" />
          <div id="slogan">${TAGLINE}</div>
        </div>
      </body>
    </html>
  `;

	// Set page content and inject html-to-image script
	await page.setContent(htmlContent, { waitUntil: "networkidle0" });
	const htmlToImagePath = require.resolve(
		"html-to-image/dist/html-to-image.js",
	);
	await page.addScriptTag({ path: htmlToImagePath });

	// Generate the PNG from the container element
	const dataUrl = await page.evaluate(async () => {
		const container = document.getElementById("og-container");
		if (!container) {
			throw new Error("OG container element not found");
		}
		return await window.htmlToImage.toPng(container, {
			width: 1200,
			height: 630,
		});
	});

	await browser.close();

	// Strip the data URI prefix and write the PNG to static/img
	const base64Data = dataUrl.replace(/^data:image\/png;base64,/, "");
	fs.writeFileSync(OG_IMAGE_PATH, base64Data, "base64");

	console.log("OG image generated at", OG_IMAGE_PATH);
})().catch((err) => {
	console.error(err);
	process.exit(1);
});
