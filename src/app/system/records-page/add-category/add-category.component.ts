import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import {CategoriesService} from "../../shared/services/categories.service";
import {CategoryModel} from "../../shared/models/category.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit, OnDestroy {
  sub1: Subscription;

  @Output() onCategoryAdd = new EventEmitter<CategoryModel>();

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    console.log(form);
    let {name, capacity} = form.value;
    if(capacity < 0) capacity *= -1;

    const category = new CategoryModel(name, capacity)

    this.sub1 = this.categoriesService.addCategory(category)
        .subscribe((category: CategoryModel) => {
          form.reset();
          form.form.patchValue({capacity: 1});
          this.onCategoryAdd.emit(category);

          console.log(category);
        })
  }

  ngOnDestroy(){
      if(this.sub1) this.sub1.unsubscribe();
  }

}
