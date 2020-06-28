import contentModel from '../../models/content';

// local interfaces

interface IContent {
    title: string;
    categoryId: string;
    description?: string;
    docUrl?: string;
    _createdDate?: Date;
}


export default class ContentService {
    constructor() { }

    /**
     * used for inserting content
     * @param data
     */
    async insert(data: IContent[] | IContent): Promise<any> {
        try {
            // insert notifications
            const inserted = await contentModel.insertMany(data);
            return Promise.resolve(inserted);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    /**
     * used for getting all content
     * filter and search content
     * @param data
     */
    getAllContent(data: any) {
        try {
            console.log( data.key);
            let query = [];
            if (data.key) {
                query.push({title: { $regex : data.key }});
                query.push({description: { $regex : data.key}});
            }
            if (data.catId) {
                query.push({categoryId: data.catId});
            }
            if (query.length > 0) {
                return contentModel.find({ $or: query }).sort({ _createdDate: -1 });
            } else {
                return contentModel.find({}).sort({ _createdDate: -1 });
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }

}