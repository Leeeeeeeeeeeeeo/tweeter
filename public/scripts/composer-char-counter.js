
$(document).ready(function() {
  $("textarea").keyup(function(){
    let inputLength = $(this).val().length;       
    $(".counter").text(i = 140 - inputLength);    //counting the letter
   if(inputLength > 140){
      $(".counter").css("color", "red");           //changing the text color if needed
    } else {
    $(".counter").css("color", "black");
    }
  }) 
});



