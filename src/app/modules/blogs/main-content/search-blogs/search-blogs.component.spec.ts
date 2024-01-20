import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBlogsComponent } from './search-blogs.component';

describe('SearchBlogsComponent', () => {
  let component: SearchBlogsComponent;
  let fixture: ComponentFixture<SearchBlogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBlogsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
