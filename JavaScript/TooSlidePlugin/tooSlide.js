function ToolSidePlugin(options) {
  let _this = this;
  let slides = [];
  let currentSlideIndex = 0;
  let defaultOptions = {
    container: ".sliderContainer",
    slidesClass: ".singleSlide",
    nextButton: ".nextSlide",
    previousButton: ".previousSlide",
  };
  options = { ...defaultOptions, ...options };

  this.init = function () {
    document.querySelector(options.container).className +=
      " too-slide-slider-container";
    document.querySelectorAll(options.slidesClass).forEach((slide, index) => {
      // console.log(slide);
      slides[index] = slide;
      slides[index].style = "display:none";
      slides[index].className += " too-slide-single-slide too-slide-fade";
    });

    this.goToSlide(0);
    this.prepareControls();
  };

  this.next = function () {
    this.goToSlide(currentSlideIndex + 1);
  };

  this.previous = function () {
    this.goToSlide(currentSlideIndex - 1);
  };

  this.goToSlide = function (index) {
    this.hideOtherSlides();
    if (index > slides.length - 1) {
      index = 0;
    }
    if (index < 0) {
      index = slides.length - 1;
    }

    slides[index].style = "display:block";
    currentSlideIndex = index;
  };

  this.hideOtherSlides = function () {
    document.querySelectorAll(options.slidesClass).forEach((slide, index) => {
      slides[index].style = "display:none";
    });
  };

  this.prepareControls = function () {
    const nextButton = document.createElement("button");
    const previousButton = document.createElement("button");

    nextButton.setAttribute("class", "next");
    nextButton.innerHTML = "Next";

    previousButton.setAttribute("class", "prev");
    previousButton.innerHTML = "Prev";

    let controlContainer = document.createElement("div");

    controlContainer.setAttribute("class", "too-slide-control-container");

    controlContainer.appendChild(previousButton);
    controlContainer.appendChild(nextButton);

    document.querySelector(options.container).appendChild(controlContainer);

    nextButton.addEventListener("click", function () {
      _this.next();
    });
    previousButton.addEventListener("click", function () {
      _this.previous();
    });
  };

  this.init();
}
