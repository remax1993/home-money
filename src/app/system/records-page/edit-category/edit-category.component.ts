import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import {CategoryModel} from "../../shared/models/category.model";
import {CategoriesService} from "../../shared/services/categories.service";
import {MessageModel} from "../../../shared/models/message.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit, OnDestroy {
  sub1: Subscription;

  @Input() categories: CategoryModel[] = [];
  @Output() onCategoryEdit = new EventEmitter<CategoryModel>();

  currentCategoryId = 1;
  currentCategory: CategoryModel;

  message: MessageModel;

  constructor(private categoriesService: CategoriesService) {

  }

  ngOnInit() {
    this.onCategoryChange();
    this.message = new MessageModel('success', '');
  }

  onSubmit(form: NgForm){
    let {name, capacity} = form.value;
    if(capacity < 0) capacity *= -1;

    const category = new CategoryModel(name, capacity, +this.currentCategoryId)

    this.sub1 = this.categoriesService.updateCategories(category)
        .subscribe((category: CategoryModel) => {
          this.onCategoryEdit.emit(category);

          this.message.text = 'Категория успешно отредактирована';
          setTimeout(_ => {
            this.message.text = '';
          }, 5000);

          console.log(category);
        })


  }

  onCategoryChange(){
    this.currentCategory = this.categories
        .find(c => c.id === +this.currentCategoryId);
  }

  ngOnDestroy(){
      if(this.sub1) this.sub1.unsubscribe();
  }

}
