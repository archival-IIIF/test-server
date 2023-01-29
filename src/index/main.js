let viewerUrlEle = document.getElementById('viewer-url');
let viewerTypeEle = document.getElementById('viewer-type');


let viewerUrl = localStorage.getItem('viewer-url');
if (!viewerUrl || viewerUrl === '') {
    viewerUrl = 'archivalIIIF';
}
viewerUrlEle.value = viewerUrl;
let viewerType = viewerUrl;
let lastViewerUrl = '';
const viewers = ['archivalIIIF', 'mirador', 'universalViewer'];
if (!viewers.includes(viewerType)) {
    viewerType = 'customUrl';
    viewerUrlEle.style.display = 'block';
    lastViewerUrl = viewerUrl;
} else {
    viewerUrlEle.style.display = 'none';
}
viewerTypeEle.value = viewerType;


let testCases = [];

fetch('testCases.json').then(
    response => response.json().then(result => {
        testCases = result;
        drawTable();
    })
);

function viewerUrlChanged(value) {
    viewerUrl = value;
    localStorage.setItem('viewer-url', value);
    drawTable()
}

function viewerTypeChanged(value) {
    if (viewers.includes(value)) {
        if (!viewers.includes(viewerUrl)) {
            lastViewerUrl = viewerUrl;
        }
        viewerUrl = value;
        viewerUrlEle.style.display = 'none';
    } else {
        viewerUrl = lastViewerUrl;
        viewerUrlEle.style.display = 'block';
        viewerUrlEle.value = viewerUrl;
    }

    localStorage.setItem('viewer-url', viewerUrl);
    drawTable()
}

function drawTable() {
    let table = '';
    for (let groupLabel in testCases) {
        const testCasesGroup = testCases[groupLabel];
        table += '<tr><th colspan="4"><strong>' + groupLabel + '</strong></th></tr>';
        for (let testCase of testCasesGroup) {
            const baseUrl = window.location.href;
            const manifestUrlV3 = baseUrl + 'iiif/v3/' + testCase.uri
            const openUrl = getViewerUrl()  + '?manifest=' + manifestUrlV3;
            table +=
                '<tr>' +
                '<td><a class="open" href="' + openUrl + '" target="_blank">' + testCase.label + '</td>' +
                getLinks(testCase, 'v2') +
                getLinks(testCase, 'v3') +
                '</tr>';
        }
    }
    document.querySelector('#test-cases > tbody').innerHTML = table;
}

function getViewerUrl() {
    if (isURL(viewerUrl) || viewers.includes(viewerUrl)) {
        return viewerUrl;
    }

    return 'archivalIIIF';
}

function isURL(str) {
    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return pattern.test(str);
}

function getLinks(testCase, version) {

    if (testCase.hasOwnProperty(version) && testCase[version] === false) {
        return '<td></td>'
    }

    let baseUrl = window.location.href;
    const route =  '/' + testCase.uri;
    const manifestUrl = baseUrl + 'iiif/' + version + route;

    let output = '<td>';
    const openUrl = getViewerUrl() + '?manifest=' + manifestUrl;
    output += '<a class="open-in-viewer" href="'+openUrl+'" target="_blank"><img class="icon" ' +
        'title="Open in default viewer" alt="Open in viewer" src="/public/eye-regular.svg" /></a>';
    output += '<a class="open-manifest" href="' + manifestUrl + '" target="_blank"><img class="icon" title="Open manifest" ' +
        'alt="Open manifest" src="/public/file-solid.svg" /></a>';

    if (version === 'v3') {
        const validationUrl = baseUrl + 'validate?manifest=' + manifestUrl;
        output += '<a href="' + validationUrl + '" target="_blank"><img class="icon" title="Validate manifest" ' +
            'alt="Validate manifest" src="/public/check-circle-regular.svg" /></a>';
    }

    const archivalIIIFUrl = baseUrl + 'archivalIIIF?manifest=' + manifestUrl;
    output += '<a class="mirador" href="' + archivalIIIFUrl + '" target="_blank">' +
        '<img class="icon" title="Open in Archival IIIF viewer" alt="Open in Archival IIIF viewer" src="/public/folder-tree-solid.svg" />' +
        '</a>';

    const miradorUrl = baseUrl + 'mirador?manifest=' + manifestUrl;
    output += '<a class="mirador" href="' + miradorUrl + '" target="_blank">' +
        '<img class="icon" title="Open in mirador viewer" alt="Open in mirador viewer" src="/public/mirador-logo.png" />' +
        '</a>';

    if (testCase.uv === true) {
        let uvUrl = baseUrl + 'universalViewer?manifest=' + manifestUrl;
        output += '<a class="universal-viewer" href="' + uvUrl + '" target="_blank" title="pen in UniversalViewer viewer"' +
            '>UV</a>';
    }

    output += '</td>';

    return output;
}
