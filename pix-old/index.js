const fileInput = document.getElementById('fileInput');
const canvas = document.getElementById('pix');
const ctx = canvas.getContext('2d');
let x = 0;
const pos = [];

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const img = new Image();
        img.src = e.target.result;
        img.onload = function() {
        
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

            for (let h = 0; h < imageData.height; h++) {
                for (let w = 0; w < imageData.width; w++) {
                    const index = (h * imageData.width + w) * 4;
                    const red = imageData.data[index];
                    const green = imageData.data[index + 1];
                    const blue = imageData.data[index + 2];
                    const alpha = imageData.data[index + 3];

                    pos.push([w, h, Math.round(Math.random()), Math.random() * 2, [red, green, blue, alpha], ((red + green + blue) == 250 * 3)]);
                }
            }

            let x = 0;
            setInterval(() => {
                x += 5;
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                pos.forEach((z) => {
                    ctx.fillStyle = `rgba(${z[4].join()})`;

                    if (z[5]) {
                        ctx.fillRect(z[0], z[1], 2, 2);
                    } else if (z[2]) {
                        ctx.fillRect(
                            2 * z[0] + z[0] * Math.sin((x + z[3]) / 1000 - Math.cos(z[3] + x / 1000)) - Math.cos(z[3] + x / 1000),
                            z[1],
                            1,
                            1
                        );
                    } else {
                        ctx.fillRect(
                            z[0] * Math.sin(z[3] + x / 1000 + Math.cos(z[3] + x / 1000)) + Math.cos(z[3] + x / 1000),
                            z[1],
                            1,
                            1
                        );
                    }

                });

            }, 1);
        };
    };
    reader.readAsDataURL(file);
});
