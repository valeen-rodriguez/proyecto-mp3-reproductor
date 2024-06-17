document.getElementById('toggle-button').addEventListener('click', function() {
    var songListContainer = document.getElementById('song-list-container');
    songListContainer.classList.toggle('active');
});

var songLinks = document.querySelectorAll('.song-item a');
var musicPlayer = document.getElementById('music-player');

songLinks.forEach(function(link) {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        var videoUrl = link.getAttribute('href');
        musicPlayer.src = videoUrl;
    });
});