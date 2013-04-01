function TextProperties (options) {
    this.htmlElement = options['htmlElement'] || $('#textExample');
    this.htmlCode = options['htmlCode'] || $('#text-properties-code');
    this.strokeColor = options['strokeColor'] ||'#000000';
    this.fillColor = options['fillColor'] || '#e7a61a';
    this.strokeWidth = options['strokeWidth'] || 0;
    this.fontSize = options['fontSize'] || 20;
    this.vShadow = options['vShadow'] || 0;
    this.hShadow = options['hShadow'] || 0;
    this.bShadow = options['bShadow'] || 0;
    this.cShadow = options['cShadow'] || '#000000';
};

TextProperties.prototype.refresh = function () {
    strokeWidthText = this.strokeWidth + 'px';
    strokeColorText = this.strokeColor;
    fillColorText = this.fillColor;
    fontSizeText = this.fontSize + 'px';
    ffstrokeText = '';
    shadowText = '';
    shadow = false;
    i=0;
    if (this.vShadow != 0 || this.hShadow !=0 || this.bShadow !=0){
        shadowText = this.hShadow+'px '+this.vShadow+'px '+this.bShadow+'px '+this.cShadow;
        shadow = true;
    } else {
        shadow = false;
    }
    while (i<this.strokeWidth){
        i++;
        if (i == this.strokeWidth){
            ffstrokeText += i+'px '+i+'px '+this.strokeColor+', -'+i+'px -'+i+'px '+this.strokeColor+', -'+i+'px '+i+'px '+this.strokeColor+', '+i+'px -'+i+'px '+this.strokeColor;
        } else {
            ffstrokeText += i+'px '+i+'px '+this.strokeColor+', -'+i+'px -'+i+'px '+this.strokeColor+', -'+i+'px '+i+'px '+this.strokeColor+', '+i+'px -'+i+'px '+this.strokeColor+', ';           
        }
    }

    this.htmlElement.css('font-size', this.fontSize);
    this.htmlElement.css('color', this.fillColor);
    this.htmlElement.css('-webkit-text-stroke-width', this.strokeWidth);
    this.htmlElement.css('-webkit-text-stroke-color', this.strokeColor);
    this.htmlElement.css('-webkit-text-fill-color', this.fillColor);

    this.htmlCode.html('');
    var text = '<div>font-size: ' + fontSizeText +';</div>';
    text += '<div>color: ' + fillColorText +';</div>';
    if (this.strokeWidth != 0 || shadow == true){
        if (this.strokeWidth != 0 && shadow == true){
            text += '<div>text-shadow: ' +ffstrokeText+', '+shadowText +';</div>';
            text += '<div>-webkit-text-stroke-width: ' + strokeWidthText +';</div>';
            text += '<div>-webkit-text-stroke-color: ' + strokeColorText +';</div>';
            text += '<div>-webkit-text-fill-color: ' + fillColorText +';</div>';
            this.htmlElement.css('text-shadow', ffstrokeText+', '+shadowText);
        } else if (this.strokeWidth == 0 && shadow == true){
            text += '<div>text-shadow: ' +shadowText +';</div>';
            this.htmlElement.css('text-shadow', shadowText);
        } else {
            this.htmlElement.css('text-shadow', ffstrokeText);
            text += '<div>text-shadow: ' +ffstrokeText+';</div>';
            text += '<div>-webkit-text-stroke-width: ' + strokeWidthText +';</div>';
            text += '<div>-webkit-text-stroke-color: ' + strokeColorText +';</div>';
            text += '<div>-webkit-text-fill-color: ' + fillColorText +';</div>';
        }
        
    }    
    this.htmlCode.append(text);
};

TextProperties.prototype.fontSize = function (fontSize) {
    this.fontSize = fontSize;
};

TextProperties.prototype.strokeWidth = function (strokeWidth) {
    this.strokeWidth = strokeWidth;
};

function _getAllValuesFromPanelBorderRadius() {
    var options = {};
    options['strokeColor'] = $('#tp-color').val();
    options['fillColor'] = $('#tp-background-color').val();
    options['strokeWidth'] = parseFloat($('#stroke-width').val());
    options['fontSize'] = parseFloat($('#font-size').val());
    options['hShadow'] = parseFloat($('#horizontal-shadow').val());
    options['vShadow'] = parseFloat($('#vertical-shadow').val());
    options['bShadow'] = parseFloat($('#blur-shadow').val());
    options['cShadow'] = $('#tp-shadow-color').val();
    return options;
};

function _getFromField(value, min, max, elem) {
    var val = parseFloat(value);
    if (isNaN(val) || val < min) {
        val = 0;
    } else if (val > max) {
        val = max;
    }

    if (elem)
        elem.val(val);

    return val;
}

