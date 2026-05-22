let images=[];
let currentIndex=0;
const walletBtn = document.getElementById('walletBtn');
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('closeBtn');

walletBtn.addEventListener('click', () => {
  modal.style.display = 'block';
});

closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
  modal.style.display = 'none';
});

const input = document.getElementById('imageInput');
input.addEventListener('change', () => {
  images = Array.from(input.files).map(file => URL.createObjectURL(file));
  currentIndex = 0;
  showImage();
});

function showImage(){
    const display=document.getElementById('imageDisplay');
    if (image.length===0){
        display.style.display='none';
        return;
    }
    display.style.display='block';
    display.src=images[currentIndex];
}
document.getElementById('modalContent').addEventListener('click', () => {
  if (images.length === 0) return;
  currentIndex = Math.floor(Math.random() * images.length);
  showImage();
});

// Optional: click outside modal to close
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

input.addEventListener('change', () => {
  const files = Array.from(input.files);
  images = [];
  
  files.forEach((file, i) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      images.push(e.target.result); // base64 data URL
      if (i === 0) showImage();     // show first image once ready
    };
    reader.readAsDataURL(file);
  });
});