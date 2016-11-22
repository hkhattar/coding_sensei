var app = angular.module('app', ['ngRoute','ngCookies']);



app.config(function ($routeProvider) {
// Routes to load your new and edit pages with new and edit controllers attached to them!

$routeProvider
        .when('/index',{
          templateUrl: 'partials/login.html',
          controller:'belt_controller',

        })
        .when('/',{
          templateUrl: 'partials/success.html',
           controller: 'belt_controller'
        })
        .when('/new_question',{
          templateUrl: 'partials/new_question.html',
          controller: 'belt_controller'

        })
        .when('/question/:id',{
        	templateUrl: 'partials/show.html',
      		controller: 'belt_controller'
        })

        .when('/question/:id/new_answer',{
        	templateUrl: 'partials/new_answer.html',
      		controller: 'belt_controller'
        })
      

});