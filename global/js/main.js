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
	$('#sidenav').load('/global/navbar.html');
	$('#header').load('/global/header.html');
	$('#footer').load('/global/footer.html');
	$('#topnav').load('/global/topbar.html');
});
