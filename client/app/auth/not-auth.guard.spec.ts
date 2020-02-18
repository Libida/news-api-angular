import { TestBed, async, inject } from '@angular/core/testing';

import { NotAuthGuard } from './not-auth.guard';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('NotAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [NotAuthGuard]
    });
  });

  it('should ...', inject([NotAuthGuard], (guard: NotAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
