document.getElementById('toggle-button').addEventListener('click', function() {
    var songListContainer = document.getElementById('song-list-container');
    songListContainer.classList.toggle('active');
});

document.addEventListener("DOMContentLoaded", function() {
    // JSON canciones
    const songs = [
        {
            "id": 1,
            "name": "Lovers Rock - TV Girl",
            "image": "image/lovers-rock-img.png",
            "audio": "audio/lovers-rock-audio.mp3"
        },
        {
            "id": 2,
            "name": "Something about you - Eyedress",
            "image": "image/something-about-you-img.jpg",
            "audio": "audio/something-about-you.mp3"
        },
        {
            "id": 3,
            "name": "Can I call you tonight? - Dayglow",
            "image": "image/call-you-tonight-img.png",
            "audio": "audio/call-you-tonight.mp3"
        },
        {
            "id": 4,
            "name": "I wanna be yours - Arctic Monkeys",
            "image": "image/wanna-be-yours-img.png",
            "audio": "audio/wanne-be-yours.mp3"
        },
        {
            "id": 5,
            "name": "Mr loverman - Ricky Montgomery",
            "image": "image/mrs-loverman-img.png",
            "audio": "audio/mr-loverman.mp3"
        },
        {
            "id": 6,
            "name": "Tek it - Cafuné",
            "image": "image/tek-it-img.jpg",
            "audio": "audio/tek-it.mp3"
        }
    ];

    const songList = document.getElementById("song-list");
    const musicPlayer = document.getElementById("music-player");
    const songImage = document.getElementById("song-image");

    let currentSongIndex = -1;
    let isPlaying = false;
    let currentVolume = musicPlayer.volume;

    // actualizar la canción actual
    function updateCurrentSong() {
        if (currentSongIndex !== -1) {
            const currentSong = songs[currentSongIndex];
            musicPlayer.src = currentSong.audio;
            songImage.src = currentSong.image;
        } else {
            // si no hay nada, mostrar img de "seleccionar canción"
            songImage.src = "image/portada-mp3.png";
        }
    }

    // reproducir o pausar la canción y actualizar clases
    function play() {
        if (currentSongIndex !== -1) {
            if (isPlaying) {
                musicPlayer.pause();
            } else {
                musicPlayer.play();
            }
            isPlaying = !isPlaying;
            
            const controlPanelObj = document.querySelector('.controls');
            const infoBarObj = document.querySelector('.screen');
            
            controlPanelObj.classList.toggle('active');
            infoBarObj.classList.toggle('active');
        }
    }

    // cambiar a la canción anterior
    function playPreviousSong() {
        if (currentSongIndex !== -1) {
            currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
            updateCurrentSong();
            if (isPlaying) {
                musicPlayer.play();
            }
        }
    }

    // cambiar a la siguiente canción
    function playNextSong() {
        if (currentSongIndex !== -1) {
            currentSongIndex = (currentSongIndex + 1) % songs.length;
            updateCurrentSong();
            if (isPlaying) {
                musicPlayer.play();
            }
        }
    }

    // subir el volumen
    function increaseVolume() {
        if (currentVolume < 1) {
            currentVolume += 0.1;
            musicPlayer.volume = currentVolume;
        }
    }

    // Función para bajar el volumen
    function decreaseVolume() {
        if (currentVolume > 0) {
            currentVolume -= 0.1;
            musicPlayer.volume = currentVolume;
        }
    }

    document.getElementById("prev").addEventListener("click", playPreviousSong);
    document.getElementById("next").addEventListener("click", playNextSong);
    document.getElementById("center").addEventListener("click", play);
    document.getElementById("vol-up").addEventListener("click", increaseVolume);
    document.getElementById("vol-down").addEventListener("click", decreaseVolume);

    // reproducir la canción seleccionada
    function playSong(event) {
        event.preventDefault();
        const songId = parseInt(event.target.dataset.id);
        const selectedSong = songs.find(song => song.id === songId);

        if (selectedSong) {
            currentSongIndex = songs.findIndex(song => song.id === songId);
            updateCurrentSong();

            if (isPlaying) {
                musicPlayer.play();
            }
        }
    }

    // crear lista de canciones
    songs.forEach(song => {
        const listItem = document.createElement("li");
        listItem.classList.add("song-item");
        const link = document.createElement("a");
        link.href = "#";
        link.textContent = `${song.id}. ${song.name}`;
        link.dataset.id = song.id;
        link.addEventListener("click", playSong);
        listItem.appendChild(link);
        songList.appendChild(listItem);
    });

    updateCurrentSong();
});