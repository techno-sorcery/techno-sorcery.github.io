function myFunction() {
	var x = document.getElementById("myLinks");
	if (x.style.display === "block") {
		x.style.display = "none";
	} else {
		x.style.display = "block";
	}
}

document.write('<style type="text/css">body{display:none}</style>');

jQuery(function($) {
	$('body').css('display','block');
});

$(document).ready(function () {
	$('#sidenav').load('/common/navbar.html');
	$('#header').load('/common/header.html');
	$('#footer').load('/common/footer.html');
	$('#topnav').load('/common/topbar.html');
});
