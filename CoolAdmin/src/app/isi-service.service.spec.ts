import { TestBed } from '@angular/core/testing';

import { IsiServiceService } from './isi-service.service';

describe('IsiServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IsiServiceService = TestBed.get(IsiServiceService);
    expect(service).toBeTruthy();
  });
});
