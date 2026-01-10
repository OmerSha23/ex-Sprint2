'use strict'

let gElCanvas
let gCtx
let gIsDragging = false
let gDraggedLineIdx = -1

let gImgs = [
    { id: 1, url: '/meme-imgs/meme-imgs (square)/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: '/meme-imgs/meme-imgs (square)/2.jpg', keywords: ['happy', 'dog'] },
    { id: 3, url: '/meme-imgs/meme-imgs (square)/3.jpg', keywords: ['happy', 'dog'] },
    { id: 4, url: '/meme-imgs/meme-imgs (square)/4.jpg', keywords: ['happy', 'dog'] },
    { id: 5, url: '/meme-imgs/meme-imgs (square)/5.jpg', keywords: ['happy', 'dog'] },
    { id: 6, url: '/meme-imgs/meme-imgs (square)/6.jpg', keywords: ['happy', 'dog'] },
]
let gMeme = {
    selectedImgId: null,
    selectedLineIdx: 0,
    lines: [{
        txt: 'Sprint2',
        size: 40,
        color: 'white',
        x: null,
        y: 60,
    },
    { txt: 'CA2026',
         size: 40, 
         color: 'white',
          x: null,
           y: 440 
        }]
}
function addLine() {
    const newLine = {
        txt: 'NEW TEXT',
        size: 50,
        color: '#ffffff',
        x: null,
        y: null,       
        align: 'center'
    }

    gMeme.lines.push(newLine)
    gMeme.selectedLineIdx = gMeme.lines.length - 1 
    updateTextInput()
    renderMeme()
}

function switchLine() {
    gMeme.selectedLineIdx = (gMeme.selectedLineIdx + 1) % gMeme.lines.length
    updateTextInput()
    renderMeme()
}


function init() {
    gElCanvas = document.getElementById('meme-canvas')
    gCtx = gElCanvas.getContext('2d')

    gElCanvas.addEventListener('mousedown', onMouseDown)
    gElCanvas.addEventListener('mousemove', onMouseMove)
    gElCanvas.addEventListener('mouseup', onMouseUp)
    gElCanvas.addEventListener('touchstart', onTouchStart)
    gElCanvas.addEventListener('touchmove', onTouchMove)
    gElCanvas.addEventListener('touchend', onTouchEnd)

    renderGallery()
}

function getEvPos(ev) {
    let pos = { x: ev.offsetX, y: ev.offsetY }
    if (ev.touches) {
        const rect = gElCanvas.getBoundingClientRect()
        pos.x = ev.touches[0].clientX - rect.left
        pos.y = ev.touches[0].clientY - rect.top
    }
    return pos;
}

function isPosInText(line, pos) {
    gCtx.font = `bold ${line.size}px Impact, Arial, sans-serif`
    const metrics = gCtx.measureText(line.txt.toUpperCase())
    const width = metrics.width;
    const height = line.size * 1.2
    return (
        pos.x > line.x - width / 2 &&
        pos.x < line.x + width / 2 &&
        pos.y > line.y - height / 2 &&
        pos.y < line.y + height / 2
    )
}

function onMouseDown(ev) {
    ev.preventDefault()
    const pos = getEvPos(ev)
    handleDragStart(pos)
}
function onTouchStart(ev) {
    ev.preventDefault()
    const pos = getEvPos(ev)
    handleDragStart(pos)
}
function handleDragStart(pos) {
    const lines = gMeme.lines
    for (let i = 0; i < lines.length; i++) {
        if (isPosInText(lines[i], pos)) {
            gDraggedLineIdx = i
            gMeme.selectedLineIdx = i
            gIsDragging = true
            return
        }
        updateTextInput()
    }
}

function onMouseMove(ev) {
    if (!gIsDragging) return
    ev.preventDefault()
    const pos = getEvPos(ev)
    handleDragMove(pos)
}
function onTouchMove(ev) {
    if (!gIsDragging) return
    ev.preventDefault()
    const pos = getEvPos(ev)
    handleDragMove(pos)
}
function handleDragMove(pos) {
    gMeme.lines[gDraggedLineIdx].x = pos.x
    gMeme.lines[gDraggedLineIdx].y = pos.y
    renderMeme()
}

function onMouseUp(ev) {
    ev.preventDefault()
    gIsDragging = false
    gDraggedLineIdx = -1
}
function onTouchEnd(ev) {
    ev.preventDefault()
    gIsDragging = false
    gDraggedLineIdx = -1
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

function changeFontSize(fontSize) {
    const line = gMeme.lines[gMeme.selectedLineIdx]
    line.size = Math.max(10, (line.size || 40) + fontSize)
    renderMeme()
}
