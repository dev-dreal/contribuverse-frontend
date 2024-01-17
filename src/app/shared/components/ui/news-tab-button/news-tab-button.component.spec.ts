import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsTabButtonComponent } from './news-tab-button.component';

describe('NewsTabButtonComponent', () => {
  let component: NewsTabButtonComponent;
  let fixture: ComponentFixture<NewsTabButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsTabButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewsTabButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
