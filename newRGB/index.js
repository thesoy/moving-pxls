const fileInput = document.getElementById('fileInput');
const canvas = document.getElementById('pix');
const ctx = canvas.getContext('2d');
let x = 0;
const pos = [];

const lineSpeedSlider = document.getElementById('lineSpeed');

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const img = new Image();
        img.src = e.target.result;
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

            for (let h = 0; h < imageData.height; h++) {
                for (let w = 0; w < imageData.width; w++) {
                    const index = (h * imageData.width + w) * 4;
                    const red = imageData.data[index];
                    const green = imageData.data[index + 1];
                    const blue = imageData.data[index + 2];
                    const alpha = imageData.data[index + 3];

                    pos.push([h, w, Math.round(Math.random()), Math.random() * 2, [red, green, blue, alpha], ((red + green + blue) == 250 * 3)]);
                }
            }

            setInterval(() => {                
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }, 300);

            setInterval(() => {
                let x = 0;
                setInterval(() => {
                    x += parseInt(lineSpeedSlider.value); 

                    ctx.fillStyle = 'black';

                    for (let yy = 0; yy < canvas.height; yy++) {
                        for (let ywn = 0; ywn < 3; ywn++) {
                            let c = pos[x + canvas.width * yy]?.[4];
                            let clr = [[255, 0, 0], [0, 255, 0], [0, 0, 255]];

                            const speed = ((c[ywn] + clr[ywn][ywn]) / (255 * 2));

                            ctx.fillStyle = `rgba(${clr[ywn][0]}, ${clr[ywn][1]}, ${clr[ywn][2]}, 0.33=)`;
                            const adjustedX = x * speed; 
                            if (adjustedX >= canvas.width) continue; 
                            ctx.fillRect(adjustedX, yy, 2, 2);
                        }
                    }
                }, 100 );
            }, 400);
        };
    };
    reader.readAsDataURL(file);
});
