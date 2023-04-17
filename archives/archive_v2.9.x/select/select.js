/**
 * -----------------------------------------------------------------------------
 * @package     smartVISU
 * @author      Martin Gleiss, Stefan Widmer
 * new feature for basic.select: dynamic options
 * @copyright   2012 - 2016
 * @license     GPL [http://www.gnu.de]
 * -----------------------------------------------------------------------------
 */


// ----- basic.select ----------------------------------------------------------
$.widget("sv.basic_select", $.sv.widget, {

	initSelector: 'select[data-widget="basic.select"]',

	_update: function(response) {
		// remove space after kommas in response[0] (relevant for lists)
		var respval = response[0].toString().trim().replace(/, /gi, ",");
		// if response is an array or a string containing a [] it should be handled as a list
		var respArray = response[0] instanceof Array;
		respval = respval.includes("[") || ! respArray ? respval : "[" + respval + "]";
		
		if (response [1] == undefined)
			this.element.val(respval).selectmenu('refresh');
		else {
			// response [1] is item to set and listitem (array) with available values
			var optionlist = "";
			this.element.find('option[value]').remove();
			var respopts = response[1].toString();
			var resptxts = [];
			if (response[2] != undefined)
				resptxts = response[2].toString().split(",");
	  	  
			$.each(respopts.split(","), function(index, value) {
				optionlist += "<option value=\"" + value + "\">" + (resptxts[index] != undefined ? resptxts[index] : value) + "</option>";
			});
			this.element.append(optionlist);
		};
		this.element.val(respval).selectmenu('refresh');
	},

	_events: {
		'change': function(ev) {
			this._write(this.element.val());
		}
	}

});

