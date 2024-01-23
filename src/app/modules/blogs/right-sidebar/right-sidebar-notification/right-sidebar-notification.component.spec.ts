import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightSidebarNotificationComponent } from './right-sidebar-notification.component';

describe('RightSidebarNotificationComponent', () => {
  let component: RightSidebarNotificationComponent;
  let fixture: ComponentFixture<RightSidebarNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RightSidebarNotificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RightSidebarNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
