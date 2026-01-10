'use strict'

function renderGallery() {
    const elImages = document.querySelector('.images')
    let strHtml = ''
    gImgs.forEach(img => {
        strHtml += `<img src="${img.url}" alt="Meme Image" onclick="onImgSelect(${img.id})">`
    })
    elImages.innerHTML = strHtml
}

function onImgSelect(imgId) {
    setImg(imgId)
    document.getElementById('gallery').classList.add('hidden')
    document.getElementById('editor').classList.remove('hidden')
    renderMeme()
}
function showGallery() {
    document.getElementById('gallery').classList.remove('hidden')
    document.getElementById('editor').classList.add('hidden')
}

function showEditor() {
    if (!gMeme.selectedImgId) {
        setImg(1)
    }
    document.getElementById('gallery').classList.add('hidden')
    document.getElementById('editor').classList.remove('hidden')
    renderMeme()
}
