/**
 * -----------------------------------------------------------------------------
 * @package     smartVISU
 * @author      Martin Gleiss, Stefan Widmer
 * @copyright   2012 - 2016
 * @license     GPL [http://www.gnu.de]
 * -----------------------------------------------------------------------------
 */

// ----- basic.roundslider-------------------------------------------------------
$.widget("sv.slider_roundslider", $.sv.widget, {

	initSelector: 'div[data-widget="slider.roundslider"]',

	options: {
		radius: 80,
		startangle: 315,
		handlesize: 30,
		step: 5,
		scale_interval: 10, 
		scale_min: 0, 
		scale_max: 255, 
		width: 15, 
		thickness: 0.1,
		circleshape: "pie", 
		slidertype: "min-range",
		lineCap: "round",
		icon:"",
	},

	_create: function() {
		this._super();
	},
	
	_update: function(response) {
		var id = this.element.attr('id');
		var user_value = response[0];
		var user_value_item = this.options.item;
		
		this.options.handlesize = this.options.width +15; 
		
		//use default start angles from plugin unless shape is pie
		if (this.options.circleshape != "pie") this.options.startangle = null;
		
		//get decoration options
		var decoration = this.element.attr('data-values').explode();
		var unit = decoration[0];
		var pre_value = decoration[1];
		var to_value = decoration[2];
		var scale = decoration[3];
		var scale_interval = this.options.scale_interval;
		
		//get colours from css theme
		var bg_color = $('.ui-bar-b').css('background-color');
		var font_color = $('.ui-content').css('color');
		var track_color = $('.ui-bar-a').css('background-image');
		var path_color = $(".ui-bar-a").css('background-color');
		var border_color = $(".ui-bar-b").css('border-bottom-color');
		var handle_color = $(".ui-page-theme-a.ui-btn").css('background-image');
		
		//call roundslider plugin
		$("div#"+id).roundSlider({
			circleShape: this.options.circleshape,
			sliderType: this.options.slidertype,
			editableTooltip: false,
			showTooltip: true,
			handleSize: this.options.handlesize,
			radius: this.options.radius,
			width: this.options.width,
			thickness: this.options.thickness,
			min: this.options.scale_min,
			max: this.options.scale_max,
			step: this.options.step,
			value: user_value,
			lineCap: this.options.lineCap,
			startAngle: this.options.startangle,
			svgMode: true,

			tooltipFormat: function (args) {
				var val = args.value;
				var icon = $("div#"+id).attr('data-icon');
				if (icon != ''){
					return "<img src="+icon +" style='width:1em; margin:auto; margin-bottom: 0em; margin-top:-1em; clip-path: circle(); display:block !important;'><div id='value' style='font-weight:bold;font-size:.4em;'>" + args.value + " "+ unit +"</div>";
				}else{
					return "<div id='rs_value_pre' style='font-size:0.2em; '>"+ pre_value +"</div><div id='value' style='font-weight:bold;font-size:0.4em;'>" + args.value + " " + unit +"</div><div id='rs_value_to' style='font-size:0.2em;'>"+to_value+"</div>";
				}
			},
			update: function (args) {
				io.write(user_value_item, args.value);
			},
			tooltipColor: function (args) {
				return font_color;
			},
			rangeColor: function (args) {
				return bg_color;
			},
			pathColor: function (args) {
				return path_color;
			},
			borderColor: function (args) {
				return border_color;
			},
			create: function(args){
				$("#"+id+" .rs-handle").css('box-shadow', '0px 0px 15px #875009');
				$("#"+id+" .rs-handle").css('box-shadow', handle_color );
				$("#"+id+" .rs-handle").css('background-image', handle_color );
				$("#"+id+" .rs-range").css('background-image', track_color );
						
				if (scale == 'true') {
					var o = this.options;
					var extraSize = 0, 
					  sizeCorrect = false,
					  circleShape = o.circleShape;
					var isFullCircle = (circleShape == "full" || circleShape == "pie" || circleShape.indexOf("custom") === 0);
					if (o.svgMode && !isFullCircle && o.lineCap != "none") {
						extraSize = (o.lineCap === "butt") ? (o.borderWidth / 2) : ((o.width / 2) + o.borderWidth);
						sizeCorrect = true;
					};
						
					//scale odd ticks (long w/ numbers)
					for (var i = o.min; i <= o.max; i += scale_interval) {
						var angle = this._valueToAngle(i);
						var numberTag = this._addSeperator(angle, "rs-custom");
						var number = numberTag.children();
						number.clone().css({
						  "width": o.width + this._border(),
						  "margin-top": this._border(true) / -2,
						  "margin-right": '10px',
						}).appendTo(numberTag);
						number.removeClass().addClass("rs-number").html(i).rsRotate(-angle);
						$("#"+id+" .rs-number").css("color",font_color); 
						$("#"+id+" .rs-seperator").css("border-color",border_color );
						$("#"+id+" .rs-seperator").css("border-width","2px");
						$("#"+id+" .rs-seperator").css("width","10px");
						$("#"+id+" .rs-seperator").css("margin-left","-10px"); 
						if (sizeCorrect && circleShape.indexOf("bottom") != -1) 
							  numberTag.css("margin-top", extraSize + 'px');
						if (sizeCorrect && circleShape.indexOf("right") != -1)
							  numberTag.css("margin-right", -extraSize + 'px');
					};

					//scale even ticks (short)
					var interval = scale_interval/2;
					for (var i = o.min; i <= o.max; i += interval) {
						var angle = this._valueToAngle(i);
						var numberTag = this._addSeperator(angle, "rs-custom_1");
						numberTag.addClass( "rs-seperator_1" );
						$("rs-seperator_1").css("border-color",border_color );
						$("rs-seperator_1").css("border-width","2px");
						$("rs-seperator_1").css("width","5px");
						$("rs-seperator_1").css("height","1px");
						$("rs-seperator_1").css("margin-left","-10px");
						if (sizeCorrect && circleShape.indexOf("bottom") != -1) 
							numberTag.css("margin-top", extraSize + 'px');
						if (sizeCorrect && circleShape.indexOf("right") != -1)
							numberTag.css("margin-right", -extraSize + 'px');
					};
				};
			}
			
		});
	},
	
	_events: {
	}
});


