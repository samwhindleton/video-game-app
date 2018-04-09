// on document ready, run nextSlide()
$(document).ready(() => {
  nextSlide();
});

const nextSlide = () => {
  const status = 1;
  // interval function
  const interval = setInterval(() => {
    // if status === 0, stop interval
    if (status === 0) {
      clearInterval(interval);
    };
    // activate carousel
    $("#slide").carousel("next");
    // enable carousel controls
    $(".right").click(() => {
        $("#slide").carousel("next");
    });
  // interval 8 seconds
  }, 8000);
};
