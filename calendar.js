/*
Dynamic Calendar II (By Jason Moon at http://www.jasonmoon.net)
Permission granted to Dynamicdrive.com to include script in archive
For this and 100's more DHTML scripts, visit http://dynamicdrive.com
*/

/*
Modified the script to accomdate the changes for use in selecting date from a calendar.
by Jagan Tirumalai 01/14/2018.
*/
var ns6=document.getElementById&&!document.all
var ie4=document.all

var Selected_Month;
var Selected_Year;
var Current_Date = new Date();
var Current_Month = Current_Date.getMonth();

var Days_in_Month = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
var Month_Label = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');

var Current_Year = Current_Date.getYear();
if (Current_Year < 1000)
Current_Year+=1900
Selected_Year=Current_Year;
Selected_Month=Current_Month;


var Today = Current_Date.getDate();

function Header(Year, Month) {
   //alert("In function Header :"+Year+","+Month);
   if (Month == 1) {
   Days_in_Month[1] = ((Year % 400 == 0) || ((Year % 4 == 0) && (Year % 100 !=0))) ? 29 : 28;
   }
   var Header_String = Month_Label[Month] + ' ' + Year;
   return Header_String;
}

function Make_Calendar(Year, Month) {
   //alert("In Make_Calendar function year,month :"+Year+","+Month);
   var First_Date = new Date(Year, Month, 1);
   var Heading = Header(Year, Month);
   //alert("Heading :"+Heading);
   var First_Day = First_Date.getDay() + 1;
   if (((Days_in_Month[Month] == 31) && (First_Day >= 6)) ||
       ((Days_in_Month[Month] == 30) && (First_Day == 7))) {
      var Rows = 6;
   }
   else if ((Days_in_Month[Month] == 28) && (First_Day == 1)) {
      var Rows = 4;
   }
   else {
      var Rows = 5;
   }
   //alert("Before HTML_String");


  var HTML_String = '<table width="400"><tr><td valign="top"><table BORDER=1 CELLSPACING=1 cellpadding=2 FRAME="box" BGCOLOR="C0C0C0" BORDERCOLORLIGHT="808080">';

   HTML_String += '<tr style="color:yellow;font: 12px arial, sans-serif;">';

   var fnval = "Nav_Year('--')";
   HTML_String += '<th colspan=7 BGCOLOR="#FF4500" BORDER="1"><font color="black"><input type="button" value="<<" title="prev Year" onClick='+fnval+'></font>';
   var fnval = "Skip('-')";
   HTML_String += '<font color="black"><input type="button" value="<" title="prev Month" onClick='+fnval+'></font>';

   //var fnval = "Nav_Year('--'); return false;";
   //HTML_String += '<th BGCOLOR="#FF4500" BORDER="1"><a onClick='+fnval+' title="Prev Year" href="#"><<</a></th>';
   //var fnval = "Skip('-'); return false;";
   //HTML_String += '<th BGCOLOR="#FF4500" BORDER="1"><a onClick='+fnval+' title="Prev Month" href="#"><</a></th><th colspan="3" BGCOLOR="#FF4500" BORDER="1">';

   //HTML_String += '<<'+'  <  ';
   HTML_String += '<select id="month" name="month" style="background-color:#FF4500;" onChange="On_Month()">' ;
   var j=0;
   for(j=0;j<Month_Label.length;j++) {
   		if (Month==j) {
			HTML_String += '<option class="red" value=' + j + ' selected="selected" >' + Month_Label[j] + '</option>';
   		} else {
   		    HTML_String += '<option class="red" value=' + j + '>' + Month_Label[j] + '</option>';
   		}
   }
   HTML_String += '</select> ';
   if (Year=="") {
   		Year=Current_Year;
   }
   HTML_String += '<input id="yr" style="background-color:#FF4500;" type="text" name="year" size=4 maxlength=4 onKeyPress="return Check_Nums()" onChange="On_Year()" value='+Year+'>';

   //HTML_String += '  >  '+'>>';

   var fnval = "Skip('+')";
   HTML_String += '<font color="black"><input type="button" value=">" title="Next Month" onClick='+fnval+'></font>';
   var fnval = "Nav_Year('++')";
   HTML_String += '<font color="black"><input type="button" value=">>" title="Next Year" onClick='+fnval+'></font>';

   //var fnval = "Skip('+'); return false;";
   //HTML_String += '</th><th BGCOLOR="#FF4500" BORDER="1"><a onClick='+fnval+' title="Next Month" href="#">>></a></th>';
   //var fnval = "Nav_Year('++'); return false;";
   //HTML_String += '</th><th BGCOLOR="#FF4500" BORDER="1"><a onClick='+fnval+' title="Next Year" href="#">></a></th>';

   HTML_String += '</th></tr>';
   //alert("HTML_String :" + HTML_String);

   HTML_String += '<tr BGCOLOR="#FF4500" BORDER="1" style="color:yellow;font: 12px arial, sans-serif;"><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th>';
   HTML_String += '<th>Thu</th><th>Fri</th><th>Sat</th></tr>';

   //HTML_String += '<tr><th ALIGN="CENTER" BGCOLOR="#FF4500" BORDERCOLOR="000000"><font color="yellow">Sun</font></th><th ALIGN="CENTER" BGCOLOR="#FF4500" BORDERCOLOR="000000"><font color="yellow">Mon</font></th><th ALIGN="CENTER" BGCOLOR="#FF4500" BORDERCOLOR="000000"><font color="yellow">Tue</font></th><th ALIGN="CENTER" BGCOLOR="#FF4500" BORDERCOLOR="000000"><font color="yellow">Wed</font></th>';
   //HTML_String += '<th ALIGN="CENTER" BGCOLOR="#FF4500" BORDERCOLOR="000000"><font color="yellow">Thu</font></th><th ALIGN="CENTER" BGCOLOR="#FF4500" BORDERCOLOR="000000"><font color="yellow">Fri</font></th><th ALIGN="CENTER" BGCOLOR="#FF4500" BORDERCOLOR="000000"><font color="yellow">Sat</font></th></tr>';

   //alert("Before build calendar");
   var Day_Counter = 1;
   var Loop_Counter = 1;
   for (var j = 1; j <= Rows; j++) {
      HTML_String += '<tr style="color:yellow;font: 12px arial, sans-serif;" BGCOLOR="FFFFFF" BORDERCOLOR="000000" ALIGN="left" VALIGN="top">';
      for (var i = 1; i < 8; i++) {
         if ((Loop_Counter >= First_Day) && (Day_Counter <= Days_in_Month[Month])) {
            if ((Day_Counter == Today) && (Year == Current_Year) && (Month == Current_Month)) {
               //HTML_String += '<td class="tbl-row" align="center"><strong><font color="red">' + Day_Counter + '</font></strong></td>';
               HTML_String += '<td class="tbl-row"><strong><font color="red">';
               HTML_String += '<a onClick="setDateField('+Day_Counter+'); return false;" href="#">';
               HTML_String += Day_Counter + '</a></font></strong></td>';
            }
            else {
               //HTML_String += '<td class="tbl-row" align="center">' + Day_Counter + '</td>';
               HTML_String += '<td class="tbl-row" align="center">';
               HTML_String += '<a onClick="setDateField('+Day_Counter+'); return false;" href="#">';
               HTML_String += Day_Counter + '</a></strong></td>';

            }
            Day_Counter++;
         }
         else {
            HTML_String += '<td BORDERCOLOR="C0C0C0"> </td>';
         }
         Loop_Counter++;
      }
      HTML_String += '</tr>';
   }
   HTML_String += '</table></td></tr></table>';
   //alert("end of build calendar");
   cross_el=ns6? document.getElementById("Calendar") : document.all.Calendar;
   cross_el.innerHTML = HTML_String;

   //alert("HTML_String :"+HTML_String);
   //alert("End of function  Make_Calendar:");
}

