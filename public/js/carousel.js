// on document ready, run nextSlide()
$(document).ready(function() {
  nextSlide();
  $(".cards").click(function(){
    $("#this-modal").modal({backdrop: "static"});
  });
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
    $(".right").click(function(){
        $("#slide").carousel("next");
    });
  // interval 5 seconds
  }, 8000);
};


