import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import { ArrowUpRight } from 'lucide-react';

import guzo1 from '../assets/guzo1_compressed.jpg';
import { Button } from './ui/button';
import { profile } from '@/data/profile';

export default function HomePicture() {
  return (
    <Card className="w-full max-w-xs rounded-md text-center md:w-1/4 md:max-w-none">
      <CardContent>
        <img
          src={guzo1}
          alt="Blessmore Ndlovu"
          width={2048}
          height={1871}
          className="h-auto w-full rounded-md object-cover"
        />
        <p className="p-1.5">
          <span aria-hidden="true">📍</span>
          {profile.location}
        </p>
        <div className="flex w-full flex-wrap justify-center gap-2">
          <Badge variant="outline" className="rounded-sm" asChild>
            <a target="_blank" rel="noopener noreferrer" href={profile.linkedin.url}>
              LinkedIn <ArrowUpRight data-icon="inline-end" />
            </a>
          </Badge>
          <Badge variant="outline" className="rounded-sm" asChild>
            <a target="_blank" rel="noopener noreferrer" href={profile.github.url}>
              GitHub <ArrowUpRight data-icon="inline-end" />
            </a>
          </Badge>
        </div>
        <div className="p-2.5">
          <Button variant="outline" className="rounded-sm" asChild>
            <a href={profile.cv.url} download={profile.cv.fileName}>
              Download CV
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
