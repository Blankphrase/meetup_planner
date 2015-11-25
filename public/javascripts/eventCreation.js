'use strict';

if(!supportThisTypeAttribute('datetime-local')){
  setAttribute('startDate', 'type', 'text');
  setAttribute('startDate', 'data-date-format', 'yyyy-mm-dd hh:ii');
  $('#startDate').datetimepicker();

  setAttribute('endDate', 'type', 'text');
  setAttribute('endDate', 'type', 'text');
  $('#endDate').datetimepicker();
}

// Check Event name
// Make sure event name length is less than 50 chars
function checkEventName(e){
  resetInnerHTML('errEventName');
  document.getElementById('eventName').removeAttribute('class');
  var name = document.getElementById('eventName').value.trim();
  var errorMsg = "";

  if(name.length < 1) {
    errorMsg += '* Event name required';
  }

  if(name.length > 50){
    errorMsg += '* Event name should be shorter than 50';
  }

  if(errorMsg.length > 0){
    if(e){
      e.preventDefault();
    }
    document.getElementById('errEventName').innerHTML = errorMsg;
    setAttribute('eventName', 'class', 'errorBorder');
  }
}

// Check Event type - make sure user selects one
// out of the event type list
function checkEventType(e){
  resetInnerHTML('errEventType');
  document.getElementById('eventType').removeAttribute('class');
  var eventType = document.getElementById('eventType').value.trim();
  var errorMsg = "";
  var typeList = [
    "Birthday",
    "Conference",
    "Ceremony",
    "Educational",
    "Leisure",
    "Networking",
    "Party",
    "Social",
    "Sports",
    "Others"];

  if(typeList.indexOf(eventType) === -1) {
    errorMsg += '* Select an event type';
  }

  if(errorMsg.length > 0){
    if(e){
      e.preventDefault();
    }
    document.getElementById('errEventType').innerHTML = errorMsg;
    setAttribute('eventType', 'class', 'errorBorder');
  }
}

// Check Event host
// Make sure host name is not empty
// and length is less than 50
function checkEventHost(e){
  resetInnerHTML('errEventHost');
  document.getElementById('eventHost').removeAttribute('class');
  var host = document.getElementById('eventHost').value.trim();
  var errorMsg = "";

  if(host.length < 1) {
    errorMsg += '* Event host required';
  }

  if(host.length > 50){
    errorMsg += '* Event host should be shorter than 50';
  }

  if(errorMsg.length > 0){
    if(e){
      e.preventDefault();
    }
    document.getElementById('errEventHost').innerHTML = errorMsg;
    setAttribute('eventHost', 'class', 'errorBorder');
  }
}

// Check Event start date/time
function checkEventStartDate(e){
  resetInnerHTML('errEventStartDate');
  document.getElementById('startDate').removeAttribute('class');
  var startDate = document.getElementById('startDate').value.trim();
  var errorMsg = "";

  if(startDate.length < 1) {
    errorMsg += '* Event Start Date required';
  }

  if(errorMsg.length > 0){
    if(e){
      e.preventDefault();
    }
    document.getElementById('errEventStartDate').innerHTML = errorMsg;
    setAttribute('startDate', 'class', 'errorBorder');
  }
}

// Check Event end date/time
function checkEventEndDate(e){
  resetInnerHTML('errEventEndDate');
  document.getElementById('endDate').removeAttribute('class');
  var endDate = document.getElementById('endDate').value.trim();
  var errorMsg = "";

  if(endDate.length < 1) {
    errorMsg += '* Event End Date required';
  }

  if(errorMsg.length > 0){
    if(e){
      e.preventDefault();
    }
    document.getElementById('errEventEndDate').innerHTML = errorMsg;
    setAttribute('endDate', 'class', 'errorBorder');
  }
}

// Check Event location
function checkEventLocation(e){
  resetInnerHTML('errEventLocation');
  document.getElementById('location').removeAttribute('class');
  var location = document.getElementById('location').value.trim();
  var errorMsg = "";

  if(location.length < 1) {
    errorMsg += '* Event location required';
  }

  if(location.length > 100){
    errorMsg += '* Event location should be shorter than 100';
  }

  if(errorMsg.length > 0){
    if(e){
      e.preventDefault();
    }
    document.getElementById('errEventLocation').innerHTML = errorMsg;
    setAttribute('location', 'class', 'errorBorder');
  }
}

// Check Message (length is less than 700 chars)
function checkMessage(e){
  resetInnerHTML('errMessage');
  document.getElementById('message').removeAttribute('class');
  var message = document.getElementById('message').value.trim();
  var errorMsg = "";

  if(message.length > 1000){
    errorMsg += '* Message should be shorter than 1000 chars';
  }

  if(errorMsg.length > 0){
    if(e){
      e.preventDefault();
    }
    document.getElementById('errMessage').innerHTML = errorMsg;
    setAttribute('message', 'class', 'errorBorder');
  }
}

function validationFallbackOnCreate(e){
  // Check if browser supports validation.
  // i.e. Safari does not support 'required', so use
  // following fallback function on submit
  resetInnerHTML('errEventName');
  resetInnerHTML('errEventType');
  resetInnerHTML('errEventHost');
  resetInnerHTML('errEventStartDate');
  resetInnerHTML('errEventEndDate');
  resetInnerHTML('errEventLocation');

  if (!e.target.checkValidity()) {
    if(e.target[0].value.length === 0){
      e.preventDefault();
      document.getElementById('errEventName').innerHTML = '* Event Name required';
    }

    if(e.target[1].value.length === 0){
      e.preventDefault();
      document.getElementById('errEventType').innerHTML = '* Event Type required';
    }

    if(e.target[2].value.length === 0){
      e.preventDefault();
      document.getElementById('errEventHost').innerHTML = '* Event Host required';
    }

    if (e.target[3].value.length === 0){
      e.preventDefault();
      document.getElementById('errEventStartDate').innerHTML = '* Event Start Date/Time required';
    }

    if (e.target[4].value.length === 0){
      e.preventDefault();
      document.getElementById('errEventEndDate').innerHTML = '* Event End Date/Time required';
    }

    if (e.target[5].value.length === 0){
      e.preventDefault();
      document.getElementById('errEventLocation').innerHTML = '* Event Location required';
    }
  }
}

document.getElementById('eventCreationForm').addEventListener('submit', (e)=> {

  validationFallbackOnCreate(e);
  
  checkEventName(e);
  checkEventType(e);
  checkEventHost(e);
  checkEventStartDate(e);
  checkEventEndDate(e);
  checkEventLocation(e);
  checkMessage(e);

}, false);
