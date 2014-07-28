
var homeCenterApp = angular.module('homeCenterApp', []);


homeCenterApp.controller('TabsCtrl', function ($scope) {
    $scope.tabs = [{
        title: 'Overview',
        url: 'template/overview.html'
    }, {
        title: 'Chromecast',
        url: 'template/chromecast.html'
    }, {
        title: 'Three',
        url: 'three.tpl.html'
    }];

    $scope.currentTab = 'template/overview.html';

    $scope.onClickTab = function (tab) {
        $scope.currentTab = tab.url;
    }

    $scope.isActiveTab = function(tabUrl) {
        return tabUrl == $scope.currentTab;
    }
})

homeCenterApp.controller('ChromecastCtrl', function ($scope, $http) {

    $scope.chromecast = {
        "status": "unknown"
    }
    
    var updateStatus = function(){
        $http.get('/api/chromecast/status.json').success(function(data) {
            $scope.chromecast.statusText   = data.status.applications[0].statusText;
            $scope.chromecast.status   = data.status;
            $scope.chromecast.service  = data.service;
        })
    };
    var statusInterval = setInterval(updateStatus, 5000);
    updateStatus();
    
    
    $scope.$on('$destroy', function() {
        clearInterval(statusInterval);
    });
})

homeCenterApp.controller('OverviewCtrl', function ($scope, $http) {
    
});


