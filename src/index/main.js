let viewerUrl = localStorage.getItem('viewer-url');
if (viewerUrl) {
    document.getElementById('viewer-url').value = viewerUrl;
}
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

function drawTable() {
    let table = '';
    for (let groupLabel in testCases) {
        const testCasesGroup = testCases[groupLabel];
        table += '<tr><th colspan="4"><strong>' + groupLabel + '</strong></th></tr>';
        for (let id in testCasesGroup) {
            let testCase;
            if (testCases[groupLabel][id].hasOwnProperty('label')) {
                testCase = testCases[groupLabel][id];
            } else {
                testCase = {label: testCases[groupLabel][id]};
            }
            testCase.id = id;
            const baseUrl = window.location.href;
            const manifestUrlV3 = testCases[groupLabel][id].hasOwnProperty('uri') ?
                baseUrl + 'iiif/v3/' + testCases[groupLabel][id].uri :
                baseUrl + 'iiif/v3/collection/' + testCase.id;
            const openUrl = isURL(viewerUrl) ? viewerUrl + '?manifest=' + manifestUrlV3 : manifestUrlV3;
            table +=
                '<tr>' +
                '<td><a class="open" href="' + openUrl + '" target="_blank">' + id + '</td>' +
                '<td>' + testCase.label + '</td>' +
                getLinks(testCase, 'v2') +
                getLinks(testCase, 'v3') +
                '</tr>';
        }
    }
    document.querySelector('#test-cases > tbody').innerHTML = table;
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
    const route = testCase.hasOwnProperty('uri') ?
        '/' + testCase.uri :
        '/collection/' + testCase.id;
    const manifestUrl = baseUrl + 'iiif/' + version + route;

    let output = '<td>';
    if (isURL(viewerUrl)) {
        output += '<a class="open-in-viewer" href="" target="_blank"><img class="icon" title="Open in viewer" alt="Open in viewer" src="/public/eye-regular.svg" /></a>';
    }
    output += '<a class="open-manifest" href="' + manifestUrl + '" target="_blank"><img class="icon" title="Open" alt="Open" src="/public/file-solid.svg" /></a>';

    if (version === 'v3') {
        const validationUrl = baseUrl + 'validate?manifest=' + manifestUrl;
        output += '<a href="' + validationUrl + '" target="_blank"><img class="icon" title="Validate" alt="Validate" src="/public/check-circle-regular.svg" /></a>';
    }

    const mirardorUrl = baseUrl + 'mirador?manifest=' + manifestUrl;
    output += '<a class="mirador" href="' + mirardorUrl + '" target="_blank">' +
        '<img class="icon" title="Open in viewer" alt="Open in viewer" src="/public/mirador-logo.png" />' +
        '</a>';

    if (testCase.uv === true) {
        let uvUrl = baseUrl + 'universalViewer?manifest=' + manifestUrl;
        output += '<a class="universal-viewer" href="' + uvUrl + '" target="_blank">UV</a>';
    }

    output += '</td>';

    return output;
}
