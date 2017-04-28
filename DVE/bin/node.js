/**
 * Created by bgllj on 2017/3/7.
 */
window.NodeCopy = require("copy-paste")
//----------------------------------------//----------------------------------------
window.SVGO = require("svgo")
window.svgo = new SVGO()
//----------------------------------------
window.nodeCsvReader =  require("node-csv").createParser();
window.nodeCsvWriter =  require("node-csv").createWriter();
//var csv = require('node-csv').createParser('\t', '"', '\\')
//----------------------------------------
window.base65536 = require("base65536");
//----------------------------------------
window.opn = require('opn');
//----------------------------------------
window.axios = require("axios");

//----------------------------------------
window.DecompressZip  = require("decompress-zip");
