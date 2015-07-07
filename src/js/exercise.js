var interval;
var $timerTap = document.getElementById('timer-tap'),
    $timerTime = document.getElementById('timer-time');

function shuffle(o) {
  for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
};

function generateNums() {
  var nums = [],
      cell = document.querySelectorAll('.exercise-table-cell span');

  for (var i = cell.length; i >= 1; i--) {
    nums.push(i);
  };

  var randomNums = shuffle(nums);

  Array.prototype.forEach.call(cell, function($element, index) {
    $element.innerHTML = randomNums[index];
  });
}

function pad(num, size) {
  var s = '0' + num;
  return s.substr(s.length - size);
};

function formatTime(time) {
  var h = m = s = 0;
  var newTime = '';

  time = time % (60 * 60 * 1000);
  m = Math.floor( time / (60 * 1000) );
  time = time % (60 * 1000);
  s = Math.floor( time / 1000 );

  newTime = pad(m, 2) + ':' + pad(s, 2);
  return newTime;
};

function update() {
  $timerTime.innerHTML = formatTime(Timer.time());
};

function start() {
  var interval = setTimeout(function run() {
    update();
    setTimeout(run, 1);
  }, 1);
  Timer.start();
};

function stop() {
  Timer.stop();
  clearTimeout(interval);
};

function reset() {
  stop();
  Timer.reset();
  update();
};

var activeClass = 'is-active',
    disabledClass = 'is-disabled';

window.onload = function() {
  generateNums();

  window.addEventListener('keydown', function(e) {
    if ( e.keyCode === 32 ) {
      e.preventDefault();
      if ( $timerTap.classList.contains(disabledClass) ) {
        $timerTap.classList.remove(disabledClass);
        $timerTap.classList.add(activeClass);
        generateNums();
        reset();
        start();
      } else {
        $timerTap.classList.remove(activeClass);
        $timerTap.classList.add(disabledClass);
        stop();
      };
    };
  }, true);

  $timerTap.addEventListener('click', function(){
    if ( this.classList.contains(disabledClass) ) {
      reset();
      start();
      this.classList.remove(disabledClass);
      this.classList.add(activeClass);
      generateNums();
    } else {
      this.classList.remove(activeClass);
      this.classList.add(disabledClass);
      stop();
    };
  }, true);
};