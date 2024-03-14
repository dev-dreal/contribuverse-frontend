import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainBlogContentComponent } from './main-blog-content.component';

describe('MainBlogContentComponent', () => {
  let component: MainBlogContentComponent;
  let fixture: ComponentFixture<MainBlogContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainBlogContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainBlogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
