"use client";
import dynamic from "next/dynamic";
import type { ReactNode } from "react";

type FeaturedCaseStudyProps = {
  title: string;
  subtitle: string;
  highlights: string[];
  ctaLabel: string;
  ctaLink: string;
};

const FeaturedCaseStudySection = dynamic(() => import("./FeaturedCaseStudySection"), { ssr: false });

export default function FeaturedCaseStudyWrapper(props: FeaturedCaseStudyProps): ReactNode {
  return <FeaturedCaseStudySection {...props} />;
} 