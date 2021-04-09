import { TestBed } from '@angular/core/testing';
import { SpotifyService } from './spotify.service';
describe('SpotifyService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(SpotifyService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=spotify.service.spec.js.map