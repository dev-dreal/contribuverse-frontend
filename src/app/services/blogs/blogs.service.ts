import { Injectable } from '@angular/core';
import { BlogModel } from '../../models/blog.model';
import { GET_BLOGS, GET_BLOG } from '../../graphql/queries';
import { Apollo } from 'apollo-angular';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogsService {
  constructor(private apollo: Apollo) {}

  getBlogs(): Observable<BlogModel[]> {
    return this.apollo
      .watchQuery<any>({
        query: GET_BLOGS,
      })
      .valueChanges.pipe(map((result) => result.data.blogs));
  }

  getSingleBlog(id: string): Observable<BlogModel> {
    return this.apollo
      .watchQuery<any>({
        query: GET_BLOG,
        variables: {
          id,
        },
      })
      .valueChanges.pipe(map((result) => result.data.blog));
  }

  // getBlogs(): BlogModel[] {
  //   return [
  //     {
  //       id: '1',
  //       title: 'Machine Learning',
  //       imageUrl: 'assets/svgs/ml.svg',
  //       userId: '1',
  //       category: 'Machine Learning',
  //       comments: [],
  //       likes: [],
  //       tags: [],
  //       content: 'Future Trends in Machine Learning.',
  //       createdAt: new Date().toISOString(),
  //       updatedAt: new Date().toISOString(),
  //     },
  //     {
  //       id: '2',
  //       title: 'Android Development',
  //       imageUrl: 'assets/svgs/android-logo.svg',
  //       userId: '1',
  //       category: 'Android Development',
  //       comments: [],
  //       likes: [],
  //       tags: [],
  //       content:
  //         'Composables are typically represented as functions in Kotlin.',
  //       createdAt: new Date().toISOString(),
  //       updatedAt: new Date().toISOString(),
  //     },
  //     {
  //       id: '3',
  //       title: 'Flutter',
  //       shortDescription:
  //         'Flutter is an open-source UI software development kit created by Google.',
  //       imageUrl: 'assets/svgs/flutter-logo.svg',
  //       userId: '1',
  //       category: 'Flutter',
  //       comments: [],
  //       likes: [],
  //       tags: [],
  //       content:
  //         'Flutter is an open-source UI software development kit created by Google.',
  //       createdAt: new Date().toISOString(),
  //       updatedAt: new Date().toISOString(),
  //     },
  //     {
  //       id: '4',
  //       title: 'React',
  //       shortDescription:
  //         'React is an open-source front-end JavaScript library for building user interfaces or UI components.',
  //       imageUrl: 'assets/svgs/react-logo.svg',
  //       userId: '1',
  //       category: 'React',
  //       comments: [],
  //       likes: [],
  //       tags: [],
  //       content:
  //         'React is an open-source front-end JavaScript library for building user interfaces or UI components.',
  //       createdAt: new Date().toISOString(),
  //       updatedAt: new Date().toISOString(),
  //     },
  //   ];
  // }
}
