// Make things happen on dropdown button clicks
$("body").click(function(e) {
  if(event.target.innerHTML === "English to Spanish"){
    $("#inputtext").val("How do you say I would like a cup of coffee in spanish?");
  };
  if(event.target.innerHTML === "English to Thai"){
    $("#inputtext").val("Translate can you recommend somewhere to eat into Thai");
  };
  if(event.target.innerHTML === "English to Russian"){
    $("#inputtext").val("Translate where is the nearest museum into Russian");
  };
  if(event.target.innerHTML === "English to Chinese"){
    $("#inputtext").val("what time will the bus arrive in Chinese");
  };
  if(event.target.innerHTML === "English to Arabic"){
      $("#inputtext").val("translate what time does the bank close into Arabic");
  };
  if(event.target.innerHTML === "Spanish to English"){
    $("#inputtext").val("buenas tardes tengo una reservación into English");
  };
  if(event.target.innerHTML === "Spanish to German"){
    $("#inputtext").val("translate buenos dias como estas into German");
  };
});

// Input box focus animation
$("#inputtext").focus(function() {
  $(".enterbtn").css({
    '-webkit-transform': 'scale(1.1)',
    '-moz-transform': 'scale(1.1)',
    '-ms-transform': 'scale(1.1)',
    '-o-transform': 'scale(1.1)',
    'transform': 'scale(1.1)'
  });
  $(".enterbtn").addClass('rotated');
  $(".fa-arrow-right").addClass('unrotated');
  if ( $(".cd-dropdown span span.under-option").length !== 0) {
    $(".cd-dropdown span span.under-option")[0].innerHTML = "Examples";
    $(".cd-dropdown span span.under-option").addClass("font-reset");
  }
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
  $(".enterbtn").removeClass('rotated');
  $(".fa-arrow-right").removeClass('unrotated');
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
    $(".cd-dropdown span span.under-option")[0].innerHTML = "Examples";
    $(".cd-dropdown span span.under-option").addClass("font-reset");
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
        if ( $(".cd-dropdown span span.under-option").length !== 0) {
          $(".cd-dropdown span span.under-option")[0].innerHTML = "Examples";
          $(".cd-dropdown span span.under-option").addClass("font-reset");
        }
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
$("#clear").click(function() {
  $("#chat_ul").empty();
});
