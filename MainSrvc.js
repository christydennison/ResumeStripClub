var PDFViewerSrvc = require('./PDFViewerSrvc')();

module.exports = function () {
    var MainSrvc = {};

    MainSrvc.loadPDF = function(pdfName) {
        PDFJS.getDocument(pdfName).then(function(pdfDocument) {
            PDFViewerSrvc.pdfViewer.setDocument(pdfDocument);

            // pdfDocument.getPage(1).then(function(page) {
            //     var scale = 1.5;
            //     var viewport = page.getViewport(scale);

            //     var context = PDFViewerSrvc.element.getContext('2d');
            //     PDFViewerSrvc.element.height = viewport.height;
            //     PDFViewerSrvc.element.width = viewport.width;

            //     var renderContext = {
            //       canvasContext: context,
            //       viewport: viewport
            //     };
            //     page.render(renderContext);

            //     setTimeout(function() {
            //         PDFViewerSrvc.findText('hello');
            //     }, 100);
            // });
            setTimeout(function() {
                PDFViewerSrvc.findText('hello');
            }, 100);
        });
    }

    return MainSrvc;
};