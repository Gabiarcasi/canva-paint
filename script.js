$(document).ready(function() {
    let brushSize = 5;
    let color = 'black';
    let canDraw = false;
    let isErasing = false; // Variável para controlar se está no modo de borracha
    let mouseX = 0;
    let mouseY = 0;

    let screen = $('canvas');
    let ctx = screen[0].getContext('2d');
    let colorInput = $('#color');
    let clearButton = $('.clear');
    let rangeInput = $('#brushSize');
    let modeToggle = $('.mode-toggle');

    colorInput.change(function() {
        color = colorInput.val();
    });

    rangeInput.change(function() {
        brushSize = $(this).val();
        updateThumbSize(brushSize);
    });

    modeToggle.click(function() {
        isErasing = !isErasing;
        modeToggle.text(isErasing ? 'Pincel' : 'Borracha');
    });

    function updateThumbSize(size) {
        rangeInput.css('--thumb-size', size + 'px');
    }

    screen.on('mousedown', function(e) {
        canDraw = true;
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    });
    
    screen.on('mousemove', function(e) {
        if (canDraw) {
            draw(e.offsetX, e.offsetY);
        }
    });

    screen.on('mouseup', function() {
        canDraw = false;
    });

    clearButton.click(function() {
        clearBoard();
    });

    function draw(x, y) {
        ctx.beginPath();
        ctx.lineWidth = brushSize;
        ctx.lineJoin = 'round';
        
        if (isErasing) {
            ctx.globalCompositeOperation = 'destination-out'; // Define a operação de borracha
            ctx.strokeStyle = 'rgba(0,0,0,1)'; // Cor preta para a borracha
        } else {
            ctx.globalCompositeOperation = 'source-over'; // Define a operação de desenho normal
            ctx.strokeStyle = color;
        }
    
        ctx.moveTo(mouseX, mouseY);
        ctx.lineTo(x, y);
        ctx.closePath();
    
        ctx.stroke();
    
        mouseX = x;
        mouseY = y;
    }

    function clearBoard() {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    // Inicializa o tamanho inicial da bolinha
    updateThumbSize(brushSize);
});
