document.addEventListener("DOMContentLoaded", function() {
    const songs = [
        // JSON canciones
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

    const musicPlayer = document.getElementById("music-player");
    const songImage = document.getElementById("song-image");
    const songTitle = document.getElementById("song-title");
    const welcomeText = document.getElementById("welcome-text");
    const nameInputContainer = document.getElementById("name-input-container");
    const screen = document.getElementById("screen");
    const backButton = document.createElement("button");
    backButton.textContent = "Volver Atrás";
    backButton.id = "back-to-welcome";
    backButton.style.display = "none";
    screen.appendChild(backButton);

    let currentSongIndex = -1;
    let isPlaying = false;
    let isSongDetailsView = false;

    document.getElementById("submit-name").addEventListener("click", function() {
        const nameInput = document.getElementById("name-input");
        const userName = nameInput.value.trim();
        if (userName) {
            welcomeText.textContent = `Hola, ${userName}!`;
            nameInputContainer.style.display = "none";
            showSongListButton();
        }
    });

    function showSongListButton() {
        const showListButton = document.createElement("button");
        showListButton.textContent = "Ver Lista de Canciones";
        showListButton.id = "show-song-list";
        screen.appendChild(showListButton);

        showListButton.addEventListener("click", function() {
            showSongList();
        });
    }

    function showSongList() {
        isSongDetailsView = false; // vista de playlist
        backButton.style.display = "block";
        const songListContainer = document.createElement("div");
        songListContainer.classList.add("song-list-container");

        const songList = document.createElement("ul");
        songList.classList.add("song-list");

        songs.forEach(song => {
            const listItem = document.createElement("li");
            listItem.classList.add("song-item");
            const link = document.createElement("a");
            link.href = "#";
            link.textContent = `${song.id}. ${song.name}`;
            link.dataset.id = song.id;
            link.addEventListener("click", function(event) {
                event.preventDefault();
                showSongDetails(song);
            });
            listItem.appendChild(link);
            songList.appendChild(listItem);
        });

        songListContainer.appendChild(songList);
        screen.style.backgroundImage = "";
        screen.innerHTML = "";
        screen.appendChild(songListContainer);
    }

    function showSongDetails(song) {
        isSongDetailsView = true; // detalle de la cancion
        const songDetails = document.createElement("div");
        songDetails.classList.add("song-details");

        const title = document.createElement("h3");
        title.textContent = song.name;
        songDetails.appendChild(title);

        const image = document.createElement("img");
        image.src = song.image;
        image.alt = song.name;
        songDetails.appendChild(image);

        const backToListButton = document.createElement("button");
        backToListButton.textContent = "Volver Atrás";
        backToListButton.addEventListener("click", function() {
            showSongList();
        });
        songDetails.appendChild(backToListButton);

        screen.style.backgroundImage = `url(${song.image})`;
        screen.style.backgroundSize = "cover";
        screen.style.backgroundPosition = "center";

        screen.innerHTML = "";
        screen.appendChild(songDetails);

        currentSongIndex = songs.findIndex(s => s.id === song.id);
        updateCurrentSong();
    }

    backButton.addEventListener("click", function() {
        showSongList();
    });

    function updateCurrentSong() {
        if (currentSongIndex !== -1) {
            const currentSong = songs[currentSongIndex];
            musicPlayer.src = currentSong.audio;
            if (isPlaying) {
                musicPlayer.play();
            } else {
                musicPlayer.pause();
            }
            songTitle.textContent = currentSong.name;

            if (isSongDetailsView) {
                songImage.src = currentSong.image; // actualiza la imagen (solo si estamos detalle de la cancion)
            }

            if (document.querySelector(".song-details")) {
                const titleElement = document.querySelector(".song-details h3");
                const imageElement = document.querySelector(".song-details img");

                if (titleElement && imageElement) {
                    titleElement.textContent = currentSong.name;
                    imageElement.src = currentSong.image;
                    imageElement.alt = currentSong.name;
                }
            }

            // actualiza imagen de fondo
            screen.style.backgroundImage = `url(${currentSong.image})`;
            screen.style.backgroundSize = "cover";
            screen.style.backgroundPosition = "center";
        } else {
            musicPlayer.pause();
            songTitle.textContent = "";
        }
    }

    document.getElementById("center").addEventListener("click", function() {
        if (currentSongIndex !== -1) {
            togglePlay();
        }
    });

    document.getElementById("vol-up").addEventListener("click", function() {
        changeVolume("up");
    });

    document.getElementById("vol-down").addEventListener("click", function() {
        changeVolume("down");
    });

    document.getElementById("prev").addEventListener("click", function() {
        changeSong("prev");
    });

    document.getElementById("next").addEventListener("click", function() {
        changeSong("next");
    });

    function togglePlay() {
        if (isPlaying) {
            musicPlayer.pause();
        } else {
            musicPlayer.play();
        }
        isPlaying = !isPlaying;
    }

    function changeVolume(direction) {
        const currentVolume = musicPlayer.volume;
        if (direction === "up") {
            if (currentVolume < 1) {
                musicPlayer.volume += 0.1;
            }
        } else if (direction === "down") {
            if (currentVolume > 0) {
                musicPlayer.volume -= 0.1;
            }
        }
    }

    function changeSong(direction) {
        if (songs.length === 0) return;

        if (direction === "prev") {
            currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        } else if (direction === "next") {
            currentSongIndex = (currentSongIndex + 1) % songs.length;
        }

        updateCurrentSong();
    }

    updateCurrentSong();
});