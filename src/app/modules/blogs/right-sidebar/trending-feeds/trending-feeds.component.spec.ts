import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingFeedsComponent } from './trending-feeds.component';

describe('TrendingFeedsComponent', () => {
  let component: TrendingFeedsComponent;
  let fixture: ComponentFixture<TrendingFeedsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrendingFeedsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrendingFeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
