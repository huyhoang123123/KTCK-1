
const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
// songs title // mảng chứa bài hát 
const songs = ['Chào Em Cô Gái Lam Hồng', 'Bao Lâu Ta Mới Yêu Một Người', 'Con Thuyền Cô Đơn'];

// Keep track of song // đánh index 
let songIndex = 2;

// Innitialy load song details into DOM 
loadSong(songs[songIndex]);
// load bài 

//Update song details // Load bài hát 
function loadSong(song) {
	title.innerText = song;
	audio.src = `music/${song}.mp3`;
	cover.src = `images/${song}.jpg`;
}

// Play song // phát 
function playSong() {
	musicContainer.classList.add('play');
	playBtn.querySelector('i.fas').classList.remove('fa-play');
	playBtn.querySelector('i.fas').classList.add('fa-pause');
	audio.play();


}

// Pause  song // dừng
function pauseSong() {
	musicContainer.classList.remove('play');
	playBtn.querySelector('i.fas').classList.add('fa-play');
	playBtn.querySelector('i.fas').classList.remove('fa-pause');
	audio.pause();

}
// Prev song // bài phía trước 
function prevSong() {
	songIndex--; // giảm 
	if (songIndex < 0) {
		songIndex = songs.leght - 1;

	}
	loadSong(songs[songIndex]);
	playSong();
}
// Next song // bài tiếp theo
function nextSong() {
	songIndex++; // tăng
	if (songIndex > songs.leght - 1) {
		songIndex = 0;

	}
	loadSong(songs[songIndex]);
	playSong();
}

// Update progress bar // thời gian phát 
function updateProgress(e) {
	const { duration, currentTime } = e.srcElement;
	// thời lượng - time hiện tại
	const progressPercent = (currentTime / duration) * 100;
	progress.style.width = `${progressPercent}%`;

}
// set progress bar //tua bài hát
function setProgress(e) {
	const width = this.clientWidth;
	const clickX = e.offsetX;
	const duration = audio.duration;
	audio.currentTime = (clickX / width) * duration;

}
// Event listeners // sự kiện click 
playBtn.addEventListener('click', () => {
	const isPlaying = musicContainer.classList.contains('play'); // chứa đựng
	if (isPlaying) {
		pauseSong();

	} else {
		playSong();
	}
});
// Change song // thay đổi bài 
prevBtn.addEventListener('click', prevSong); // bài tiếp 
nextBtn.addEventListener('click', nextSong); // bài sau

// Time / song update  // thời gian 
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar // tua 
progressContainer.addEventListener('click', setProgress);

// Song ends // phát tự động 
audio.addEventListener('ended', nextSong);

