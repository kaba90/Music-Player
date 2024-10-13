let currentTrack = 0;
let tracks = [];


function loadSongs() {
    fetch('songs.json')
        .then(response => response.json())
        .then(data => {
            tracks = data;
            loadTrack(currentTrack);
            displaySongs();
        });
}


function loadTrack(index) {
    const audio = document.getElementById('audio');
    const title = document.getElementById('track-title');
    const artist = document.getElementById('track-artist');

    audio.src = tracks[index].url;
    title.textContent = tracks[index].title;
    artist.textContent = tracks[index].artist;
}


document.getElementById('next-btn').addEventListener('click', () => {
    currentTrack = (currentTrack + 1) % tracks.length;
    loadTrack(currentTrack);
    document.getElementById('audio').play();
});


document.getElementById('add-btn').addEventListener('click', () => {
    const title = document.getElementById('title-input').value;
    const artist = document.getElementById('artist-input').value;
    const url = document.getElementById('url-input').value;

    const newTrack = { title, artist, url };
    tracks.push(newTrack);
    displaySongs();
    saveSongs();
});


function displaySongs() {
    const songList = document.getElementById('song-list');
    songList.innerHTML = '';

    tracks.forEach((track, index) => {
        const li = document.createElement('li');
        li.textContent = `${track.title} - ${track.artist}`;
        
       
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.onclick = () => editSong(index);

        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteSong(index);

        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        songList.appendChild(li);
    });
}

// Bearbeiten Sie ein Lied
function editSong(index) {
    const newTitle = prompt("Geben Sie den Song-Link ein", tracks[index].title);
    const newArtist = prompt("Geben Sie den Song-Link ein", tracks[index].artist);
    const newUrl = prompt("Geben Sie den Song-Link ein", tracks[index].url);

    if (newTitle && newArtist && newUrl) {
        tracks[index] = { title: newTitle, artist: newArtist, url: newUrl };
        displaySongs();
        saveSongs();
    }
}

//  löschen
function deleteSong(index) {
    tracks.splice(index, 1);
    displaySongs();
    saveSongs();
}


function saveSongs() {

    console.log(JSON.stringify(tracks));
}


loadSongs();
