import { TestBed } from '@angular/core/testing';
import { LastFmService } from './last-fm.service';
describe('LastFmService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(LastFmService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=last-fm.service.spec.js.map