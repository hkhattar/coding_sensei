app.controller('belt_controller', ['$scope','$cookies','$location','$routeParams','belt_factory',

    function($scope,$cookies,$location,$routeParams,belt_factory)
    {
      var questions = [];
      var answers = [];
      var answer = {};
      $scope.error = {};

      function setQuestions(data)
      {
        $scope.questions = data;
      }

      function setAnswers(data)
      {
        $scope.answers = data;
        $scope.answer = {};
      }
      $scope.answer = {};

      function setAnswer(data)
      {
        $scope.answer = data;
      }
      
      console.log('belt_controller loaded');

      $scope.create_new_user = function()
      {
        if($scope.new_user.length > 5)
        {
          $scope.error = {};
          belt_factory.set_user($scope.new_user, function(data){
          $scope.current_user = data;
          $location.url('/');
        })
        }else{
          $scope.error = {message: 'Your name must be at least 6 characters long!'};
        }

      }

      // $scope.create_question = function()
      // {
      //  if($scope.newQuestion.question.length > 10)
      //   {
      //     $scope.error = {};
      //     belt_factory.set_question($scope.newQusetion.question, function(data){
      //     $scope.current_question = data;
      //     $location.url('/');
      //   })
      //   }else{
      //     $scope.error = {message: 'Your name must be at least 6 characters long!'};
      //   }
      // }

      belt_factory.get_user(function(data)
      {
        $scope.current_user = data;
      })
      
      $scope.getUser = function()
      {
        user = belt_factory.getUser();
        return user;
      }

      $scope.cancel=function()
      {
        $location.url('/');
      }

      $scope.create_question = function()
      {
        if($scope.newQuestion.question.length > 10)
        {
          $scope.error = {};
          belt_factory.create_question($scope.newQuestion,setQuestions);
          $scope.newQuestion = {};
          $location.url('/');
        }
        else{
          $scope.error = {message: 'Your question must be at least 10 characters long!'};
        }
     
      }

      $scope.create_answer_by_id = function()
      {
        if($scope.newAnswer.answer.length > 5)
        {
          $scope.error = {};
          var user = belt_factory.getUser();
          belt_factory.create_answer_by_id($routeParams.id,$scope.newAnswer,user,function(data)
          {
            $scope.answer = data;
            setAnswer(data);
          })
          $location.url('/')
        }
        else{
          $scope.error = {message: 'Your answer must be at least 5 characters long!'};
        }
      }

      $scope.show_user = function()
      {
      	belt_factory.show($scope.user, function(data)
        {
      	 $scope.user = data;
      	})
      }

      $scope.index_question = function(){
        belt_factory.index_question(function(data){
          $scope.questions = data;
          $scope.question = {};
        })
      }

      $scope.index_question();

      $scope.get_question_by_id = function()
      {
        console.log('controller--get_question_by_id');
        belt_factory.get_question_by_id($routeParams.id,function(data)
        {
          $scope.question = data;
        })
      }

      $scope.plusLike = function(answerId,likes)
      {
        var increment = parseInt(likes) + 1;
        belt_factory.updateAnswer(answerId,increment,function(data)
        {
          console.log('payload',data);
          var url = '/';
          console.log('redirect to /');
          $scope.get_question_by_id();
        });
      }
      $scope.get_question_by_id();

    }

]);

