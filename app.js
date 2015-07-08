/**
 * Created by austinadams on 7/7/15.
 */
var app = angular.module('gramSearch', ['ngAnimate', 'ngMessages']);
//Configure the http service
app.constant("apiAuth", {
  client_id: "86fda93a551a40069770e1f885cd6c48"
});
//SearchCtrl
app.controller('SearchCtrl', ['$scope', '$http', 'apiAuth', function ($scope, $http, apiAuth) {
  var searchTemplate = {
    searchStr: "",
    resultCount: 0,
    message: "Search by tag, only enter on word tags",
    results: []
  };
  $scope.currentSearch = Object.create(searchTemplate);
  //JsonP request to Instagram
  $scope.getResults = function () {
    if($scope.searchForm.$invalid) return;
    var searchStr = $scope.currentSearch.searchStr;
    $scope.currentSearch.message = "Searching '" + searchStr + "' photos."
    var url = "https://api.instagram.com/v1/tags/" + searchStr + "/media/recent";
    var params = {callback: "JSON_CALLBACK", "client_id": apiAuth.client_id};

    //Actual XHR
    var xhr = $http({
      method: 'JSONP',
      url: url,
      params: params
    });
    //Successful Response.
    xhr.success(function (result) {
      var imageObjs = result.data,
        len = imageObjs.length;
      $scope.currentSearch.resultCount = len;
      $scope.currentSearch.results = imageObjs;
      $scope.currentSearch.message = "Showing " + $scope.currentSearch.resultCount + " photos."
    });
    //Error in response
    xhr.error(function () {
      $scope.currentSearch.message = "There has been an error with your search.";
    });
  };
}]);