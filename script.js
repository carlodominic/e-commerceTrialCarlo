let bigImg = document.querySelector('.big-img img');

function showImg(pic){
    bigImg.src = pic;
    magnify(bigImg.id, 4); // call magnify function with new image ID
}

function magnify(imgID, zoom) {
    var img, glass, w, h, bw;
    img = document.getElementById(imgID);
    var container = img.parentElement;
  
    glass = document.createElement("DIV");
    glass.setAttribute("class", "img-magnifier-glass");
  
    container.insertBefore(glass, img);
  
    glass.style.backgroundImage = "url('" + img.src + "')";
    glass.style.backgroundRepeat = "no-repeat";
    glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
    bw = 3;
    w = glass.offsetWidth / 2;
    h = glass.offsetHeight / 2;
  
    container.addEventListener("mousemove", moveMagnifier);
    container.addEventListener("touchmove", moveMagnifier);
    container.addEventListener("wheel", zoomMagnifier);
  
    function moveMagnifier(e) {
        var pos, x, y;
        e.preventDefault();
        pos = getCursorPos(e);
        x = pos.x;
        y = pos.y;
        if (x > img.width - (w / zoom)) {x = img.width - (w / zoom);}
        if (x < w / zoom) {x = w / zoom;}
        if (y > img.height - (h / zoom)) {y = img.height - (h / zoom);}
        if (y < h / zoom) {y = h / zoom;}
        glass.style.left = (x - w) + "px";
        glass.style.top = (y - h) + "px";
        glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
        glass.style.display = "block";
    }
  
    container.addEventListener("mouseleave", function() {
        glass.style.display = "none";
    });
  
    function getCursorPos(e) {
        var a, x = 0, y = 0;
        e = e || window.event;
        a = img.getBoundingClientRect();
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return {x : x, y : y};
    }
  
    function zoomMagnifier(e) {
        e.preventDefault();
        var oldZoom = zoom; // store old zoom level
        zoom += e.deltaY * -0.01;
        if (zoom < 1) {zoom = 1;}
        if (zoom > 10) {zoom = 10;}
        glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
        glass.style.transition = "background-size 0.2s ease-out"; // add transition effect
        setTimeout(function() { // remove transition effect after 0.2 seconds
            glass.style.transition = "";
        }, 200);
    }
}

magnify(bigImg.id, 4);
