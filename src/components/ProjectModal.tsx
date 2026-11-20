import { ArrowUpRight } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProjectThumbnail } from './ProjectCard';
import type { Project } from '@/data/projects';

type ProjectModalProps = {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ProjectModal({ project, open, onOpenChange }: ProjectModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 overflow-hidden rounded-md p-0 sm:max-w-xl">
        {project && (
          <>
            <ProjectThumbnail project={project} className="h-40 w-full" />
            <div className="space-y-4 p-6">
              <DialogHeader>
                <DialogTitle className="text-base font-bold">{project.title}</DialogTitle>
                <DialogDescription className="text-sm">{project.description}</DialogDescription>
              </DialogHeader>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="rounded-sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  {project.githubUrl && (
                    <Button className="rounded-sm" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        GitHub <ArrowUpRight data-icon="inline-end" />
                      </a>
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button variant="outline" className="rounded-sm" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        Live <ArrowUpRight data-icon="inline-end" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
