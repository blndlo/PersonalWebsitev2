import type { ReactNode } from 'react';
import { EnvelopeSimple, GithubLogo, LinkedinLogo } from '@phosphor-icons/react';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { profile } from '@/data/profile';

type ContactRowProps = {
  icon: ReactNode;
  label: string;
  value: string;
  href: string;
  external?: boolean;
};

function ContactRow({ icon, label, value, href, external }: ContactRowProps) {
  return (
    <a
      href={href}
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
      className="hover:bg-muted flex items-center gap-3 rounded-md border p-3 text-left transition-colors"
    >
      <span className="text-muted-foreground" aria-hidden="true">
        {icon}
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="font-bold">{label}</span>
        <span className="text-muted-foreground break-all">{value}</span>
      </span>
    </a>
  );
}

export default function ContactDetails() {
  return (
    <Card className="w-full rounded-md md:w-80 md:shrink-0">
      <CardHeader className="text-center">
        <CardTitle>
          <h2 className="font-bold">Contact Details</h2>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <ContactRow
          icon={<EnvelopeSimple size={18} />}
          label="Email"
          value={profile.email}
          href={`mailto:${profile.email}`}
        />
        <ContactRow
          icon={<LinkedinLogo size={18} />}
          label="LinkedIn"
          value={profile.linkedin.label}
          href={profile.linkedin.url}
          external
        />
        <ContactRow
          icon={<GithubLogo size={18} />}
          label="GitHub"
          value={profile.github.label}
          href={profile.github.url}
          external
        />
        <div className="pt-2 text-center">
          <p className="font-bold">Based in</p>
          <p className="p-1.5">
            <span aria-hidden="true">📍</span>
            {profile.location}
          </p>
        </div>
        <Button variant="outline" className="rounded-sm" asChild>
          <a href={profile.cv.url} download={profile.cv.fileName}>
            Download CV
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
