import html2canvas from "html2canvas";

export const handleCaptrue = (id) => {
    const el = document.getElementById(id);
    if (el) {
        html2canvas(el).then(canvas=> {
            handleSaveAs(canvas.toDataURL('image/png'), 'image-download.png')
        })
    }
}

const handleSaveAs = (uri, filename) => {
    var link = document.createElement('a');
    document.body.appendChild(link);
    link.href = uri;
    link.download = filename;
    link.click();
    document.body.removeChild(link);
}
