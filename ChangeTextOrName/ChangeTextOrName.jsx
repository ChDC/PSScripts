#target photoshop/**************************Author: Chen DacaiHomepage: https://github.com/ChDCDate: 2017-03-16 21:38:00Version: 2.0.0***************************//* formate date */Date.prototype.format = function(fmt){  var o = {    "M+" : this.getMonth()+1,    "d+" : this.getDate(),    "h+" : this.getHours(),    "m+" : this.getMinutes(),    "s+" : this.getSeconds(),    "q+" : Math.floor((this.getMonth()+3)/3),    "S"  : this.getMilliseconds()  };  if(/(y+)/.test(fmt))    fmt = fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));  for(var k in o){    if(new RegExp("("+ k +")").test(fmt))        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));  }  return fmt;}/* format person name: transform name with two char to three */function formatName(text){    if(!text)        return '';    text = text.replace(/ /g, '');    if(text.length > 3)        return text.substring(0,3);    if(text.length == 2)        return text[0] + '  ' + text[1];    return text;}/* format text to legal file name */function toFileName(text){    return text.replace(/[\\\/*?":<>|]/g, '');}/* define the function to change text */function changeText(doc, layer, text, outputDir){    if(!text || !outputDir)      return;    if(layer.kind == LayerKind.TEXT){        var textitem = layer.textItem;        textitem.contents = text;        doc.saveAs(new File(outputDir + '/' + toFileName(text) + '.jpg'),  JPEGSaveOptions, true);    }}function main(){    var cc; // current document    try{        cc = app.activeDocument;    }    catch(e){        alert('错误：未打开模板文件');        return;    }    var cl; // current layer    try{        cl = cc.activeLayer;    }    catch(e){        alert('错误：未选中要修改文本的图层');        return;    }    if(cl.kind != LayerKind.TEXT){        alert('错误：选中的图层不是文本图层');        return;    }    var workDir = $.fileName.match(/^.+\/+/)[0]; // work directory    // read text list from list file: list.txt    try{        var listFile = new File(workDir + "list.txt");        if(listFile.exists === false){            alert("列表文件不存在，请创建列表文件并向其中添加数据");            return;        }        listFile.open('r');        var texts = listFile.read();        listFile.close()    }    catch(e){        alert("读取列表文件失败！错误原因：" + e);        return;    }    var outputFolder = new Folder(workDir + "output/" + (new Date()).format("yyyyMMddhhmmss"));    try{        outputFolder.create();    }    catch(e){        alert('创建输出目录失败！错误原因：' + e);        return;    }    var isHandleName = confirm("是否用该程序修改名字？");    texts = texts.split('\n');    for(var i=0; i< texts.length; i++){        var n = texts[i];        if(isHandleName)            changeText(cc, cl, formatName(n), outputFolder);        else            changeText(cc, cl, n, outputFolder);    }    alert('执行完成！')}function test(){    var workDir = $.fileName.match(/^.+\/+/)[0]; // work directory    var textFile = File(workDir + "list.txt");    alert(textFile.exists);}// test();main()