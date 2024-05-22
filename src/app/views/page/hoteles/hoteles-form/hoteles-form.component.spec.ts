import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelesFormComponent } from './hoteles-form.component';

describe('HotelesFormComponent', () => {
  let component: HotelesFormComponent;
  let fixture: ComponentFixture<HotelesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelesFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HotelesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
