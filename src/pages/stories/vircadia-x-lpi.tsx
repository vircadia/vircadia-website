import CaseStudyLayout from "@site/src/components/CaseStudyLayout";
import type { ReactNode } from "react";

export default function Home(): ReactNode {
	return (
		<CaseStudyLayout
			title="Linux Professional Institute as a partner"
			imageSrc="/img/studies/lpi_yellow.svg"
			imageAlt="LPI"
		>
			<p>
				With LPI's grant funding, publicity and organizational backing during
				COVID-19, we accelerated development of Vircadia's open source virtual
				worlds to the web with WebGPU support and streamlining world-building
				workflows.
			</p>
			<p>
				This collaboration improved Developer Experience (DX) through
				comprehensive tooling, documentation and a content marketplace for
				creators, lowering the barrier to entry for bespoke virtual world design
			</p>
			<p>
				In turn, we contributed our industry expertise in game development,
				scripting and immersive UI design to LPI's outreach and ecosystem
				initiatives, refining User Experience (UX) across platforms with best
				practices and performance optimizations.
			</p>
			<p>
				Together, this partnership demonstrates how open source collaboration
				can power a more inclusive, performant and scalable ecosystem for
				virtual worlds.
			</p>
		</CaseStudyLayout>
	);
}
