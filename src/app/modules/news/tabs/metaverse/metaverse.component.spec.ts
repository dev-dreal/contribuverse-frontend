import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetaverseComponent } from './metaverse.component';

describe('MetaverseComponent', () => {
  let component: MetaverseComponent;
  let fixture: ComponentFixture<MetaverseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetaverseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MetaverseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
