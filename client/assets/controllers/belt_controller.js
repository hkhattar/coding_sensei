app.controller('belt_controller', ['$scope','$cookies','$location','$routeParams','belt_factory',

    function($scope,$cookies,$location,$routeParams,belt_factory)
    {
      var questions = [];
      var answers = [];
      var answer = {};
      $scope.error = {};

      function setQuestions(data){
        $scope.questions = data;
        // $scope.question = {};
      }

      function setAnswers(data){
        $scope.answers = data;
        $scope.answer = {};
      }
      $scope.answer = {};
      function setAnswer(data){
        $scope.answer = data;

      }
      
      console.log('belt_controller loaded');


      $scope.create_new_user = function()
      {

        if($scope.new_user.length > 5){
          $scope.error = {};
          belt_factory.set_user($scope.new_user, function(data){
          $scope.current_user = data;
          $location.url('/');
        })
        }else{
          $scope.error = {message: 'Your name must be at least 6 characters long!'};
        }

      }

      belt_factory.get_user(function(data){
        $scope.current_user = data;
   
       })
      
       // $scope.create_user = function()

       //  {
           
       //    belt_factory.create_user($scope.newUser)
       //    $location.url('/');
       //  }

       $scope.getUser = function(){
        user = belt_factory.getUser();
        return user;
       }

       // belt_factory.get_user(function(data){
       //  $scope.user = data;
       // })

        $scope.cancel=function(){
          $location.url('/');
        }

       $scope.create_question = function()
       {
          console.log('create_question function of belt_controller')
          console.log('$scope.newQuestion',$scope.newQuestion)
          // var new_friend = $scope.newFriend;
          belt_factory.create_question($scope.newQuestion,setQuestions);
          $scope.newQuestion = {};
          // /$scope.friends.push($scope.newFriend);
          console.log("$scope.questions",$scope.questions)
          // console.log("$scope.friends[0].name",$scope.friends[0].name)
          console.log('create_question function after user creates a question')
          $location.url('/');
      }

      $scope.create_answer_by_id = function()
      {
        console.log('create_answer function of belt controller');
        var user = belt_factory.getUser();
        console.log('user',user);
        console.log('$routeParams.id',$routeParams.id);
        console.log('$scope.newAnswer',$scope.newAnswer);
        belt_factory.create_answer_by_id($routeParams.id,$scope.newAnswer,user,function(data){
          console.log('data',data);
          $scope.answer = data;
          console.log('$scope.answer',$scope.answer)
          setAnswer(data);
          // return data;
          })
        $location.url('/')
        console.log("add location.url over here..............")


      }


      $scope.show_user = function()
      {
      	console.log('show function of belt_controller');
      	belt_factory.show($scope.user, function(data)
        {
      	 $scope.user = data;
      	 console.log('$scope.user')
      	})
      }

      $scope.index_question = function(){
        belt_factory.index_question(function(data){
          console.log('DATA',data)
          $scope.questions = data;
          $scope.question = {};
        })
      }

      $scope.index_question();

      $scope.get_question_by_id = function(){
        console.log('controller--get_question_by_id');
        belt_factory.get_question_by_id($routeParams.id,function(data){
          console.log('routeParams.id',$routeParams.id);
          console.log('set data',data, 'to $routeParams.id',$routeParams.id);
          $scope.question = data;
        })
      }

      $scope.plusLike = function(answerId,likes){
        var increment = parseInt(likes) + 1;

        belt_factory.updateAnswer(answerId,increment,function(data){
          console.log('payload',data);
          var url = '/';
          console.log('redirect to /');
          $scope.get_question_by_id();
        });
      }

      $scope.get_question_by_id();

    }




]);