function Animation(options){
   this.animationName = $("#animationName").val() || "animation";
   this.iteration = $("#animationIteration").val() || "infinite";
   this.delay = $("#animationDelay").val() || 0;
   this.timing = $("#kf-TFunction option:selected").val() || "ease";
   this.direction = $("#kf-Direction option:selected").val() || "normal";
   this.duration = $("#animationDuration").val() || 5;
   this.element = $("input[name=element]:checked").attr("id") || "text";
   this.cssCode = $('#cssCode');
   this.fotogramas = {};
}
function _getAllValuesFromPanelKeyframes() {
   var options = {};
   options['iteration'] = parseFloat($("#animationIteration").val());
   options['delay'] = parseFloat($("#animationDelay").val());
   options['timing'] = $('#kf-TFunction option:selected').val();
   options['direction'] = $("#kf-Direction option:selected").val();
   options['duration'] = parseFloat($("#animationDuration").val());
   options['element'] = $("input[name=element]:checked").attr("id");
   options['animationName'] = $("#animationName").val();
   options['cssCode'] = $('#cssCode');
   options['fotogramas'] = {};
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

$(document).ready(function() {
   animation = new Animation(_getAllValuesFromPanelKeyframes());
   animation.refresh();
   $(".botonera").hide();
   $("#tabs").tabs();
   keyframe = $("#kf-keyframe").html();
    //$("#kf-keyframe").remove();
    copy_text_button($('#copy-text-input'), $('#cssCode'));
    if ($.browser.msie) {
      var msg = 'Looks like your browser doesn\'t fully support CSS keyframes.';
      msg += 'You need a recent version of Firefox, Chrome or Safari to use this tool.';
      alert(msg);
  }
  for (marker=0; marker<=100; marker+=2){
      $("#position-markers").append("<div class='marker' id='marker-"+marker+"' title='"+marker+"%'></div>");
  };

  $(".marker").on("click", function(){
      $(".marker").each(function(){
         $(this).removeClass("markerActive");
     });
      $(this).addClass("markerActive");
      $("#position").val($(this).attr("title"));
      $("#keyframe").html($("#position").val());
      comprobarMarker();
  });
  $(".marker:first-of-type").addClass("markerOn markerActive");
  $(".marker:last-of-type").addClass("markerOn");
  $("#radio").buttonset();
  $("#radio").on("change", function(){
      animation.element = $("input[name=element]:checked").attr("id");
      animation.refresh();
  });
  $("#initialHtml").on("keyup", function(){
      animation.refresh();
  });
  $("#initialCss").on("keyup", function(){
      animation.refresh();
  });
  $("#animationName").on("keyup", function(){
      animation.animationName = ($("#animationName").val() != "") ? $("#animationName").val() : "animation";
      animation.refresh();
  });
  $("#animationDelay").on("keyup", function(){
      var val = _getFromField($(this).val(), 0, 1000, $('#animationDelay'));
      animation.delay = val;
      animation.refresh();
  });
  $("#animationDuration").on("keyup", function(){
      var val = _getFromField($(this).val(), 0, 1000, $('#animationDuration'));
      animation.duration = val;
      animation.refresh();
  });
  $("#animationIteration").on("keyup", function(){
      var val = _getFromField($(this).val(), 0, 1000, $('#animationIteration'));
      (val == 0) ? val = "infinite" : val = val;
      animation.iteration = val;
      animation.refresh();
  });
  $("#kf-TFunction").on("change", function(){
      animation.timing = $("#kf-TFunction option:selected").val();
      animation.refresh();
  });
  $("#kf-Direction").on("change", function(){
      animation.direction = $("#kf-Direction option:selected").val();
      animation.refresh();
  });
  $("#kf-iNNertext").keyup(function(){
      animation.refresh();
  });
  ShowOptions = true;
  $("#kfOptionsBtn").click(function(){
      $("#kf-Options").slideToggle();
      if (ShowOptions) {
         $("#kfOptionsBtn").html("Show options");
         ShowOptions = false;
     } else {
         $("#kfOptionsBtn").html("Hide options");
         ShowOptions = true;
     }
 });
  cargarPropiedades();
});
function comprobarMarker(){

}
function saveKF(){
   keyframe = $("#position").val();
   id = $("#position").val().split("%")[0];
   $("#marker-"+id).addClass("markerOn");
   $("#kfproperties").css("box-shadow", "0px 0px 10px 2px lightgreen");
   animation.fotogramas[keyframe] = [];
   $(".propiedadSelect").each(function(){
        propiedad = $(this).attr("id").split("_")[1];
        animation.fotogramas[keyframe][propiedad] = valorPropiedad(id, propiedad);
   });
   console.log(animation);
}
function clearKF(){
   keyframe = $("#position").val();
   delete animation.fotogramas[keyframe];
   id = $("#position").val().split("%")[0];
   $("#marker-"+id).removeClass("markerOn");
   $("#kfproperties").html("");
}
function valorPropiedad(fotograma, propiedad){
    switch(properties[propiedad]){
        case "length":
            return $("#"+fotograma+"_"+propiedad+"_px").val()+"px" || "0px";
            break;
        case "color":
            return $("#"+fotograma+"_"+propiedad+"_colorInput").val() || "#000";
            break;
        case "opacity":
        case "visibility":
        case "font-weight":
            return $("#"+fotograma+"_"+propiedad+"_select option:selected").val();
            break;
        case "integer":
        case "number":
            return $("#"+fotograma+"_"+propiedad+"_number").val() || 1;
            break;
        case "text-shadow":
            vShadow = $("#"+fotograma+"_"+propiedad+"_vShadow").val() || 0; 
            hShadow = $("#"+fotograma+"_"+propiedad+"_hShadow").val() || 0; 
            bShadow = $("#"+fotograma+"_"+propiedad+"_Blur").val() || 0; 
            cShadow = $("#"+fotograma+"_"+propiedad+"_colorInput").val() || "#000"; 
            return hShadow + "px " +vShadow + "px "+bShadow + "px " + cShadow; 
            break;
        case "box-shadow":
            vShadow = $("#"+fotograma+"_"+propiedad+"_vShadow").val() || 0;
            hShadow = $("#"+fotograma+"_"+propiedad+"_hShadow").val() || 0;
            bShadow = $("#"+fotograma+"_"+propiedad+"_Blur").val() || 0;
            Spread = $("#"+fotograma+"_"+propiedad+"_Spread").val() || 0;
            cShadow = $("#"+fotograma+"_"+propiedad+"_colorInput").val() || "#000";
            inOut = $("#"+fotograma+"_"+propiedad+"_InOut option:selected").val() || "outset";
            return hShadow + "px " +vShadow + "px "+bShadow + "px "+Spread + "px "+ cShadow + " " + inOut; 
            break;
    }       
}
var keyframes = [];
function cargarPropiedades(){
   $.getJSON(
      "/js/cssproperties.json", 
      function(data){
         properties = data;
     }
     );
}
function removePropertie(elem){
   $(elem).parent().parent().empty().remove();
   ($(".propiedades").length) ? $(".botonera").show() : $(".botonera").hide();
}
function cargarTipo(elem){
   keyframe = $("#position").val().split("%")[0];
   selected = $(elem).val();
   $(elem).attr("id", keyframe+"_"+selected);
   switch (properties[selected]){
      case "length":  $(elem).next().html('<div class="text-1">'+
         '<input id="'+keyframe+"_"+selected+'_px" type="text" value="" class="number">px.</div>');
      break;
      case "color":   $(elem).next().html('<div><div class="text-2">'+
         '<input type="text" value="" id="'+keyframe+"_"+selected+'_colorInput" readonly>'+
         '<a id="'+keyframe+"_"+selected+'_color" class="btn-color color-3" href="javascript:;">'+
         '</a></div>');
      addColorPicker(keyframe+"_"+selected);
      break;
      case "integer":
      case "number":  $(elem).next().html('<div class="text-1">'+
         '<input type="text" value="" class="number" id="'+keyframe+"_"+selected+'_number"></div>');
      break;
      case "text-shadow": $(elem).next().html('<div class="text-1">'+
         '<input id="'+keyframe+"_"+selected+'_hShadow'+'" type="text" value="">px.</div>'+
         '<div class="text-1"><input id="'+keyframe+"_"+selected+'_vShadow'+'" type="text" value="">px.</div>'+
         '<div class="text-1"><input id="'+keyframe+"_"+selected+'_Blur'+'" type="text" value="">px.</div>'+
         '</div><div class="text-2"><input type="text" value="" id="'+keyframe+"_"+selected+'_colorInput" readonly></div>'+
         '<a id="'+keyframe+"_"+selected+'_color" class="btn-color color-3" href="javascript:;"></a>'+
         '</div>');
      addColorPicker(keyframe+"_"+selected);
      break;
      case "box-shadow": $(elem).next().html('<div><select id="'+keyframe+"_"+selected+'_InOut" class="propSelect">'+
         '<option value="outset">Outset</option>'+
         '<option value="inset">Inset</option></select>'+
         '<div class="text-1"><input id="'+keyframe+"_"+selected+'_hShadow'+'" type="text" value="">px.</div>'+
         '<div class="text-1"><input id="'+keyframe+"_"+selected+'_vShadow'+'" type="text" value="">px.</div>'+
         '<div class="text-1"><input id="'+keyframe+"_"+selected+'_Blur'+'" type="text" value="">px.</div>'+
         '<div class="text-1"><input id="'+keyframe+"_"+selected+'_Spread'+'" type="text" value="">px.</div>'+
         '</div><div class="text-2"><input type="text" value="" id="'+keyframe+"_"+selected+'_colorInput" readonly></div>'+
         '<a id="'+keyframe+"_"+selected+'_color" class="btn-color color-3" href="javascript:;"></a>'+
         '</div>');
      addColorPicker(keyframe+"_"+selected);
      break;
      case "visibility": $(elem).next().html('<select id="'+keyframe+"_"+selected+'_select" class="propSelect">'+
         '<option value="visible">Visible</option>'+
         '<option value="inherit">Inherit</option>'+
         '<option value="hidden">Hidden</option></select>');
      break;
      case "opacity": $(elem).next().html('<select id="'+keyframe+"_"+selected+'_select" class="propSelect">'+
         '<option value="0">0%</option>'+
         '<option value="0.1">10%</option>'+
         '<option value="0.2">20%</option>'+
         '<option value="0.3">30%</option>'+
         '<option value="0.4">40%</option>'+
         '<option value="0.5">50%</option>'+
         '<option value="0.6">60%</option>'+
         '<option value="0.7">70%</option>'+
         '<option value="0.8">80%</option>'+
         '<option value="0.9">90%</option>'+
         '<option value="1">100%</option></select>');
      break;
      case "font-weight": $(elem).next().html('<select id="'+keyframe+"_"+selected+'_select" class="propSelect">'+
         '<option value="normal">Normal</option>'+
         '<option value="bold">Bold</option>'+
         '<option value="bolder">Bolder</option>'+
         '<option value="lighter">Lighter</option>'+
         '<option value="100">100</option>'+
         '<option value="200">200</option>'+
         '<option value="300">300</option>'+
         '<option value="400">400</option>'+
         '<option value="500">500</option>'+
         '<option value="600">600</option>'+
         '<option value="700">700</option>'+
         '<option value="800">800</option>'+
         '<option value="900">900</option></select>');
      break;
  }    
}
function addColorPicker(id){
   $("#"+id+"_color").ColorPicker({
      onChange: function(hsb, hex, rgb, el) {
         $('#'+id+"_color").css('background-color', '#' + hex);
         $('#'+id+"_colorInput").val("#"+hex);
     },
     onSubmit: function(hsb, hex, rgb, el) {
         $('#'+id+"_color").css('background-color', '#' + hex);
         $('#'+id+"_colorInput").val("#"+hex);
         $(el).ColorPickerHide();
     }
 })
   $('#'+id+"_color").live('click', function () {
      $(this).ColorPickerShow();
  });
}
function addPropertie(){ 
   keyframe = $("#position").val().split("%")[0];
   (properties[keyframe]) ? id = properties[keyframe].length : id = 0;
   $("#kfproperties").append("<div class='propiedades'><select onchange='cargarTipo(this)' class='propiedadSelect'"+
      " id=''></select><div class='controles'></div>"+
      "<div class='botonera2'>"+
      "<img onclick='removePropertie(this)' class='kf-btn' src='/img/remove.png'"+ 
      " alt='{% trans %}Delete propertie{% endtrans %}'></div></div>");
   for (propiedad in properties){
      if (!($("#"+keyframe+"_"+propiedad).length)){
         $(".propiedadSelect").append("<option value='"+propiedad+"'>"+propiedad+"</option>");
     }
 }
 cargarTipo($(".propiedadSelect")[$(".propiedadSelect").length-1]);
 $(".botonera").show();
}
Animation.prototype.refresh = function () { 
   if (this.element == "img"){
      $("#kf-text").hide();
      $("#kf-other").hide();
      $("#keyframes-preview").html($("#"+this.element).val());
      this.cssCode = "img { \n"+
      "-o-webkit-animation: "+this.name+" "+
      this.duration+"s "+this.timing+" "+this.delay+"s "+this.iteration+" "+this.direction+";\n"+
      "-webkit-animation: "+this.name+" "+
      this.duration+"s "+this.timing+" "+this.delay+"s "+this.iteration+" "+this.direction+";\n"+
      "animation: "+this.name+" "+
      this.duration+"s "+this.timing+" "+this.delay+"s "+this.iteration+" "+this.direction+";\n}";
      $("#cssCode").text(this.cssCode);
  } else if (this.element == "text") {
      $("#kf-text").show();
      $("#kf-other").hide();
      $("#keyframes-preview").html($("#"+this.element).val());
      $("#animatedText").html(($("#kf-iNNertext").val() != "") ? $("#kf-iNNertext").val() : "Lorem Ipsum");
      this.cssCode = "#text { \n"+
      "-o-animation: "+this.animationName+" "+
      this.duration+"s "+this.timing+" "+this.delay+"s "+this.iteration+" "+this.direction+";\n"+
      "-webkit-animation: "+this.animationName+" "+
      this.duration+"s "+this.timing+" "+this.delay+"s "+this.iteration+" "+this.direction+";\n"+
      "animation: "+this.animationName+" "+
      this.duration+"s "+this.timing+" "+this.delay+"s "+this.iteration+" "+this.direction+";\n}";
      $("#cssCode").text(this.cssCode);
  } else {
      findId = 0;
      $("#kf-text").hide();
      $("#kf-other").show();
      htmlTag = (($("#initialHtml").val()) != "" ? $("#initialHtml").val() : $("#"+this.element).val());
      $("#keyframes-preview").html(htmlTag);
      if ($("#initialHtml").val() != ""){
         findId = $("#initialHtml").val().search(/id=["|']{1}\w*n*["|']{1}/);
     }
     if (findId == -1) {
         id="#Element";
     }else{ 
         id="#"+$("#keyframes-preview").children()[0].getAttribute("id");
     }
     this.cssCode = ($("#initialCss").val()) != "" ? id + " {\n"+ $("#initialCss").val() : id+" {\nwidth: 80%;\nheight: 50%;\nbackground: crimson;";

     this.cssCode += "\n-o-animation: "+this.name+" "+
     this.duration+"s "+this.timing+" "+this.delay+"s "+this.iteration+" "+this.direction+";\n"+
     "-webkit-animation: "+this.name+" "+
     this.duration+"s "+this.timing+" "+this.delay+"s "+this.iteration+" "+this.direction+";\n"+
     "animation: "+this.name+" "+
     this.duration+"s "+this.timing+" "+this.delay+"s "+this.iteration+" "+this.direction+";\n}";
     $("#kf-style").html(this.cssCode);
     $("#cssCode").text(this.cssCode);
 }
}