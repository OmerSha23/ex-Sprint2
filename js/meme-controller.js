'use strict'

function renderMeme() {
    const meme = getMeme()
    const selectedImg = gImgs.find(img => img.id === meme.selectedImgId)
    if (!selectedImg) return

    const img = new Image()
    img.src = selectedImg.url

    img.onload = () => {
        const aspect = img.width / img.height
        const canvasWidth = Math.min(600, window.innerWidth * 0.9)
        gElCanvas.width = canvasWidth
        gElCanvas.height = canvasWidth / aspect

        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

        meme.lines.forEach((line, idx) => {
            if (line.x === null) line.x = gElCanvas.width / 2
            if (line.y === null) {
                line.y = idx === 0 ? 80 : 
                        idx === meme.lines.length - 1 ? gElCanvas.height - 80 :
                        gElCanvas.height / 2
            }
        })

        meme.lines.forEach((line, idx) => {
            drawText(line.txt, line.x, line.y, line.size, line.color);

        })

        updateDownloadLink()
        updateTextInput()
    }
}

 function drawText(text, x, y, size, color) {
    gCtx.lineWidth = size / 10
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = color
    gCtx.font = `${size}px Impact`
    gCtx.textAlign = 'center'
    gCtx.lineJoin = 'round';

    gCtx.strokeText(text.toUpperCase(), x, y)
    gCtx.fillText(text.toUpperCase(), x, y)
}

function updateTextInput() {
    const line = gMeme.lines[gMeme.selectedLineIdx]
    document.getElementById('text-input').value = line ? line.txt : ''
}

function onTextChange() {
    const txt = document.getElementById('text-input').value
    if (gMeme.lines[gMeme.selectedLineIdx]) {
        gMeme.lines[gMeme.selectedLineIdx].txt = txt
        renderMeme()
    }
}

function onColorChange() {
    const color = document.getElementById('color-picker').value
    if (gMeme.lines[gMeme.selectedLineIdx]) {
        gMeme.lines[gMeme.selectedLineIdx].color = color
        renderMeme()
    }
}

function changeFontSize(delta) {
    const line = gMeme.lines[gMeme.selectedLineIdx]
    if (line) {
        line.size = Math.max(20, (line.size || 50) + delta)
        renderMeme()
    }
}
function updateDownloadLink() {
    const elLink = document.getElementById('download-link')
    elLink.href = gElCanvas.toDataURL('image/png')
}