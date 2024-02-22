import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleBlogComponent } from './single-blog.component';

describe('SingleBlogComponent', () => {
  let component: SingleBlogComponent;
  let fixture: ComponentFixture<SingleBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleBlogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
