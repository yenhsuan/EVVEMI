// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//Services
import { DataService} from './services/data.service';

// Components
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { FormComponent } from './components/form/form.component';
import { ListComponent } from './components/list/list.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';

// Route
import { Route } from './app.routes';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    FormComponent,
    ListComponent,
    CourseListComponent,
    NavbarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    Route,
    HttpModule
  ],
  providers: [
    {
      provide: 'data',
      useClass: DataService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
