import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ProjectType } from '@repo/database';

export interface ProjectState {
  projects: ProjectType[];
  selectedProject?: ProjectType;
}

const initialState: ProjectState = {
  projects: [],
  selectedProject: undefined,
};

export const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProjects: (state, action: PayloadAction<ProjectType[]>) => {
      action.payload.forEach((project) => {
        state.projects.push(project);
      });
    },
    clearProjects: (state) => {
      state.projects = [];
    },
    addProject: (state, action: PayloadAction<ProjectType>) => {
      state.projects.push(action.payload);
    },
    removeProject: (state, action: PayloadAction<ProjectType>) => {
      state.projects = state.projects.filter(
        (project) => project.identifier !== action.payload.identifier,
      );
    },

    setProjectState: (state, action: PayloadAction<{ identifier: string; state: string }>) => {
      const project = state.projects.find(
        (projectModel) => projectModel.identifier === action.payload.identifier,
      );
      if (project) {
        project.state = action.payload.state;
      }
    },

    updateProject: (state, action: PayloadAction<ProjectType>) => {
      const projectIndex = state.projects.findIndex(
        (project) => project.identifier === action.payload.identifier,
      );
      if (projectIndex !== -1) {
        state.projects[projectIndex] = {
          ...action.payload,
        };
      }
    },

    setSelectedProject: (state, action: PayloadAction<ProjectType>) => {
      state.selectedProject = action.payload;
    },

    clearSelectedProject: (state) => {
      state.selectedProject = undefined;
    },

    setSelectedProjectById: (state, action: PayloadAction<{ identifier: string }>) => {
      state.selectedProject = state.projects.find(
        (project) => project.identifier === action.payload.identifier,
      );
    },
  },
});

export const currentProjects = (state: { projects: ProjectState }) => state.projects.projects;
export const currentSelectedProject = (
  state: { projects: ProjectState },
) => state.projects.selectedProject;
export const {
  addProjects,
  clearProjects,
  addProject,
  removeProject,
  setSelectedProject,
  setSelectedProjectById,
  updateProject,
} = projectSlice.actions;

export default projectSlice.reducer;
