function SpeechBubble (options){
	this.htmlElement = options['htmlElement'] || $('#speech-bubble-panel');  //es el DIV de muestra
	this.htmlElementAfter = options['htmlElementAfter'] || $('#spike');  //es el DIV de muestra
	this.htmlElementBefore = options['htmlElementBefore'] || $('#speechBubbleBorder');  //es el DIV de muestra
	this.htmlElementSpikeBorder = options['htmlElementSpikeBorder'] || $('#spikeBorder');  //es el DIV de muestra
    this.htmlCode = options['htmlCode'] || $('#speech-bubble-code');
    this.boxHeight = options['boxHeight'] || 50;
    this.boxWidth = options['boxWidth'] || 130;
    this.backgroundColor = options['backgroundColor'] || '#e7a61a';
    this.location = options['location'] || 'bottom';
    this.spikeLocation = options['spikeLocation'] || 0;
    this.spikeWidth = options['spikeWidth'] || 10;
    this.spikeHeight = options['spikeHeight'] || 10;
    this.boxPadding = options['boxPadding'] || 0;
    this.boxRadius = options['boxRadius'] || 0;	     
    this.borderWidth = options['borderWidth'] || 0;
    this.borderColor = options['borderWidth'] || '#000000';
};



SpeechBubble.prototype.refresh = function () {

    var cssCode1 = '', cssCode2 = '', cssCode3='', cssCode4='', cssCode5='', cssCode6='';
    var cssCode7 = '', cssCode8 = '', cssCode9 = '', cssCode10 = '', cssCode11 = '';
    var cssCode1s = '', cssCode2s = '', cssCode4s = '', cssCode6s = '', cssCode7s = '', cssCode8s = '', cssCode9s = '';

    var spikeLocationPX = 0, spikeWidthPX = 0;


if(this.location=='top' || this.location=='bottom')
	spikeLocationPX = parseInt(((this.boxWidth-(this.spikeWidth*2) + (this.boxPadding*2))/100) * this.spikeLocation);
else
	spikeLocationPX = parseInt(((this.boxHeight-(this.spikeWidth*2) + (this.boxPadding*2))/100) * this.spikeLocation);



    cssCode1 += this.boxHeight + 'px ';
    cssCode2 += this.boxWidth + 'px ';
    cssCode3 += this.location;
    cssCode5 += this.boxRadius + 'px ' + this.boxRadius + 'px ' + this.boxRadius + 'px ';
    cssCode5 += this.boxRadius + 'px ';
    cssCode10 += this.boxHeight + this.borderWidth + this.boxPadding*2 + 'px';
    cssCode11 += this.boxWidth + this.borderWidth + this.boxPadding*2 + 'px';

    this.htmlElement.css('height', cssCode1);
    this.htmlElement.css('width', cssCode2);
    this.htmlElement.css('background-color', this.backgroundColor);
 
    this.htmlElement.css('border-radius', cssCode5);
    this.htmlElement.css('-moz-border-radius', cssCode5);
    this.htmlElement.css('-webkit-border-radius', cssCode5);

    this.htmlElement.css('padding', this.boxPadding);


if(this.borderWidth>0){
    
    this.htmlElementBefore.css('height',  cssCode10);
    this.htmlElementBefore.css('width',  cssCode11);
    this.htmlElementBefore.css('background-color', this.borderColor);
    this.htmlElementBefore.css('border-radius', cssCode5);
    this.htmlElementBefore.css('-moz-border-radius', cssCode5);
    this.htmlElementBefore.css('-webkit-border-radius', cssCode5);

    this.htmlElementBefore.css('padding-top', this.borderWidth + 'px');
    this.htmlElementBefore.css('padding-left', this.borderWidth + 'px');

}
else{
    this.htmlElementBefore.css('background-color', 'transparent');
}

    this.htmlElementAfter.css('border-color', this.backgroundColor + ' transparent');


if(this.location=='top'){

	cssCode4 += spikeLocationPX + 'px ';
	cssCode8 += '-' + this.spikeHeight;	
        cssCode7 += this.spikeHeight + 'px ' + 'solid ' + this.backgroundColor;
	cssCode6 += this.spikeWidth + 'px ' + 'solid transparent';
	cssCode9 += '0px solid transparent';

	this.htmlElementAfter.css('left', cssCode4);
	this.htmlElementAfter.css('top', cssCode8 + 'px');
	this.htmlElementAfter.css('border-left', cssCode6);
	this.htmlElementAfter.css('border-right', cssCode6);
	this.htmlElementAfter.css('border-bottom', cssCode7);
	this.htmlElementAfter.css('border-top', cssCode9);

	if(this.spikeHeight==0)
		this.htmlElementSpikeBorder.css('border-color', 'transparent' + ' transparent');

	else{
		cssCode4s = (parseInt(spikeLocationPX) - parseInt(this.borderWidth)) + 'px ';
		cssCode8s = '-' + (this.spikeHeight + (this.borderWidth)*2) + 'px ';
	
       		cssCode7s = (parseInt(this.spikeHeight) + parseInt(this.borderWidth)) + 'px ' + 'solid ' + this.borderColor;
		cssCode6s = (parseInt(this.spikeWidth) + parseInt(this.borderWidth)) + 'px ' + 'solid transparent';
		cssCode9s = '0px solid transparent';

		this.htmlElementSpikeBorder.css('left', cssCode4s);
		this.htmlElementSpikeBorder.css('top', cssCode8s);
		this.htmlElementSpikeBorder.css('border-left', cssCode6s);
		this.htmlElementSpikeBorder.css('border-right', cssCode6s);
		this.htmlElementSpikeBorder.css('border-bottom', cssCode7s);
		this.htmlElementSpikeBorder.css('border-top', cssCode9s);
	}
}


if(this.location=='bottom'){
	cssCode4 += spikeLocationPX + 'px ';
	cssCode6 += this.spikeHeight + 'px ' + this.spikeWidth + 'px' + ' 0';

	cssCode8 = this.boxHeight + parseInt(this.boxPadding*2);

	this.htmlElementAfter.css('border-width', cssCode6);
	this.htmlElementAfter.css('left', cssCode4);
	this.htmlElementAfter.css('top', cssCode8 + 'px');

	if(this.spikeHeight==0)
		this.htmlElementSpikeBorder.css('border-color', 'transparent' + ' transparent');

	else{
		cssCode4s = parseInt(spikeLocationPX) - parseInt(this.borderWidth) + 'px ';
		cssCode6s = (parseInt(this.spikeHeight) + (parseInt(this.borderWidth))) + 'px ' + (parseInt(this.spikeWidth) + parseInt(this.borderWidth)) + 'px' + ' 0';


		cssCode8s = this.boxHeight + parseInt(this.boxPadding*2) + parseInt(this.borderWidth) + 'px ';

		this.htmlElementSpikeBorder.css('border-width', cssCode6s);
		this.htmlElementSpikeBorder.css('left', cssCode4s);
		this.htmlElementSpikeBorder.css('top', cssCode8s);

		this.htmlElementSpikeBorder.css('border-color', this.borderColor + ' transparent');
	}
}


if(this.location=='left'){

	cssCode2 = '-' + parseInt(this.spikeHeight) + 'px ';
	cssCode8 += spikeLocationPX;
        cssCode7 += this.spikeHeight + 'px ' + 'solid ' + this.backgroundColor;
	cssCode6 += this.spikeWidth + 'px ' + 'solid transparent';

	this.htmlElementAfter.css('width', '0');
	this.htmlElementAfter.css('height', '0');
	this.htmlElementAfter.css('left', cssCode2);

	this.htmlElementAfter.css('top', cssCode8 + 'px');
	this.htmlElementAfter.css('border-top', cssCode6);
	this.htmlElementAfter.css('border-bottom', cssCode6);
	this.htmlElementAfter.css('border-right', cssCode7);

	this.htmlElementAfter.css('border-left', '0 solid transparent');

	if(this.spikeHeight==0)
		this.htmlElementSpikeBorder.css('border-color', 'transparent' + ' transparent');

	else{
		cssCode2s = '-' + parseInt(this.spikeHeight + (this.borderWidth*2)) + 'px ';
		cssCode8s = (spikeLocationPX - (this.borderWidth)) + 'px';
        	cssCode7s = (this.spikeHeight + (this.borderWidth)) + 'px ' + 'solid ' + this.borderColor;
		cssCode6s = (this.spikeWidth + (this.borderWidth)) + 'px ' + 'solid transparent';

		this.htmlElementSpikeBorder.css('width', '0');
		this.htmlElementSpikeBorder.css('height', '0');
		this.htmlElementSpikeBorder.css('left', cssCode2s);
		this.htmlElementSpikeBorder.css('top', cssCode8s);

		this.htmlElementSpikeBorder.css('border-top', cssCode6s);
		this.htmlElementSpikeBorder.css('border-bottom', cssCode6s);
		this.htmlElementSpikeBorder.css('border-right', cssCode7s);

		this.htmlElementSpikeBorder.css('border-left', '0 solid transparent');
	}
}


if(this.location=='right'){
	cssCode2 = parseInt(this.boxWidth + (this.boxPadding*2)) + 'px ';
	cssCode8 += spikeLocationPX;	
        cssCode7 += parseInt(this.spikeHeight) + 'px ' + 'solid ' + this.backgroundColor;
	cssCode6 += this.spikeWidth + 'px ' + 'solid transparent';

	this.htmlElementAfter.css('width', '0');
	this.htmlElementAfter.css('height', '0');
	this.htmlElementAfter.css('left', cssCode2);

	this.htmlElementAfter.css('top', cssCode8 + 'px');
	this.htmlElementAfter.css('border-top', cssCode6);
	this.htmlElementAfter.css('border-bottom', cssCode6);
	this.htmlElementAfter.css('border-left', cssCode7);

	this.htmlElementAfter.css('border-right', '0 solid transparent');

	if(this.spikeHeight==0)
		this.htmlElementSpikeBorder.css('border-color', 'transparent' + ' transparent');

	else{
		cssCode2s = parseInt(this.boxWidth + (this.boxPadding*2) + this.borderWidth) + 'px ';
		cssCode8s = parseInt(spikeLocationPX - this.borderWidth)+ 'px ';	
		cssCode7s = (this.spikeHeight + (this.borderWidth)) + 'px ' + 'solid ' + this.borderColor;
		cssCode6s = (this.spikeWidth + (this.borderWidth)) + 'px ' + 'solid transparent';

		this.htmlElementSpikeBorder.css('width', '0');
		this.htmlElementSpikeBorder.css('height', '0');
		this.htmlElementSpikeBorder.css('left', cssCode2s);

		this.htmlElementSpikeBorder.css('top', cssCode8s);
		this.htmlElementSpikeBorder.css('border-top', cssCode6s);
		this.htmlElementSpikeBorder.css('border-bottom', cssCode6s);
		this.htmlElementSpikeBorder.css('border-left', cssCode7s);

		this.htmlElementSpikeBorder.css('border-right', '0 solid transparent');
	}
}


    this.htmlCode.html('');
    var text = '';
    
    text += '.bubble\n{\n';
    text += 'position:relative;\n';
    text += 'width: ' + this.boxWidth + 'px;\n';
    text += 'height: ' + this.boxHeight + 'px;\n';
    text += 'padding: ' + this.boxPadding + 'px;\n';
    text += 'background: ' + this.backgroundColor + ';\n';
    text += 'border: ' + this.borderColor + ' solid ' + this.borderWidth + 'px;\n';
    text += '-webkit-border-radius: ' + this.boxRadius + 'px;\n';
    text += '-moz-border-radius: ' + this.boxRadius + 'px;\n';
    text += 'border-radius: ' + this.boxRadius + 'px;\n';
    text += '}';

    text +='\n\n';

    text += '.bubble:after\n{\n';   
    text += 'content: "";\n';
    text += 'position: absolute;\n';
    text += 'top: ' + cssCode8 + 'px;\n';

    if(this.location=='left')
    	text += 'left: -' + this.spikeHeight + 'px;\n';
    if(this.location=='right')
	text += 'right: -' + this.spikeHeight + 'px;\n';
    if(this.location=='bottom' || this.location=='top')
	text += 'left: ' + spikeLocationPX + 'px;\n';

    text += 'border-style: solid;\n';

    if(this.location=='bottom')
    	text += 'border-width: ' + this.spikeHeight + 'px ' + this.spikeWidth + 'px 0;\n';
    if(this.location=='top')
	text += 'border-width: 0 '  + this.spikeWidth + 'px ' + this.spikeHeight + 'px;\n';
    if(this.location=='left')
	text += 'border-width: ' + this.spikeWidth + 'px '  + this.spikeHeight + 'px ' + this.spikeWidth + 'px 0;\n';
    if(this.location=='right')
	text += 'border-width: ' + this.spikeWidth + 'px 0 ' + this.spikeWidth + 'px ' + this.spikeHeight + 'px;\n';

    if(this.location=='bottom' || this.location=='top')
    	text += 'border-color: ' + this.backgroundColor + ' transparent;\n';
    else
	text += 'border-color: transparent ' + this.backgroundColor + ';\n';

    text += 'display: block;\n';
    text += 'width: 0;\n';
    text += 'z-index: 1;\n';
    text += '}';

    text +='\n\n';


if(this.borderWidth>0){

    text += '.bubble:before\n{\n';
    text += 'content: "";\n';
    text += 'position: absolute;\n';


    if(this.location=='bottom')
	text += 'top: ' + cssCode8  + 'px;\n';    //bottom/right/left
    else
	text += 'top: ' + parseInt(cssCode8 - this.borderWidth) + 'px;\n';  //top

    if(this.location=='top' || this.location=='bottom')
	text += 'left: ' + parseInt(spikeLocationPX - this.borderWidth) + 'px;\n';

    if(this.location=='left')
	text += 'left: ' + parseInt(0 - this.spikeHeight - this.borderWidth) + 'px;\n';
    if(this.location=='right')
	text += 'left: ' + parseInt(this.boxWidth + (this.boxPadding*2) + this.borderWidth) + 'px;\n';

    text += 'border-style: solid;\n';

    if(this.location=='bottom')
    	text += 'border-width: ' + parseInt(this.spikeHeight + this.borderWidth) + 'px ' + parseInt(this.spikeWidth + this.borderWidth) + 'px 0;\n';
    if(this.location=='top')
	text += 'border-width: 0 '  + parseInt(this.spikeWidth + this.borderWidth) + 'px ' + parseInt(this.spikeHeight + this.borderWidth) + 'px;\n';
    if(this.location=='left')
	text += 'border-width: ' + parseInt(this.spikeWidth + this.borderWidth) + 'px '  + parseInt(this.spikeHeight + this.borderWidth) + 'px ' + parseInt(this.spikeWidth + this.borderWidth) + 'px 0;\n';
    if(this.location=='right')
	text += 'border-width: ' + parseInt(this.spikeWidth + this.borderWidth) + 'px 0 ' + parseInt(this.spikeWidth + this.borderWidth) + 'px ' + parseInt(this.spikeHeight + this.borderWidth) + 'px;\n';

    if(this.location=='bottom' || this.location=='top')
	text += 'border-color: ' +  this.borderColor + ' transparent;\n';
    else
	text += 'border-color: transparent ' +  this.borderColor + ';\n';

    text += 'display: block;\n';
    text += 'width: 0;\n';
    text += 'z-index: 0;\n';
    text += '}';

}

    this.htmlCode.append(text);
};



