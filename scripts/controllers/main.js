  airlinesApp.service('flightService', function(){
    this.seats = "20";
    this.sources = "Banglore";
    this.destination = "Delhi";
  }); 

   airlinesApp.factory('JsonService', function($resource){
    return $resource('data/flights.json', { }, {
      getData: { method: 'GET', isArray: true }
    });
  });

  airlinesApp.filter('unique', function() {
    return function(collection, keyname) {
      var output = [],
      keys = [];

      angular.forEach(collection, function(item) {
        var key = item[keyname];
        if(keys.indexOf(key) === -1) {
          keys.push(key);
          output.push(item);
          // console.log(output);
        }
      });

      return output;
    };
  });

  airlinesApp.controller('MainCtrl', function($scope, JsonService, $location, flightService) {
    
    $scope.date = new Date();

    // var contentss = function() {
    // JsonService.query(function(data){ 
    //   $scope.contents = data;
    // console.log($scope.contents.length);
    // });
    // }

    // var b = contentss();
    // console.log(contents);
    // console.log(b);
    var vm = this;
    $scope.contents = JsonService.getData(function(data){ 
      vm.length = data.length;
    });
      // console.log(vm.length);
    // console.log($scope.contents.length);
    // console.log($scope.contents);

    
    // $scope.seats = flightService.seats;   
    // $scope.sources = flightService.sources;
    // $scope.destination = flightService.destination; 
    

    $scope.$watch('[seats,sources,destination,price]', function(){
      flightService.sources = $scope.sources;
      flightService.destination=$scope.destination;
      flightService.seats = $scope.seats;
    });

  
    // var len = contents.length;
    // console.log(len);
    $scope.submit = function(user){

      // $scope.master = user;
      var flightdetails = {

        seats: user.seats,
        sources: user.sources,
        destination: user.destination  
      }

      //console.log($scope.contents);
      $scope.detailsArr = [];

      angular.forEach($scope.contents, function(value, key){
        //console.log(value);
        if(flightdetails.sources === value.From && flightdetails.destination === value.To){
          // console.log(value.Price);
          var details = {};
          details.airlineName = value.Airline;
          details.arrival = value.Arrival;
          details.departure = value.Departure;
          details.price = value.Price;
          details.seats = value.Seats_available;
          details.duration = value.Duration;
          $scope.detailsArr.push(details);
        }
        // $location.path('/show');
      });

      console.log($scope.detailsArr);
      $scope.sortType     = 'name'; // set the default sort type
      $scope.sortReverse  = false;  // set the default sort order
    }


    $scope.inlineOptions = {
    // customClass: getDayClass,
    minDate: new Date('dd-MMMM-yyyy')
    // showWeeks: true
    };

    $scope.dateOptions = {
      // dateDisabled: disabled,
      formatYear: 'yy',
      maxDate: new Date(2020, 5, 22),
      minDate: new Date('dd-MMMM-yyyy')
      // startingDay: 1
    };

    $scope.toggleMin = function() {
      $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
      $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();

    $scope.open1 = function() {
      $scope.popup1.opened = true;
    };

    $scope.formats = ['dd-MMMM-yyyy'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['d!/M!/yyyy'];

    $scope.popup1 = {
      opened: false
    };
  });

// angular.module('airlinesApp')
  airlinesApp.controller('ShowCtrl', function($scope, JsonService, flightService){
    
    $scope.sources = flightService.sources;
    $scope.destination = flightService.destination;
    $scope.seats = flightService.seats;
    // $scope.price = flightService.price;
    // console.log($scope.seats);

    $scope.contents = JsonService.query(function(data){  
      // console.log(data);
    });  
  });
