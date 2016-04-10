// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
            StatusBar.backgroundColorByHexString("#099FCA");
        }
    });
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider) {
    $httpProvider.defaults.withCredentials = true;
    $ionicConfigProvider.views.maxCache(0);
    $stateProvider

        .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('register', {
        url: '/register',
        templateUrl: 'templates/register.html',
        controller: 'LoginCtrl'
    })

    .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
    })

    .state('app.search', {
        url: '/search',
        views: {
            'menuContent': {
                templateUrl: 'templates/search.html',
                controller: 'SearchCtrl'
            }
        }
    })

    .state('app.allusers', {
        url: '/allusers',
        views: {
            'menuContent': {
                templateUrl: 'templates/allusers.html',
                controller: 'AllUsersCtrl'
            }
        }
    })

    .state('app.addnew', {
        url: '/addnew',
        views: {
            'menuContent': {
                templateUrl: 'templates/addnew.html',
                controller: 'AddNewCtrl'
            }
        }
    })

    .state('app.addnewedit', {
        url: '/addnew/:id',
        views: {
            'menuContent': {
                templateUrl: 'templates/addnew.html',
                controller: 'AddNewCtrl'
            }
        }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/search');
})

.filter('uploadpathprofile', function() {
    return function(input) {
        if (input)
            return imgpath + input + "&path=profileImage";
    };
})

.filter('uploadpathcompare', function() {
    return function(input) {
        if (input)
            return imgpath + input + "&path=earCompare";
    };
})

.filter('uploadpathear', function() {
    return function(input) {
        if (input)
            return imgpath + input + "&path=earImage";
    };
});
