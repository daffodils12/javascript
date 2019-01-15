# javascript
A Simple Calendar UI for a date field. 

Download the file  calendar.js.

In order to use the calendar function in a html file with date field.
add the following to your html file(Date_Field_with_Calendar_test.html).

<script src="calendar.js"></script>

add a div to the html file like this, 

Example Date field with div calendar.
	Enter Birth Date :<input id="birthdt" type="text" placeholder="MM/DD/YYYY" maxlength=10></input>
        <a href="#" onclick="Make_Calendar_def()">
          <span class="glyphicon glyphicon-calendar"></span>
        </a>
	<div id="Calendar" class="cal" align="left"></div>

it should popup a calendar when you click the glyphicon calendar.


choose the date and the calendar will disappear with storing the date in a date field id="birthdt".


Check the attached files with the examples and see if it works. Let me know if there are any issues.

