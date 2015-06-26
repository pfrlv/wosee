var Timer = function() {
  var startAt = 0;
  var lapTime = 0;

  var now = function() {
    return (new Date()).getTime();
  };

  // Public methods
  // Start or resume
  this.start = function() {
    startAt = startAt ? startAt : now();
  };

  // Stop or pause
  this.stop = function() {
    // If running, update elapsed time otherwise keep it
    lapTime = startAt ? lapTime + now() - startAt : lapTime;
    startAt = 0; // Paused
  };

  // Reset
  this.reset = function() {
    lapTime = startAt = 0;
  };

  // Duration
  this.time = function() {
    return lapTime + (startAt ? now() - startAt + 0 : 0);
  };
};

var x = new Timer();
var interval;
var $timerTap = document.getElementById('timer-tap'),
    $timerTime = document.getElementById('timer-time');

function shuffle(o) {
  for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
};

function hasclass ( el, classname ) {
  var result = el.classList ? el.classList.contains(classname) : new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
  return result;
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
  $timerTime.innerHTML = formatTime(x.time());
};

function start() {
  var interval = setTimeout(function run() {
    update();
    setTimeout(run, 1);
  }, 1);
  x.start();
};

function stop() {
  x.stop();
  clearTimeout(interval);
};

function reset() {
  stop();
  x.reset();
  update();
};

var activeClass = 'is-active',
    disabledClass = 'is-disabled';

window.addEventListener('keydown', function(e) {
  if (e.keyCode === 32) {
    e.preventDefault();
    if ( hasclass($timerTap, disabledClass) ) {
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
  if ( hasclass(this, disabledClass) ) {
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

window.onload = function() {
  generateNums();
};