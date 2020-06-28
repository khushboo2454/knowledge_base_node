import mongoose, { Schema, Document } from 'mongoose';

/**
 * interface is for content schema
 * as schema.
 */
export interface IContent extends Document {

    title: string;
    categoryId: string;
    description?: string;
    docUrl?: string;
    _createdDate?: Date;
}

// Content schema
const ContentSchema: Schema = new Schema({
    title: { type: String, required: true },
    categoryId: { type: String, required: true },
    description: { type: String, required: true },
    docUrl: { type: String, required: false },
    _createdDate: { type: Date, default: new Date(), required: false }
});
// ContentSchema.index({ title: 'text', body: 'text'},
//     { weights: { title: 5, body: 3, } })

export default mongoose.model<IContent>('content', ContentSchema);
