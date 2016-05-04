var selectSound = new Audio('audio/select.ogg');
var selectedSound = new Audio('audio/selectRO.ogg');

function backgroundSound()
{
    var backgroundSound = new Audio('audio/background.ogg');
    setInterval(function(){
        if(backgroundSound.ended){
            backgroundSound.currentTime = 0;
            backgroundSound.play();
        }
    }, 1000);
    backgroundSound.play();
}

$(window).load(function() {
    $('#preloader').fadeOut('slow');
    $('body').css({'overflow':'visible'});
    backgroundSound();
});

function login(){
    $('#loginForm').fadeIn('slow');
    selectedSound.currentTime = 0;
    selectedSound.play();
    $('#registerForm').fadeOut('slow');
}
function register(){
    $('#loginForm').fadeOut('slow');
    selectedSound.currentTime = 0;
    selectedSound.play();
    $('#registerForm').fadeIn('slow');
}
