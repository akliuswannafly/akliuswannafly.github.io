function myRandom() {
  x = document.getElementById("roll");
  num = Math.ceil(Math.random()*6);
  x.innerHTML = num;
}
