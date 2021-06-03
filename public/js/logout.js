let timer, currentSeconds = 0;

function resetTimer() {
clearInterval(timer);
currSeconds = 0;
 timer = setInterval(startIdleTimer, 1000);
}

// Define the events that would reset the timer
window.onload = resetTimer;
window.onmousemove = resetTimer;
window.onmousedown = resetTimer;
window.ontouchstart = resetTimer;
window.onclick = resetTimer;
window.onkeypress = resetTimer;

function startIdleTimer() {
    // Increment the timer seconds 
    currentSeconds++;
    if (currentSeconds > 60) {
        logout();
    }
}
async function logout() {
    const response = await fetch('/api/users/logout', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' }
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('#logout').addEventListener('click', logout);