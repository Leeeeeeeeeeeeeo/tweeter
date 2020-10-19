/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const { json } = require("body-parser");




$(document).ready(function() {


const reload = function(){
  $.ajax ({
    method: "GET",
    url:"/tweets/",
    dataType: "json",
    success: function(result){
      renderTweets(result)
      }
    })
  }
reload()


 const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": "10 days ago"
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": "10 days ago"
    }
  ]

  /* 
Generator new Tweet and render to data obj
*/

const createTweetElement = function(tweetData) {      
  let $tweet=  
  `<article class = "newarticle">
  <img src = "${tweetData.user.avatars}"/>
  <a class="name"> ${tweetData.user.name} </a>
  <a class = "hiddenText">${tweetData.user.handle}</a>
  <p class = "content">${tweetData.content.text}</p>
  <hr>
  <footer class ="tweetsfooter"> ${new Date(tweetData.created_at)}
  <div class = "tweetsicon" >
  <ion-icon name="flag"> </ion-icon>
  <ion-icon  name="repeat"> </ion-icon>
  <ion-icon  name="heart"> </ion-icon>
  </div>
  </footer>
  </article>`

  return $tweet;
}


const renderTweets = function(tweets) {
  for(let i of tweets){
    $("#tweets").prepend(createTweetElement(i))
  }
}

/* 
The function will first to validate if the tweet is qualifying, if not, shows the error message.

If qualifyed, using ajax to post and get the tweet.
*/


$(".btn.tweet").on('click', function () {
  event.preventDefault()
  $("p.err").text("") 
  if(!$("textarea").val()){
  $("p.errorMassage1").text("👺 Too short, plz at lease put in one letter").slideUp().slideDown();
    } else if(($("textarea").val().length > 140)){
      $("p.errorMassage2").text("👿 Too long, keep it short plz ").slideUp().slideDown();
    } else {
       $("p.err").text("") 
      const $tweet = $("form")       
        $.ajax({
          type: "POST",
          url: "/tweets/",
          data: $tweet.serialize(),
          success: function(){
            $.ajax ({
              method: "GET",
              url:"/tweets/",
              dataType: "json",
              success: function(result){
                renderTweets(result);
              }             
            })
          }});   
    }
  })  
});