// ----- device.rtrslider-------------------------------------------------------
$.widget("sv.slider_rtrslider", $.sv.widget, {

	initSelector: 'div[data-widget="slider.rtrslider"]',
	options: {
		step: 0.1,
		scale_interval: 1, 
		scale_min: 18, 
		scale_max: 28, 
	},

	_create: function() {
		this._super();
	},
	
	_update: function(response) {
		var item_names = this.options.item.explode();
		var actualValue = response[0];
		var setValue = response[1];
		var id = this.element.attr('id');
		var scale_min = this.options.scale_min;  //18;
		var scale_max = this.options.scale_max;  //28;
		var step = this.options.step;   //0.1;
		var unit = "°C";
		var scale_interval = this.options.scale_interval;
						
		//get colors
		var bg_color = $('.ui-bar-b').css('background-color');
		var font_color = $('.ui-content').css('color');
		var track_color = $('.ui-bar-a').css('background-image');
		var path_color = $(".ui-bar-a").css('background-color');
		var border_color = $(".ui-bar-b").css('border-bottom-color');
		var handle_color = $(".ui-page-theme-a.ui-btn").css('background-image');
					
		
	// slider for actual value
	$("div#"+id+".outerslider").roundSlider({
		value: actualValue,
		min: scale_min,
		max: scale_max,
		step: step,
		sliderType: "min-range",
		radius: 70,
		showTooltip: true,
		editableTooltip: false,
		circleShape: "full",
		startAngle: "315",
		endAngle: "225",
		handleShape: "round",
		handleSize: "0",
		lineCap: "none",
		width: "8",
		svgMode: true,
		
		update: function(args) {},
		
		create: function(args) {
		  var o = this.options;
		  for (var i = o.min; i <= o.max; i += scale_interval) {
			var angle = this._valueToAngle(i);
			var numberTag = this._addSeperator(angle, "rs-custom");
			var number = numberTag.children();
			number.clone().css({
			  "width": o.width + this._border(),
			  "margin-top": this._border(true) / -2,
			  "margin-right": '10px',
			}).appendTo(numberTag);
			number.removeClass().addClass("rs-number").html(i).rsRotate(-angle);
			$("#"+id+".outerslider .rs-number").css("left", "-25px");
			$("#"+id+".outerslider .rs-number").css("color",font_color); 
			$("#"+id+".outerslider .rs-seperator").css("border-color",border_color );
			$("#"+id+".outerslider .rs-seperator").css("border-width","2px");
			$("#"+id+".outerslider .rs-seperator").css("width","6px");
			//$("#"+id+".outerslider.rs-seperator_1").css("height","1px");
			$("#"+id+".outerslider .rs-seperator").css("margin-left","-6px"); 
			
		  };
		 //scala gerade striche (kurz)
		  var interval = scale_interval/2;
		  for (var i = o.min; i <= o.max; i += interval) {
			var angle = this._valueToAngle(i);
			var numberTag = this._addSeperator(angle, "rs-custom_1");
			numberTag.addClass( "rs-seperator_1" );
			$("#"+id+".outerslider .rs-seperator_1 .rs-seperator").css("border-color",border_color );
			$("#"+id+".outerslider .rs-seperator_1 .rs-seperator").css("border-width","1px");
			$("#"+id+".outerslider .rs-seperator_1 .rs-seperator").css("width","4px");
			$("#"+id+".outerslider .rs-seperator_1 .rs-seperator").css("height","1px");
			$("#"+id+".outerslider .rs-custom_1 .rs-seperator").css("left","-10px");  
			
		  };
		},

		tooltipFormat:function (args){
			var xy = "";
			
			if (args.value > args.options.min){
				xy = args.value;
			}else{
				xy = "<"+String(args.options.min);
			}
			return"<span style='position: relative;top:-2.2em;font-size:0.2em;color:"+font_color+"; '>Ist: </span></br><span style='position: relative;top:-2.7em;font-weight:bold;font-size:0.45em;color:"+font_color+";'>" + xy + unit +"</span>";
		},
		rangeColor: function (args) {
			return border_color;
		},
		pathColor: function (args) {
			return path_color;
		},
		borderColor: function (args) {
			return border_color;
		}
	});
		
	// slider for set value
	$("#"+id+".innerslider").roundSlider({
		value: setValue,
		min: scale_min,
		max: scale_max,
		step: step, 
		width: 12,
		sliderType: "min-range",
		radius: 62,
		showTooltip: false,
		circleShape: "full",
		startAngle: "315",
		endAngle: "225",
		handleShape: "round",
		handleSize: "25",
		lineCap: "none",
		editableTooltip: false,
		svgMode: true,
		update: function (args) {
			io.write(item_names[1], args.value);	
		},
	
		tooltipColor: function (args) {
			return font_color;
		},
		rangeColor: function (args) {
			return bg_color;
		},
		pathColor: function (args) {
			return path_color;
		},
		borderColor: function (args) {
			return border_color;
		},
			
		create: function() {
			 $("#"+id).find(".inner-handle").css({
				 'position': 'absolute',
					'left': '-35px'}
				 );
		  }
		});
	},
	
	_events: {
	}
});
