import type { Project } from '@/types/projects.type';

export interface ModalHeaderProps {
  project: Project;
  onClose: () => void;
}

export interface ProjectDetailListProps {
  details: string[] | undefined;
}

export interface ProjectInfoProps {
  project: Project;
}

export interface TechnologyStackProps {
  technologies: string[];
}
