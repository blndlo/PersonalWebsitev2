import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { tagStyle } from '@/lib/tags';
import type { Project } from '@/data/projects';

type ProjectCardProps = {
  project: Project;
  onSelect: (project: Project) => void;
};

export function ProjectThumbnail({ project, className }: { project: Project; className?: string }) {
  if (project.image) {
    return (
      <img src={project.image} alt="" loading="lazy" className={cn('object-cover', className)} />
    );
  }
  return (
    <div
      aria-hidden="true"
      className={cn(
        'flex items-center justify-center text-sm font-medium',
        tagStyle(project.tags[0]).tint,
        className,
      )}
    >
      {project.tags[0]}
    </div>
  );
}

export default function ProjectCard({ project, onSelect }: ProjectCardProps) {
  return (
    // The title button's ::after overlay stretches over the whole card, so the
    // card is clickable while the <h2> keeps its heading role.
    <Card className="relative gap-0 rounded-md py-0 transition-shadow hover:shadow-md">
      <ProjectThumbnail project={project} className="h-28 w-full" />
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h2 className="text-sm font-bold">
          <button
            type="button"
            onClick={() => onSelect(project)}
            className="focus-visible:after:ring-ring text-left outline-none after:absolute after:inset-0 after:rounded-md focus-visible:after:ring-2 focus-visible:after:ring-inset"
          >
            {project.title}
          </button>
        </h2>
        <p className="text-muted-foreground">{project.summary}</p>
        <div className="flex flex-wrap gap-1">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="rounded-sm">
              {tag}
            </Badge>
          ))}
        </div>
        <span aria-hidden="true" className="mt-auto self-end pt-2 text-xs">
          View →
        </span>
      </div>
    </Card>
  );
}
