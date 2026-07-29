"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faRocket,
  faCode,
  faPalette,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

import { Button } from "@/components/ui/button";
import { SampleSection } from "@/components/samples/sample-section";

const solidIcons = [
  { icon: faRocket, label: "Launch" },
  { icon: faCode, label: "Build" },
  { icon: faPalette, label: "Design" },
  { icon: faEnvelope, label: "Contact" },
];

const brandIcons = [
  { icon: faGithub, label: "GitHub", href: "https://github.com" },
  { icon: faLinkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: faXTwitter, label: "X", href: "https://x.com" },
];

export function FontAwesomeSample() {
  return (
    <SampleSection
      id="font-awesome"
      title="Icon system"
      library="Font Awesome"
      description="SVG icons via @fortawesome/react-fontawesome — solid + brands packs."
    >
      <div className="flex flex-wrap gap-3">
        {solidIcons.map(({ icon, label }) => (
          <Button key={label} variant="outline" size="lg">
            <FontAwesomeIcon icon={icon} className="size-4" />
            {label}
          </Button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {brandIcons.map(({ icon, label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="inline-flex size-9 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted"
          >
            <FontAwesomeIcon icon={icon} className="size-5" />
          </a>
        ))}
      </div>
    </SampleSection>
  );
}
