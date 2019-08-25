import { TestBed, async, inject } from '@angular/core/testing';

import { AuthTrueGuard } from './auth-true.guard';

describe('AuthTrueGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthTrueGuard]
    });
  });

  it('should ...', inject([AuthTrueGuard], (guard: AuthTrueGuard) => {
    expect(guard).toBeTruthy();
  }));
});
