import { Model, Schema } from 'mongoose';
import BaseConnection from '../../../connection';

const connection = BaseConnection.getConnection();

export interface ProjectType {
    creatorId: string;
    identifier: string;
    name: string;
    state: string;
    creationDate?: Date;
    lastUpdateDate?: Date;
}

const PROJECTS = 'Projects';

const projectSchema = new Schema<ProjectType>({
  creatorId: { type: String, required: true },
  identifier: { type: String, required: false },
  name: { type: String, required: true },
  state: { type: String, required: true },
  creationDate: { type: Date, default: Date.now, required: false },
  lastUpdateDate: { type: Date, default: Date.now, required: false },
});

export const ProjectModel: Model<ProjectType> = connection.models[PROJECTS]
  || connection.model<ProjectType>(PROJECTS, projectSchema);
