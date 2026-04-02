function openCity(cityName) {
  let x = document.getElementsByClassName("tab-content");

  for (let i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }

  document.getElementById(cityName).style.display = "block";
}