import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { viewGuard } from './view.guard';

describe('viewGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => viewGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
