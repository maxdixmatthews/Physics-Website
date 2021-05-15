function init() {
	scroll();
	dropMenu();
	titleMove();
	activateNavBar();

	let hr = window.location.href;
	let title = document.getElementById("title").innerHTML;

	if (title.includes("Test") || title.includes("Lesson")) {
		let num = parseInt(title[title.length - 1]);

		if (title.includes("Lesson")) {
			hoverBoxes(num);

			let numPages = [2, 4, 3];

			$("#prev").click(function () {
				loadPrevPage(numPages[num - 1]);
			});
			$("#next").click(function () {
				loadNextPage(numPages[num - 1]);
			});

			$(".pageArrowLeftLabel").click(function () {
				window.location.href = hr.slice(0, hr.length - 1) + (num - 1);
			});

			$(".pageArrowRightLabel").click(function () {
				window.location.href = hr.slice(0, hr.length - 1) + (num + 1);
			});

			if (title.includes("Lesson 2")) setInterval(animations, 1500);
		} else {
			document.getElementById("quiz").onsubmit = function () {
				console.log("simmer");
				scoreTest(num);
			};
		}
	}

	$(".logo").click(function () {
		window.location.href = "http://127.0.0.1:5000";
	});

	$(".quizBox").on("scroll", function () {
		if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
			$(".pageArrowDown").hide();
		} else $(".pageArrowDown").show();
	});
}

function validateSignUp() {
	let username = document.getElementById("username").value;
	let password = document.getElementById("password").value;
	let passwordConfirm = document.getElementById("passwordConfirm").value;
	let message = "";
	if (username.length < 4) {
		message = "Username must be at least 4 characters";
	}
	if (password.length < 7) {
		message = "Password must be at least 7 characters";
	}
	if (password != passwordConfirm) {
		message = "Passwords do not match";
	}
	if (message) {
		document.getElementById("message").innerHTML = message;
		$("#message").toggle();
		return false;
	}
	return true;
}

function scroll() {
	let progress = document.getElementById("progressbar");
	let totalHeight = document.body.scrollHeight - window.innerHeight;
	window.onscroll = function () {
		progress.style.height = (window.pageYOffset / totalHeight) * 100 + "%";
	};
}

function dropMenu() {
	$(document).ready(function () {
		$(".menu-toggle").click(function () {
			$("nav").toggleClass("active");
		});
	});
}

function titleMove() {
	$("body").mousemove(function (e) {
		var valueX = (e.pageX * -1) / 75;
		var valueY = (e.pageY * -1) / 75;

		$("#title").css({
			transform: "translate(" + valueX + "px," + valueY + "px)",
		});
	});
}

function activateNavBar() {
	let navButtons = [".navHome", ".navLearn", ".navStats", ".navLogout", ".navLogin"];

	let title = document.getElementById("title").innerHTML;

	if (title.includes("Home")) {
		$(navButtons[0]).addClass("active");
	} else if (title.includes("Test") || title.includes("Lesson")) {
		$(navButtons[1]).addClass("active");
	} else if (title.includes("Stats")) {
		$(navButtons[2]).addClass("active");
	} else if (title.includes("Logout")) {
		$(navButtons[3]).addClass("active");
	} else if (title.includes("Login") || title.includes("Sign Up")) {
		$(navButtons[4]).addClass("active");
	}
}

function animations() {
	let img = $("#animate-1").find("img")[0];
	let len = img.id.length;
	let num = parseInt(img.id[len - 1]);

	// animation 1
	img.id = img.id.slice(0, len - 1) + (3 - num);
	img.src = img.src.slice(0, img.src.length - 5) + (3 - num) + ".png";

	// animation 2
	img = $("#animate-2").find("img")[0];
	len = img.id.length;
	num = parseInt(img.id[len - 1]);

	img.id = img.id.slice(0, len - 1) + ((num % 3) + 1);
	img.src = img.src.slice(0, img.src.length - 5) + ((num % 3) + 1) + ".png";
}

function loadPrevPage(numPages) {
	let pageNum = 1;

	// find visible page
	for (pageNum; pageNum < numPages; ++pageNum) {
		if ($("#l" + pageNum).is(":visible")) break;
	}

	if (pageNum == 1) return;
	if (pageNum == 2) $("#prev").toggle();
	if (pageNum == numPages) {
		$("#next").toggle();
		//$("#go-test-" + lessonNum).toggle();
	}
	$("#l" + pageNum).toggle();
	$("#l" + (pageNum - 1)).toggle();
}

function loadNextPage(numPages) {
	let pageNum = 1;

	// find visible page
	for (pageNum; pageNum < numPages; ++pageNum) {
		if ($("#l" + pageNum).is(":visible")) break;
	}

	if (pageNum == numPages) return;
	if (pageNum == 1) $("#prev").toggle();
	if (pageNum == numPages - 1) {
		$("#next").toggle();
		//$("#go-test-" + lessonNum).toggle();
	}
	$("#l" + pageNum).toggle();
	$("#l" + (pageNum + 1)).toggle();
}

function hoverBoxes(num) {
	if (num == 1) {
		$("#speedOfLightLabel").mouseenter(function () {
			$("#speedOfLight").toggle();
		});
		$("#speedOfLightLabel").mouseleave(function () {
			$("#speedOfLight").toggle();
		});
		$("#inertialLabel").mouseenter(function () {
			$("#inertial").toggle();
		});
		$("#inertialLabel").mouseleave(function () {
			$("#inertial").toggle();
		});
		$("#spaceTimeLabel").mouseenter(function () {
			$("#spaceTime").toggle();
		});
		$("#spaceTimeLabel").mouseleave(function () {
			$("#spaceTime").toggle();
		});
	} else if (num == 2) {
		$("#trigLabel").mouseenter(function () {
			$("#trig").toggle();
		});
		$("#trigLabel").mouseleave(function () {
			$("#trig").toggle();
		});
		$("#timeLabel").mouseenter(function () {
			$("#time").toggle();
		});
		$("#timeLabel").mouseleave(function () {
			$("#time").toggle();
		});
		$("#dilationLabel").mouseenter(function () {
			$("#dilation").toggle();
		});
		$("#dilationLabel").mouseleave(function () {
			$("#dilation").toggle();
		});
	} else if (num == 3) {
		$("#lorentzLabel").mouseenter(function () {
			$("#lorentz").toggle();
		});
		$("#lorentzLabel").mouseleave(function () {
			$("#lorentz").toggle();
		});
	}
}
