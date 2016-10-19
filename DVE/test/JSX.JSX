$.evalFile("E:/Work/GitHub/UI-DNA/DVE/Enzymes/test/test.jsx")
$.evalFile("E:/Work/GitHub/UI-DNA/DVE/bin/JSX/json3.js")
$.evalFile("E:/Work/GitHub/UI-DNA/DVE/Enzymes/Enzymes_lib.jsx")

     var ref = new ActionReference();
     ref.putEnumerated( charIDToTypeID('Dcmn'), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );
     var desc = executeActionGet(ref);

log(json(  mu._ad2Ob (desc)))