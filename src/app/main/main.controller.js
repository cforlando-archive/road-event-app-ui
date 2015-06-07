'use strict';

angular.module('angulr')
    .controller('MainCtrl', function($scope, $http) {

      // $scope.start = null;

      $scope.event = {
        title: null,
        description: null,
        life: {
        start: null,
        end: null
        },
        url: null,
        contact: null,
        roadEvents: []
      }

      $scope.road = {};




        $scope.today = function() {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function() {
            $scope.dt = null;
        };

        // Disable weekend selection
        $scope.disabled = function(date, mode) {
            return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
        };

        $scope.toggleMin = function() {
            $scope.minDate = $scope.minDate ? null : new Date();
        };
        $scope.toggleMin();

        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.open2 = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened2 = true;
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 2);
        $scope.events = [{
            date: tomorrow,
            status: 'full'
        }, {
            date: afterTomorrow,
            status: 'partially'
        }];

        $scope.getDayClass = function(date, mode) {
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }

            return '';
        };

        $scope.addRoad = function(road){ 
          $scope.event.roadEvents.push(angular.copy(road));
          $scope.road = {};
        }

        $scope.removeRoad = function(index){ 
          $scope.event.roadEvents.splice(index, 1);
          console.log($scope.event);
        }

        $scope.submitEvent = function(event){
          console.log(event);

          var str = "string="+JSON.stringify($scope.event);
					// Test test test
					//var str = "string={\"title\":\"A\",\"description\":\"B\",\"life\":{\"start\":\"2015-06-03T04:00:00.000Z\",\"end\":\"2015-06-09T04:00:00.000Z\"},\"url\":\"G\",\"contact\":\"F\",\"roadEvents\":[{\"type\":\"C\",\"description\":\"D\",\"schedule\":\"FART \"}]}";
					console.log(str);

						$http({
							method: 'POST',
							url: 'http://localhost:3001/scottsapp',
							data: str,
							headers: { 'Content-Type':'application/x-www-form-urlencoded' }
						})
						.success(function(data, status, headers, config) {
            // this callback will be called asynchronously
            // when the response is available
          	})
						.error(function(data, status, headers, config) {
           	 console.log('not working');
          	});
        }

    });
