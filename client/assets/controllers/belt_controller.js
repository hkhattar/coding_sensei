app.controller('belt_controller', ['$scope','$cookies','$location','$routeParams','belt_factory',

    function($scope,$cookies,$location,$routeParams,belt_factory)
    {
      var questions = [];
      var answers = [];
      var answer = {};
      var users = [];
      $scope.error = {};
      
      $scope.users={};

      function setQuestions(data)
      {
        $scope.questions = data;
      }

      function setUsers(data){
        $scope.users = data;
        console.log('$scope.users*****',$scope.users)

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

    

      belt_factory.get_user(function(data)
      {
        $scope.current_user = data;
      })
      
      $scope.getUser = function()
      {
        user = belt_factory.getUser();
        console.log("0000000000")
        console.log(user)
        return user;
      }

      $scope.cancel=function()
      {
        $location.url('/');
      }

        $scope.register_user = function()
      {
        if($scope.user.first_name.length > 4)
        {
          console.log('inside register user client controller');
          $scope.error = {};
          console.log('$scope.user',$scope.user)
          belt_factory.register_user($scope.user,setUsers);
          console.log('$scope.user',$scope.user)

          $scope.user = {};
          $location.url('/');
        }
        else{
          $scope.error = {message: 'Your name must be at least 4 characters long!'};
        }
     
      }

      $scope.create_question = function()
      {
        if($scope.newQuestion.question.length > 10)
        {
          console.log('inside create question clinet controller');
          $scope.error = {};
          console.log('$scope.newQuestion',$scope.newQuestion)
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
          // var user = belt_factory.getUser();
          // $scope.newAnswer.name=user;
          // var user = $scope.newAnswer.name;
          var user=belt_factory.getUser();
          console.log("pppppppppppppppppppppppppppppp")
          console.log("user")
          console.log(user)
          console.log($scope.newAnswer)
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

      $scope.index_user = function(){
        belt_factory.index_user(function(data){
          $scope.users = data;
          $scope.user = {};
        })
      }

      $scope.index_user();

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

