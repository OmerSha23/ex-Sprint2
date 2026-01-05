'use strict'


let gElCanvas
let gCtx
let gStartPos = null



function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    resizeCanvas()
    gElCanvas.addEventListener('mousedown', handleMouseClick)

}
function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')

    gElCanvas.width = elContainer.clientWidth
}



function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}
function handleMouseClick(ev) {
    const { offsetX, offsetY } = ev
    if (!gStartPos) {
        gStartPos = { x: offsetX, y: offsetY }
    } else {
        drawImg(gStartPos.x, gStartPos.y, offsetX, offsetY)
        gStartPos = null
    }

}