$('body').ready(function() {
    textProperties = new TextProperties(_getAllValuesFromPanelBorderRadius());
    textProperties.refresh();

    copy_text_button($('#copy-text-input'), $('#text-properties-code'));

    /* Text Edit */
    $('#text-value').keyup(function(){
        text = $(this).val();
        $('#textExample').html(text);
    });
    $('#font-size').live('keyup', function() {
        var val = _getFromField($(this).val(), 20, 100, $('#font-size'));
        textProperties.fontSize = val;
        textProperties.refresh();

        $('#slider-font-size').slider('value', val);
    });

    $('#stroke-width').live('keyup', function() {
        var val = _getFromField($(this).val(), 0, 10, $('#stroke-width'));
        textProperties.strokeWidth = val;
        textProperties.refresh();

        $('#slider-stroke-width').slider('value', val);
    });

    $('#slider-font-size').slider({
        value: 60,
        min: 20,
        max: 100,
        step: 1,
        slide: function(event, ui) {
            var val = _getFromField(ui.value, 20, 100);
            textProperties.fontSize = val;
            textProperties.refresh();

            $('#font-size').val(val);
        }
    });

    /* Stroke width */
    $('#slider-stroke-width').slider({
        value: 0,
        min: 0,
        max: 10,
        step: 1,
        slide: function(event, ui) {
            var val = _getFromField(ui.value, 0, 10);
            textProperties.strokeWidth = val;
            textProperties.refresh();

            $('#stroke-width').val(val);
        }
    });

    /* Text shadow */
    $('#vertical-shadow').live('keyup', function() {
        var val = _getFromField($(this).val(), -100, 100, $('#vertical-shadow'));
        textProperties.vShadow = val;
        textProperties.refresh();

        $('#slider-vertical-shadow').slider('value', val);
    });
    $('#horizontal-shadow').live('keyup', function() {
        var val = _getFromField($(this).val(), -100, 100, $('#horizontal-shadow'));
        textProperties.hShadow = val;
        textProperties.refresh();

        $('#slider-horizontal-shadow').slider('value', val);
    });
    $('#blur-shadow').live('keyup', function() {
        var val = _getFromField($(this).val(), 0, 50, $('#blur-shadow'));
        textProperties.bShadow = val;
        textProperties.refresh();

        $('#slider-blur-shadow').slider('value', val);
    });
    $('#slider-vertical-shadow').slider({
        value: 0,
        min: -100,
        max: 100,
        step: 1,
        slide: function(event, ui) {
            var val = _getFromField(ui.value, -100, 100);
            textProperties.vShadow = val;
            textProperties.refresh();

            $('#vertical-shadow').val(val);
        }
    });
    $('#slider-horizontal-shadow').slider({
        value: 0,
        min: -100,
        max: 100,
        step: 1,
        slide: function(event, ui) {
            var val = _getFromField(ui.value, -100, 100);
            textProperties.hShadow = val;
            textProperties.refresh();

            $('#horizontal-shadow').val(val);
        }
    });
    $('#slider-blur-shadow').slider({
        value: 0,
        min: 0,
        max: 50,
        step: 1,
        slide: function(event, ui) {
            var val = _getFromField(ui.value, 0, 50);
            textProperties.bShadow = val;
            textProperties.refresh();

            $('#blur-shadow').val(val);
        }
    });

    /* Color (Border and background) */
    $('#tp-color').live('change', function () {
        textProperties.strokeColor = $(this).val();
        textProperties.refresh();
        $('#tp-color-button').css('background-color', '#' + $(this).val());
    });

    $('#tp-background-color').live('change', function () {
        textProperties.fillColor = $(this).val();
        textProperties.refresh();
        $('#tp-background-color-button').css('background-color', '#' + $(this).val());
    });

    $('#tp-background-color-button').live('click', function () {
        $(this).ColorPickerShow();
    });

    $('#tp-shadow-color').live('change', function () {
        textProperties.cShadow = $(this).val();
        textProperties.refresh();
        $('#tp-shadow-color-button').css('background-color', '#' + $(this).val());
    });

    $('#tp-shadow-color-button').live('click', function () {
        $(this).ColorPickerShow();
    });

    $('#tp-color-button').live('click', function () {
        $(this).ColorPickerShow();
    });

    $('#tp-background-color-button').ColorPicker({
        onChange: function(hsb, hex, rgb, el) {
            textProperties.fillColor = '#' + hex;
            textProperties.refresh();
            $('#tp-background-color').val('#' + hex);
            $('#tp-background-color-button').css('background-color', '#' + hex);
        },
        onSubmit: function(hsb, hex, rgb, el) {
            textProperties.fillColor = '#' + hex;
            textProperties.refresh();
            $('#tp-background-color').val('#' + hex);
            $('#tp-background-color-button').css('background-color', '#' + hex);
            $(el).ColorPickerHide();
        },
        onBeforeShow: function () {
            $(this).ColorPickerSetColor($('#tp-background-color').val());
        },
    })
    .bind('keyup', function(){
        $(this).ColorPickerSetColor(this.value);
    });

    $('#tp-color-button').ColorPicker({
        onChange: function(hsb, hex, rgb, el) {
            textProperties.strokeColor = '#' + hex;
            textProperties.refresh();
            $('#tp-color').val('#' + hex);
            $('#tp-color-button').css('background-color', '#' + hex);
        },
        onSubmit: function(hsb, hex, rgb, el) {
            textProperties.strokeColor = '#' + hex;
            textProperties.refresh();
            $('#tp-color').val('#' + hex);
            $('#tp-color-button').css('background-color', '#' + hex);
            $(el).ColorPickerHide();
        },
        onBeforeShow: function () {
            $(this).ColorPickerSetColor($('#tp-color').val());
        },
    })
    .bind('keyup', function(){
        $(this).ColorPickerSetColor(this.value);
    });

    $('#tp-shadow-color-button').ColorPicker({
        onChange: function(hsb, hex, rgb, el) {
            textProperties.cShadow = '#' + hex;
            textProperties.refresh();
            $('#tp-shadow-color').val('#' + hex);
            $('#tp-shadow-color-button').css('background-color', '#' + hex);
        },
        onSubmit: function(hsb, hex, rgb, el) {
            textProperties.cShadow = '#' + hex;
            textProperties.refresh();
            $('#tp-shadow-color').val('#' + hex);
            $('#tp-shadow-color-button').css('background-color', '#' + hex);
            $(el).ColorPickerHide();
        },
        onBeforeShow: function () {
            $(this).ColorPickerSetColor($('#tp-shadow-color').val());
        },
    })
    .bind('keyup', function(){
        $(this).ColorPickerSetColor(this.value);
    });
});