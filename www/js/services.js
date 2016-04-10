// var adminurl = "http://localhost:1337/";
// var adminurl = "http://192.168.0.122:82/";
// var adminurl = "http://192.168.0.126/";
var adminurl = "http://104.197.184.204:81/";
var imgpath = adminurl + "image/resize?file=";

angular.module('starter.services', [])

.factory('MyServices', function($http) {

    return {
        makeactive: function(menuname) {
            for (var i = 0; i < navigation.length; i++) {
                if (navigation[i].name == menuname) {
                    navigation[i].classis = "active";
                } else {
                    navigation[i].classis = "";
                }
            }
            return menuname;
        },
        saveUser: function(data, callback) {
            $http({
                url: adminurl + 'image/save',
                method: 'POST',
                data: data
            }).success(callback);
        },
        deleteUser: function(id, callback) {
            $http({
                url: adminurl + 'image/delete',
                method: 'POST',
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        findUsers: function(callback) {
            $http({
                url: adminurl + 'image/find',
                method: 'POST'
            }).success(callback);
        },
        register: function(data, callback) {
            $http({
                url: adminurl + 'user/save',
                method: 'POST',
                data: data
            }).success(callback);
        },
        login: function(data, callback) {
            $http({
                url: adminurl + 'user/login',
                method: 'POST',
                data: data
            }).success(callback);
        },
        compare: function(image, callback) {
            $http.get(adminurl + 'image/compare?file=' + image).success(callback);
        },
        getOneUser: function(userid, callback) {
            $http({
                url: adminurl + 'image/findOne',
                method: 'POST',
                data: {
                    "_id": userid
                }
            }).success(callback);
        },
        setNotify: function(data) {
            $.jStorage.set("notify", data);
        },
        getNotify: function() {
            return $.jStorage.get("notify");
        },
        setUser: function(data) {
            $.jStorage.set("user", data);
        },
        getUser: function() {
            return $.jStorage.get("user");
        }
    };
});
