document.addEventListener('DOMContentLoaded', () => {
  let images = [];
  let currentIndex = 0;

  const walletBtn = document.getElementById('walletBtn');
  const modal = document.getElementById('modal');
  const closeBtn = document.getElementById('closeBtn');
  const input = document.getElementById('imageInput');
  const addPicturesBtn = document.getElementById('addPicturesBtn');

  // Open file picker when Add Pictures is clicked
  addPicturesBtn.addEventListener('click', () => {
    input.click();
  });

  walletBtn.addEventListener('click', () => {
    modal.style.display = 'block';
  });

  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    modal.style.display = 'none';
  });

  input.addEventListener('change', () => {
    const files = Array.from(input.files);
    files.forEach((file, i) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        images.push(e.target.result); // keeps adding to existing images
        if (images.length === 1) showImage(); // show first image if none before
      };
      reader.readAsDataURL(file);
    });
  });

  function showImage() {
    const display = document.getElementById('imageDisplay');
    if (images.length === 0) return;
    display.src = images[currentIndex];
  }

  document.getElementById('modalContent').addEventListener('click', () => {
    if (images.length === 0) return;
    currentIndex = Math.floor(Math.random() * images.length);
    showImage();
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
});