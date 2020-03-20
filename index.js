$(document).ready(function() {
// 	var data = []
// 	$.ajax({
//     url: "text.csv",
//     async: false,
//     success: function (csvd) {
//         data = $.csv.toArrays(csvd);
//     },
//     dataType: "text",
//     complete: function () {
//         // call a function on complete
//     }
// });
	var four = ["עולם", "רוחב"]
	var five = ["שולחן", "מדינה"]
	var six = ["מכנסים", "חולצות"]
	var url = "https://gnpashi.github.io/lingo/"
	var lingo
	var url_param
	var word_length
	var invite
	var guesses
	var banner = $("#game")
	var param = getUrlParameter("w")
	if (param) {
		$("#start_button").hide()
		$("#game").show()
		lingo = hex_to_ascii(param)
		word_length = lingo.length
		$("#word_length").html(word_length + " אותיות")
		url_param = url + "?w=" + ascii_to_hex(lingo)
		$("#game").children('p').first().children('span').html(lingo.length)
	}



	$("#start_button").click(function(event) {
		$("#start_button").hide('fast')
		$("#choose_word_length").show("fast")
	});
$("input[type='radio']").click(function(event) {
	$("#choose_word_length").hide("fast")
	$("#game").show("fast")
	var length = $(this).val()
	switch (parseInt(length)) {
		case 4:
			lingo = four[Math.floor(Math.random()*four.length)]
			break;
		case 5:
			lingo = five[Math.floor(Math.random()*five.length)]
			break;
		case 6:
			lingo = six[Math.floor(Math.random()*six.length)]
			break;
	}
	url_param = url + "?w=" + ascii_to_hex(lingo)
	word_length = lingo.length
	$("#word_length").html(word_length + " אותיות")
	$("#game").children('p').first().children('span').html(lingo.length)
});

var input = document.getElementById("input");
input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    $("#check_button").click();
  }
});

$("#share").click(function(event) {
	invite = "היי! אנחנו משחקים לינגו! אפשר להצטרף בקישור " + url_param
	$(".share_buttons").toggle("fast")
	$("#whatsapp").attr("href", "whatsapp://send?text=" + invite);
});
	// share link
	$("#copy").click(function(event) {
		invite = "היי! אנחנו משחקים לינגו! אפשר להצטרף בקישור " + url_param
		$("body").append("<input id='temp' value='" + invite + "'>")
		var copyText = document.getElementById("temp");
		copyText.select();
		copyText.setSelectionRange(0, 99999)
		document.execCommand("copy");
		$("#temp").remove()
	});

	// check word
	$("#check_button").on("click", function(){
		var input = $("#input").val()
		if (input.length != word_length) {
			$("#error").show("fast")
			$("#error").children('span').html(word_length)
		}
		else {
			$("#error").hide("fast")
			guesses = $(".output").length
			if (input == lingo) {
				$("#game").hide()
				$("#start_button").hide()
				$("#end").show().children('h1').last().append(lingo)
			}
			else if (lingo.length == guesses){
				$("#game").hide()
				$("#start_button").hide()
				$("#end").show().children('h1').first().html("הפסדתם! לא נורא")
				$("#end").show().children('h1').last().append(lingo)
			}
			$("#game").children('p').first().children('span').html(lingo.length - guesses)
			console.log(guesses);
			for (var i = 0; i < input.length; i++) {
				$(".output").last().append("<span>" + input[i] + "</span>")
			}
			$("#input").val("")
			var output =  $(".output").last().children()
			for (var i = 0; i < output.length; i++) {
				if ( output.eq(i).html() == lingo[i]){
					output.eq(i).addClass('green rounded-lg')
				}
				else if (lingo.includes(output.eq(i).html())) {
					output.eq(i).addClass('yellow rounded-lg')
				}
			}
			banner.append("<p class='output text-4xl'></p>")
		}
		$("#input").focus()
	})

$("#start_over").click(function(event) {
	location.reload();
});
	// get param
	function getUrlParameter(sParam) {
		var sPageURL = window.location.search.substring(1),
		sURLVariables = sPageURL.split('&'),
		sParameterName,
		i;
		for (i = 0; i < sURLVariables.length; i++) {
			sParameterName = sURLVariables[i].split('=');
			if (sParameterName[0] === sParam) {
				return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
			}
		}
	};
	// ascii to hex for param
	function ascii_to_hex(str)
	{
		var arr1 = [];
		for (var n = 0, l = str.length; n < l; n ++)
		{
			var hex = Number(str.charCodeAt(n)).toString(16);
			arr1.push(hex);
		}
		return arr1.join('');
	}
	// hex to ascii for param
	function hex_to_ascii(str)
	{
		var hex  = str.toString();
		var str = '';
		for (var n = 0; n < hex.length; n += 3) {
			str += String.fromCharCode(parseInt(hex.substr(n, 3), 16));
		}
		return str;
	}

});
