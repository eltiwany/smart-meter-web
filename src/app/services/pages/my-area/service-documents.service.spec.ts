import { TestBed } from '@angular/core/testing';

import { ServiceDocumentsService } from './service-documents.service';

describe('ServiceDocumentsService', () => {
  let service: ServiceDocumentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceDocumentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
