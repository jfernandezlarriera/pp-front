import angular from 'angular'

import '../style/app.css'

let app = () => {
  return {
    template: require('./app.html'),
    controller: 'AppCtrl',
    controllerAs: 'app'
  }
}

class AppCtrl {
  constructor($scope, $http) {

    $scope.users = []    
    $scope.searchForm = {}

    $scope.search = function () {
      $scope.users = []
      $http.post('http://localhost:3000/api/users/list', $scope.searchForm).then(function(response) {      
        response.data.forEach(user => {
          $scope.users.push(user)
        })
      }) 
    }   
    $scope.search()

    $scope.add = function () { 
      $http.post('http://localhost:3000/api/users/add', $scope.addForm)
      .then(function(response) {     
        $scope.searchForm = {}
        $scope.search()
      })       
      .catch(function (response) {
        alert(response.data.error.message)
      })
    } 

    $scope.delete = function(index) {
      
      $http.get('http://localhost:3000/api/users/delete/'+$scope.users[index]._id)
      .then(function(response) {     
        $scope.users.splice(index, 1)
      })       
      .catch(function (response) {
        alert(response.data.error.message)
      })
    }
  }
}

angular.module('app', [])
  .directive('app', app)
  .controller('AppCtrl', AppCtrl)

export default 'app'