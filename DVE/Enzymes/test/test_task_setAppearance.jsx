$.evalFile("E:/Work/GitHub/UI-DNA/DVE/Enzymes/test/test.jsx")

// ki.layer.getAllLayersItemIndex()
//ki.layer.setLayerBounds({x:0,y:0 },Kinase.REF_ItemIndex,1)


ki.layer.getLayerBounds(Kinase.REF_ActiveLayer,null)




// var adOb_opacity = {
//     "null": {
//         "value": {
//             "container": {
//                 "container": {}
//             },
//             "form": "ReferenceFormType.ENUMERATED",
//             "desiredClass": "layer",
//             "enumeratedType": "ordinal",
//             "enumeratedValue": "targetEnum"
//         }, "type": "DescValueType.REFERENCETYPE"
//     },
//     "to": {
//         "value": {
//             "opacity": {
//                 "value": {"doubleType": "percentUnit", "doubleValue": 44},
//                 "type": "DescValueType.UNITDOUBLE"
//             }
//         }, "type": "DescValueType.OBJECTTYPE", "objectType": "layer"
//     }
// }
//
// var refOb = mu.actionReferenceToObject(Kinase.REF_ActiveLayer)
// adOb_opacity.null.value = refOb;
//
// mu.executeActionObjcet(charIDToTypeID("setd"), adOb_opacity);