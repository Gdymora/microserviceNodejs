import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainLayoutComponent } from '../main-layout/main-layout.component';

@NgModule({
    declarations: [
        DashboardComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(
            [
                {
                    path: '', component: MainLayoutComponent, children: [
                        { path: 'dashboard', component: DashboardComponent},

                    ]
                }
            ])
    ]
})
export class AdminModule { }