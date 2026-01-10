'use strict'
var gImgs = [
    { id: 1, url: '/meme-imgs/meme-imgs (square)/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: '/meme-imgs/meme-imgs (square)/2.jpg', keywords: ['happy', 'dog'] },
    { id: 3, url: '/meme-imgs/meme-imgs (square)/3.jpg', keywords: ['happy', 'dog'] },
    { id: 4, url: '/meme-imgs/meme-imgs (square)/4.jpg', keywords: ['happy', 'dog'] },
    { id: 5, url: '/meme-imgs/meme-imgs (square)/5.jpg', keywords: ['happy', 'dog'] },
    { id: 6, url: '/meme-imgs/meme-imgs (square)/6.jpg', keywords: ['happy', 'dog'] },
]
var gMeme = {
    selectedImgId: null,
    selectedLineIdx: 0,
    lines: [{ txt: 'Sprint2 CA2026', size: 40, color: 'white' }]
}
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

var gElCanvas
var gCtx

function init() {
    gElCanvas = document.getElementById('meme-canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery()
}

function getMeme() {
    return gMeme
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}


