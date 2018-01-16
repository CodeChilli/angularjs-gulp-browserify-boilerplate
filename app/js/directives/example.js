function ExampleDirective() {

  return {
    restrict: 'EA',
    templateUrl: 'directives/example.html',
    scope: {
      title: '@',
      message: '@clickMessage'
    },
    link: (scope, element) => {
      element.on('click', () => {
        scope.setPB = function(btn){
          alert('you clicked the button!'+btn);
        };
      });
    }
  };
}

export default {
  name: 'exampleDirective',
  fn: ExampleDirective
};
