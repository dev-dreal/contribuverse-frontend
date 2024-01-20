import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialLoaderComponent } from './initial-loader.component';

describe('InitialLoaderComponent', () => {
  let component: InitialLoaderComponent;
  let fixture: ComponentFixture<InitialLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InitialLoaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InitialLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
