// fills input box on chat box click
// $("div").click(function() {
//   console.log(event.target.innerHTML)
//   // var currenttext = $("li .human .text").text().trim();
//   var currenttext = event.target.innerHTML.trim();
//   $("#inputtext").val(currenttext);
// });

// Input box focus animation
$("#inputtext").focus(function() {
  $(".enterbtn").css({
    '-webkit-transform': 'scale(1.1)',
    '-moz-transform': 'scale(1.1)',
    '-ms-transform': 'scale(1.1)',
    '-o-transform': 'scale(1.1)',
    'transform': 'scale(1.1)'
  });
  // $(".enterbtn").css("background-color", "#efe");
  $(".enterbtn").css("box-shadow", "0px 0px 10px -2px rgba(0,0,0,0.75)");
});
$("#inputtext").focusout(function() {
  $(".enterbtn").css({
    '-webkit-transform': 'scale(1.0)',
    '-moz-transform': 'scale(1.0)',
    '-ms-transform': 'scale(1.0)',
    '-o-transform': 'scale(1.0)',
    'transform': 'scale(1.0)'
  });
  $(".enterbtn").css("background-color", "#fff");
  $(".enterbtn").css("box-shadow", "none");
});

// Creates human dialogue box on enter click, sends API call
$(".enterbtn").click(function() {
  let text = $("#inputtext").val();
  if (text !== "") {
    var fulldialogbox = $('<li>' + '<div class="human">' +
    '<div class="human-icon">' + '<img class="human-image" src="img/human6.png" alt="">' + '</div>' + '<div class="text">' + '</div>' + '</div>' + '</li>');
    fulldialogbox.find(".text").text(text);
    $("#chat_ul").empty();
    $("#chat_ul").append(fulldialogbox);
    send(text);
    $("#inputtext").val("");
  } else {
    return;
  }
});

// Creates human dialogue box on enter keystroke, sends API call
$("#inputtext").focus(function() {
  $(document).keydown(function(e) {
    if (e.which == 13) {
      var text = $("#inputtext").val();
      if (text !== "") {
        var fulldialogbox = $('<li>' + '<div class="human">' +
        '<div class="human-icon">' + '<img class="human-image" src="img/human6.png" alt="">' + '</div>' + '<div class="text">' + '</div>' + '</div>' + '</li>');
        fulldialogbox.find(".text").text(text);
        $("#chat_ul").empty();
        $("#chat_ul").append(fulldialogbox);
        send(text);
        $("#inputtext").val("");
      } else {
        return;
      }
    }
  });
});

// API call
function send(text) {
  var accessToken = config.CLIENT_ACCESS_TOKEN;
  var baseUrl = "https://api.api.ai/v1/";
  $.ajax({
    type: "POST",
    url: baseUrl + "query?v=20150910",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    headers: {
      "Authorization": "Bearer " + accessToken
    },
    data: JSON.stringify({
      query: text,
      lang: "en",
      sessionId: "tuckpuck"
    }),
    success: function(data) {
      buildChatDialogue(data);
    },
    error: function(error) {
      console.log(error);
    }
  });
}

// Creates bot dialogue box on data fufillment
function buildChatDialogue(data) {
  console.log(data.result.fulfillment.speech);
  var fulldialogbox = $('<li>' + '<div class="bot">' + '<div class="text">' + '</div>' + '<div class="bot-icon">' +  '<img class="bot-image" src="img/bot1.png" alt="">' + '</div>' + '</div>' + '</li>');
  if (data.result.fulfillment.speech === "") {
    fulldialogbox.find(".text").text("Please enter valid query");
  } else {
    fulldialogbox.find(".text").text(data.result.fulfillment.speech);
  }
  $("#chat_ul").append(fulldialogbox);
}

// Clear dialogue on clear button click
$("#clearchat").click(function() {
  $("#chat_ul").empty();
});
