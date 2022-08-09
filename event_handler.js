var table = document.getElementById("table");
var trList = table.getElementsByTagName("tr");
for(var index = 0; index < trList.length; index++) {
    (function (index){
        trList[index].addEventListener("click", function(event) {
            alert("Row " + (index+1) + " Clicked");
        });
    }(index));
}