function TriviaQuestion(question,options,answer,message) {
  this.question = question;
  this.options = options;
  this.answer = answer;
  this.message = message;
}

var questions = [
  new TriviaQuestion(
    'What team originally drafted John Elway?',
    ['Baltimore Colts','Chicago Bears','Denver Broncos','Boston Patriots'],
    'Baltimore Colts',
    'John Elway was originally drafted by the Baltimore Colts with the 1st overall pick of the 1983 NFL draft. Unfortunately for the Colts, Elway threatened to give up football and pursue a professional baseball career if they didn\'t trade him to a select list of teams. The Colts traded him to the Denver Broncos for QB Mark Herrmann, OL Chris Hinton, and a first-round pick in the 1984 draft.'),
  new TriviaQuestion(
    'In what round of the 1995 NFL draft did the Denver Broncos take RB Terrell Davis?',
    ['1st round','2nd round','4th round','6th round'],
    '6th round',
    'Incredibly, the Denver Broncos drafted RB Terrell Davis in the 6th round (196th overall pick) of the 1995 NFL draft. Davis turned out to be a real steal, posting four consecutive 1,000 yard seasons (three of them over 1,500 yards!), earning several MVP awards, and leading the Broncos to two Super Bowl victories (1997 & 1998) before suffering a knee injury which would ultimately end his career.'),
  new TriviaQuestion(
    'The Denver Broncos defense were once nicknamed the:',
    ['Drivers','Orange Crush','Blue Crush','Mile-Highs'],
    'Orange Crush',
    'Orange Crush Defense -- this was the nickname during the 1970s for the defense of the Denver Broncos.'),
  new TriviaQuestion(
    'Who did the Denver Broncos trade to the Washington Redskins in 2004 for Pro Bowl cornerback Champ Bailey?',
    ['Mike Anderson','Rod Smith','Clinton Portis','Laveranues Coles'],
    'Clinton Portis',
    'On March 3, 2004, the Denver Broncos completed a blockbuster trade with the Washington Redskins, sending Pro Bowl running back Clinton Portis to Washington for Pro Bowl cornerback Champ Bailey and a second-round draft pick.'),
  new TriviaQuestion(
    'What is the name of the white horse that gallops onto the field after the Denver Broncos score?',
    ['Sky','Lightning','Thunder','Bullet'],
    'Thunder',
    'Thunder is a purebred Arabian gelding that acts as the club\'s mascot. Following every Denver Broncos touchdown, Thunder displays his impressive canter from one end zone to the other.'),
  new TriviaQuestion(
    'What year did the Denver Broncos start in the American Football League?',
    ['1959','1960','1962','1963'],
    '1960',
    'The Broncos were a charter club in the AFL in 1960. They were also part of the AFL-NFL merger in 1970.'),
  new TriviaQuestion(
    'What were the original team colors of the Broncos?',
    ['Brown, white, orange','Orange, white, blue','Brown, orange, blue','Brown, white, mustard'],
    'Brown, white, mustard',
    'Originally they wore brown helmets and pants, white and mustard-colored jerseys with vertical-striped socks! The original colors were so hated by the fans, they held a bonfire to rid them of the ugliness when they changed to blue, white, and orange.'),
  new TriviaQuestion(
    'The Broncos\' first trip to the playoffs took them all the way to the Super Bowl Championship game?',
    ['True','False'],
    'True',
    'In 1977, the Broncos saw their first playoff action. They defeated the Steelers in the Divisional Playoffs, the Raiders in the Conference Championship, then only to be defeated by the Cowboys in Super Bowl XII. Of course the league was smaller at 28 teams so there were no Wild Card games, and the trip to the Super Bowl was a little shorter than what we are used to seeing now.'),
  new TriviaQuestion(
    'The Broncos made six Super Bowl appearances in the 70s, 80s and 90s. What was their record in those games?',
    ['1-5','2-4','3-3','0-6'],
    '2-4',
    'After having a long drought of non-winning seasons, the Broncos saw great success in reaching the Championship game through the 1990s.<br>'+
    '  Super Bowl XII Cowboys 27 - Broncos 10<br>'+
    '  Super Bowl XXI Giants 39 - Broncos 20<br>'+
    '  Super Bowl XXII Redskins 42 - Broncos 10<br>'+
    '  Super Bowl XXIV 49ers 55 - Broncos 10<br>'+
    '  Super Bowl XXXII Broncos 31 -Packers 24<br>'+
    '  Super Bowl XXXIII Broncos 34 - Falcons 19'),
  new TriviaQuestion(
    'What major league baseball team drafted John Elway?',
    ['Whitesox','Dodgers','Yankees','Blue Jays'],
    'Yankees',
    'Elway played for the Yankees\' minor league farm club')
]

var nq = questions.length;
var ncorrect = 0;
var ci = 0;

function showNext() {
  $('#messageArea').toggle(false);
  showQuestion(questions[ci]);
  showAnswers(questions[ci]);
  updateProgress();
}

function showQuestion(tq) {
  $('#questionArea').toggle(true).html('<p>'+tq.question+'</p>');
  //$('#question').show('normal');
  //$('<p>'+questions[ci]+'</p>').hide().appendTo($('#question')).show(1000);
}

function showAnswers(tq) {
  var answerElement = $('#answers');
  answerElement.toggle(true);
  answerElement.empty();
  for (i in tq.options) {
    //$('<li>'+options[i]+'</li>').hide().appendTo(answerElement).show(8000);
    answerElement.append('<li><button class="a" id="'+i+'">'+tq.options[i]+'</button></li>');
  }
  //answerElement.show(1000);
}

function showMessage(tq, correct) {
  $('#questionArea').toggle(false);
  $('#answers').toggle(false);

  var feedback; 
  var feedbackClass;
  if (correct) {
    feedback = 'Correct!';
    feedbackClass = 'correct'
  } else {
    feedback = "Incorrect";
    feedbackClass = 'incorrect'
  }
  var ma = $('#messageArea');
  ma.empty()
  ma.append('<p class="'+feedbackClass+'">'+feedback+'</p>');
  ma.append('<p class="text">'+tq.message+'</p>');
  ma.append('<button class="next">Next Question</button>');
  ma.show('slow');
}

function updateProgress() {
  $('.progress').html('<p>Question: '+(ci+1)+'/'+nq+'</p>');
}

function updateScore() {
  $('.score').html('<p>Score: '+ncorrect+'</p>');
}

function finishQuiz() {
  $('.progress').empty();
  $('.score').empty();
  var ma = $('#messageArea');
  ma.empty();
  ma.toggle(false);
  ma.append('<p id="results">Your Score: '+ncorrect+' out of '+nq+'</p>');
  ma.append('<button class="restart">Restart Quiz</button>');
  ma.show('slow');
}

function sleep(ms) {
  var startTime = new Date().getTime();
  while (new Date().getTime()<startTime+ms);
}

$(document).ready(function() {

  $('.start').click(function() {
    $(this).hide('slow');
    showNext();
    updateScore();
  });

  $('ul').on('click', '.a', function() {
    var tq = questions[ci];
    var correct = false;
    if (tq.answer==$(this).html()) {
      ncorrect++;
      correct = true;
    }
    updateScore();
    showMessage(tq,correct);
    ci++;
  });

  $('#messageArea').on('click', '.next', function() {
    if (ci<nq) {
      showNext();
    } else {
      finishQuiz();
    }
  });

  $('#messageArea').on('click', '.restart', function() {
    $(this).hide('slow');

    ncorrect = 0;
    ci = 0;
    showNext();
    updateScore();
  });

});
