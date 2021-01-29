function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}
includeHTML();
AOS.init();
AOS.init({
    disable: false,
    offset:240,
    delay:0,
    duration: 800,
    easing:'ease',
});

$(window).scroll(function() {
            var scroll = $(window).scrollTop();
            if (scroll > 50) {
                $('.fixed-top').css('background', 'rgba(0, 0, 0, 1)');
            } else {
                $('.fixed-top').css('background', 'transparent');
            }
            
        });

$(window).resize(function(){
    if($(window).width()<480){
        $('.display-2').removeClass('display-2')
    }
    else{
        $('h1').addClass('display-2')
    }
});