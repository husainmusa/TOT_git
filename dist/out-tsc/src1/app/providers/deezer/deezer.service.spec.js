import { TestBed } from '@angular/core/testing';
import { DeezerService } from './deezer.service';
describe('DeezerService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(DeezerService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=deezer.service.spec.js.map