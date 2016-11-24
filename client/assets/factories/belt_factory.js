app.factory('belt_factory',function($http){
        console.log('start belt_factory');

        var factory = {};
        var users = [];
        // var user = {};
          var user;
          var current_user;

      // factory.create_user = function(newUser)
      // {
      //   user = newUser;
        
      // }

      factory.create_user = function(user, callback){
        console.log('inside create_user factory');
        console.log('user',user);

        user = user;
        callback(user);
      }


      factory.getUser = function(){
        return user;
      }

      factory.get_user = function(callback){
    callback(current_user);
  }

  factory.set_user = function(user, callback){
    current_user = user;
    callback(current_user);
  }

        factory.create_question = function(newQuestion,callback){
        	console.log('create_question method of the belt_factory');
        	
        	console.log('newQuestion',newQuestion);
        	$http.post('/questions', newQuestion).then(function(returned_data){
        		console.log("returned_data.data",returned_data.data);
            console.log("*************************s")

            if (typeof(callback) == 'function'){
                      console.log('end of create_question method of factory');
                      console.log('returned_data.data',returned_data.data);
                      callback(returned_data.data);
          }


        	});
         	

       }

       factory.index_question = function(callback){
        console.log('factory index_question')
        $http.get('/questions').then(function(returned_data){
          console.log('returned_data',returned_data);
          console.log(returned_data.data);
          if(typeof(callback) == 'function'){
            callback(returned_data.data);
          }

        })
       }

       factory.get_question_by_id = function(id,callback){
        console.log('factory.get_question_by_id');
        $http.get('/questions/' + id).then(function(returned_data){
          callback(returned_data.data);
          console.log('returned_data.data',returned_data.data);
        })
       }

       factory.create_answer_by_id = function(id,answerContent, user, callback){
        console.log('create_answer_by_id in factory');
        console.log('answerContent',answerContent)
        console.log('user',user)
        $http.post('/answers/' + id,{name: user.name, answer: answerContent}).then(function(returned_data){
          console.log('******returned_data.data*****',returned_data.data)
          console.log('inside factory.create_answer_by_id');
          if(typeof(callback) == 'function'){
            callback(returned_data.data);
          }
        })

       }

       factory.updateAnswer = function(answerId,likes,callback){
        console.log('factory.updateAnswer,answerId:',answerId,'likes',likes);
        $http.put('/answers/'+answerId,{
          likes:likes
        }).then(function(returned_data){
          console.log(returned_data.data);
          if (typeof(callback)=='function'){
            callback(returned_data.data)
          }
        })
       }



       
        return factory;
    })

