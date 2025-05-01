import type { ReactNode } from "react";
import { useRef, useEffect, useState } from "react";
import Typed from "typed.js";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import styled from "styled-components";
import CodeBlock from '@theme/CodeBlock';
import type { Node as FlowNode, Edge } from "@xyflow/react";
import { ReactFlow, Position, ReactFlowProvider, Handle } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

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
	
	@media (min-width: 769px) and (max-width: 1024px) {
		grid-template-columns: repeat(2, 1fr);
	}
	
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
	
	@media (min-width: 769px) and (max-width: 1024px) {
		grid-row: auto !important;
		max-height: none !important;
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

const AnimatedEmoji = styled.div`
	font-size: 2rem;
	margin-bottom: 0.5rem;
	animation: glow 2s infinite ease-in-out;
	
	@keyframes glow {
		0% { text-shadow: 0 0 5px rgba(255, 215, 0, 0.7); }
		50% { text-shadow: 0 0 15px rgba(255, 215, 0, 1), 0 0 20px rgba(255, 165, 0, 0.8); }
		100% { text-shadow: 0 0 5px rgba(255, 215, 0, 0.7); }
	}
`;

const AnimatedSwordsEmoji = styled.div`
	font-size: 2rem;
	margin-bottom: 0.5rem;
	// animation: swordsGlow 2s infinite ease-in-out;
	
	// @keyframes swordsGlow {
	// 	0% { text-shadow: 0 0 5px rgba(70, 130, 180, 0.7); }
	// 	50% { text-shadow: 0 0 15px rgba(70, 130, 180, 1), 0 0 20px rgba(0, 191, 255, 0.8); }
	// 	100% { text-shadow: 0 0 5px rgba(70, 130, 180, 0.7); }
	// }
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
		
		@media (min-width: 769px) and (max-width: 1024px) {
			grid-row: auto;
		}
		
		@media (max-width: 768px) {
			grid-row: auto;
		}
	`}
	
	${(props) =>
		props.$wide &&
		`
		grid-column: span 2;
		
		@media (min-width: 769px) and (max-width: 1024px) {
			grid-column: span 1;
		}
		
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
	
	@media (min-width: 769px) and (max-width: 1024px) {
		padding: 3rem 1.5rem;
	}
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
	
	@media (min-width: 769px) and (max-width: 1024px) {
		font-size: 2.5rem;
	}
	
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
	
	@media (min-width: 769px) and (max-width: 1024px) {
		font-size: 2.5rem;
	}
	
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

// React Flow styled components
const ReactFlowContainer = styled.div`
	width: 100%;
	height: 300px;
	margin: 1rem 0;
	position: relative;
	user-select: none;
	
	@media (min-width: 769px) and (max-width: 1024px) {
		height: 350px;
	}
	
	@media (max-width: 768px) {
		height: 400px;
	}
`;

const ReactFlowOverlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 10;
	cursor: default;
`;

const NodeContent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: var(--ifm-card-background-color);
	border-radius: 8px;
	padding: 10px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
	position: relative;
	width: 100%;
	height: 100%;
`;

const IconContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
`;

const NodeLabel = styled.div`
	font-size: 0.85rem;
	font-weight: bold;
	color: var(--ifm-color-emphasis-800);
	margin-top: 5px;
	text-align: center;
`;

const CenterNodeContainer = styled(NodeContent)`
	width: 90px;
	height: 90px;
	border-radius: 12px;
	z-index: 2;
	filter: drop-shadow(0 0 12px rgba(var(--ifm-color-primary-rgb), 0.6));
	animation: centerPulse 3s infinite ease-in-out;
	position: relative;
	
	@keyframes centerPulse {
		0% { filter: drop-shadow(0 0 8px rgba(var(--ifm-color-primary-rgb), 0.6)); }
		50% { filter: drop-shadow(0 0 20px rgba(var(--ifm-color-primary-rgb), 0.8)); }
		100% { filter: drop-shadow(0 0 8px rgba(var(--ifm-color-primary-rgb), 0.6)); }
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
	background-color: var(--ifm-background-color);
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
	text-align: center;
	position: relative;
	
	&::after {
		content: '';
		display: block;
		width: 100%;
		height: 1px;
		background-color: var(--ifm-color-emphasis-200);
		position: absolute;
		bottom: -0.75rem;
		left: 0;
	}
`;

const SponsorGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
	gap: 1.5rem;
	margin-top: 1.5rem;
	
	@media (min-width: 769px) and (max-width: 1024px) {
		grid-template-columns: repeat(3, 1fr);
	}
	
	@media (max-width: 768px) {
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
	}
`;

const PartnerSponsorGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 1.5rem;
	margin-top: 1.5rem;
	
	@media (min-width: 769px) and (max-width: 1024px) {
		grid-template-columns: repeat(2, 1fr);
		max-width: 80%;
		margin-left: auto;
		margin-right: auto;
	}
	
	@media (max-width: 768px) {
		grid-template-columns: 1fr;
	}
`;

interface SponsorLogoProps {
	$grayscale?: boolean;
	$adjustContrast?: boolean;
}

const SponsorLogo = styled.div<SponsorLogoProps>`
	background-color: var(--ifm-background-surface-color);
	border: 1px solid var(--ifm-color-emphasis-200);
	border-radius: 8px;
	padding: 1.5rem;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100px;
	transition: transform 0.2s ease;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
	
	&:hover {
		transform: scale(1.05);
	}
	
	img {
		max-width: 100%;
		max-height: 100%;
		${(props) =>
			props.$grayscale &&
			`
			filter: grayscale(100%);
		`}
		${(props) =>
			props.$adjustContrast &&
			`
			filter: ${props.$grayscale ? "grayscale(100%) " : ""}
				brightness(0) saturate(100%)
				var(--ifm-invert-filter);
		`}
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

// Add these styles to the styled components section
const StyledHandle = styled(Handle)`
	width: 8px;
	height: 8px;
	background-color: var(--ifm-color-primary);
	border: 2px solid var(--ifm-card-background-color);
`;

// Add a new styled component for themed SVGs
const ThemedSvgIcon = styled.img`
	filter: invert(38%) sepia(80%) saturate(1752%) hue-rotate(218deg) brightness(95%) contrast(101%);
	
	[data-theme='dark'] & {
		filter: invert(56%) sepia(75%) saturate(4140%) hue-rotate(186deg) brightness(105%) contrast(101%);
	}
`;

// Custom nodes for React Flow
const SqlNode = ({ data }) => (
	<NodeContent>
		<StyledHandle type="source" position={Position.Bottom} id="sql-output" />
		<IconContainer>.sql</IconContainer>
	</NodeContent>
);

const GlbNode = ({ data }) => (
	<NodeContent>
		<StyledHandle type="source" position={Position.Bottom} id="glb-output" />
		<IconContainer>.glb</IconContainer>
	</NodeContent>
);

const VircadiaNode = ({ data }) => (
	<CenterNodeContainer>
		<StyledHandle
			type="source"
			position={Position.Bottom}
			id="vircadia-output"
		/>
		<StyledHandle type="target" position={Position.Top} id="vircadia-input" />
		<IconContainer>
			<img src="img/icon.svg" alt="Vircadia Icon" width="60" height="60" />
		</IconContainer>
	</CenterNodeContainer>
);

const UnityNode = ({ data }) => (
	<NodeContent>
		<StyledHandle type="target" position={Position.Top} id="unity-input" />
		<IconContainer>
			<ThemedSvgIcon
				src="img/unity.svg"
				alt="Unity Game Engine Icon"
				width="40"
				height="40"
			/>
		</IconContainer>
		<NodeLabel>Unity</NodeLabel>
	</NodeContent>
);

const WebNode = ({ data }) => (
	<NodeContent>
		<StyledHandle type="target" position={Position.Top} id="web-input" />
		<IconContainer>
			<ThemedSvgIcon
				src="img/chrome.svg"
				alt="Browser Icon"
				width="40"
				height="40"
			/>
		</IconContainer>
		<NodeLabel>Web</NodeLabel>
	</NodeContent>
);

const UnrealNode = ({ data }) => (
	<NodeContent>
		<StyledHandle type="target" position={Position.Top} id="unreal-input" />
		<IconContainer>
			<ThemedSvgIcon
				src="img/unreal.svg"
				alt="Unreal Engine Icon"
				width="40"
				height="40"
			/>
		</IconContainer>
		<NodeLabel>Unreal</NodeLabel>
	</NodeContent>
);

// Node types definition for React Flow
const nodeTypes = {
	sqlNode: SqlNode,
	glbNode: GlbNode,
	vircadiaNode: VircadiaNode,
	unityNode: UnityNode,
	webNode: WebNode,
	unrealNode: UnrealNode,
};

function VircadiaFlow() {
	const [nodes, setNodes] = useState<FlowNode[]>([
		{
			id: "sql",
			type: "sqlNode",
			position: { x: 100, y: 0 },
			data: {},
			sourcePosition: Position.Bottom,
			targetPosition: Position.Top,
		},
		{
			id: "glb",
			type: "glbNode",
			position: { x: 314, y: 0 },
			data: {},
			sourcePosition: Position.Bottom,
			targetPosition: Position.Top,
		},
		{
			id: "vircadia",
			type: "vircadiaNode",
			position: { x: 185, y: 120 },
			data: {},
			sourcePosition: Position.Bottom,
			targetPosition: Position.Top,
		},
		{
			id: "unity",
			type: "unityNode",
			position: { x: 75, y: 240 },
			data: {},
			sourcePosition: Position.Top,
			targetPosition: Position.Bottom,
		},
		{
			id: "web",
			type: "webNode",
			position: { x: 200, y: 240 },
			data: {},
			sourcePosition: Position.Top,
			targetPosition: Position.Bottom,
		},
		{
			id: "unreal",
			type: "unrealNode",
			position: { x: 325, y: 240 },
			data: {},
			sourcePosition: Position.Top,
			targetPosition: Position.Bottom,
		},
	]);

	const [edges, setEdges] = useState<Edge[]>([
		{
			id: "sql-vircadia",
			source: "sql",
			target: "vircadia",
			sourceHandle: "sql-output",
			targetHandle: "vircadia-input",
			animated: true,
			style: { stroke: "var(--ifm-color-primary)", strokeWidth: 2 },
		},
		{
			id: "glb-vircadia",
			source: "glb",
			target: "vircadia",
			sourceHandle: "glb-output",
			targetHandle: "vircadia-input",
			animated: true,
			style: { stroke: "var(--ifm-color-primary)", strokeWidth: 2 },
		},
		{
			id: "vircadia-unity",
			source: "vircadia",
			target: "unity",
			sourceHandle: "vircadia-output",
			targetHandle: "unity-input",
			animated: true,
			style: { stroke: "var(--ifm-color-primary)", strokeWidth: 2 },
		},
		{
			id: "vircadia-web",
			source: "vircadia",
			target: "web",
			sourceHandle: "vircadia-output",
			targetHandle: "web-input",
			animated: true,
			style: { stroke: "var(--ifm-color-primary)", strokeWidth: 2 },
		},
		{
			id: "vircadia-unreal",
			source: "vircadia",
			target: "unreal",
			sourceHandle: "vircadia-output",
			targetHandle: "unreal-input",
			animated: true,
			style: { stroke: "var(--ifm-color-primary)", strokeWidth: 2 },
		},
	]);

	const edgeOptions = {
		animated: true,
		style: { stroke: "var(--ifm-color-primary)", strokeWidth: 2 },
	};

	return (
		<ReactFlowProvider>
			<ReactFlowContainer>
				<ReactFlow
					nodes={nodes}
					edges={edges}
					nodeTypes={nodeTypes}
					defaultEdgeOptions={edgeOptions}
					fitView
					zoomOnScroll={false}
					zoomOnPinch={false}
					zoomOnDoubleClick={false}
					panOnScroll={false}
					panOnDrag={false}
					nodesDraggable={false}
					nodesConnectable={false}
					elementsSelectable={false}
					proOptions={{
						hideAttribution: true,
					}}
					attributionPosition="bottom-left"
					connectionLineStyle={{
						stroke: "var(--ifm-color-primary)",
						strokeWidth: 2,
					}}
					style={{ pointerEvents: "none" }}
				/>
				<ReactFlowOverlay />
			</ReactFlowContainer>
		</ReactFlowProvider>
	);
}

function FeaturesSection() {
	return (
		<>
			<FeaturesContainer>
				<FeaturesGrid>
					<FeatureBox $tall>
						<FeatureContent>
							<FeatureBoxTitle>Unified Architecture</FeatureBoxTitle>
							<FeatureBoxDescription>
								A complete framework that bridges 3D assets and data to all
								platforms.
							</FeatureBoxDescription>
							<div
								style={{
									transform: "perspective(1000px)",
									transformStyle: "preserve-3d",
									margin: "0.5rem 0",
								}}
							>
								<VircadiaFlow />
							</div>
						</FeatureContent>
					</FeatureBox>

					<FeatureBox $wide>
						<FeatureContent>
							<AnimatedEmoji>⚡</AnimatedEmoji>
							<FeatureBoxTitle>PostgreSQL-Powered Worlds</FeatureBoxTitle>
							<FeatureBoxDescription>
								Define your entire world in SQL with enterprise database
								features: transactions, rollbacks, triggers, sub-ms functions,
								and more, all natively within your game.
							</FeatureBoxDescription>
							<CodeBlock
							language="sql">
{`BEGIN;
  UPDATE entity.entities
  SET meta__data = jsonb_set(
    jsonb_set(
      meta__data, 
      '{position}', 
      '{"x": 125.4, "y": 10.0, "z": 75.2}'::jsonb
    ),
    '{stats, health}', 
    '80'::jsonb
  )
  WHERE general__entity_name = 'player_42';
COMMIT;`}
							</CodeBlock>
						</FeatureContent>
					</FeatureBox>

					<FeatureBox>
						<FeatureContent>
							<AnimatedSwordsEmoji>⚔️</AnimatedSwordsEmoji>
							<FeatureBoxTitle>Realtime State Tracking</FeatureBoxTitle>
							<FeatureBoxDescription>
								High-performance server-side tracking of all entity states to
								assist in anti-cheat and competitive gaming.
							</FeatureBoxDescription>
						</FeatureContent>
					</FeatureBox>

					<FeatureBox>
						<FeatureContent>
							<div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🔌</div>
							<FeatureBoxTitle>No SDK? No Problem!</FeatureBoxTitle>
							<FeatureBoxDescription>
								Connect to the API via Websocket or HTTP, then interact with
								Vircadia directly with your favorite SQL client.
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
							<div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🚀</div>
							<FeatureBoxTitle>Developer-First Infrastructure</FeatureBoxTitle>
							<FeatureBoxDescription>
								The{" "}
								<a href="/vircadia-world/cli/#quick-start">
									Vircadia World CLI
								</a>{" "}
								provisions everything from development to production, backed by
								comprehensive CI pipelines ensuring stability and reliability
								across the entire system.
							</FeatureBoxDescription>
						</FeatureContent>
					</FeatureBox>

					<FeatureBox $wide>
						<FeatureContent>
							<div style={{ textAlign: "center", marginBottom: "1rem" }}>
								<img src="/img/asf.svg" alt="Apache Software Foundation Logo" style={{ height: "60px" }} />
							</div>
							<FeatureBoxTitle>Permissively Licensed (FOSS)</FeatureBoxTitle>
							<FeatureBoxDescription>
								Vircadia is Apache 2.0 licensed, providing legal certainty and flexibility
								for commercial use, modification, and distribution at any scale.
							</FeatureBoxDescription>
						</FeatureContent>
					</FeatureBox>

					<FeatureBox $wide>
						<FeatureContent>
							<FeatureBoxTitle>Enterprise-Grade Scalability</FeatureBoxTitle>
							<FeatureBoxDescription>
								Scale to millions of objects and players with millisecond
								latency, powered by PostgreSQL, Bun.sh, and Docker.
								Containerized deployment enables Anywhere, Anytime, Any scale,
								Any device accessibility with consistent performance and
								reliability.
							</FeatureBoxDescription>
							<LogoGrid>
								<EmptyBox />
								<TechLogoBox $color="rgba(51, 103, 145, 0.8)">
									<img src="/img/infra/postgresql.svg" alt="PostgreSQL" />
								</TechLogoBox>
								<TechLogoBox $color="rgba(251, 219, 101, 0.8)">
									<img src="/img/infra/bun.svg" alt="Bun.sh" />
								</TechLogoBox>
								<TechLogoBox $color="rgba(52, 132, 250, 0.8)">
									<img src="/img/infra/docker.svg" alt="Docker" />
								</TechLogoBox>
								<EmptyBox />
							</LogoGrid>
						</FeatureContent>
					</FeatureBox>

					<FeatureBox>
						<FeatureContent>
							<div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🔒</div>
							<FeatureBoxTitle>Enterprise Security</FeatureBoxTitle>
							<FeatureBoxDescription>
								OAuth 2.0 authentication with no passwords, validated by
								partners like Deutsche Telekom, Manchester United, and more for
								secure access management at scale.
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

			<SponsorTier>Partners</SponsorTier>
			<PartnerSponsorGrid>
				<SponsorLogo>
					<img src="/img/partner/dt.png" alt="Deutsche Telekom" />
				</SponsorLogo>
				<SponsorLogo>
					<img src="/img/partner/ua92.png" alt="UA92" />
				</SponsorLogo>
			</PartnerSponsorGrid>

			<SponsorTier>Sponsors</SponsorTier>
			<SponsorGrid>
				<SponsorLogo $grayscale $adjustContrast>
					<img src="/img/partner/aws.webp" alt="AWS" />
				</SponsorLogo>
				<SponsorLogo $grayscale $adjustContrast>
					<img src="/img/partner/cadec.webp" alt="Cadec" />
				</SponsorLogo>
				<SponsorLogo $grayscale $adjustContrast>
					<img src="/img/partner/cimda.png" alt="CIMDA" />
				</SponsorLogo>
				<SponsorLogo $grayscale $adjustContrast>
					<img src="/img/partner/bitdegree.png" alt="BitDegree" />
				</SponsorLogo>
				<SponsorLogo $grayscale $adjustContrast>
					<img src="/img/partner/falah_logo.png" alt="FalahTech" />
				</SponsorLogo>
				<SponsorLogo $grayscale $adjustContrast>
					<img
						src="/img/partner/free_agent_source.png"
						alt="Free Agent Source"
					/>
				</SponsorLogo>
				<SponsorLogo $grayscale $adjustContrast>
					<img src="/img/partner/impromedia.png" alt="Impromedia" />
				</SponsorLogo>
				<SponsorLogo $grayscale $adjustContrast>
					<img src="/img/partner/Indiarath_logo.webp" alt="Indiarath" />
				</SponsorLogo>
				<SponsorLogo $grayscale $adjustContrast>
					<img src="/img/partner/iota.webp" alt="IOTA" />
				</SponsorLogo>
				<SponsorLogo $grayscale $adjustContrast>
					<img src="/img/partner/lagoon_koza.png" alt="Lagoon Koza" />
				</SponsorLogo>
				<SponsorLogo $grayscale $adjustContrast>
					<img src="/img/partner/lpi.png" alt="LPI" />
				</SponsorLogo>
				<SponsorLogo $grayscale $adjustContrast>
					<img src="/img/partner/mundolatas.webp" alt="Mundolatas" />
				</SponsorLogo>
				<SponsorLogo $grayscale $adjustContrast>
					<img src="/img/partner/webaverse.webp" alt="Webaverse" />
				</SponsorLogo>
				<SponsorLogo $grayscale $adjustContrast>
					<img src="/img/partner/iiinno.webp" alt="iiiNNO" />
				</SponsorLogo>
			</SponsorGrid>
		</SponsorContainer>
	);
}

// Add these styled components for the Bottom CTA section
const BottomCTAContainer = styled.section`
	height: 100vh;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 2rem;
	background: var(--ifm-background-color);
	color: var(--ifm-font-color-base);
	text-align: center;
	position: relative;
	overflow: hidden;
	
	@media (min-width: 769px) and (max-width: 1024px) {
		height: auto;
		min-height: 80vh;
		padding: 4rem 1.5rem;
	}
`;

const BottomCTAOverlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: radial-gradient(circle at center, transparent 0%, var(--ifm-color-emphasis-100) 100%);
	z-index: 1;
`;

const BottomCTAContent = styled.div`
	position: relative;
	z-index: 2;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const BottomCTATitle = styled.h2`
	font-size: 3.5rem;
	font-weight: bold;
	margin-bottom: 1.5rem;
	background: linear-gradient(90deg, var(--ifm-color-primary) 0%, var(--ifm-color-primary-dark) 50%, var(--ifm-color-primary-darker) 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	
	@media (min-width: 769px) and (max-width: 1024px) {
		font-size: 3rem;
	}
	
	@media (max-width: 768px) {
		font-size: 2.5rem;
	}
`;

const BottomCTADescription = styled.p`
	font-size: 1.5rem;
	max-width: 800px;
	margin: 0 auto 2.5rem;
	color: var(--ifm-color-emphasis-700);
	
	@media (min-width: 769px) and (max-width: 1024px) {
		font-size: 1.3rem;
		max-width: 80%;
	}
	
	@media (max-width: 768px) {
		font-size: 1.2rem;
	}
`;

const BottomCTAButtonContainer = styled.div`
	display: flex;
	gap: 1.5rem;
	justify-content: center;
	flex-wrap: wrap;
`;

const IconWrapper = styled.div`
	margin-bottom: 1.5rem;
	filter: drop-shadow(0 0 15px rgba(var(--ifm-color-primary-rgb), 0.4));
	animation: pulseIcon 3s infinite ease-in-out;
	
	@keyframes pulseIcon {
		0% { transform: scale(1); filter: drop-shadow(0 0 10px rgba(var(--ifm-color-primary-rgb), 0.4)); }
		50% { transform: scale(1.1); filter: drop-shadow(0 0 20px rgba(var(--ifm-color-primary-rgb), 0.6)); }
		100% { transform: scale(1); filter: drop-shadow(0 0 10px rgba(var(--ifm-color-primary-rgb), 0.4)); }
	}
	
	img {
		height: 80px;
		width: 80px;
	}
`;

function BottomCTASection() {
	const { siteConfig } = useDocusaurusContext();
	return (
		<BottomCTAContainer>
			<BottomCTAOverlay />
			<BottomCTAContent>
				<IconWrapper>
					<img src="img/icon.svg" alt="Vircadia Icon" />
				</IconWrapper>
				<BottomCTATitle>Start building with Vircadia</BottomCTATitle>
				<BottomCTADescription>
					Worry about gameplay and less about infrastructure.
				</BottomCTADescription>
				<BottomCTAButtonContainer>
					<Link
						className="button button--primary button--lg"
						to="/vircadia-world/cli/#quick-start"
					>
						Get Started
					</Link>
					<Link
						className="button button--secondary button--lg"
						to={`https://github.com/${siteConfig.organizationName}/${siteConfig.projectName}`}
					>
						Star on GitHub
					</Link>
				</BottomCTAButtonContainer>
			</BottomCTAContent>
		</BottomCTAContainer>
	);
}

