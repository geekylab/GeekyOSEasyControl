'use strict';

describe('Service: DockerApi', function () {

  // load the service's module
  beforeEach(module('geekyOsApp'));

  // instantiate service
  var DockerApi;
  beforeEach(inject(function (_DockerApi_) {
    DockerApi = _DockerApi_;
  }));

  it('should do something', function () {
    expect(!!DockerApi).toBe(true);
  });

});
