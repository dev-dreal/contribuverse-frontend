import { Injectable } from '@angular/core';
import { BlogModel } from '../../models/blog.model';

@Injectable({
  providedIn: 'root',
})
export class BlogsService {
  constructor() {}

  getBlogs(): BlogModel[] {
    return [
      {
        title: 'Machine Learning',
        shortDescription: 'Future Trends in Machine Learning.',
        longDescription:
          'Machine learning is the study of computer algorithms that improve automatically through experience.',
        image: 'assets/svgs/ml.svg',
        route: '',
      },
      {
        title: 'Android Development',
        shortDescription:
          'Composables are typically represented as functions in Kotlin.',
        longDescription:
          'Android software development is the process by which applications are created for devices running the Android operating system.',
        image: 'assets/svgs/android-logo.svg',
        route: '',
      },
      {
        title: 'Flutter',
        shortDescription:
          'Flutter is an open-source UI software development kit created by Google.',
        image: 'assets/svgs/flutter-logo.svg',
        route: '',
      },
      {
        title: 'React',
        shortDescription:
          'React is an open-source front-end JavaScript library for building user interfaces or UI components.',
        image: 'assets/svgs/react-logo.svg',
        route: '',
      },
    ];
  }
}
