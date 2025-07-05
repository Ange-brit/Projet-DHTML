var images = document.querySelectorAll("div img");
var j = 0;
var c = images.length; // le nombre d'image est stocke dans le var c

//cette boucle ci-dessous permet de commencer de suite au image 1
for(var i = 0; i < c; i++){
    images[i].style.display = "none";
}
images[0].style.display = "block";

setInterval(function(){
    images[j].style.display = "none";
    j++;

    if(j >= c){
        j = 0;
    }
    images[j].style.display = "block";
}, 5000);