import type { ReactNode, CSSProperties } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";

interface StylesDictionary {
	[key: string]: CSSProperties;
}

const styles: StylesDictionary = {
	featuresContainer: {
		padding: "2rem",
		maxWidth: "1200px",
		margin: "0 auto",
	},
	featuresGrid: {
		display: "grid",
		gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
		gap: "1.5rem",
		marginTop: "2rem",
	},
	featureBox: {
		borderRadius: "8px",
		overflow: "hidden",
		boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
		transition: "transform 0.3s ease, box-shadow 0.3s ease",
		display: "flex",
		flexDirection: "column",
		backgroundColor: "var(--ifm-card-background-color)",
		border: "1px solid var(--ifm-color-emphasis-200)",
	},
	featureBoxTall: {
		gridRow: "span 2",
	},
	featureBoxWide: {
		gridColumn: "span 2",
	},
	featureContent: {
		padding: "1.5rem",
		flex: 1,
	},
	featureIcon: {
		fontSize: "2rem",
		marginBottom: "1rem",
	},
	featureTitle: {
		fontSize: "1.5rem",
		fontWeight: "bold",
		marginBottom: "1rem",
	},
	featureDescription: {
		color: "var(--ifm-color-emphasis-700)",
		lineHeight: 1.6,
	},
};

interface FeatureBoxProps {
	title: string;
	description: string;
	icon: ReactNode;
	tall?: boolean;
	wide?: boolean;
	bgColor?: string | null;
}

// Add global CSS for hover effects and responsive behavior
const globalStyles = `
	.feature-box-hover {
		transition: transform 0.3s ease, box-shadow 0.3s ease;
	}
	.feature-box-hover:hover {
		transform: translateY(-5px);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
	}
	
	/* Responsive adjustments */
	@media (max-width: 768px) {
		.feature-grid {
			grid-template-columns: 1fr !important;
		}
		
		/* Reset tall and wide spans on mobile */
		.feature-box-tall, .feature-box-wide {
			grid-row: auto !important;
			grid-column: auto !important;
		}
		
		/* Limit height on mobile */
		.feature-box-hover {
			max-height: none !important;
		}
	}
`;

// Feature component with variable size support
function FeatureBox({
	title,
	description,
	icon,
	tall = false,
	wide = false,
	bgColor = null,
}: FeatureBoxProps) {
	const boxStyle: CSSProperties = {
		...styles.featureBox,
		...(tall ? styles.featureBoxTall : {}),
		...(wide ? styles.featureBoxWide : {}),
		...(bgColor ? { backgroundColor: bgColor } : {}),
	};

	return (
		<div
			style={boxStyle}
			className={`feature-box-hover ${tall ? "feature-box-tall" : ""} ${wide ? "feature-box-wide" : ""}`}
		>
			<div style={styles.featureContent}>
				<div style={styles.featureIcon}>{icon}</div>
				<h3 style={styles.featureTitle}>{title}</h3>
				<p style={styles.featureDescription}>{description}</p>
			</div>
		</div>
	);
}

function FeaturesSection() {
	return (
		<section style={styles.featuresContainer}>
			<Heading as="h2">Features</Heading>
			<div style={styles.featuresGrid} className="feature-grid">
				<FeatureBox
					title="Fast Development"
					description="Instant server start and lightning fast HMR that stays fast regardless of app size."
					icon="⚡️"
					wide={true}
				/>
				<FeatureBox
					title="Optimized Build"
					description="Pre-configured build setup with multi-page support and optimized asset handling."
					icon="📦"
					tall={true}
				/>
				<FeatureBox
					title="Universal Plugin"
					description="Rollup-superset plugin interface shared between dev and build."
					icon="🔌"
				/>
				<FeatureBox
					title="TypeScript Support"
					description="First-class TypeScript support with performance optimizations."
					icon="🔑"
				/>
				<FeatureBox
					title="Community Driven"
					description="An active ecosystem with hundreds of plugins and integrations."
					icon="🌐"
					wide={true}
				/>
			</div>
		</section>
	);
}

function HomepageHeader() {
	const { siteConfig } = useDocusaurusContext();
	return (
		<header className={clsx("hero hero--primary")}>
			<div className="container">
				<Heading as="h1" className="hero__title">
					{siteConfig.title}
				</Heading>
				<p className="hero__subtitle">{siteConfig.tagline}</p>
				<div>
					<Link
						className="button button--secondary button--lg"
						to="/docs/intro"
					>
						Docusaurus Tutorial - 5min ⏱️
					</Link>
				</div>
			</div>
		</header>
	);
}

export default function Home(): ReactNode {
	const { siteConfig } = useDocusaurusContext();
	return (
		<Layout
			title={`Hello from ${siteConfig.title}`}
			description="Description will go into a meta tag in <head />"
		>
			{/* Add global styles */}
			<style>{globalStyles}</style>
			<HomepageHeader />
			<main>
				<FeaturesSection />
			</main>
		</Layout>
	);
}
