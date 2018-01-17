/* eslint-disable no-unused-vars */
function ExampleCtrl($scope, $http) {
  'ngInject'

  $scope.title = 'Progress Bars Demo';
  $scope.url = 'http://pb-api.herokuapp.com/bars';
  $scope.selectedProgressBar = 1;
  $scope.progressBarsThatShow = [];
  $scope.progressBars = [];

  var dangerClass= 'btn-danger';
  var infoClass= 'progress-bar-info';

  function ProgressBar(id1, label1, value1, show1, limit1, valueInPercentage1, overlimit1, selected) {
    this.oldProgressBar = null;

    this.id = id1;
    this.label = label1;
    this.overlimit = overlimit1;
    this.value = value1;

    this.show = show1;
    this.limit = limit1;
    this.valueInPercentage = valueInPercentage1;
    this.uIValueInPercentage = valueInPercentage1;
    this.selected = selected;

    this.getId = function () {
      return this.id;
    };

    this.getShow = function () {
      return this.show;
    };

    this.getLabel = function () {
      return this.label;
    };

    this.getValue = function () {
      return this.value;
    };

    this.getLimit = function () {
      return this.limit;
    };

    this.getValueInPercentage = function () {
      return this.valueInPercentage;
    };

    this.getUIValueInPercentage = function () {
      return this.uIValueInPercentage;
    };

    this.getSelected = function () {
      return this.selected;
    };

    this.toString = function () {
      const s = ',';
      return ' id:' + this['id'] + s + 'label:' + this['label'] + s + 'show:' + this['show'] + s + 'limit:' + this['limit'] + s + 'valueInPercentage:' + s + this['valueInPercentage'] + s + 'overlimit:' + this['overlimit'] + s + 'uIValueInPercentage:' + this['uIValueInPercentage'];
    };

    this.incrementOrDecrementBy = function (signedValueInPercentage) {

      //Keep Track of Previous Changes
      this.oldProgressBar = new ProgressBar(this['id'], this['label'], this['value'], this['show'], this['limit'], this['valueInPercentage'], this['overlimit'], this['selected']);
      this.oldProgressBar['uIValueInPercentage'] = this['uIValueInPercentage'];


      var newValueInPercentage = signedValueInPercentage + this['valueInPercentage'];

      function constructZerTo100() {
        addInfoAt(this['id']);

        this['uIValueInPercentage'] = newValueInPercentage;
        this['valueInPercentage'] = newValueInPercentage;
        this['value'] = this['valueInPercentage']
        this['overlimit'] = false;
      }

      function constructAboveLimit(percent) {
        addDangerAt(this['id']);
        this['uIValueInPercentage'] = percent;
        this['valueInPercentage'] = this['limit']; //limit will never change
        this['value'] = this['limit'];
        this['overlimit'] = true;
      }

      function constructAbove100(percent) {
        addInfoAt(this['id']);

        this['uIValueInPercentage'] = percent;
        this['valueInPercentage'] = newValueInPercentage;
        this['value'] = newValueInPercentage;
        this['overlimit'] = true;
      }

      function constructNegative() {
        addDangerAt(this['id']);
        this['value'] = 0;
        this['valueInPercentage'] = 0;
        this['uIValueInPercentage'] = 0;
        this['overlimit'] = true;//???
      }

      if (newValueInPercentage > 0) {
        const percent = 100;
        if (newValueInPercentage <= percent) {
          constructZerTo100.call(this);
        } else if (newValueInPercentage > this['limit']) {
          constructAboveLimit.call(this, percent);
        } else if (newValueInPercentage > percent) {
          constructAbove100.call(this, percent);
        }
      } else {
        constructNegative.call(this);
      }


      //console.log('OLD:' + this.oldProgressBar.toString());
      //console.log('NEW:' + this.toString());
    }
  };

  function Button(id1, lab, val, isShow) {

    this.id = id1;
    this.label = lab;
    this.value = val;
    this.show = isShow;


    this.updateSign=function(){
      this.sign=(this.value<0)?'-':'+';
    }
    this.updateSign();

    this.getId = function () {
      return this.id;
    };

    this.getShow = function () {
      return this.show;
    };

    this.getLabel = function () {
      return this.label;
    };

    this.getValue = function () {
      return this.value;
    };

  }

  function resetAllAndAddClassAt(className, id ) {
    for (var i = 0; i < $scope.progressBars.length; ++i) {
      angular.element(document.querySelector('#divProg' + (i))).removeClass(className);
    }
    angular.element(document.querySelector('#divProg' + (id))).addClass(className);
  }

  function removeClassAndAddClassAt(classNameTobeRemoved, classNameTobeAdded, id ) {
    angular.element(document.querySelector('#divProg' + (id))).removeClass(infoClass);
    angular.element(document.querySelector('#divProg' + (id))).addClass(dangerClass);
  }

  function addInfoAt( id ) {
    angular.element(document.querySelector('#divProg' + (id))).removeClass(dangerClass);
    angular.element(document.querySelector('#divProg' + (id))).addClass(infoClass);
  }

  function addDangerAt(id ) {
    angular.element(document.querySelector('#divProg' + (id))).removeClass(infoClass);
    angular.element(document.querySelector('#divProg' + (id))).addClass(dangerClass);
  }

  $scope.resetAllAndAnimateOnlyAt =function(id){
    resetAllAndAddClassAt('active',id);
  }

  $scope.animateSelectedProgressBar = function(){
    resetAllAndAnimateOnlyAt($scope.selectedProgressBar);
  }

  $scope.makeDangerAtElemPrefixId =function(id){
    resetAllAndAddClassAt('btn-danger',id);
  }


  function initialize() {
    //4 to 6 buttons will be visible

    $scope.buttons = [];
    $scope.buttons.push(new Button('1', '0', 0, false));
    $scope.buttons.push(new Button('2', '0', 0, false));
    $scope.buttons.push(new Button('3', '0', 0, false));
    $scope.buttons.push(new Button('4', '0', 0, false));
    $scope.buttons.push(new Button('5', '0', 0, false));


    var defaultoverlimit = false;

    const valueInPercentage2 = 0;
    const limit2 = 0;
    const label2 = '0';
    const value2 = 0;

    //2 to 5 progressbars will be visible

    $scope.progressBars.push(new ProgressBar('1', 0, value2, true, limit2, valueInPercentage2, defaultoverlimit, true));
    $scope.progressBars.push(new ProgressBar('2', 1, value2, true, limit2, valueInPercentage2, defaultoverlimit, false));
    $scope.progressBars.push(new ProgressBar('3', 2, value2, false, limit2, valueInPercentage2, defaultoverlimit, false));
    $scope.progressBars.push(new ProgressBar('4', 3, value2, false, limit2, valueInPercentage2, defaultoverlimit, false));
    $scope.progressBars.push(new ProgressBar('5', 4, value2, false, limit2, valueInPercentage2, defaultoverlimit, false));

  }

  initialize();

  function updateButtonStates(button, show, value) {
    button.show = show;
    button.value = value;
    button.updateSign(value);
  }



  $http.get($scope.url).then(successCallback, errorCallback);

  function successCallback(response) {

    function updateButtonsAndProgressBars(bars, buttons, limit) {
      bars.sort(function(a,b){return a - b}) ;
      buttons.sort(function(a,b){return a - b});


      function updateButtonsFromResponse() {
        for (var i = 0; i < $scope.buttons.length; i++) {
          if (i < buttons.length) {
            updateButtonStates($scope.buttons[i], true, buttons[i]);
          } else {
            updateButtonStates($scope.buttons[i], false, 100);//check
          }
        }
      }

      updateButtonsFromResponse();

      function updateProgressBarsFromResponseData() {
        for (var i = 0; i < $scope.progressBars.length; i++) {
          const b = i < bars.length;
          $scope.progressBars[i]['show'] = b;
          if (b) {
            $scope.progressBars[i]['uIValueInPercentage'] = bars[i];
            $scope.progressBars[i]['value'] = bars[i];
            $scope.progressBars[i]['valueInPercentage'] = bars[i];
            $scope.progressBars[i]['limit'] = limit;

            $scope.progressBarsThatShow.push($scope.progressBars[i]);

          } else {
            $scope.progressBars[i]['uIValueInPercentage'] = 0;
            $scope.progressBars[i]['value'] = 0;
            $scope.progressBars[i]['valueInPercentage'] = 0;
            $scope.progressBars[i]['limit'] = 0;
          }
        }
      }

      updateProgressBarsFromResponseData();
      $scope.resetAllAndAnimateOnlyAt(1);
    }

    updateButtonsAndProgressBars(response.data.bars.sort(), response.data.buttons.sort(), response.data.limit);


  }

  function errorCallback(error) {
    console.log(error);
  }
}


export default {
  name: 'ExampleCtrl',
  fn: ExampleCtrl
};
