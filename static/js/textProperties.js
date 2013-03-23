function TextProperties (options) {
    this.htmlElement = options['htmlElement'] || $('#textExample');
    this.htmlCode = options['htmlCode'] || $('#text-properties-code');
    this.strokeColor = options['strokeColor'] ||'#000000';
    this.fillColor = options['fillColor'] || '#e7a61a';
    this.strokeWidth = options['strokeWidth'] || 0;
    this.fontSize = options['fontSize'] || 20;
};

TextProperties.prototype.refresh = function () {
    strokeWidthText = this.strokeWidth + 'px';
    strokeColorText = this.strokeColor;
    fillColorText = this.fillColor;
    fontSizeText = this.fontSize + 'px';

    this.htmlElement.css('font-size', this.fontSize);
    this.htmlElement.css('-webkit-text-stroke-width', this.strokeWidth);
    this.htmlElement.css('-webkit-text-stroke-color', this.strokeColor);
    this.htmlElement.css('-webkit-text-fill-color', this.fillColor);

    this.htmlCode.html('');
    var text = '<div>font-size: ' + fontSizeText +';</div>';
    text += '<div>-webkit-text-stroke-width: ' + strokeWidthText +';</div>';
    text += '<div>-webkit-text-stroke-color: ' + strokeColorText +';</div>';
    text += '<div>-webkit-text-fill-color: ' + fillColorText +';</div>';
    this.htmlCode.append(text);
};

TextProperties.prototype.fontSize = function (fontSize) {
    this.fontSize = fontSize;
};

TextProperties.prototype.strokeWidth = function (border) {
    this.strokeWidth = border;
};

function _getAllValuesFromPanelBorderRadius() {
    var options = {};
    options['borderStyle'] = $('#select-border :selected').val();
    options['strokeColor'] = $('#tp-color').val();
    options['fillColor'] = $('#tp-background-color').val();
    options['strokeWidth'] = parseFloat($('#stroke-width').val());
    options['fontSize'] = parseFloat($('#font-size').val());
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
    $('#text-value').on(function(){
        text = $(this).val();
        $('#textExample').html(text);
    });
    $('#font-size').live('keyup', function() {
        var val = _getFromField($(this).val(), 20, 100, $('#font-size'));
        textProperties.fontSize = val;
        textProperties.refresh();

        $('#slider-font-size').slider('value', val);
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
});
