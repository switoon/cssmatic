$(document).ready(function() {
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
        if ($(this).attr("class")=="marker markerOn"){
            $(this).removeClass("markerOn");
        } else {
            $(this).addClass("markerOn markerActive");
            percent = $(this).attr("id").split("-")[1];
            $("#position").val(percent+"%");
        }
    });
    $("#radio").buttonset();
    refresh();
    $("#radio").on("change", function(){
        refresh();
    });
    $("#animationName").on("keyup", function(){
        refresh();
    })

});

kfDuration = 2;
kfTiming = "ease-in-out";
kfDelay = 6;
kfIteration = "infinite";
kfDirection = "";


function refresh(){
    kfName = $("#animationName").val() || "animation";
    element = $("input[name=element]:checked").val();
    $("#keyframes-preview").html(element);
    csstext = "#element { \n\t"+
                "-webkit-animation: "+kfName+" "+
                kfDuration+"s "+kfTiming+" "+kfDelay+"s "+kfIteration+" "+kfDirection+";\n\t"+
                "animation: "+kfName+" "+
                kfDuration+"s "+kfTiming+" "+kfDelay+"s "+kfIteration+" "+kfDirection+";\n}";
    $("#cssCode").text(csstext);
}