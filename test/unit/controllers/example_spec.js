describe('Unit: ExampleCtrl', function () {

  var scope, ctrl, http;

  beforeEach(function () {
    // instantiate the app module
    angular.mock.module('app');

    angular.mock.inject(($rootScope, $controller, $http) => {
      //$httpBackend.whenGET('http://pb-api.herokuapp.com/bars').respond(200, {data:{ btn:[1,2,3,4], bars:[1,2,3] }});
      scope = $rootScope.$new();
      http = $http;
      ctrl = $controller('ExampleCtrl', {$scope: scope, $http: http});

      //$httpBackend.flush(); //needed to resolve and handle promise returned by $http
      // httpBackend=$httpBackend;
    });
  });


  it('initial values are defined properly', function () {
    expect(ctrl).not.toBeUndefined();
    expect(scope).not.toBeUndefined();
  });


  it('should have a url variable equal to \'http://pb-api.herokuapp.com/bars\'', function () {
    expect(scope.url).toEqual('http://pb-api.herokuapp.com/bars');
  });

  it('should have buttons initialized', function () {
    expect(scope.buttons.length).toEqual(5);
  });

  it('should have title as \'Progress Bars Demo\'', function () {
    expect(scope.title).toEqual('Progress Bars Demo');
  });

  it('should have progressBars defined properly', function () {
    expect(scope.progressBars.length).toEqual(5);
    expect(scope.progressBars[1]).toBeDefined();
    expect(scope.progressBars[2]).toBeDefined();
    expect(scope.progressBars[3]).toBeDefined();
    expect(scope.progressBars[4]).toBeDefined();
    expect(scope.progressBars[4]).toBeDefined();
  });

  it('should have button objects initialized properly', function () {
    expect(scope.buttons.length).toEqual(5);

    expect(scope.buttons[0].id).toEqual('1');
    expect(scope.buttons[0].show).toEqual(false);
    expect(scope.buttons[0].label).toEqual('0');

    expect(scope.buttons[1].id).toEqual('2');
    expect(scope.buttons[1].show).toEqual(false);
    expect(scope.buttons[1].label).toEqual('0');

    expect(scope.buttons[2].id).toEqual('3');
    expect(scope.buttons[2].show).toEqual(false);
    expect(scope.buttons[2].label).toEqual('0');

    expect(scope.buttons[3].id).toEqual('4');
    expect(scope.buttons[3].show).toEqual(false);
    expect(scope.buttons[3].label).toEqual('0');

    expect(scope.buttons[4].id).toEqual('5');
    expect(scope.buttons[4].show).toEqual(false);
    expect(scope.buttons[4].label).toEqual('0');

  });


  it('should have ProgressBar objects initialized properly', function () {
    expect(scope.progressBars[0].id).toEqual('1');
    expect(scope.progressBars[0].show).toEqual(true);
    expect(scope.progressBars[0].value).toEqual(0);

    expect(scope.progressBars[1].id).toEqual('2');
    expect(scope.progressBars[1].show).toEqual(true);
    expect(scope.progressBars[1].value).toEqual(0);

    expect(scope.progressBars[2].id).toEqual('3');
    expect(scope.progressBars[2].show).toEqual(false);
    expect(scope.progressBars[2].value).toEqual(0);

    expect(scope.progressBars[3].id).toEqual('4');
    expect(scope.progressBars[3].show).toEqual(false);
    expect(scope.progressBars[3].value).toEqual(0);

    expect(scope.progressBars[4].id).toEqual('5');
    expect(scope.progressBars[4].show).toEqual(false);
    expect(scope.progressBars[4].value).toEqual(0);
  });
});
