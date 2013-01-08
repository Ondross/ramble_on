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

function move_caret(area_id, location){
    /*sets the text cursor to location in the specified area
    */
    $("#" + area_id).atCaret('setCaretPosition', location);
}

function get_caret_location(area_id){
    /* return location of caret
    */
    return $("#" + area_id).atCaret('getCaretPosition');
}