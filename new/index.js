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

            
            setInterval(()=>{
                    
                ctx.clearRect(0, 0, canvas.width, canvas.height);

        

            },40)
            setInterval(() => {
                let x = 0;
            
                setInterval(() => {
                    x += 1;
            
                    ctx.fillStyle = 'black';
            
                    for (let yy = 0; yy < canvas.height; yy++) {
                        let c = pos[x + canvas.width * yy]?.[4];
                        let r = c?.[0] || 2;
                        let g = c?.[1] || 2;
                        let b = c?.[2] || 2;
            
                        const speed = (r + g + b) / (3 * 250); // Normalize speed to [0, 1]
            
                        ctx.fillStyle = `rgba(${r},${g},${b},1)`;
                        const adjustedX = x * speed; // Adjust x based on speed
                        if (adjustedX >= canvas.width) continue; // Skip if out of canvas bounds
                        ctx.fillRect(adjustedX, yy, 1, 1);
                    }
                }, 10);
            }, 100);
            
        };
    };
    reader.readAsDataURL(file);
});