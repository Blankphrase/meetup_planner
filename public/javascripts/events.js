'use strict';
var num = 0;

document.getElementById('loadMoreEvents').addEventListener('click', (e)=> {
  e.preventDefault();

  num++;

  $.ajax({
    type: "GET",
    data: {
      skip: num
    },
    url: "/",
    success: function(data){
      console.log('data', data);
      if(data){
        $('#eventsBlock').append(data);
        $('#loadMoreEvents').addClass('canSubmit');
      } else {
        $('#loadMoreEvents').removeClass('canSubmit');
      }
    },
    error: function(err){
      console.log('Error', err)
    }

  })

}, false);