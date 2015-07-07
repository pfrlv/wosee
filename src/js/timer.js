var Timer = (function() {

  var _startAt = 0;
  var _lapTime = 0;

  function _now() {
    return (new Date()).getTime();
  };

  // Start or resume
  function start() {
    _startAt = _startAt ? _startAt : _now();
  };

  // Stop or pause
  function stop() {
    // If running, update elapsed time otherwise keep it
    _lapTime = _startAt ? _lapTime + _now() - _startAt : _lapTime;
    _startAt = 0; // Paused
  };

  // Reset
  function reset() {
    _lapTime = _startAt = 0;
  };

  // Duration
  function time() {
    return _lapTime + (_startAt ? _now() - _startAt + 0 : 0);
  };

  return {
    start: start,
    stop: stop,
    reset: reset,
    time:time
  }  
})();