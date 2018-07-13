var n = 0;

init();

function init() {
  moveToNext(0);
}

function moveToNext(i) {
  var target = $('div.target');
  var cursor = $('#' + (i % 16)).offset();
  target.animate({top: cursor.top, left: cursor.left}, 16);
  n = i;
}

function startRun() {
  var randomStep = Math.random(10) * 16;
  randomStep = Math.ceil(randomStep) + 50;
  var m = n;
  for(var i = m; i < randomStep + m; ++i) {
    moveToNext(i);
  }
}
