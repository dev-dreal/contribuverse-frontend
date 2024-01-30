import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuMobileComponent } from './menu-mobile.component';

describe('MenuMobileComponent', () => {
  let component: MenuMobileComponent;
  let fixture: ComponentFixture<MenuMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuMobileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
