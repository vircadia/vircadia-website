import type { ReactNode, ReactElement } from "react";
import Layout from "@theme/Layout";
import styles from "./CaseStudyLayout.module.css";

type CaseStudyLayoutProps = {
	title: string;
	description?: string;
	imageSrc: string;
	imageAlt: string;
	maxImageWidth?: string;
	children: ReactNode;
};

export default function CaseStudyLayout({
	title,
	description,
	imageSrc,
	imageAlt,
	maxImageWidth = "200px",
	children,
}: CaseStudyLayoutProps): ReactElement {
	return (
		<Layout title={title} description={description}>
			<div className={styles.caseStudy}>
				<div className={styles.header}>
					<img
						className={styles.logo}
						style={{ maxWidth: maxImageWidth }}
						src={imageSrc}
						alt={imageAlt}
					/>
					<h1 className={styles.title}>{title}</h1>
					{description && <p className={styles.subtitle}>{description}</p>}
				</div>
				<div className={styles.content}>{children}</div>
			</div>
		</Layout>
	);
}
