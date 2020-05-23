import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewBackendComponent } from './view-backend/view-backend.component';
import { PostBackendComponent } from './post-backend/post-backend.component';

const routes: Routes = [
  { path: 'view', component: ViewBackendComponent },
  { path: 'post', component: PostBackendComponent },
  { path: '', redirectTo: '/view', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
