import {TestBed} from '@angular/core/testing';
import {RoundCountService} from "../app/services/round-count.service";

describe('RoundCountService', () => {
  let service: RoundCountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoundCountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate the remaining rounds', () => {
    service.roundCount = 1
    const result = service.getRemainingRounds();
    expect(result).toBe(44);
  });

  it('should increment the round count', () => {
    service.roundCount = 5;
    service.incrementRoundCount();
    expect(service.roundCount).toBe(6)
  });

  it('should reset the round count', () => {
    service.roundCount = 5;
    service.reset();
    expect(service.roundCount).toBe(1);
  });

});
