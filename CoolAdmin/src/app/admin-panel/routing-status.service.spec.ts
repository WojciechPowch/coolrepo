import { TestBed } from '@angular/core/testing';

import { RoutingStatusService } from './routing-status.service';

describe('RoutingStatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoutingStatusService = TestBed.get(RoutingStatusService);
    expect(service).toBeTruthy();
  });
});
