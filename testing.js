const circle = document.querySelector('.circle');
const container = document.querySelector('#container');

if (circle && container) {
  console.log('circle and container elements found');

  let positionX = 0;
  let positionY = 0;
  let velocityX = 0;
  let velocityY = 0;
  let isDragging = false;
  let dragOffsetX = 0;
  let dragOffsetY = 0;
  const gravity = 0.007;

  circle.addEventListener('mousedown', (event) => {
    console.log('circle clicked');
    isDragging = true;
    dragOffsetX = event.clientX - circle.getBoundingClientRect().left;
    dragOffsetY = event.clientY - circle.getBoundingClientRect().top;
  });

  container.addEventListener('mousemove', (event) => {
    if (isDragging) {
      console.log('circle dragged');
      positionX = event.clientX - container.getBoundingClientRect().left - dragOffsetX;
      positionY = event.clientY - container.getBoundingClientRect().top - dragOffsetY;
      if (positionY < 0) {
        positionY = 0;
      }
      if (positionY > container.clientHeight - circle.clientHeight) {
        positionY = container.clientHeight - circle.clientHeight;
      }
      circle.style.transform = `translate(${positionX}px, ${positionY}px)`;
      velocityX = (positionX - parseFloat(circle.style.transform.split('(')[1].split('px')[0])) / 10;
    }
  });

  container.addEventListener('mouseup', () => {
    console.log('circle released');
    isDragging = false;
    velocityY = (positionY - parseFloat(circle.style.transform.split(',')[10].split('px')[0])) / 10;
  });

  let lastTime = null;

  function step(time) {
    if (lastTime !== null && !isDragging) {
      let elapsed = time - lastTime;
      velocityY += gravity * elapsed;
      positionY += velocityY * elapsed;
      if (positionY > container.clientHeight - circle.clientHeight) {
        positionY = container.clientHeight - circle.clientHeight;
        velocityY = -velocityY * 0.9;
      }
      circle.style.transform = `translate(${positionX}px, ${positionY}px)`;
    }
    lastTime = time;
    requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
} else {
  console.log('circle or container element not found');
}


