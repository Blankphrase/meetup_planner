'use strict';
// Counting number that 'Load More' button is clicked
// in order to determine how many events to skip in server
var num = 0;

// Load More functionality
document.getElementById('loadMoreEvents').addEventListener('click', (e)=> {
  e.preventDefault();

  num++;

  // Get the additional event data from server
  $.ajax({
    type: "GET",
    data: {
      skip: num
    },
    url: "/",
    success: function(data){
      // Display the additional events loaded
      if(data){
        $('#eventsBlock').append(data);
        $('#loadMoreEvents').addClass('canSubmit');
      } else {
        // If no more events, change the color of 'Load More' button
        // to indicate that there are no more events to load
        $('#loadMoreEvents').removeClass('canSubmit');
      }
    },
    error: function(err){
      console.log('Error', err)
    }
  });
}, false);