import {HttpClient} from "@angular/common/http";

import {BaseApi} from "../../../shared/core/base-api";
import {Injectable} from "@angular/core";
import {CategoryModel} from "../models/category.model";
import {Observable} from "rxjs";

@Injectable()
export class CategoriesService extends BaseApi{
    constructor(public http: HttpClient){
        super(http);
    }

    addCategory(category: CategoryModel){
        return this.post('categories', category)
    }

    getCategories(){
        return this.get('categories');
    }

    updateCategories(category: CategoryModel){
        return this.put(`categories/${category.id}`, category)
    }

    getCategoryById(id: number): Observable<CategoryModel> {
        return <Observable<CategoryModel>> this.get(`categories/${id}`)
    }
}