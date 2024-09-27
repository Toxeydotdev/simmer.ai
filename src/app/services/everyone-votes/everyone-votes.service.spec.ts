import { TestBed } from '@angular/core/testing';

import { EveryoneVotesService } from './everyone-votes.service';

describe('EveryoneVotesService', () => {
  let service: EveryoneVotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EveryoneVotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
