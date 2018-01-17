function ExampleDirective() {

  return {
    restrict: 'EA',
    templateUrl: 'directives/example.html',
    link: (scope) => {
      scope.updateProgressBar = function (pbar, btnIndexNo) {
        const value = scope.buttons[btnIndexNo].getValue();
        const progressBar = scope.progressBars[scope.selectedProgressBar-1];
        progressBar.incrementOrDecrementBy(value);
        scope.resetAllAndAnimateOnlyAt(scope.selectedProgressBar);
      };

    }

  };
}

export default {
  name: 'exampleDirective',
  fn: ExampleDirective
};
