function find_recent_substring(caret, string, substring){
    /* Takes a caret location, string, and substring, and returns
    the last instance of that substring before the caret location.
    Returns -1 if the substring does not exist before the caret location
    */
  
  string = string.substring(0, caret + 1);        //cut out string

  var pos = string.indexOf(substring);            //find first instance
  while(string.indexOf(substring, pos+1) != -1) { //find instances until you run out
    pos = string.indexOf(substring, pos+1);
  }

  return(pos);
}