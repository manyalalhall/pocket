document.addEventListener('DOMContentLoaded', async () => {
  let images = [];
  let currentIndex = 0;

  const walletBtn = document.getElementById('walletBtn');
  const modal = document.getElementById('modal');
  const closeBtn = document.getElementById('closeBtn');
  const input = document.getElementById('imageInput');
  const addPicturesBtn = document.getElementById('addPicturesBtn');

  // load saved images on startup
  images = await window.electronAPI.loadImages();
  if (images.length > 0) showImage();

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
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = e.target.result.split(',')[1]; // strip the data:image/...;base64, part
        const name = `${Date.now()}-${file.name}`; // unique filename
        await window.electronAPI.saveImage(name, base64); // save to disk
        images.push(e.target.result);
        if (images.length === 1) showImage();
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

  // make all icons draggable
    document.querySelectorAll('.draggable-icon').forEach(icon => {
        let offsetX, offsetY;

        icon.addEventListener('mousedown', (e) => {
         offsetX = e.clientX - icon.getBoundingClientRect().left;
        offsetY = e.clientY - icon.getBoundingClientRect().top;

        function onMouseMove(e) {
            const iconW = icon.offsetWidth;
            const iconH = icon.offsetHeight;
  
            const margin = 0.5;
            const maxX = window.innerWidth - iconW * margin;
            const maxY = window.innerHeight - iconH * margin;
            const minX = -iconW * margin;
            const minY = -iconH * margin;

            const newX = Math.min(Math.max(minX, e.clientX - offsetX), maxX);
            const newY = Math.min(Math.max(minY, e.clientY - offsetY), maxY);

            icon.style.left = `${newX}px`;
            icon.style.top = `${newY}px`;
        }

        function onMouseUp() {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
    });
});