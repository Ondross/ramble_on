window.columns = 1;
window.currentcolumn = 0;
window.threadID = 0;
window.parentThread = 0;
window.myID = 0;

$(document).ready(function(){
	$("#thread0").focus();
	$('textarea').autoResize();
})

$("#page").keydown(function(e) {
	var code = (e.keyCode ? e.keyCode : e.which);
    if(code == 66) {
    	if (e.ctrlKey){
    	  //var pos = $("#thread" + myID).atCaret('getCaretPosition');
    	  //var row = Math.floor((pos - 1)/80.0);
    	  var caret_height = $("#thread"+ myID).getCaretPosition().top;

    	  parentThread = myID;
    	  threadID += 1;
    	  myID += threadID;
    	  $("#page").append("<textarea class='thread' id='thread" + threadID + "' style='border:none; width:644; outline:none; resize: none; position:absolute; left:" + 660 * (columns) + "; top:" + (caret_height - 6) + ";' placeholder='New Interuption' type='text' wrap='hard' ></textarea>");
    	  $("#thread" + threadID).focus();
    	  $("#thread" + threadID).autoResize();

    	}
    }
});

$("#page").keydown(function(e) {
	var code = (e.keyCode ? e.keyCode : e.which);
    if(code == 73) {
    	if (e.ctrlKey){
    	  $("#thread" + parentThread).focus();
    	  myID = parentThread;
    	  parentThread -= 1;
    	}
    }
});
//time to start using js objects. Parent thread, #ints, column, etc.
