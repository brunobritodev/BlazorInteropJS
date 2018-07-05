Blazor.registerFunction('GerarPDF', function () {
    // PDF - Init the configs
    var pdf = new jsPDF('p', 'pt', 'letter');
    // source can be HTML-formatted string, or a reference
    // to an actual DOM element from which the text will be scraped.
    var source = $('#tabelaCotacoes')[0];
    // we support special element handlers. Register them with jQuery-style
    // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
    // There is no support for any other type of selectors
    // (class, of compound) at this time.
    var specialElementHandlers = {
        // element with id of "bypass" - jQuery style selector
        '#bypassme': function (element, renderer) {
            // true = "handled elsewhere, bypass text extraction"
            return true
        }
    };
    var margins = {
        top: 80,
        bottom: 60,
        left: 40,
        width: 522
    };
    // all coords and widths are in jsPDF instance's declared units
    // 'inches' in this case
    pdf.fromHTML(
        source, // HTML string or DOM elem ref.
        margins.left, // x coord
        margins.top, {// y coord
            'width': margins.width, // max width of content on PDF
            'elementHandlers': specialElementHandlers
        }, margins);

    // dispose: object with X, Y of the last line add to the PDF
    // this allow the insertion of new lines after html
    pdf.save('cotacoes.pdf');
});

Blazor.registerFunction("DocumentReady", function () {
    if (document.getElementById('btnJsToCs') == null)
        return;

    var events = $._data(document.getElementById('btnJsToCs'), "events");
    var hasEvents = (events != null);
    if (!hasEvents) {
        $("#btnJsToCs").on("click", function () {

            let resultAsJavaScriptString = Blazor.invokeDotNetMethod({
                type: {
                    assembly: 'BlazorInteropJs.Client',
                    name: 'BlazorInteropJs.Client.Pages.MoedasModel'

                },
                method: {
                    name: 'ExecutarRotinaCSharp'
                }
            }, "Saindo Da Caixinha");

            $("#resultadoCSharp").text("Resultado do metodo: " + resultAsJavaScriptString);
        });
    }
});