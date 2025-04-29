import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import styled from "styled-components";

// Styled components
const FeaturesContainer = styled.section`
	padding: 2rem;
	max-width: 1200px;
	margin: 0 auto;
`;

const FeaturesGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	gap: 1.5rem;
	margin-top: 2rem;
	
	@media (max-width: 768px) {
		grid-template-columns: 1fr;
	}
`;

const FeatureBoxBase = styled.div`
	border-radius: 8px;
	overflow: hidden;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	transition: transform 0.3s ease, box-shadow 0.3s ease;
	display: flex;
	flex-direction: column;
	background-color: var(--ifm-card-background-color);
	border: 1px solid var(--ifm-color-emphasis-200);
	
	&:hover {
		transform: translateY(-5px);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
	}
	
	@media (max-width: 768px) {
		grid-row: auto !important;
		grid-column: auto !important;
		max-height: none !important;
	}
`;

const FeatureContent = styled.div`
	padding: 1.5rem;
	flex: 1;
`;

const FeatureBoxTitle = styled.h3`
	font-size: 1.5rem;
	font-weight: bold;
	margin-bottom: 1rem;
`;

const FeatureBoxDescription = styled.p`
	color: var(--ifm-color-emphasis-700);
	line-height: 1.6;
`;

const FeatureBoxIcon = styled.div`
	font-size: 2rem;
	margin-bottom: 1rem;
`;

interface FeatureBoxProps {
	children: ReactNode;
	tall?: boolean;
	wide?: boolean;
	bgColor?: string;
	className?: string;
}

// Feature component with variable size support
const FeatureBox = styled(FeatureBoxBase)<FeatureBoxProps>`
	${(props) =>
		props.tall &&
		`
		grid-row: span 2;
		
		@media (max-width: 768px) {
			grid-row: auto;
		}
	`}
	
	${(props) =>
		props.wide &&
		`
		grid-column: span 2;
		
		@media (max-width: 768px) {
			grid-column: auto;
		}
	`}
	
	${(props) => props.bgColor && `background-color: ${props.bgColor};`}
`;

function FeaturesSection() {
	return (
		<FeaturesContainer>
			<Heading as="h2">Features</Heading>
			<FeaturesGrid>
				<FeatureBox wide>
					<FeatureContent>
						<FeatureBoxIcon>⚡️</FeatureBoxIcon>
						<FeatureBoxTitle>Fast Development</FeatureBoxTitle>
						<FeatureBoxDescription>
							Instant server start and lightning fast HMR that stays fast
							regardless of app size.
						</FeatureBoxDescription>
					</FeatureContent>
				</FeatureBox>

				<FeatureBox tall>
					<FeatureContent>
						<FeatureBoxIcon>📦</FeatureBoxIcon>
						<FeatureBoxTitle>Optimized Build</FeatureBoxTitle>
						<FeatureBoxDescription>
							Pre-configured build setup with multi-page support and optimized
							asset handling.
						</FeatureBoxDescription>
					</FeatureContent>
				</FeatureBox>

				<FeatureBox>
					<FeatureContent>
						<FeatureBoxIcon>🔌</FeatureBoxIcon>
						<FeatureBoxTitle>Universal Plugin</FeatureBoxTitle>
						<FeatureBoxDescription>
							Rollup-superset plugin interface shared between dev and build.
						</FeatureBoxDescription>
					</FeatureContent>
				</FeatureBox>

				<FeatureBox>
					<FeatureContent>
						<FeatureBoxIcon>🔑</FeatureBoxIcon>
						<FeatureBoxTitle>TypeScript Support</FeatureBoxTitle>
						<FeatureBoxDescription>
							First-class TypeScript support with performance optimizations.
						</FeatureBoxDescription>
					</FeatureContent>
				</FeatureBox>

				<FeatureBox wide>
					<FeatureContent>
						<FeatureBoxIcon>🌐</FeatureBoxIcon>
						<FeatureBoxTitle>Community Driven</FeatureBoxTitle>
						<FeatureBoxDescription>
							An active ecosystem with hundreds of plugins and integrations.
						</FeatureBoxDescription>
					</FeatureContent>
				</FeatureBox>
			</FeaturesGrid>
		</FeaturesContainer>
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
			<HomepageHeader />
			<main>
				<FeaturesSection />
			</main>
		</Layout>
	);
}
