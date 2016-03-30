var allfunction = {};
angular.module('starter.controllers', ['ngCordova'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state, $ionicPopup, $timeout, $ionicLoading) {

    allfunction.msg = function(msg, title) {
        var myPopup = $ionicPopup.show({
            template: '<p class="text-center">' + msg + '!</p>',
            title: title,
            scope: $scope,
        });
        $timeout(function() {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 3000);
    };

    allfunction.loading = function() {
        $ionicLoading.show({
            template: '<ion-spinner class="spinner-positive"></ion-spinner>'
        });
        $timeout(function() {
            $ionicLoading.hide();
        }, 20000);
    };

    allfunction.loadingwohide = function() {
        $ionicLoading.show({
            template: '<ion-spinner class="spinner-positive"></ion-spinner>'
        });
    };

})

.controller('SearchCtrl', function($scope, $stateParams, $state, $cordovaCamera, $cordovaFileTransfer, $ionicLoading, MyServices, $timeout, $ionicPopup, $ionicPlatform) {

    $ionicPlatform.registerBackButtonAction(function(event) {
        navigator.app.exitApp();
    }, 100);

    if (!$.jStorage.get("user")) {
        $state.go("login");
    }

    $scope.search = {};
    $scope.earImage = "img/earid.png";

    function getResults(image) {
        console.log("in get Results");
        allfunction.loadingwohide();
        MyServices.compare(image, function(data) {
            if (data.value != false) {
                allfunction.loadingwohide();
                $scope.noUsers = false;
                if (data.percentage && parseFloat(data.percentage) <= 20) {
                    allfunction.loadingwohide();
                    $scope.noUsers = false;
                    $timeout(function() {
                        $scope.search.image = image;
                        MyServices.getOneUser(data.userid, function(userData) {
                            $ionicLoading.hide();
                            if (userData.value != false) {
                                $scope.userData = userData;
                                console.log(userData);
                            }
                        })
                    }, 20000);
                } else {
                    $timeout(function() {
                        $scope.search.image = image;
                        $ionicLoading.hide();
                        $scope.noUsers = true;
                    }, 20000);
                }
            } else {
                $scope.search.image = image;
                $timeout(function() {
                    $scope.search.image = image;
                    $ionicLoading.hide();
                    $scope.noUsers = true;
                }, 20000);
            }
        })
    }
    // getResults('361d0ad8-c68f-478a-b8b5-dcf9b733cd6a.jpg');
    $scope.captureImage = function() {
        $scope.search = {};
        $scope.userData = {};
        var options = {
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA
        };

        $cordovaCamera.getPicture(options).then(function(imageURI) {
            // Success! Image data is here
            console.log(imageURI);
            $scope.imagetobeup = imageURI;
            $scope.uploadPhoto(adminurl + "image/upload", 'earCompare', imageURI, function(data) {
                console.log(data);
                console.log(JSON.parse(data.response));
                var json = JSON.parse(data.response);
                if (json.value != false) {
                    $timeout(function() {
                        getResults(json.files[0].fd);
                    }, 2000);
                }
            });
        }, function(err) {
            // An error occured. Show a message to the user
        });
    }

    $scope.uploadPhoto = function(serverpath, uploadIn, imagetobeup, callback) {
        console.log("function called");
        allfunction.loadingwohide();
        var params = {};
        params.path = uploadIn;

        var options = {};
        options.params = params;
        $cordovaFileTransfer.upload(serverpath, imagetobeup, options)
            .then(function(result) {
                console.log(result);
                callback(result);
                $ionicLoading.hide();
                //$scope.addretailer.store_image = $scope.filename2;
            }, function(err) {
                // Error
                console.log(err);
            }, function(progress) {
                // constant progress updates
            });
    };

})

.controller('LoginCtrl', function($scope, $stateParams, $state, $ionicPopup, $timeout, $ionicLoading, MyServices, $ionicPlatform) {

    $ionicPlatform.registerBackButtonAction(function(event) {
        console.log("back pressed = " + $state.current.name);
        navigator.app.exitApp();
    }, 100);

    $scope.register = {};
    $scope.login = {};
    $.jStorage.flush();
    $scope.doLogin = function() {
        console.log($scope.login);
        MyServices.login($scope.login, function(data) {
            $ionicLoading.hide();
            if (data.value != false) {
                $.jStorage.set("user", data);
                $state.go("app.search");
            } else {
                var myPopup = $ionicPopup.show({
                    template: '<p class="text-center">Invalid login credentials</p>',
                    title: 'Error'
                });
                $timeout(function() {
                    myPopup.close(); //close the popup after 3 seconds for some reason
                }, 3000);
            }
        });
    };

    $scope.doRegister = function() {
        console.log($scope.register);
        if ($scope.register.password === $scope.register.cpassword) {
            $ionicLoading.show({
                template: '<ion-spinner class="spinner-positive"></ion-spinner>'
            });
            delete $scope.register.cpassword;
            MyServices.register($scope.register, function(data) {
                $ionicLoading.hide();
                if (data.value != false) {
                    var myPopup = $ionicPopup.show({
                        template: '<p class="text-center">Registration Successfull</p>',
                        title: 'Success'
                    });
                    $timeout(function() {
                        myPopup.close(); //close the popup after 3 seconds for some reason
                        $.jStorage.set("user", data.comment);
                        $state.go("app.search");
                    }, 3000);
                } else {
                    var myPopup = $ionicPopup.show({
                        template: '<p class="text-center">Email id already registered</p>',
                        title: 'Error'
                    });
                    $timeout(function() {
                        myPopup.close(); //close the popup after 3 seconds for some reason
                    }, 3000);
                }
            })
        } else {
            var myPopup = $ionicPopup.show({
                template: '<p class="text-center">Password Mismatch</p>',
                title: 'Error'
            });
            $timeout(function() {
                myPopup.close(); //close the popup after 3 seconds for some reason
            }, 3000);
        }
        // $state.go("app.search");
    };

})

.controller('AddNewCtrl', function($scope, $stateParams, $state, $cordovaCamera, $cordovaFileTransfer, $ionicLoading, MyServices) {

    $scope.addUser = {};
    // $scope.addUser.earimage = "f4f184ad-7b05-4298-baa2-74e4febeb7df.jpg";
    // $scope.addUser.profilepic = "7ad375e9-a280-47fb-ad93-5bb944159e37.jpg";

    $scope.saveUser = function() {
        console.log($scope.addUser);
        allfunction.loading();
        MyServices.saveUser($scope.addUser, function(data) {
            $ionicLoading.hide();
            if (data.value != false) {
                allfunction.msg("User Added Successfully", "Add User");
                $scope.addUser = {};
            }
        });
    }

    $scope.uploadPic = function(whichone) {
        var options = {};
        var uploadIn = "";
        if (whichone == 1) {
            uploadIn = "profileImage";
            options.destinationType = Camera.DestinationType.FILE_URI;
            options.sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
        } else if (whichone == 2) {
            uploadIn = "earImage";
            options.destinationType = Camera.DestinationType.FILE_URI;
            options.sourceType = Camera.PictureSourceType.CAMERA;
        }
        $cordovaCamera.getPicture(options).then(function(imageURI) {
            // Success! Image data is here
            console.log(imageURI);
            $scope.imagetobeup = imageURI;
            $scope.uploadPhoto(adminurl + "image/upload", uploadIn, imageURI, function(data) {
                console.log(data);
                console.log(JSON.parse(data.response));
                var json = JSON.parse(data.response);
                if (json.value != false) {
                    if (whichone == 1) {
                        $scope.addUser.profilepic = json.files[0].fd;
                    } else if (whichone == 2) {
                        $scope.addUser.earimage = json.files[0].fd;
                    }
                }
            });
        }, function(err) {
            // An error occured. Show a message to the user
        });
    }

    $scope.uploadPhoto = function(serverpath, uploadIn, imagetobeup, callback) {
        console.log("function called");
        allfunction.loadingwohide();
        var params = {};
        params.path = uploadIn;

        var options = {};
        options.params = params;
        $cordovaFileTransfer.upload(serverpath, imagetobeup, options)
            .then(function(result) {
                console.log(result);
                callback(result);
                $ionicLoading.hide();
                //$scope.addretailer.store_image = $scope.filename2;
            }, function(err) {
                // Error
                console.log(err);
            }, function(progress) {
                // constant progress updates
            });
    };

})

.controller('AllUsersCtrl', function($scope, $stateParams, $state, MyServices, $ionicLoading) {

    allfunction.loading();
    MyServices.findUsers(function(data) {
        $ionicLoading.hide();
        if (data.value != false) {
            $scope.allUsers = data;
        } else {
            $scope.allUsers = [];
        }
    });

    // $scope.allUsers = [{
    //     name: "John Adams",
    //     age: "23 yrs",
    //     bloodgrp: "O+",
    //     contact: "+91 9877899877",
    //     image: "img/user.jpg",
    //     earimg: "img/ear3.jpg"
    // }, {
    //     name: "Alyssa Faith",
    //     age: "20 yrs",
    //     bloodgrp: "B+",
    //     contact: "+91 9877899877",
    //     image: "img/user2.jpg",
    //     earimg: "img/ear1.jpg"
    // }, {
    //     name: "Peter Wilson",
    //     age: "26 yrs",
    //     bloodgrp: "AB+",
    //     contact: "+91 9877899877",
    //     image: "img/user3.jpg",
    //     earimg: "img/ear2.jpeg"
    // }];

});
