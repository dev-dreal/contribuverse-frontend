import { Component } from '@angular/core';
import { BlogCardComponent } from '../../../../shared/components/ui/blog-card/blog-card.component';
import { BlogModel } from '../../../../models/blog.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'blogs-list',
  standalone: true,
  imports: [CommonModule, BlogCardComponent],
  templateUrl: './blogs-list.component.html',
  styleUrl: './blogs-list.component.scss',
})
export class BlogsListComponent {
  addBlogMetaData: BlogModel = {
    title: 'Add a new blog',
    description: 'Add a new blog to the list of blogs.',
    icon: 'assets/gifs/add-blog.gif',
    route: 'add',
  };

  blogs: BlogModel[] = [
    {
      title: 'Machine Learning',
      description:
        'Machine learning is the study of computer algorithms that improve automatically through experience.',
      icon: 'assets/svgs/ml.svg',
      route: '',
    },
    {
      title: 'Android Development',
      description:
        'Android software development is the process by which applications are created for devices running the Android operating system.',
      icon: 'assets/svgs/android-logo.svg',
      route: '',
    },
    {
      title: 'Flutter',
      description:
        'Flutter is an open-source UI software development kit created by Google.',
      icon: 'assets/svgs/flutter-logo.svg',
      route: '',
    },
    {
      title: 'React',
      description:
        'React is an open-source front-end JavaScript library for building user interfaces or UI components.',
      icon: 'assets/svgs/react-logo.svg',
      route: '',
    },
  ];
}
