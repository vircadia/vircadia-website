import type { ReactNode } from "react";
import React, { useRef, useEffect } from "react";
import Typed from "typed.js";
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

interface FeatureBoxProps {
	children: ReactNode;
	$tall?: boolean;
	$wide?: boolean;
	bgColor?: string;
	className?: string;
}

// Feature component with variable size support
const FeatureBox = styled(FeatureBoxBase)<FeatureBoxProps>`
	${(props) =>
		props.$tall &&
		`
		grid-row: span 2;
		
		@media (max-width: 768px) {
			grid-row: auto;
		}
	`}
	
	${(props) =>
		props.$wide &&
		`
		grid-column: span 2;
		
		@media (max-width: 768px) {
			grid-column: auto;
		}
	`}
	
	${(props) => props.bgColor && `background-color: ${props.bgColor};`}
`;

// Header styled components
const HeroContainer = styled.header`
	padding: 4rem 2rem;
	background: linear-gradient(135deg, var(--ifm-background-color) 0%, var(--ifm-color-emphasis-200) 100%);
	overflow: hidden;
	position: relative;
`;

const HeroContent = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	position: relative;
	z-index: 1;
	text-align: left;
`;

const HeroTitle = styled.h1`
	font-size: 3rem;
	background: linear-gradient(90deg, var(--ifm-color-primary) 0%, var(--ifm-color-primary-dark) 50%, var(--ifm-color-primary-darker) 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	
	@media (max-width: 768px) {
		font-size: 2.2rem;
	}
`;

const HeroTypedTitle = styled.span`
	font-size: 3rem;
	display: inline-block;
	background: linear-gradient(90deg, var(--ifm-color-primary) 0%, var(--ifm-color-primary-dark) 50%, var(--ifm-color-primary-darker) 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	
	@media (max-width: 768px) {
		font-size: 2.2rem;
	}
`;

const HeroSubtitle = styled.p`
	font-size: 1.5rem;
	color: var(--ifm-color-emphasis-700);
	
	@media (max-width: 768px) {
		font-size: 1.2rem;
	}
`;

const FlowDiagram = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	margin: 2rem 0;
	flex-wrap: wrap;
	gap: 10px;
	
	@media (max-width: 768px) {
		flex-direction: column;
	}
`;

const DiagramSection = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
`;

const DiagramIcon = styled.div`
	width: 60px;
	height: 60px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: white;
	border-radius: 8px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
	
	@media (max-width: 768px) {
		width: 50px;
		height: 50px;
	}
`;

const CenterIcon = styled(DiagramIcon)`
	width: 90px;
	height: 90px;
	background: linear-gradient(135deg, var(--ifm-color-primary) 0%, var(--ifm-color-primary-darker) 100%);
	border-radius: 50%;
	margin: 0 15px;
	position: relative;
	z-index: 2;
	
	@media (max-width: 768px) {
		width: 80px;
		height: 80px;
		margin: 15px 0;
	}
`;

const DiagramLabel = styled.div`
	font-size: 0.85rem;
	font-weight: bold;
	color: var(--ifm-color-emphasis-800);
`;

const ConnectingLine = styled.div`
	height: 2px;
	width: 40px;
	background: linear-gradient(90deg, var(--ifm-color-primary), var(--ifm-color-primary-darker));
	position: relative;
	
	@media (max-width: 768px) {
		width: 2px;
		height: 20px;
		margin: 0;
	}
`;

const ButtonContainer = styled.div`
	margin-top: 2rem;
	display: flex;
	gap: 1rem;
	justify-content: flex-start;
	flex-wrap: wrap;
`;

// Sponsor section styled components
const SponsorContainer = styled.section`
	padding: 3rem 2rem;
	max-width: 1200px;
	margin: 0 auto;
	text-align: center;
`;

const SponsorTitle = styled.h2`
	margin-bottom: 1rem;
`;

const SponsorSubtitle = styled.p`
	color: var(--ifm-color-emphasis-700);
	margin-bottom: 2rem;
	max-width: 800px;
	margin-left: auto;
	margin-right: auto;
`;

const SponsorTier = styled.h3`
	margin: 2.5rem 0 1.5rem;
	font-size: 1.2rem;
	text-transform: uppercase;
	letter-spacing: 1px;
	color: var(--ifm-color-emphasis-600);
`;

const SponsorGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
	gap: 1.5rem;
	margin-top: 1.5rem;
	
	@media (max-width: 768px) {
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
	}
`;

const SponsorLogo = styled.div`
	background-color: var(--ifm-card-background-color);
	border-radius: 8px;
	padding: 1.5rem;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100px;
	transition: transform 0.2s ease;
	
	&:hover {
		transform: scale(1.05);
	}
	
	img {
		max-width: 100%;
		max-height: 100%;
	}
`;

const SectionTitle = styled.h2`
	text-align: center;
	margin-bottom: 1.5rem;
	font-size: 2rem;
	background: linear-gradient(90deg, var(--ifm-color-primary) 0%, var(--ifm-color-primary-darker) 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
`;

const SectionDescription = styled.p`
	text-align: center;
	max-width: 800px;
	margin: 0 auto 2rem;
	color: var(--ifm-color-emphasis-700);
`;

function FeaturesSection() {
	return (
		<>
			<FeaturesContainer>
				<FeaturesGrid>
					<FeatureBox $tall>
						<FeatureContent>
							<FeatureBoxTitle>Unified Architecture</FeatureBoxTitle>
							<FeatureBoxDescription>
								A complete platform that bridges 3D assets and data to multiple
								runtime platforms.
							</FeatureBoxDescription>
							<div
								style={{
									transform: "scale(0.85)",
									transformOrigin: "center",
									margin: "-1rem 0",
								}}
							>
								<FlowDiagram style={{ flexDirection: "column" }}>
									<div
										style={{
											display: "flex",
											justifyContent: "center",
											width: "100%",
										}}
									>
										<DiagramSection style={{ margin: "0 10px" }}>
											<DiagramIcon>.sql</DiagramIcon>
										</DiagramSection>

										<DiagramSection style={{ margin: "0 10px" }}>
											<DiagramIcon>.glb</DiagramIcon>
										</DiagramSection>
									</div>

									<ConnectingLine
										style={{ width: "2px", height: "20px", margin: "10px 0" }}
									/>

									<DiagramSection>
										<DiagramIcon
											style={{
												borderRadius: "8px",
												width: "90px",
												height: "90px",
											}}
										>
											<VircadiaIcon />
										</DiagramIcon>
										<DiagramLabel>Vircadia</DiagramLabel>
									</DiagramSection>

									<ConnectingLine
										style={{ width: "2px", height: "20px", margin: "10px 0" }}
									/>

									<div
										style={{
											display: "flex",
											justifyContent: "center",
											width: "100%",
										}}
									>
										<DiagramSection style={{ margin: "0 10px" }}>
											<DiagramIcon>
												<UnityIcon />
											</DiagramIcon>
											<DiagramLabel>Unity</DiagramLabel>
										</DiagramSection>

										<DiagramSection style={{ margin: "0 10px" }}>
											<DiagramIcon>
												<ChromeIcon />
											</DiagramIcon>
											<DiagramLabel>Web</DiagramLabel>
										</DiagramSection>

										<DiagramSection style={{ margin: "0 10px" }}>
											<DiagramIcon>
												<UnrealIcon />
											</DiagramIcon>
											<DiagramLabel>Unreal</DiagramLabel>
										</DiagramSection>
									</div>
								</FlowDiagram>
							</div>
						</FeatureContent>
					</FeatureBox>

					<FeatureBox $wide>
						<FeatureContent>
							<FeatureBoxTitle>PostgreSQL-Powered Worlds</FeatureBoxTitle>
							<FeatureBoxDescription>
								Define your entire world in SQL with enterprise database
								features: transactions, rollbacks, triggers, sub-ms functions,
								and more, all natively within your game.
							</FeatureBoxDescription>
						</FeatureContent>
					</FeatureBox>

					<FeatureBox>
						<FeatureContent>
							<FeatureBoxTitle>Realtime State Tracking</FeatureBoxTitle>
							<FeatureBoxDescription>
								High-performance server-side tracking of all entity states to
								assist in anti-cheat and competitive gaming.
							</FeatureBoxDescription>
						</FeatureContent>
					</FeatureBox>

					<FeatureBox>
						<FeatureContent>
							<FeatureBoxTitle>Cross-Platform Realtime</FeatureBoxTitle>
							<FeatureBoxDescription>
								Entities synced in realtime across every platform: Unreal,
								Unity, Web, Blender, and more.
							</FeatureBoxDescription>
						</FeatureContent>
					</FeatureBox>
				</FeaturesGrid>
			</FeaturesContainer>

			<FeaturesContainer>
				<SectionTitle>Easy to start, Advanced to scale</SectionTitle>
				<SectionDescription>
					Scale from prototype to production with enterprise-grade tools and
					infrastructure
				</SectionDescription>
				<FeaturesGrid>
					<FeatureBox>
						<FeatureContent>
							<FeatureBoxTitle>One CLI To Rule Them All</FeatureBoxTitle>
							<FeatureBoxDescription>
								The{" "}
								<a href="/vircadia-world/cli/#quick-start">
									Vircadia World CLI
								</a>{" "}
								provisions everything you need with simple commands - from
								development to production deployments.
							</FeatureBoxDescription>
						</FeatureContent>
					</FeatureBox>

					<FeatureBox>
						<FeatureContent>
							<FeatureBoxTitle>OSS for Enterprise</FeatureBoxTitle>
							<FeatureBoxDescription>
								Apache 2.0 licensed, providing legal certainty and flexibility
								for commercial use, modification, and distribution at any scale.
							</FeatureBoxDescription>
						</FeatureContent>
					</FeatureBox>

					<FeatureBox $wide>
						<FeatureContent>
							<FeatureBoxTitle>Enterprise-Grade Scalability</FeatureBoxTitle>
							<FeatureBoxDescription>
								Scale to millions of players and objects with millisecond
								latency, powered by PostgreSQL, Bun.sh, and Docker. Suitable for
								competitive and casual gaming, from FPS to MMOs, across mobile
								and XR platforms.
							</FeatureBoxDescription>
						</FeatureContent>
					</FeatureBox>

					<FeatureBox>
						<FeatureContent>
							<FeatureBoxTitle>Enterprise Security</FeatureBoxTitle>
							<FeatureBoxDescription>
								OAuth 2.0 authentication with no passwords, validated by
								partners like Deutsche Telekom, Manchester United, and more for
								secure access management at scale.
							</FeatureBoxDescription>
						</FeatureContent>
					</FeatureBox>

					<FeatureBox>
						<FeatureContent>
							<FeatureBoxTitle>AAAA Scalability via Docker</FeatureBoxTitle>
							<FeatureBoxDescription>
								Containerized deployment enables Anywhere, Anytime, Any scale,
								Any device accessibility with consistent performance and
								reliability.
							</FeatureBoxDescription>
						</FeatureContent>
					</FeatureBox>

					<FeatureBox>
						<FeatureContent>
							<FeatureBoxTitle>Robust CI/CD Pipeline</FeatureBoxTitle>
							<FeatureBoxDescription>
								Every component thoroughly tested with comprehensive CI
								pipelines ensuring stability and reliability across the entire
								system.
							</FeatureBoxDescription>
						</FeatureContent>
					</FeatureBox>
				</FeaturesGrid>
			</FeaturesContainer>
		</>
	);
}

function SponsorsSection() {
	return (
		<SponsorContainer>
			<SponsorTitle>Supported By</SponsorTitle>
			<SponsorSubtitle>
				Vircadia is made possible by our contributors and these amazing
				organizations
			</SponsorSubtitle>

			<SponsorTier>Partners</SponsorTier>
			<SponsorGrid>
				<SponsorLogo>
					<img src="/img/sponsors/partner1.svg" alt="Partner 1" />
				</SponsorLogo>
				<SponsorLogo>
					<img src="/img/sponsors/partner2.svg" alt="Partner 2" />
				</SponsorLogo>
			</SponsorGrid>

			<SponsorTier>Platinum Sponsors</SponsorTier>
			<SponsorGrid>
				<SponsorLogo>
					<img src="/img/sponsors/platinum1.svg" alt="Platinum Sponsor 1" />
				</SponsorLogo>
				<SponsorLogo>
					<img src="/img/sponsors/platinum2.svg" alt="Platinum Sponsor 2" />
				</SponsorLogo>
				<SponsorLogo>
					<img src="/img/sponsors/platinum3.svg" alt="Platinum Sponsor 3" />
				</SponsorLogo>
			</SponsorGrid>

			<SponsorTier>Gold Sponsors</SponsorTier>
			<SponsorGrid>
				<SponsorLogo>
					<img src="/img/sponsors/gold1.svg" alt="Gold Sponsor 1" />
				</SponsorLogo>
				<SponsorLogo>
					<img src="/img/sponsors/gold2.svg" alt="Gold Sponsor 2" />
				</SponsorLogo>
				<SponsorLogo>
					<img src="/img/sponsors/gold3.svg" alt="Gold Sponsor 3" />
				</SponsorLogo>
				<SponsorLogo>
					<img src="/img/sponsors/gold4.svg" alt="Gold Sponsor 4" />
				</SponsorLogo>
			</SponsorGrid>
		</SponsorContainer>
	);
}

// SVG Icons Components
const SqlIcon = () => (
	<svg
		width="40"
		height="40"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		aria-labelledby="sqlIconTitle"
	>
		<title id="sqlIconTitle">SQL Database Icon</title>
		<path
			d="M5 4C2.8 4 1 5.8 1 8C1 9.4 1.6 10.6 2.6 11.5C1.6 12.3 1 13.6 1 15C1 17.2 2.8 19 5 19H20C21.1 19 22 18.1 22 17V6C22 4.9 21.1 4 20 4H5ZM5 6H13V8H5C4.4 8 4 7.6 4 7C4 6.4 4.4 6 5 6ZM5 10H13V17H5C3.9 17 3 16.1 3 15C3 13.9 3.9 13 5 13C3.9 13 3 12.1 3 11C3 10.4 3.4 10 4 10H5Z"
			fill="#4472c4"
		/>
	</svg>
);

const GlbIcon = () => (
	<svg
		width="40"
		height="40"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		aria-labelledby="glbIconTitle"
	>
		<title id="glbIconTitle">GLB 3D Model Icon</title>
		<path
			d="M21 16.5C21 16.88 20.79 17.21 20.47 17.38L12.57 21.82C12.41 21.94 12.21 22 12 22C11.79 22 11.59 21.94 11.43 21.82L3.53 17.38C3.21 17.21 3 16.88 3 16.5V7.5C3 7.12 3.21 6.79 3.53 6.62L11.43 2.18C11.59 2.06 11.79 2 12 2C12.21 2 12.41 2.06 12.57 2.18L20.47 6.62C20.79 6.79 21 7.12 21 7.5V16.5Z"
			fill="#7030a0"
		/>
		<path
			d="M12 17L12 6.5"
			stroke="white"
			strokeWidth="1.5"
			strokeLinecap="round"
		/>
		<path
			d="M17 14L7 9"
			stroke="white"
			strokeWidth="1.5"
			strokeLinecap="round"
		/>
		<path
			d="M7 14L17 9"
			stroke="white"
			strokeWidth="1.5"
			strokeLinecap="round"
		/>
	</svg>
);

const VircadiaIcon = () => (
	<img src="img/icon.svg" alt="Vircadia Icon" width="60" height="60" />
);

const UnityIcon = () => (
	<img
		src="img/unity.svg"
		alt="Unity Game Engine Icon"
		width="40"
		height="40"
	/>
);

const ChromeIcon = () => (
	<img src="img/chrome.svg" alt="Browser Icon" width="40" height="40" />
);

const UnrealIcon = () => (
	<img src="img/unreal.svg" alt="Unreal Engine Icon" width="40" height="40" />
);

export default function Home(): ReactNode {
	const { siteConfig } = useDocusaurusContext();
	const typedElementRef = useRef(null);

	useEffect(() => {
		if (typedElementRef.current) {
			const typed = new Typed(typedElementRef.current, {
				strings: ["items", "players", "assets", "everything."],
				typeSpeed: 80,
				backSpeed: 50,
				backDelay: 5000,
				startDelay: 300,
				loop: true,
				showCursor: true,
				cursorChar: "|",
			});

			return () => {
				typed.destroy();
			};
		}
	});

	return (
		<Layout title={siteConfig.tagline} description={siteConfig.tagline}>
			<HeroContainer>
				<HeroContent>
					<HeroTitle>
						Vircadia is the fast game
						<br />
						reactivity layer for
						<br />
						/&nbsp;
						<HeroTypedTitle ref={typedElementRef} />
						&nbsp;/
					</HeroTitle>
					{/* <HeroSubtitle>Apache 2.0 licensed, production ready.</HeroSubtitle> */}
					<ButtonContainer>
						<Link
							className="button button--primary button--lg"
							to="/vircadia-world/cli/#quick-start"
						>
							Get Started
						</Link>
						<Link
							className="button button--secondary button--lg"
							to="https://github.com/vircadia"
						>
							GitHub
						</Link>
					</ButtonContainer>
				</HeroContent>
			</HeroContainer>
			<main>
				<FeaturesSection />
				<SponsorsSection />
			</main>
		</Layout>
	);
}
