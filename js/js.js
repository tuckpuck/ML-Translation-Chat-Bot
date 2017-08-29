var accessToken = "6c8ff636b56e456b83ac49a19ccf56ac";
var baseUrl = "https://api.api.ai/v1/";

function send() {
  var text = "translate hola mundo como estas into english";
  $.ajax({
    type: "POST",
    url: baseUrl + "query?v=20150910",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    headers: {
      "Authorization": "Bearer " + accessToken
    },
    data: JSON.stringify({query: text, lang: "en", sessionId: "tuckpuck"}),

    success: function(data) {
      // prepareResponse(data);
      console.log(data);
      console.log(data.result.fulfillment.displayText);
    },
    error: function() {
      // respond(messageInternalError);
    }
  });
}

send();
