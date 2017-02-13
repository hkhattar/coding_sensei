app.controller('belt_controller', ['$scope','$cookies','$location','$routeParams','belt_factory',

    function($scope,$cookies,$location,$routeParams,belt_factory)
    {
      console.log('belt_controller loaded');
      console.log('dash_controller loaded');
      $scope.dash_user = {};
      belt_factory.checkSesh(data => {
        if (!data)
        {
          $location.url('/register');
        }  
        else 
        {
          $scope.dash_user = data;
        }
        

                        })
      var answers = [];
      var answer = {};
      var users = [];
      $scope.error = {};
      $scope.users={};
      // var logged_in_user;
      $scope.register_user = function()
      {
        if($scope.user.first_name.length > 1)
        {
          console.log('inside register user client controller');
          $scope.error = {};
          console.log('$scope.user in belt controller before factory',$scope.user)
          belt_factory.register_user($scope.user,setUsers);
          console.log('$scope.user in belt controller after factory',$scope.user)
          $scope.user = {};
          $location.url('/');
        }
        else{
          $scope.error = {message: 'Your name must be at least 2 characters long!'};
        }
     
      }
   
       $scope.log_get_user = function()
      {
        user = belt_factory.log_get_user();
        console.log("0000000000")
        console.log(user)
        return user;
      }

      function setQuestions(data)
      {
        $scope.questionss = data;
      }
      var logged_in_user ;

      function setUsers(data)
      {

        console.log('inside belt controller setUsers')
        console.log('data',data)
        logged_in_user = data;
        console.log('logged_in_user inside setUsers',logged_in_user)
      }

      function getUsers()
      {
        console.log('inside getusers');
        logged_in_user =  belt_factory.getUsers();
        return logged_in_user;


      }
    
      console.log('logged_in_user outside setUsers',logged_in_user)
      // $scope.logged_in_user = 'logged_in_user';

      $scope.logged_in_user=logged_in_user;
      // $scope.setUsers();
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
    
      $scope.create_new_user = function()
      {
        if($scope.new_user.length > 1)
        {
          $scope.error = {};
          belt_factory.set_user($scope.new_user, function(data){
          $scope.current_user = data;
          $location.url('/');
        })
        }else{
          $scope.error = {message: 'Your name must be at least 2 characters long!'};
        }

      }

      $scope.login = () => { //when the user hits the login button...
      $scope.logErrors = []; //clear out all previous login errors
      console.log('$scope.loginUser',$scope.loginUser)
      belt_factory.login($scope.loginUser, data => { //run the userFactory.login method and pass the entered user information and a callback function
        if (data.errors) { //if the returned data has an errors key...
          for (let key in data.errors) { //for every key in the data.errors...
            $scope.logErrors.push(data.errors[key].message); //push these errors to the logErrors array
          }
          $scope.loginUser = {}; //clear the login input fields
          // second.focus(); //put the user's cursor back on the first input in login
        } else if (data.errorsFront) { //if the returned data has the errorsFront key (custom)...
          $scope.logErrors = data.errorsFront; //set logErrors to equal the returned errors...
          // second.focus(); //put the user's cursor back on the first input in login
        } else { //if no errors are returned...
          $location.url('/'); //send the user to the dashboard with their respective user id
        } //if/else
      }); //userFactory.login
    }; //$scope.login

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
        console.log('INSIDE create_answer_by_id')
        if($scope.newAnswer.answer.length > 5)
        {
          console.log("inside create_answer_by_id if statement")
          $scope.error = {};
          // var user = belt_factory.getUser();
          // $scope.newAnswer.name=user;
          // var user = $scope.newAnswer.name;
          var user=belt_factory.getUser();
          belt_factory.create_answer_by_id($routeParams.id,$scope.newAnswer,user,function(data)
          {
            console.log("routeParams.id", $routeParams.id)
            $scope.answer = data;
            console.log("Data:")
            setAnswer(data);
            console.log(data)
            $scope.questions.push(data)
            console.log($scope.questions[15])
            // loop through questions
            var question;
            for (var x=0; x<$scope.questions.length;x++)
            {
              if($scope.questions[x]._id == data._question)
              {
                question = $scope.questions[x];
              }
            }
            console.log('question',question)
            // find question that matches data._question
            console.log(question._answers)
            // push answer (data) to that question
            question._answers.push(data);
            location.reload()
         
          })
        }
        else
        {
          $scope.error = {message: 'Your answer must be at least 5 characters long!'};
        }
      }

      $scope.show_user = function()
      {
      	belt_factory.show_user($scope.user, function(data)
        {
      	 $scope.user = data;
      	})
      }

      $scope.index_question = function(){
        belt_factory.index_question(function(data){
          $scope.questions = data;
          $scope.question = {};
          console.log("index question:")
          console.log($scope.questions)

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
        // console.log('controller--get_question_by_id');
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
          // console.log('payload',data);
          var url = '/';
          // console.log('redirect to /');
          $scope.get_question_by_id();
        });
      }


      // $scope.dash_user = {};
      // $scope.checkSesh = function()
      // {
      //      belt_factory.checkSesh(data => {

      //   if (!data)
      //   {
      //     $location.url('/index');
      //   }  
      //   else 
      //   {
      //     $scope.dash_user = data;
      //     console.log('$scope.dash_user',$scope.dash_user)
      //   }
        

      //                   })

      // }
   
      $scope.get_question_by_id();

    }

]);

