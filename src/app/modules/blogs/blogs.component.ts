import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { fadingAnimation } from '../../helpers/animations';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { MainContentComponent } from './main-content/main-content.component';
import { RightSidebarComponent } from './right-sidebar/right-sidebar.component';
import { Apollo } from 'apollo-angular';
import { GET_BLOGS } from '../../graphql/queries';
import { BlogModel } from '../../models/blog.model';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [
    CommonModule,
    LeftSidebarComponent,
    MainContentComponent,
    RightSidebarComponent,
  ],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss',
  animations: [fadingAnimation],
})
export class BlogsComponent {
  blogs: any[] = [];
  countries: any[] = [];
  loading: boolean = true;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries() {
    this.apollo
      .watchQuery({
        query: GET_BLOGS,
      })
      .valueChanges.subscribe(({ data, error }: any) => {
        console.log(data);
        this.blogs = data.blogs;
        this.loading = false;
        if (error) {
          console.error(error);
        }
      });
  }
}
