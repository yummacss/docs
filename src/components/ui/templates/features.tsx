"use client";

import type { Icon } from "@phosphor-icons/react";
import {
  DevicesIcon,
  GaugeIcon,
  MagnifyingGlassIcon,
  PersonArmsSpreadIcon,
  SparkleIcon,
} from "@phosphor-icons/react/dist/ssr";
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/components/accordion";
import type { TemplateFeature } from "@/utils/templates";

// Default feature icon mapping
const defaultFeatureIconMap: Record<string, Icon> = {
  accessibility: PersonArmsSpreadIcon,
  seo: MagnifyingGlassIcon,
  responsive: DevicesIcon,
  animations: SparkleIcon,
  performance: GaugeIcon,
};

interface TemplateFeaturesProps {
  features: TemplateFeature[];
  iconMap?: Record<string, Icon>;
}

export default function TemplateFeatures({
  features,
  iconMap = defaultFeatureIconMap,
}: TemplateFeaturesProps) {
  return (
    <Accordion>
      {features.map((feature) => {
        const FeatureIcon = iconMap[feature.id] || PersonArmsSpreadIcon;

        return (
          <AccordionItem key={feature.id}>
            <AccordionTrigger>
              <span className="d-f ai-c g-2">
                <FeatureIcon size={18} weight="duotone" />
                {feature.title}
              </span>
            </AccordionTrigger>
            <AccordionPanel>
              <p className="m-0">{feature.description}</p>
            </AccordionPanel>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
