/**
 * Created by bgllj on 2016/10/29.
 */
EnzJSX.DNAExpress('{\
    "5": {"name": "矩形 1", "id": 5, "position": {"w": "252", "h": "606"}},\
    "6": {"name": "矩形 1 拷贝", "id": 6, "position": {}},\
    "999": {"id": 999, "position": {}}\
}', '{\
    "zero": {"_value": 12, "value": 12, "name": "zero", "isFormula": false, "type": null, "relatives": []},\
    "a": {"_value": 252, "value": 252, "name": "a", "isFormula": false, "type": null, "relatives": ["x"]},\
    "b": {"_value": 606, "value": 606, "name": "b", "isFormula": false, "type": null, "relatives": ["x"]},\
    "x": {"_value": "a*b", "value": "a*b", "name": "x", "isFormula": true, "type": null, "relatives": []}\
}')