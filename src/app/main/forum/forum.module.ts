import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ForumComponent } from './forum.component';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SharedModule } from 'src/app/shared/shared.module';
import { ForumDetailsComponent } from './forum-details/forum-details.component';
import { ForumQuestionsComponent } from './forum-questions/forum-questions.component';
import { TableModule } from 'primeng/table';

const routes: Routes = [
  {
    path: 'forum',
    component: ForumComponent,
    // children: [
    //   {
    //     path: 'forumdetails',
    //     component: ForumDetailsComponent,
    //   },
    // ],
  },
  {
    path: 'forum/forumdetails/:id',
    component: ForumDetailsComponent,
  },
  {
    path: 'forum/forumQuestion',
    component: ForumQuestionsComponent,
  },
];

@NgModule({
  declarations: [
    ForumComponent,
    ForumDetailsComponent,
    ForumQuestionsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    DialogModule,
    ReactiveFormsModule,
    FormsModule,
    CheckboxModule,
    RadioButtonModule,
    TableModule,
  ],
})
export class ForumModule {}