// Add this CSS variable to the root Layout component
// We need to find where theme variables are defined and add this
// Let's add a style block to the component that renders the site

// Add this somewhere in the file, ideally before the export default function
const GlobalStyle = styled.div`
	--ifm-invert-filter: invert(0);
	
	[data-theme='dark'] & {
		--ifm-invert-filter: invert(1);
	}
`;

// And modify the Home component to use this
export default function Home(): ReactNode {
	const { siteConfig } = useDocusaurusContext();
	const typedElementRef = useRef(null);

	useEffect(() => {
		if (typedElementRef.current) {
			const typed = new Typed(typedElementRef.current, {
				strings: ["game items", "players", "models", "games."],
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
			<GlobalStyle>
				<HeroContainer>
					<HeroContent>
						<HeroTitle>
							Vircadia is the
							<br />
							reactivity layer for
							<br />
							{/* biome-ignore lint/suspicious/noCommentText: it's not a comment*/}
							//&nbsp;
							<HeroTypedTitle ref={typedElementRef} />
						</HeroTitle>
						{/* <HeroSubtitle>Apache 2.0 licensed, production ready.</HeroSubtitle> */}
						<ButtonContainer>
							<Link
								className="button button--primary button--lg"
								to="/vircadia-world/cli/#quick-start"
							>
								Get Started
							</Link>
						</ButtonContainer>
					</HeroContent>
				</HeroContainer>
				<main>
					<FeaturesSection />
					<SponsorsSection />
					<BottomCTASection />
				</main>
			</GlobalStyle>
		</Layout>
	);
}

const LogoGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	gap: 1rem;
	margin-top: 1.5rem;
	max-width: 600px;
	margin-left: auto;
	margin-right: auto;
	
	@media (min-width: 769px) and (max-width: 1024px) {
		grid-template-columns: repeat(3, 1fr);
		max-width: 90%;
	}
	
	@media (max-width: 768px) {
		grid-template-columns: repeat(3, 1fr);
	}
`;

const TechLogoBox = styled.div<{ $color?: string }>`
	background-color: var(--ifm-card-background-color);
	border-radius: 8px;
	overflow: visible;
	transition: box-shadow 0.3s ease;
	aspect-ratio: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 1rem;
	position: relative;
	box-shadow: ${props => props.$color ? `0 8px 15px ${props.$color}` : '0 8px 12px rgba(0, 0, 0, 0.15)'};
	
	&:hover {
		box-shadow: ${props => props.$color ? `0 12px 25px ${props.$color}` : '0 12px 20px rgba(0, 0, 0, 0.2)'};
	}
	
	&:before {
		content: '';
		position: absolute;
		left: -15px;
		right: -15px;
		bottom: -20px;
		top: 20px;
		background: ${props => props.$color || 'rgba(0,0,0,0.1)'};
		filter: blur(20px);
		border-radius: 16px;
		z-index: -1;
		opacity: ${props => props.$color ? 0.5 : 0.05};
		animation: ${props => props.$color ? 'coloredGlow' : 'subtleGlow'} 3s infinite ease-in-out;
	}
	
	@keyframes coloredGlow {
		0% { opacity: 0.4; filter: blur(18px); transform: scale(0.95); }
		50% { opacity: 0.7; filter: blur(22px); transform: scale(1.05); }
		100% { opacity: 0.4; filter: blur(18px); transform: scale(0.95); }
	}
	
	@keyframes subtleGlow {
		0% { opacity: 0.05; filter: blur(20px); }
		50% { opacity: 0.1; filter: blur(25px); }
		100% { opacity: 0.05; filter: blur(20px); }
	}
	
	img {
		width: 60%;
		height: 60%;
		object-fit: contain;
		position: relative;
		z-index: 2;
	}
`;

const EmptyBox = styled(TechLogoBox)`
	background-color: var(--ifm-card-background-color);
	
	@media (min-width: 769px) and (max-width: 1024px) {
		display: none;
	}
	
	@media (max-width: 768px) {
		display: none;
	}
`;