function Make_Calendar_def() {
	//alert("In function Make_Calendar_def");
	if (Current_Month=="") {
		Current_Month=0;
	}
	//alert("Current_Month :"+Current_Month+";");
	//alert("Current_Year, Current_Month :" + Current_Year,+","+ Current_Month);
	Make_Calendar(Current_Year, Current_Month);
}

function Check_Nums() {
   //alert("In Check_Nums function");
   if ((event.keyCode < 48) || (event.keyCode > 57)) {
      return false;
   }
}

function On_Year() {
   //alert("In On_Year function");
   var Year = document.getElementById("yr").value;
   //alert("Year :"+Year+"; year length:"+Year.length);
   if (Year.length==4) {
   	  //alert("Inside year length=4");
   	  //document.getElementById("mySelect").selectedIndex;
      Selected_Month = document.getElementById("month").selectedIndex;
      Selected_Year = Year;
      //alert("On Year Selected_Year,Selected_Month :" + Selected_Year + "," + Selected_Month);
      Make_Calendar(Selected_Year, Selected_Month);
   }
}

function On_Month() {
    //alert("In On_Month function");
   var Year = document.getElementById("yr").value;
    //alert("Year :"+Year+"; year length:"+Year.length);
   if (Year.length == 4) {
   	  //alert("Year length is 4");
      Selected_Month = document.getElementById("month").selectedIndex;
      //alert("Selected_Month :"+Selected_Month);
      Selected_Year = Year;
      //alert("On Month Selected_Year,Selected_Month :" + Selected_Year + "," + Selected_Month);
      Make_Calendar(Selected_Year, Selected_Month);
   }
   else {
      alert('Please enter a valid year.');
      document.when.year.focus();
   }
}

function Nav_Year(Direction) {
   if (Direction == '++') {
         Selected_Year++;
   }
   else {
         Selected_Year--;
   }
   document.getElementById("yr").value = Selected_Year;
   Make_Calendar(Selected_Year, Selected_Month);
}

function Skip(Direction) {
   if (Direction == '+') {
      if (Selected_Month == 11) {
         Selected_Month = 0;
         Selected_Year++;
      }
      else {
         Selected_Month++;
      }
   }
   else {
      if (Selected_Month == 0) {
         Selected_Month = 11;
         Selected_Year--;
      }
      else {
         Selected_Month--;
      }
   }
   Make_Calendar(Selected_Year, Selected_Month);
   document.getElementById("month").selectedIndex = Selected_Month;
   document.getElementById("yr").value=Selected_Year;
}

function setDateField(day) {
	month=Selected_Month+1;
	//alert('In function DateField Day:'+day+', '+month+'/'+day+'/'+Selected_Year);
	document.getElementById("birthdt").value=month+'/'+day+'/'+Selected_Year;
	HTML_String="";
   cross_el=ns6? document.getElementById("Calendar") : document.all.Calendar;
   cross_el.innerHTML = HTML_String;
}