function find_recent_substring(caret, string, substring){
    /* Takes a caret location, string, and substring, and returns
    the last instance of that substring before the caret location.
    Returns -1 if the substring does not exist before the caret location
    */
  
    string = string.substring(0, caret);        //cut out string

    var pos = string.indexOf(substring);            //find first instance
    while(string.indexOf(substring, pos+1) != -1) { //find instances until you run out
        pos = string.indexOf(substring, pos+1);
    }

    return(pos);
}

function get_length_into_tag(caret, string){
    var last_closer = find_recent_substring(caret, string, ">");
    if (last_closer == -1){last_closer = -2;}
    length_into_tag = caret - last_closer;
    return length_into_tag;
}

function new_text_area(type, id, placeholder){

    $("#page").append("<textarea class='" + type + "' id='" + id + "' placeholder='" + placeholder + "' type='text' wrap='hard' ></textarea>");
}

function new_child_thread(parent, height_in_parent){
    /*creates a new interruption*/

    //create the instance
    newThread = new Thread(parent, threads, parent.top + height_in_parent);
    threads += 1;
    parent.children.push(newThread);

    //write the html
    new_text_area("thread", newThread.id, "New Interruption");
    $("#" + newThread.id).focus().css({left: 660 * newThread.column, top: 5 + newThread.top});
    $("#" + newThread.id).autoResize();

    return newThread;
}

function change_thread(thread){
    $("#" + thread.id).focus();
    return thread;
}

function move_caret(area_id, index){
    /*sets the text cursor to location in the specified area
    */
    $("#" + area_id).atCaret('setCaretPosition', index);
}

function get_caret_location(area_id){
    /* return location of caret measured by # of characters
    */
    return $("#" + area_id).atCaret('getCaretPosition');
}

function how_many_instance(string, substring){
    /* returns the number of times a substring appears in a string
    */
    var instances = 0;
    var pos = -1;
    while(string.indexOf(substring, pos+1) != -1) { //find instances until you run out
        pos = string.indexOf(substring, pos+1);  
        instances = instances + 1;
    }
    return instances;
}

function get_caret_height(area_id){
    /* return height of caret on page measured in pixels
    */
    var index = get_caret_location(area_id);
    var substring = $("#" + area_id).val().replace(/\r\n|\r|\n/g,"\n"); //make newlines recognizable
    index = index + how_many_instance(substring, "\n") * 3;             //increase index to include all newlines
    substring = substring.replace(/\n/g, "<br>").substring(0, index);   //make newlines html readable
    $("#page").append("<p id='measurer' type='text' wrap='hard' >" + substring + "</p>");  //make html object
    height = $('#measurer').height() - 9;                                                 
    $('#measurer').remove();                                            //delete temporary html object
    return height;
}

function spawn_child(parent, height_in_parent) {
    //create reference to child
    $("#" + parent.id).insertAtCaret(' (*)');

    //create child
    newThread = new_child_thread(parent, height_in_parent);

    //autoscroll to see child
    var right_border = $(window).width() + $(document).scrollLeft();
    var right_column = parent.column * 660;
    if (right_border < right_column)  {
        $(document).scrollLeft(parent.column * 660);
    }

    return newThread;
}