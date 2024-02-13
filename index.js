$(document).ready(function(){
    var getAndDisplayAllTasks = function () {
        $.ajax({
          type: 'GET',
          url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=1186',
          dataType: 'json',
          success: function (response, textStatus) {
            $('#todo-list').empty(); // Add this line
            response.tasks.forEach(function (task) {
                $('#todo-list').append('<div class="row"><p class="col-xs-6">' + task.content + '</p><button class="btn btn-danger btn-sm delete" data-id="' + task.id + '">x</button><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '>');
            });
          },
          error: function (request, textStatus, errorMessage) {
            console.log(errorMessage);
          }
        });
    }

    var createTask = function () {
        $.ajax({
       type: 'POST',
          url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=1186',
          contentType: 'application/json',
          dataType: 'json',
          data: JSON.stringify({
            task: {
              content: $('#new-task-content').val()
            }
          }),
          success: function (response, textStatus) {
            $('#new-task-content').val(''); // Add this line
            getAndDisplayAllTasks();
          },
          error: function (request, textStatus, errorMessage) {
            console.log(errorMessage);
          }
        });  
    }

    $('#create-task').on('submit', function (e) {
      e.preventDefault();
      createTask();
    });
    
    var deleteTask = function (id) {
        $.ajax({
       type: 'DELETE',
          url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '?api_key=1186',
          success: function (response, textStatus) {
            getAndDisplayAllTasks();
          },
          error: function (request, textStatus, errorMessage) {
            console.log(errorMessage);
          }
        });
    }

    $(document).on('click', '.delete', function () {
        deleteTask($(this).data('id'));
    });

    var markTaskComplete = function (id) {
        $.ajax({
       type: 'PUT',
          url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_complete?api_key=1186',
          dataType: 'json',
          success: function (response, textStatus) {
            getAndDisplayAllTasks();
          },
          error: function (request, textStatus, errorMessage) {
            console.log(errorMessage);
          }
        });
    }

    var markTaskActive = function (id) {
        $.ajax({
       type: 'PUT',
          url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_active?api_key=1186',
          dataType: 'json',
          success: function (response, textStatus) {
            getAndDisplayAllTasks();
          },
          error: function (request, textStatus, errorMessage) {
            console.log(errorMessage);
          }
        });
    }

    $(document).on('change', '.mark-complete', function () {
        if (this.checked) {
           markTaskComplete($(this).data('id'));
         } else {
           markTaskActive($(this).data('id'));
         }
    });

    var getAndDisplayCompletedTasks = function () {
        $.ajax({
          type: 'GET',
          url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=1186',
          dataType: 'json',
          success: function (response, textStatus) {
            $('#todo-list').empty(); 
            response.tasks.filter(function(task){
                return task.completed;
            }).forEach(function (task) {
                $('#todo-list').append('<div class="row"><p class="col-xs-6">' + task.content + '</p><button class="btn btn-danger btn-sm delete" data-id="' + task.id + '">x</button><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '>');
            })
          },
          error: function (request, textStatus, errorMessage) {
            console.log(errorMessage);
          }
        });
    }

    var getAndDisplayActiveTasks = function () {
        $.ajax({
          type: 'GET',
          url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=1186',
          dataType: 'json',
          success: function (response, textStatus) {
            $('#todo-list').empty(); 
            response.tasks.filter(function(task){
                return !task.completed;
            }).forEach(function (task) {
                $('#todo-list').append('<div class="row"><p class="col-xs-6">' + task.content + '</p><button class="btn btn-danger btn-sm delete" data-id="' + task.id + '">x</button><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '>');
            })
          },
          error: function (request, textStatus, errorMessage) {
            console.log(errorMessage);
          }
        });
    }

    $(document).on('click', '#completed', function () {
        getAndDisplayCompletedTasks();
    });

    $(document).on('click', '#active', function () {
        getAndDisplayActiveTasks();
    });

    $(document).on('click', '#all', function () {
        getAndDisplayAllTasks();
    });

     getAndDisplayAllTasks();
    
  });