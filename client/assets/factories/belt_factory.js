app.factory('belt_factory',function($http){
        console.log('start belt_factory');

        var factory = {};
        var users = [];
        // var user = {};
          var user;
          var current_user;
          var logged_in_user;

      // factory.create_user = function(newUser)
      // {
      //   user = newUser;
        
      // }

      factory.create_user = function(user, callback){
        // console.log('inside create_user factory');
        // console.log('user',user);

        user = user;
        callback(user);
      }


      

      factory.get_user = function(callback){
    callback(current_user);
  }

  factory.set_user = function(user, callback){
    current_user = user;
    callback(current_user);
  }

  factory.getUser = function(){
        return current_user;
      }

  // factory.set_question = function(question,callback){
  //   current_question = question;
  //   callback(current_question);
  // }

  factory.create_question = function(newQuestion,callback)
  {
    $http.post('/questions', newQuestion).then(function(returned_data)
    {
      // console.log('newQuestion',newQuestion)
      if (typeof(callback) == 'function')
      {
        callback(returned_data.data);
      }
    });
  }

    factory.register_user = function(user,callback)
  {
    console.log('inside register user client factory')
    $http.post('/users', user).then(function(returned_data)
    {
      // console.log('user',user)
      console.log('returned_data in belt factory', user)
      logged_in_user = user;
      if (typeof(callback) == 'function')
      {
        console.log('user in belt factory', user)
        callback(user);
      }
    });
  }

    factory.log_set_user = function(user, callback){
    logged_in_user = user;
    callback(logged_in_user);
  }

  factory.log_get_user = function(){
        return logged_in_user;
      }

    factory.index_question = function(callback)
    {
      $http.get('/questions').then(function(returned_data)
      {
        if(typeof(callback) == 'function')
        {
          callback(returned_data.data);
        }
      })
    }

    factory.index_user = function(callback)
    {
      $http.get('/users').then(function(returned_data)
      {
        if(typeof(callback) == 'function')
        {
          callback(returned_data.data);
        }
      })
    }

    factory.get_question_by_id = function(id,callback)
    {
      $http.get('/questions/' + id).then(function(returned_data)
      {
        callback(returned_data.data);
          
      })
    }

       factory.create_answer_by_id = function(id,answerContent, user, callback){
        // console.log('create_answer_by_id in factory');
        // console.log('answerContent',answerContent)
        // console.log('user',user)
        $http.post('/answers/' + id,{name: user, answer: answerContent}).then(function(returned_data){
          // console.log('******returned_data.data*****',returned_data.data)
          // console.log('inside factory.create_answer_by_id');
          
          if(typeof(callback) == 'function'){
            callback(returned_data.data);
          }
        })

       }

       factory.updateAnswer = function(answerId,likes,callback){
        // console.log('factory.updateAnswer,answerId:',answerId,'likes',likes);
        $http.put('/answers/'+answerId,{
          likes:likes
        }).then(function(returned_data){
          // console.log(returned_data.data);
          if (typeof(callback)=='function'){
            callback(returned_data.data)
          }
        })
       }



       factory.login = function(user, cb) { //logs user in based on entered information
        console.log('inside factory login')
      let errors = []; //creates empty array to store errors
      // if (!user || !user.email ||
      //   !user.password) { //if any fields are left blank...
      //   errors.push('Please fill in all fields'); //pushes error to errors array
      // } else { //if all fields are filled in...
        console.log('user',user)
        $http.post('/users/login',user).then(function(response)
        { //execute post request passing user object
          console.log('user',user)
          console.log('response',response)
          console.log('inside http function factory login ')
          if (typeof(cb) == 'function') { //if cb is a function...
            cb(response.data); //invoke cb and pass retrived information (logged in user)
          }
        }, err => { //if an error is thrown during post request...
          cb(err); //invoke cb and pass error
        });
      // }
      if (errors.length > 0) { //if the errors array is not empty (fields were left empty)...
        if (typeof(cb) == 'function') { //and cb is a function...
          cb({
            'errorsFront': errors //invoke cb and pass errors array
          });
        }
      }
    },



       factory.checkSesh = function(cb)
       { //checks to see if there is a session object
          $http.get('/checksesh').then(function(response) 
            { //get request to check if session has been created
              if (typeof(cb) == 'function') 
                { //if cb is a function...
                  cb(response.data); //invoke cb and pass returned information (may be null/undefined!!)
                }
            })
      };
    

       
        return factory;
    })

