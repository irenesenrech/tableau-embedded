var viz; var wb;
const sheets = [];

function initViz() {
    console.log('Starting...')
    containerDiv = document.getElementById("vizContainer"),
    
    // url = "https://public.tableau.com/views/SuperstoreTest_16354975215580/"+ document.getElementById("db_selector").value +"?:language=es-ES&:display_count=n&:origin=viz_share_link"
    url = "https://public.tableau.com/views/"+ document.getElementById("db_selector").value +"?:language=es-ES&:display_count=n&:origin=viz_share_link"
    var h = '1127px';
    switch (document.getElementById("db_selector").value) {
        case 'SuperstoreTest_16354975215580/Overview':
            h = '825px';
            break;
        default:
            h = '1127px';
            break;
    } 
    options = {
        hideToolbar: true, width: '1000px', height: h, 
        onFirstInteractive: function () {
            wb = viz.getWorkbook();
            db = wb.getActiveSheet();
            shs = db.getWorksheets();
            for (i=0; i<shs.length; i++) {
                sheets.push(shs[i].getName());
            };
            document.getElementById("description").innerText = 'Dashboard: ' + db.getName() + '\n' + 'Hojas: ' + sheets;
        },
    }
    viz = new tableau.Viz(containerDiv, url, options);
    viz.addEventListener(tableau.TableauEventName.MARKS_SELECTION, marks1);
};

function resetViz() {
    if (viz) {
        viz.dispose();
    }
    initViz();
}

function marks1(marksEvent) {
    return marksEvent.getMarksAsync().then(marks => {
        var html = "";
        for (var markIndex = 0; markIndex < marks.length; markIndex++) {
            var pairs = marks[markIndex].getPairs();
            var index = markIndex + 1;
            html += "<b>Mark " + index + ":</b><ul>";
            for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
                var pair = pairs[pairIndex];
                html += "<li><b>" + pair.fieldName + ": " + pair.formattedValue + "</b></li>";}
            html += "</ul>"};
            document.getElementById('markDetails').innerHTML = html;
});};