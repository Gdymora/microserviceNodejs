import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './navigation/categories/categories.component';
import { ProductsComponent } from './navigation/products/products.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent
  }, {
    path: 'products/:id',
    component: ProductsComponent
  },
  {
    path: 'dictionary', loadChildren: () => import('./dictionary/dictionary.module')
      .then(m => m.DictionaryModule)
  },
  {
    path: 'dictionary-table', loadChildren: () => import('./dynamic-tables/dynamic-tables.module')
      .then(m => m.DynamicTablesModule)
  },
  { path: "", redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      relativeLinkResolution: 'legacy',
      scrollPositionRestoration: 'enabled'
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
