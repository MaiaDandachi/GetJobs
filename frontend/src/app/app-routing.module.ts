import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FollowUpPageComponent } from './components/follow-up-page/follow-up-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { JobCreateComponent } from './components/jobs/job-create/job-create.component';
import { ProfileComponent } from './components/profile-page/profile.component';

const routes: Routes = [
  {
    component: ProfileComponent,
    path: 'profile',
  },
  {
    component: FollowUpPageComponent,
    path: 'follow-up',
  },
  {
    component: JobCreateComponent,
    path: 'create-job',
  },
  {
    component: HomePageComponent,
    path: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
