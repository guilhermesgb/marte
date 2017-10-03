$(window.document).ready(function(){
  var counter = function() {
    var counter = 1;
    return function() {
      return counter++;
    }
  };
  var types = ['fixed-in-background', 'fixed-over-footer'];
  var counters = {};
  counters[types[0]] = counter();
  counters[types[1]] = counter();
  var delays = {};
  delays[types[0]] = 64000;
  delays[types[1]] = 4000;
  var handles = {};
  $('.rotating-marte-spiral').each(function() {
    var lowerDelay, biggerDelay, timeElapsed;
    for (var type in types) {
      if ($(this).hasClass(types[type])) {
        handles[types[type]] = $(this);
        handles[types[type]].find('img').css('transform', 'rotate(' + (counters[types[type]]() * 90) + 'deg)');
        if (!lowerDelay) {
          lowerDelay = types[type];
        } else if (delays[lowerDelay] > delays[types[type]]) {
          biggerDelay = lowerDelay;
          lowerDelay = types[type];
        } else {
          biggerDelay = types[type];
        }
      }
    }
    window.setInterval(function() {
      handles[lowerDelay].find('img').css('transform', 'rotate(' + (counters[lowerDelay]() * 90) + 'deg)');
      timeElapsed += delays[lowerDelay];
      if (timeElapsed > delays[biggerDelay]) {
        timeElapsed = 0;
        handles[biggerDelay].find('img').css('transform', 'rotate(' + (counters[biggerDelay]() * 90) + 'deg)');
      }
    }, delays[lowerDelay]);
  });

});