function _getAllValuesFromPanelSpeechBubble() {
    
    var options = {};
  
    options['boxHeight'] = parseFloat($('#box-height').val());
    options['boxWidth'] = parseFloat($('#box-width').val());
    options['backgroundColor'] = $('#br-background-color').val();
    options['location'] = $('#select-location :selected').val();
    options['boxRadius'] = parseFloat($('#boxRadius').val());    
    options['spikeWidth'] = parseFloat($('#width').val());
    options['spikeHeight'] = parseFloat($('#height').val());
    options['spikeLocation'] = parseFloat($('#position').val());
   
    options['boxPadding'] = parseFloat($('#box-padding').val());
    options['borderWidth'] = parseFloat($('#box-border').val());

    return options;
};


$('body').ready(function() {
    SpeechBubble = new SpeechBubble(_getAllValuesFromPanelSpeechBubble());
    SpeechBubble.refresh();
    copy_text_button($('#copy-text-input'), $('#speech-bubble-code'));

    /* Border location */
    $('#select-location').live('change', function () {
        var val = $(this).val();
        SpeechBubble.location = val;
        SpeechBubble.refresh();
    });


    $('#slider-position').slider({
        value: 0,
        min: 0,
        max: 100,
        step: 1,
        slide: function(event, ui) {
            var val = parseFloat(ui.value);
            SpeechBubble.spikeLocation = val;
            SpeechBubble.refresh();

            $('#position').val(val);
        }
    });

    $('#position').live('change', function() {
        var val = parseFloat($(this).val());
        SpeechBubble.spikeLocation = val;
        SpeechBubble.refresh();

        $('#slider-position').slider('value', val);
    });


    $('#slider-width').slider({
        value: 10,
        min: 0,
        max: 100,
        step: 1,
        slide: function(event, ui) {
            var val = parseFloat(ui.value);
            SpeechBubble.spikeWidth = val;
            SpeechBubble.refresh();

            $('#width').val(val);
        }
    });

    $('#width').live('change', function() {
        var val = parseFloat($(this).val());
        SpeechBubble.spikeWidth = val;
        SpeechBubble.refresh();

        $('#slider-width').slider('value', val);
    });



    $('#slider-height').slider({
        value: 10,
        min: 0,
        max: 100,
        step: 1,
        slide: function(event, ui) {
            var val = parseFloat(ui.value);
            SpeechBubble.spikeHeight = val;
            SpeechBubble.refresh();

            $('#height').val(val);
        }
    });

    $('#height').live('change', function() {
        var val = parseFloat($(this).val());
        SpeechBubble.spikeHeight = val;
        SpeechBubble.refresh();

        $('#slider-height').slider('value', val);
    });


    $('#slider-box-width').slider({
        value: 130,
        min: 10,
        max: 400,
        step: 1,
        slide: function(event, ui) {
            var val = parseFloat(ui.value);
            SpeechBubble.boxWidth = val;
            SpeechBubble.refresh();

            $('#box-width').val(val);
        }
    });

    $('#box-width').live('change', function() {
        var val = parseFloat($(this).val());
        SpeechBubble.boxWidth = val;
        SpeechBubble.refresh();

        $('#slider-box-width').slider('value', val);
    });


    $('#slider-box-height').slider({
        value: 50,
        min: 10,
        max: 300,
        step: 1,
        slide: function(event, ui) {
            var val = parseFloat(ui.value);
            SpeechBubble.boxHeight = val;
            SpeechBubble.refresh();

            $('#box-height').val(val);
        }
    });


    $('#box-height').live('change', function () {
        var val = parseFloat($(this).val());
        SpeechBubble.boxHeight = val;
        SpeechBubble.refresh();

        $('#slider-box-height').slider('value', val);
    });
    


    $('#slider-box-radius').slider({
        value: 0,
        min: 0,
        max: 100,
        step: 1,
        slide: function(event, ui) {
            var val = parseFloat(ui.value);
            SpeechBubble.boxRadius = val;
            SpeechBubble.refresh();

            $('#box-radius').val(val);
        }
    });

    $('#box-radius').live('change', function() {
        var val = parseFloat($(this).val());
        SpeechBubble.boxRadius = val;
        SpeechBubble.refresh();

        $('#slider-box-radius').slider('value', val);
    });


    $('#slider-box-padding').slider({
        value: 0,
        min: 0,
        max: 20,
        step: 1,
        slide: function(event, ui) {
            var val = parseFloat(ui.value);
            SpeechBubble.boxPadding = val;
            SpeechBubble.refresh();

            $('#box-padding').val(val);
        }
    });

    $('#box-padding').live('change', function() {
        var val = parseFloat($(this).val());
        SpeechBubble.boxPadding = val;
        SpeechBubble.refresh();

        $('#slider-box-padding').slider('value', val);
    });


    $('#slider-box-border').slider({
        value: 0,
        min: 0,
        max: 20,
        step: 1,
        slide: function(event, ui) {
            var val = parseFloat(ui.value);
            SpeechBubble.borderWidth = val;
            SpeechBubble.refresh();

            $('#box-border').val(val);
        }
    });

    $('#box-border').live('change', function() {
        var val = parseFloat($(this).val());
        SpeechBubble.borderWidth = val;
        SpeechBubble.refresh();

        $('#slider-box-border').slider('value', val);
    });


    $('#br-color').live('change', function () {
        SpeechBubble.borderColor = $(this).val();
        SpeechBubble.refresh();
        $('#br-color-button').css('background-color', '#' + $(this).val());
    });

    $('#br-background-color').live('change', function () {
        SpeechBubble.backgroundColor = $(this).val();
        SpeechBubble.refresh();
        $('#br-background-color-button').css('background-color', '#' + $(this).val());
    });

    $('#br-background-color-button').live('click', function () {
        $(this).ColorPickerShow();
    });

    $('#br-color-button').live('click', function () {
        $(this).ColorPickerShow();
    });



    $('#br-background-color-button').ColorPicker({
        onChange: function(hsb, hex, rgb, el) {
            SpeechBubble.backgroundColor = '#' + hex;
            SpeechBubble.refresh();
            $('#br-background-color').val('#' + hex);
            $('#br-background-color-button').css('background-color', '#' + hex);
        },
        onSubmit: function(hsb, hex, rgb, el) {
            SpeechBubble.backgroundColor = '#' + hex;
            SpeechBubble.refresh();
            $('#br-background-color').val('#' + hex);
            $('#br-background-color-button').css('background-color', '#' + hex);
            $(el).ColorPickerHide();
        },
        onBeforeShow: function () {
            $(this).ColorPickerSetColor($('#br-background-color').val());
        },
    })

 
    .bind('keyup', function(){
        $(this).ColorPickerSetColor(this.value);
    });

    $('#br-color-button').ColorPicker({
        onChange: function(hsb, hex, rgb, el) {
            SpeechBubble.borderColor = '#' + hex;
            SpeechBubble.refresh();
            $('#br-color').val('#' + hex);
            $('#br-color-button').css('background-color', '#' + hex);
        },
        onSubmit: function(hsb, hex, rgb, el) {
            SpeechBubble.borderColor = '#' + hex;
            SpeechBubble.refresh();
            $('#br-color').val('#' + hex);
            $('#br-color-button').css('background-color', '#' + hex);
            $(el).ColorPickerHide();
        },
        onBeforeShow: function () {
            $(this).ColorPickerSetColor($('#br-color').val());
        },
    })
    .bind('keyup', function(){
        $(this).ColorPickerSetColor(this.value);
    });
  
    
});   
