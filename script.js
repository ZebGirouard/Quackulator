$(document).ready(function() {
  var formula = '';
  var current_entry = '';
  var last_entry = '';
  var answer;
  var quackTastic = document.createElement('audio');
  quackTastic.setAttribute('src', 'http://cwealthcraft.com/Resources/quack.mp3');
  $("button").click(function() {
    console.log($(this));
    if ($(this).hasClass("equals")) {
      quackTastic.play();
      formula += current_entry;
      answer = math.eval(formula) || 0;
      console.log(formula);
      current_entry = '';
      last_entry = '';
      formula = '';
    }
    else if ($(this).hasClass("number")) {
      current_entry += $(this).text();
      console.log(current_entry);
    }
    else if ($(this).hasClass("point")) {
      if (current_entry.indexOf('.') === -1) {
        current_entry += $(this).text();
        console.log(current_entry);
      }
    }
    else if ($(this).hasClass("percent")) {
      if (formula && current_entry && last_entry) {
        formula += current_entry * last_entry / 100;
        last_entry = current_entry;
        current_entry = '';
      }
    }
    else if ($(this).hasClass("AC")) {
      current_entry = '';
      last_entry = '';
      formula = '';
    }
    else if ($(this).hasClass("CE")) {
      current_entry = '';
    }
    else {
      if (current_entry !== "") {
        formula += current_entry;
        last_entry = current_entry;
        current_entry = '';
        formula += $(this).text();
        console.log(formula);
      }
      else if (formula) {
        console.log(formula[formula.length - 1]);
        if (typeof formula === 'number') {
          formula = formula.toString() + $(this).text();
        }
        else {
          formula = formula.slice(0,-1) + $(this).text();
        }
        console.log(formula);
      }
    }
    $('#current_number').val(current_entry || answer);
  });
});