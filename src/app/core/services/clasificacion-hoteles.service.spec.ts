import { TestBed } from '@angular/core/testing';

import { ClasificacionHotelesService } from './clasificacion-hoteles.service';

describe('ClasificacionHotelesService', () => {
  let service: ClasificacionHotelesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClasificacionHotelesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
