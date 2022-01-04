$('.prototype-video').hover(function toggleControls() {
    if (this.hasAttribute("controls")) {
        this.removeAttribute("controls")
    } else {
        this.setAttribute("controls", "controls")
    }
})

const observer1 = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        // If the element is visible
        if (entry.isIntersecting) {
          // Add the animation class
          console.log('in the view');
          entry.target.classList.add('animate__animated','animate__fadeInLeft');
        }
      });
});

const allLeftBlocks=document.querySelectorAll('.leftFade');
// observer.observe(document.querySelectorAll('.leftFade'));
allLeftBlocks.forEach(leftblock=>observer1.observe(leftblock));

const observer2 = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        // If the element is visible
        if (entry.isIntersecting) {
          // Add the animation class
          console.log('in the view');
          entry.target.classList.add('animate__animated','animate__fadeInRight');
        }
      });
});

const allRightBlocks=document.querySelectorAll('.rightFade');
// observer.observe(document.querySelectorAll('.leftFade'));
allRightBlocks.forEach(rightblock=>observer2.observe(rightblock));

const observer3 = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        // If the element is visible
        if (entry.isIntersecting) {
          // Add the animation class
          console.log('in the view');
          entry.target.classList.add('animate__animated','animate__fadeIn');
        }
      });
});

const allBlocks=document.querySelectorAll('.Fade');
// observer.observe(document.querySelectorAll('.leftFade'));
allBlocks.forEach(block=>observer3.observe(block));