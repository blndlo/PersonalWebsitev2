import { ArrowUpRight } from 'lucide-react';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const certifications = [
  {
    name: 'HashiCorp Certified: Terraform Associate',
    url: 'https://www.credly.com/badges/bf273827-22fd-4da8-bf2e-25974512b5d4/public_url',
  },
  {
    name: '[PCEP-30-02] PCEP™ – Certified Entry-Level Python Programmer',
    url: 'https://www.credly.com/badges/440c3d22-4467-4f93-911d-133f3e43b973/public_url',
  },
  {
    name: 'Oracle Certified Associate, Java SE 8 Programmer',
    url: 'https://www.credly.com/badges/18cbf9de-a1d4-4bdd-b4ae-c2bc805e596a/public_url',
  },
  {
    name: 'AWS Certified AI Practitioner',
    url: 'https://www.credly.com/badges/d8ba4e3e-978f-4850-9f25-7965d88099f8/public_url',
  },
  {
    name: 'AWS Certified Developer – Associate',
    url: 'https://www.credly.com/badges/48274ba0-32d9-45ac-b742-9f1a5a70320c/public_url',
  },
  {
    name: 'AWS Certified Solutions Architect – Associate',
    url: 'https://www.credly.com/badges/e343b49c-46eb-4269-a967-c49f80c962c9/public_url',
  },
  {
    name: 'CloudWatch Subject Matter Expert',
    url: 'https://www.credly.com/badges/5d146dbc-68a4-463e-b142-d3c18e7bfa3a/public_url',
  },
];

export default function Certifications() {
  return (
    <Card className="rounded-md lg:mx-36">
      <CardHeader>
        <CardTitle>
          <h2 className="font-bold">CERTIFICATIONS</h2>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {certifications.map(({ name, url }) => (
          <Badge
            key={url}
            variant="outline"
            className="h-auto rounded-sm text-left whitespace-normal"
            asChild
          >
            <a href={url} target="_blank" rel="noopener noreferrer">
              {name} <ArrowUpRight data-icon="inline-end" />
            </a>
          </Badge>
        ))}
      </CardContent>
    </Card>
  );
}
