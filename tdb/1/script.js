let slideIndex = 1;

// Hiển thị slide đầu tiên
showDivs(slideIndex);

function plusDivs(n) {
  slideIndex += n;
  showDivs(slideIndex);
}

function showDivs(n) {
  let slides = document.getElementsByClassName("mySlides");

  if (n > slides.length) {
    slideIndex = 1;
  }

  if (n < 1) {
    slideIndex = slides.length;
  }

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slides[slideIndex - 1].style.display = "block";
}