// let timer;
// const display = document.getElementById('timer_1');

// function parseTime(timeString) {
//     const [hrs, mins, secs] = timeString.split(':').map(Number);
//     return hrs * 3600 + mins * 60 + secs;
// }

// function formatTime(seconds) {
//     const hrs = Math.floor(seconds / 3600);
//     const mins = Math.floor((seconds % 3600) / 60);
//     const secs = seconds % 60;
//     return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
// }

// function startTimer() {
//     timer = setInterval(() => {
//         if (timeLeft <= 0) {
//             clearInterval(timer);
//         } else {
//             timeLeft--;
//             display.textContent = formatTime(timeLeft);
//             localStorage.setItem('timeLeft', timeLeft);
//         }
//     }, 1000); // Update every second
// }
// let timeLeft = parseInt(localStorage.getItem('timeLeft'));

// if (isNaN(timeLeft)) {
//     // If no saved time, use the time from the HTML content
//     timeLeft = parseTime(display.textContent);
// }

// // Initialize the display and start the timer
// display.textContent = formatTime(timeLeft);
// startTimer();

// // Clear the saved time when the timer ends
// if (timeLeft <= 0) {
//     localStorage.removeItem('timeLeft');
// }