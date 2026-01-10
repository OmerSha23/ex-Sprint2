'use strict'

function renderMeme() {
    const meme = getMeme()
    const img = new Image()
    const selectedImg = gImgs.find(img => img.id === meme.selectedImgId)
    img.src = selectedImg.url
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText(meme.lines[0].txt, 250, 50, meme.lines[0].size, meme.lines[0].color)
        updateDownloadLink()
    }
}

function drawText(text, x, y, size, color) {
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = color
    gCtx.font = `${size}px Impact`
    gCtx.textAlign = 'center'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function onTextChange() {
    const txt = document.getElementById('text-input').value
    setLineTxt(txt)
    renderMeme()
}

function onColorChange() {
    const color = document.getElementById('color-picker').value
    gMeme.lines[0].color = color
    renderMeme()
}

function updateDownloadLink() {
    const elLink = document.getElementById('download-link')
    elLink.href = gElCanvas.toDataURL('image/png')
}
