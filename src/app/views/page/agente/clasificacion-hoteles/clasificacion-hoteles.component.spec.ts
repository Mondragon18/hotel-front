import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasificacionHotelesComponent } from './clasificacion-hoteles.component';

describe('ClasificacionHotelesComponent', () => {
  let component: ClasificacionHotelesComponent;
  let fixture: ComponentFixture<ClasificacionHotelesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClasificacionHotelesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClasificacionHotelesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
