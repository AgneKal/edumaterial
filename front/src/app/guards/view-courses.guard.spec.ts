import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { viewCoursesGuard } from './view-courses.guard';

describe('viewCoursesGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => viewCoursesGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
