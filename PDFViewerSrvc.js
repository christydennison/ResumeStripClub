module.exports = function () {
  var PDFViewerSrvc = {};

  PDFViewerSrvc.element = document.getElementById('viewerContainer');
  var options = {
    container: PDFViewerSrvc.element,
    findField: document.getElementById('findInput'),
    findMsg: document.getElementById('findMsg'),
    highlightAll: {checked: true},
    caseSensitive: {checked: false}
  };
  PDFViewerSrvc.pdfViewer = new PDFJS.PDFViewer(options);
  PDFViewerSrvc.element.addEventListener('pagesinit', function () {
    // we can use pdfViewer now, e.g. let's change default scale.
    PDFViewerSrvc.pdfViewer.currentScaleValue = 'page-width';
  });

  PDFViewerSrvc.findController = new PDFFindController({
    pdfViewer: PDFViewerSrvc.pdfViewer,
    integratedFind: PDFViewerSrvc.supportsIntegratedFind
  });
  PDFViewerSrvc.pdfViewer.setFindController(PDFViewerSrvc.findController);

  PDFViewerSrvc.findBar = new PDFFindBar({
    bar: document.getElementById('findbar'),
    toggleButton: document.getElementById('viewFind'),
    findField: options.findField,
    highlightAllCheckbox: options.highlightAll,
    caseSensitiveCheckbox: options.caseSensitive,
    findMsg: options.findMsg,
    findStatusIcon: document.getElementById('findStatusIcon'),
    findPreviousButton: document.getElementById('findPrevious'),
    findNextButton: document.getElementById('findNext'),
    findController: PDFViewerSrvc.findController
  });

  PDFViewerSrvc.findController.setFindBar(PDFViewerSrvc.findBar);

  PDFViewerSrvc.findText = function(text) {
    options.findField.value = text;
    PDFViewerSrvc.findBar.dispatchEvent('');
  };

  return PDFViewerSrvc;
};