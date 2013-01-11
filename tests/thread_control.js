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

function child_thread_html(thread, placeholder){

    //$("#page").append("<div class='thread' id='thread" + thread.id + "' >" + "
        //<textarea class='strand' id='" + thread.id + "' placeholder='New Interruption' type='text' wrap='hard' ></textarea>");
    $("#page").append($('<div>').attr('id', thread.id).attr('class', 'thread').
    append($('<textarea>').attr('id', thread.id + 'strand0').attr('class', 'strand').attr('placeholder','New Interruption...')));
}

function new_child_thread(parent_strand, height_in_parent){
    /*creates a new interruption*/

    //create the instance
    parent = parent_strand.thread;
    newThread = new Thread(parent, threads, parent.top + height_in_parent, parent_strand);
    newStrand = new Strand(newThread, 0, 0);
    threads += 1;
    parent.children.push(newThread);

    //write the html
    child_thread_html(newThread);
    $("#" + newThread.id).css({left: 660 * newThread.column, top: 5 + newThread.top});
    $("#" + newStrand.id).focus().autoResize();

    return newStrand;
}

function change_strand(strand){
    $("#" + strand.id).focus();
    return strand;
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
    height = $('#measurer').height();                                                 
    $('#measurer').remove();                                            //delete temporary html object
    return height;
}

function spawn_child(parent_strand) {
    //create reference to child
    $("#" + parent_strand.id).insertAtCaret(' (*)');

    //create child
    height_in_parent = get_caret_height(parent_strand.id) + parent_strand.top - 15;
    newStrand = new_child_thread(parent_strand, height_in_parent);

    //autoscroll to see child
    var right_border = $(window).width() + $(document).scrollLeft();
    var right_column = (newThread.column + 1) * 660;
    if (right_border < right_column)  {
        $(document).scrollLeft((newThread.column + 1) * 660);
    }

    return newStrand;
}