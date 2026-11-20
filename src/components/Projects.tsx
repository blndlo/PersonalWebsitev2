import { useState } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import Appshell from './Appshell';
import PageHeader from './PageHeader';
import FilterPills from './FilterPills';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import ComingSoon from './ComingSoon';
import { projects, projectTags, type Project } from '@/data/projects';

export default function Projects() {
  const [activeTag, setActiveTag] = useState('All');
  const [selected, setSelected] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const visibleProjects =
    activeTag === 'All' ? projects : projects.filter((project) => project.tags.includes(activeTag));

  function openProject(project: Project) {
    setSelected(project);
    setModalOpen(true);
  }

  return (
    <Appshell>
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-8 md:px-8">
        <PageHeader title="Projects" subtitle="Things I've built outside the 9 to 5" />

        {projects.length === 0 ? (
          <ComingSoon message="I'm putting together write-ups of my projects. Check back soon." />
        ) : (
          <>
            <Card className="rounded-md py-3">
              <CardContent>
                <FilterPills
                  label="Filter"
                  options={projectTags}
                  active={activeTag}
                  onChange={setActiveTag}
                />
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {visibleProjects.map((project) => (
                <ProjectCard key={project.id} project={project} onSelect={openProject} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Keep `selected` after closing so the content doesn't vanish mid close-animation */}
      <ProjectModal project={selected} open={modalOpen} onOpenChange={setModalOpen} />
    </Appshell>
  );
}
