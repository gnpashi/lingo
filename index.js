$(document).ready(function() {
	var data = []
	$.ajax({
    url: "text.csv",
    async: false,
    success: function (csvd) {
        data = $.csv.toArrays(csvd);
    },
    dataType: "text",
    complete: function () {
        // call a function on complete
    }
});
	// var words = $.csv.toArray(text.csv);
console.log(data);
	var arr = ["עולם", "תקווה"]
	var word = arr[Math.floor(Math.random()*arr.length)]
	var url = window.location.href
	var url_param = url + "?w=" + ascii_to_hex(word)
	var banner = $("#game")
	var button = $("button")
	var lingo = word
	var word_num = lingo.length

	// show how many letters
	$("#word_num").html(word_num + " אותיות")

	// share link
	$("#share").click(function(event) {
		$("body").append("<input id='temp' value='" + url_param + "'>")
		var copyText = document.getElementById("temp");
		copyText.select();
		copyText.setSelectionRange(0, 99999)
		document.execCommand("copy");
		$("#temp").remove()
	});

	// check word
	button.on("click", function(){
		var input = $("#input").val()
		for (var i = 0; i < input.length; i++) {
			$(".output").last().append("<span>" + input[i] + "</span>")
		}
		$("#input").val("")
		var output =  $(".output").last().children()
		for (var i = 0; i < output.length; i++) {
			if ( output.eq(i).html() == lingo[i]){
				output.eq(i).addClass('green')
			}
			else if (lingo.includes(output.eq(i).html())) {
				output.eq(i).addClass('yellow')
			}
		}
		banner.append("<p class='output text-3xl'></p>")
	})

	// get param
	var getUrlParameter = function getUrlParameter(sParam) {
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
