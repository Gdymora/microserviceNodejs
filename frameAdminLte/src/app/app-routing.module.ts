import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
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
  {
    path: 'admin', loadChildren: () => import('./layout/admin/admin.module').then(m => m.AdminModule),
  },
  {
    path: '', component: MainLayoutComponent, children:
      [
       /*  { path: 'home', component: HomeComponent },
        { path: 'reg', component: RegComponent },
        { path: 'post/:id', component: PagesPostComponent},
        { path: 'auth', component: AuthComponent }, */
      ]
  },

  { path: "", redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {
    scrollPositionRestoration: "enabled",
    onSameUrlNavigation: "reload",
  }),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
