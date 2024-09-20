let timer;
const display = document.getElementById('timer_1');

function parseTime(timeString) {
    const [hrs, mins, secs] = timeString.split(':').map(Number);
    return hrs * 3600 + mins * 60 + secs;
}

function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function startTimer() {
    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
        } else {
            timeLeft--;
            display.textContent = formatTime(timeLeft);
            localStorage.setItem('timeLeft', timeLeft);
        }
    }, 1000); // Update every second
}
let timeLeft = parseInt(localStorage.getItem('timeLeft'));

if (isNaN(timeLeft)) {
    // If no saved time, use the time from the HTML content
    timeLeft = parseTime(display.textContent);
}

// Initialize the display and start the timer
display.textContent = formatTime(timeLeft);
startTimer();

// Clear the saved time when the timer ends
if (timeLeft <= 0) {
    localStorage.removeItem('timeLeft');
}









let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}
function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
}
    for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}

$( document ).ready(function() {
var scaleCurve = mojs.easing.path('M0,100 L25,99.9999983 C26.2328835,75.0708847 19.7847843,0 100,0');
   var el = document.querySelector('.button'),
	// mo.js timeline obj
	timeline = new mojs.Timeline(),

	// tweens for the animation:

	// burst animation
	tween1 = new mojs.Burst({
		parent: el,
  radius:   { 0: 100 },
  angle:    { 0: 45 },
  y: -10,
  count:    10,
   radius:       100,
  children: {
    shape:        'circle',
    radius:       30,
    fill:         [ 'red', 'white' ],
    strokeWidth:  15,
    duration:     500,
  }
	});


	tween2 = new mojs.Tween({
		duration : 900,
		onUpdate: function(progress) {
			var scaleProgress = scaleCurve(progress);
			el.style.WebkitTransform = el.style.transform = 'scale3d(' + scaleProgress + ',' + scaleProgress + ',1)';
		}
	});
  		tween3 = new mojs.Burst({
		parent: el,
  radius:   { 0: 100 },
  angle:    { 0: -45 },
  y: -10,
  count:    10,
   radius:       125,
  children: {
    shape:        'circle',
    radius:       30,
    fill:         [ 'white', 'red' ],
    strokeWidth:  15,
    duration:     400,
  }
	});

// add tweens to timeline:
timeline.add(tween1, tween2, tween3);


// when clicking the button start the timeline/animation:
$( ".button" ).click(function() {
	if ($(this).hasClass('active')){
		$(this).removeClass('active');
	}else{
  timeline.play();
  $(this).addClass('active');
	}
});
});

