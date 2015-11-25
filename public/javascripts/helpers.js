'use strict';

// Reset innerHTML value of an element
function resetInnerHTML(elementID){
  return document.getElementById(elementID).innerHTML = "";
}

// Set attrubute to a specific element
// Param 'elementID' : element's id
// Param 'attr' : attribute type
// Param 'value' : attribute value
function setAttribute(elementID, attr, value){
  return document.getElementById(elementID).setAttribute(attr, value);
}

// Check if the browser supports 'datetime-local' attribute
// If not, use datetimepicker library to compensate
// the difficulty of entering the date + time
function supportThisTypeAttribute(type) {
  var input = document.createElement("input");
  input.setAttribute("type", type);
  return input.type == type;
}