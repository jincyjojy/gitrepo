function button_click(val){
    document.getElementById("output_screen").value+=val;
}

function clearDisplay(){
    document.getElementById("output_screen").value="";
}

function equalDisplay(){
    var text = document.getElementById("output_screen").value;
    var result = eval(text);
    document.getElementById("output_screen").value=result;
}