# inputfile
JQuery plugin for custom input file. 
 --

Install:

Bower 

$ bower install jquery-inputfile

--

Usage: 

HTML:

<div id="myelement"></div>

Javascript:

$("#myelement").inputfile();

or

$("#myelement").inputfile({
    customOffset: { top: 0, left: 0 }, 
    onChange: function(){}
});