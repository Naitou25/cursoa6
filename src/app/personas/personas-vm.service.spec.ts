import { TestBed, inject } from '@angular/core/testing';

import { PersonasVMService } from './personas-vm.service';

describe('PersonasVMService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersonasVMService]
    });
  });

  it('should be created', inject([PersonasVMService], (service: PersonasVMService) => {
    expect(service).toBeTruthy();
  }));
});
