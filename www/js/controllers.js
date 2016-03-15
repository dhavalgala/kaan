angular.module('starter.controllers', ['ngCordova'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});
})

.controller('SearchCtrl', function($scope, $cordovaCamera) {

    $scope.captureImage = function() {
        var options = {
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {
            console.log(imageData);
        }, function(err) {
            // error
        });
    }

})

.controller('LoginCtrl', function($scope, $stateParams, $state) {
    $scope.doLogin = function() {
        $state.go("app.search");
    };
})

.controller('AddNewCtrl', function($scope, $stateParams, $state) {

})

.controller('AllUsersCtrl', function($scope, $stateParams, $state) {

    $scope.allUsers = [{
        name: "John Adams",
        age: "23 yrs",
        bloodgrp: "O+",
        contact: "+91 9877899877",
        image: "img/user.jpg",
        earimg: "img/ear3.jpg"
    }, {
        name: "Alyssa Faith",
        age: "20 yrs",
        bloodgrp: "B+",
        contact: "+91 9877899877",
        image: "img/user2.jpg",
        earimg: "img/ear1.jpg"
    }, {
        name: "Peter Wilson",
        age: "26 yrs",
        bloodgrp: "AB+",
        contact: "+91 9877899877",
        image: "img/user3.jpg",
        earimg: "img/ear2.jpeg"
    }];

});
