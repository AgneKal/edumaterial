import { Routes } from '@angular/router';
import { SigningComponent } from './components/auth/signing/signing.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ListUsersComponent } from './components/users/list-users/list-users.component';
import { UpdateUserComponent } from './components/users/update-user/update-user.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ListCoursesComponent } from './components/courses/list-courses/list-courses.component';
import { NewCourseComponent } from './components/courses/new-course/new-course.component';
import { UpdateCourseComponent } from './components/courses/update-course/update-course.component';
import { ListGroupsComponent } from './components/groups/list-groups/list-groups.component';
import { NewGroupComponent } from './components/groups/new-group/new-group.component';
import { UpdateGroupComponent } from './components/groups/update-group/update-group.component';
import { MyCoursesComponent } from './components/courses/my-courses/my-courses.component';
import { adminGuard } from './guards/admin.guard';
import { ListLecturesComponent } from './components/lectures/list-lectures/list-lectures.component';
import { NewLectureComponent } from './components/lectures/new-lecture/new-lecture.component';
import { UpdateLectureComponent } from './components/lectures/update-lecture/update-lecture.component';
import { NewStudentComponent } from './components/users/new-student/new-student.component';

export const routes: Routes = [
    {path: "auth/signin", component: SigningComponent},
    {path: "auth/login", component: LoginComponent},


    {path: "users/new", component: NewStudentComponent},
    {path: "users/list", component: ListUsersComponent, canActivate:[adminGuard]},
    {path: "users/:id", component: UpdateUserComponent, canActivate:[adminGuard]},

    {path: "courses/list", component: ListCoursesComponent},
    {path: "courses/new", component: NewCourseComponent},
    {path: "courses/:id", component: UpdateCourseComponent},
    {path: "courses/myCourses", component: MyCoursesComponent},

    {path: "groups/list", component: ListGroupsComponent},
    {path: "groups/new", component: NewGroupComponent},
    {path: "groups/:id", component: UpdateGroupComponent},

    {path: "lectures/list", component: ListLecturesComponent},
    {path: "lectures/new", component: NewLectureComponent},
    {path: "lectures/:id", component: UpdateLectureComponent},

    {path: "profile", component: ProfileComponent},

    {path: "", component: HomepageComponent},
];
