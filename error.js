function handleErr(err) {
  const CRUrl = err.CRUrls[0]
  const url = CRUrl.url

  DocumentApp.getUi().alert(err.message)

  addFlag(err.text, CRUrl)
}


function addFlag(text, CRUrl) {
  const doc = DocumentApp.getActiveDocument();
  const position = doc.newPosition(text, CRUrl.start);

  text.setForegroundColor(CRUrl.start, CRUrl.end, '#FF0000');
  doc.setCursor(position);
}


function CRError(containingText, CRUrl, error) {
  const url = CRUrl.url
  const messages = {
    duplicate: 'There are at least 2 labels with the code ' + url + '.' +
        "\n\nLabel codes must be 5 letters and label names (e.g. '" +
        url.substr(7) + "') must be unique.",
    multiple: 'One of your paragraphs contains more than one label.' +
        '\n\nParagraphs may contain multiple references, but only one label.' +
        '\nYou probably meant to insert a reference. The last label in' +
        '\nthe paragraph has been highlighed in red.',
    missref: 'The reference highlighted in red has nothing to refer to.' +
        '\nIt might contain a typo or the corresponding label might be missing.' +
        '\n\nUpdating the document when this has been fixed will automatically' +
        '\nrestore the correct colour.',
    unrecognised: 'The label with code ' + url.substr(1, 6) + ' was not recognised.' +
        '\nIt might be a typo or it might be a custom label you' +
        '\nhave not yet added in the configuration sidebar.',
  }
  
  return {
    text: containingText,
    CRUrls: CRUrl,
    error: error,
    message: messages[error],
  }
}
