import mongoose, { Model, Document, Schema, Types } from "mongoose";

export interface Projects extends Document {
    name: string;
    description: string;
    githubUrl:string;
    contributors: Types.ObjectId;
    visibility?: 'Public' | 'Private'; 
    createdAt?: Date;
    updatedAt?: Date;
}

const ProjectSchema: Schema = new Schema<Projects>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    githubUrl: {
        type: String,
    },
    contributors: [
        {
            type: Types.ObjectId,
            ref: 'User',
        }
    ],
    visibility:{
        type:String,
        enum: ['Public' , 'Private'],
        default: 'Public',
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
})

const ProjectModel: Model<Projects> = mongoose.models.Project || mongoose.model<Projects>("Project",ProjectSchema);
export default ProjectModel;