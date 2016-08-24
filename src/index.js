/**
 * Created by vnguyen on 8/24/16.
 */
import './index.scss';
let images = [];
for (var i = 1; i <= 12; i++) {
    try {
        const path = `./images/${i}.png`;
        images.push(require(path));
    } catch (e) {
        console.log(e);
    }
}
const contentDom = document.getElementById('content');
function onDrop(ev) {
    this.classList.remove('over')
    let srcImgId = ev.dataTransfer.getData("text"),
        srcImg = document.getElementById(srcImgId),
        {target} = ev,
        dropImgSrc = target.src;
    target.src = srcImg.src;
    srcImg.src = dropImgSrc;
}
function allowDrop(ev) {
    ev.preventDefault();
    ev.stopPropagation();
}
function swapNodes(a, b) {
    var aparent = a.parentNode;
    var asibling = a.nextSibling === b ? a : a.nextSibling;
    b.parentNode.insertBefore(a, b);
    aparent.insertBefore(b, asibling);
}
images.forEach((src, i)=> {
    let node = document.createElement('img');
    node.draggable = true;
    node.src = src;
    node.ondragover = allowDrop;
    node.ondrop = onDrop;
    node.id = `image-${i}`;
    node.ondragstart = (function (img) {
        return function (ev) {
            this.classList.add('move');
            ev.dataTransfer.setData("text", ev.target.id);
        }
    })(src);
    node.addEventListener('dragend', function (e) {
        if (e.preventDefault) e.preventDefault();
        this.classList.remove('move');
        return false;
    },false);
    node.addEventListener('dragover', function (e) {
        if (e.preventDefault) e.preventDefault();
        this.classList.add('over')
        return false;
    }, false);
    node.addEventListener('dragleave', function (e) {
        if (e.preventDefault) e.preventDefault();
        this.classList.remove('over')
        return false;
    }, false);
    node.dataset.imageIndex = i;
    contentDom.appendChild(node)
});