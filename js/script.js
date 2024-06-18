document.addEventListener("DOMContentLoaded", function() {
    const jsonUrl = '/json/songs.json';
    let songs = [];

    fetch(jsonUrl)
        .then(response => response.json())
        .then(data => {
            songs = data;
            initialize();
        })
        .catch(error => {
            console.error('un ERROR de JSON:', error);
        });

    function initialize() {
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
        let isInPlaylistView = false;  // controla si estamos en la vista de la lista de canciones

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
            isInPlaylistView = true;  // estamos en la vista de la lista de canciones
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

        // solamente las canciones se reproducen en la lista de canciones
        document.getElementById("center").addEventListener("click", function() {
            if (isInPlaylistView && currentSongIndex !== -1) {
                togglePlay();
            }
        });

        document.getElementById("vol-up").addEventListener("click", function() {
            if (isInPlaylistView) {
                changeVolume("up");
            }
        });

        document.getElementById("vol-down").addEventListener("click", function() {
            if (isInPlaylistView) {
                changeVolume("down");
            }
        });

        document.getElementById("prev").addEventListener("click", function() {
            if (isInPlaylistView) {
                changeSong("prev");
            }
        });

        document.getElementById("next").addEventListener("click", function() {
            if (isInPlaylistView) {
                changeSong("next");
            }
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
    }
});