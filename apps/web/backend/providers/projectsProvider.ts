import { ProjectModel, ProjectType } from '@repo/database';
import { goTry } from 'go-try';

export default class ProjectsProvider {
  static async getProjects(userId: string): Promise<ProjectType[]> {
    const projects = await ProjectModel.find({
      $or: [
        { creatorId: userId },
        { collaborators: userId },
      ],
    });

    if (!projects) {
      return [];
    }

    return projects.map((project) => (
      project.toObject({ flattenMaps: true, flattenObjectIds: true })
    ));
  }

  static async getProjectById(projectId: string): Promise<ProjectType | null> {
    const [error, project] = await goTry(() => ProjectModel.findOne({
      identifier: projectId,
    }));

    if (error || !project) {
      return null;
    }

    return project.toObject({ flattenMaps: true, flattenObjectIds: true });
  }
}
