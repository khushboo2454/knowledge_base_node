import { Categories } from '../../entities/Categories';
import { getRepository, getConnection } from 'typeorm';

export default class CatalogService {

	constructor() { }
	/**
	 * Get all category
	 * @param id users social id
	 */
    async getCategoryList() {
		return await getConnection().getRepository(Categories).find();
	}

	/**
   	* insert new category
	* @param categoryName
	*/
	async createCategory(categoryName: string) {
		const newCategory = await getRepository(Categories).create({ name: categoryName});
        return await getRepository(Categories).save(newCategory);
	}

}