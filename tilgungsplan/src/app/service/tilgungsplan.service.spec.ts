import { TestBed } from '@angular/core/testing';

import { TilgungsplanService } from './tilgungsplan.service';

describe('TilgungsplanService', () => {
  let service: TilgungsplanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TilgungsplanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
