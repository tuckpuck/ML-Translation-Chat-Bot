$( document ).ready(function() {
  sendWakeUp("translate good morning webhook wake up into spanish");
});

function sendWakeUp(text) {
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
      // console.log("Webhook awake");
    },
    error: function(error) {
      console.log(error);
    }
  });
}

// Hide all icons on page load, toggle on button click
  $(".icon-container").hide();

  $("#icons").click(function() {
    $(".icon-container").slideToggle("ease-in");
  });

// Dropdown effect
  $(function() {
    $('#cd-dropdown').dropdown({
      gutter: 5
    });
  });

// Helper function for overlay window
  (function(window) {

    'use strict';

    function classReg(className) {
      return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
    }

    var hasClass, addClass, removeClass;

    if ('body' in document.documentElement) {
      console.log(document.documentElement);
      hasClass = function(elem, c) {
        return elem.body.contains(c);
      };
      addClass = function(elem, c) {
        elem.body.add(c);
      };
      removeClass = function(elem, c) {
        elem.body.remove(c);
      };
    } else {
      hasClass = function(elem, c) {
        return classReg(c).test(elem.className);
      };
      addClass = function(elem, c) {
        if (!hasClass(elem, c)) {
          elem.className = elem.className + ' ' + c;
        }
      };
      removeClass = function(elem, c) {
        elem.className = elem.className.replace(classReg(c), ' ');
      };
    }

    function toggleClass(elem, c) {
      var fn = hasClass(elem, c) ? removeClass : addClass;
      fn(elem, c);
    }

    var classie = {
      // full names
      hasClass: hasClass,
      addClass: addClass,
      removeClass: removeClass,
      toggleClass: toggleClass,
      // short names
      has: hasClass,
      add: addClass,
      remove: removeClass,
      toggle: toggleClass
    };

    // transport
    if (typeof define === 'function' && define.amd) {
      // AMD
      define(classie);
    } else {
      // browser global
      window.classie = classie;
    }

  })(window);
// Toggle overlay
  (function() {
    var container = document.querySelector('div.container'),
      triggerBttn = document.getElementById('about'),
      overlay = document.querySelector('div.overlay'),
      closeBttn = overlay.querySelector('button.overlay-close');
    transEndEventNames = {
      'WebkitTransition': 'webkitTransitionEnd',
      'MozTransition': 'transitionend',
      'OTransition': 'oTransitionEnd',
      'msTransition': 'MSTransitionEnd',
      'transition': 'transitionend'
    };

    function toggleOverlay() {
      if (classie.has(overlay, 'open')) {
        classie.remove(overlay, 'open');
        classie.remove(container, 'overlay-open');
        classie.add(overlay, 'close');
        var onEndTransitionFn = function(ev) {
          if (support.transitions) {
            if (ev.propertyName !== 'visibility') return;
            this.removeEventListener(transEndEventName, onEndTransitionFn);
          }
          classie.remove(overlay, 'close');
        };
        if (support.transitions) {
          overlay.addEventListener(transEndEventName, onEndTransitionFn);
        } else {
          onEndTransitionFn();
        }
      } else if (!classie.has(overlay, 'close')) {
        classie.add(overlay, 'open');
        classie.add(container, 'overlay-open');
      }
    }

    triggerBttn.addEventListener('click', toggleOverlay);
    closeBttn.addEventListener('click', toggleOverlay);
  })();

// Make things happen on dropdown button clicks
$("body").click(function(e) {
  if(event.target.innerHTML === "English to Spanish"){
    $("#inputtext").val("how do you say I would like a cup of coffee in spanish?");
  };
  if(event.target.innerHTML === "English to Thai"){
    $("#inputtext").val("translate can you recommend somewhere to eat into Thai");
  };
  if(event.target.innerHTML === "English to Russian"){
    $("#inputtext").val("where is the nearest museum into Russian");
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
    $("#inputtext").val("translate buenas noches into German");
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

// Change chat icon on icon menu click
  $(".human-change").click(function(event) {
    let humanClickedSrc = event.target.src;
    $(".human-image").attr("src", humanClickedSrc);
  });

  $(".bot-change").click(function(event) {
    let botClickedSrc = event.target.src;
    $(".bot-image").attr("src", botClickedSrc);
  });

// Creates human dialogue box on enter click, sends API call
$(".enterbtn").click(function() {
  let formerHumanSrc = $(".human-image").attr("src");
  let formerBotSrc = $(".bot-image").attr("src");
  let text = $("#inputtext").val();
  if (text !== "") {
    var fulldialogbox = $('<li>' + '<div class="human">' +
    '<div class="human-icon">' + '<img class="human-image icon" src="' + formerHumanSrc + '" alt="">' + '</div>' + '<div class="text">' + '</div>' + '</div>' + '</li>');
    fulldialogbox.find(".text").text(text);
    $("#chat_ul").empty();
    $("#chat_ul").append(fulldialogbox);
    send(text, formerBotSrc);
    $("#inputtext").val("");
    if ( $(".cd-dropdown span span.under-option").length !== 0) {
    $(".cd-dropdown span span.under-option")[0].innerHTML = "Examples";
    $(".cd-dropdown span span.under-option").addClass("font-reset");
  } else {
    return;
  }
}});

// Creates human dialogue box on enter keystroke, sends API call
$("#inputtext").focus(function() {
  $(document).keydown(function(e) {
    if (e.which == 13) {
      let formerHumanSrc = $(".human-image").attr("src");
      let formerBotSrc = $(".bot-image").attr("src");
      var text = $("#inputtext").val();
      if (text !== "") {
        var fulldialogbox = $('<li>' + '<div class="human">' +
        '<div class="human-icon">' + '<img class="human-image icon" src="' + formerHumanSrc + '" alt="">' + '</div>' + '<div class="text">' + '</div>' + '</div>' + '</li>');
        fulldialogbox.find(".text").text(text);
        $("#chat_ul").empty();
        $("#chat_ul").append(fulldialogbox);
        send(text, formerBotSrc);
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
function send(text, attribute) {
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
      buildChatDialogue(data, attribute);
    },
    error: function(error) {
      console.log(error);
    }
  });
}

// Creates bot dialogue box on data fufillment
function buildChatDialogue(data, attribute) {
  console.log(data.result.fulfillment.speech);
  var fulldialogbox = $('<li>' + '<div class="bot">' + '<div class="text">' + '</div>' + '<div class="bot-icon">' +  '<img class="bot-image icon" src="' + attribute + '" alt="">' + '</div>' + '</div>' + '</li>');
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
