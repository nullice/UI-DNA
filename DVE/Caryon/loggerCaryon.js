/**
 * Created by bgllj on 2017/2/2.
 */




var LoggerCaryon = function ()
{

    this.hideAll = false; //隐藏“所有信息”输出到控制台
    this.hideLog = false; //隐藏“log”输出到控制台
    this.hideInfo = false; //隐藏“info”输出到控制台
    this.hideErr = false; //隐藏“err”输出到控制台
    this.hideTset = false; //隐藏“test”输出到控制台
    this.hideTemp = false; //隐藏“Temp”输出到控制台


    this.logs = []//存储每一条日志


    window.onerror = function (errorMessage, scriptURI, lineNumber, columnNumber, errorObj)
    {
        console.log("错误信息：", errorMessage);
        console.log("出错文件：", scriptURI);
        console.log("出错行号：", lineNumber);
        console.log("出错列号：", columnNumber);
        console.log("错误详情：", errorObj);
    }

    // throw new Error("出错了！");

    return this;

}


LoggerCaryon.prototype._logMeta = function (type, msgs)
{
    var log = {
        type: type,
        msgs: msgs,
        time: new Date()
    }
    this.logs.push(log)
}


LoggerCaryon.prototype.log = function ()
{
    var msgs = Array.from(arguments);//参数转换为数组
    this._logMeta("log", msgs);


}

LoggerCaryon.prototype.err = function ()
{
    var msgs = Array.from(arguments);//参数转换为数组
    this._logMeta("err", msgs);
    if (this.hideAll == false && this.hideErr== false)
    {
        console.err.apply(console, msgs)
    }
}

LoggerCaryon.prototype.info = function ()
{
    var msgs = Array.from(arguments);//参数转换为数组
    this._logMeta("info", msgs);
    if (this.hideAll == false && this.hideErr== false)
    {
        console.err.apply(console, msgs)
    }
}

LoggerCaryon.prototype.test = function ()
{
    var msgs = Array.from(arguments);//参数转换为数组

    if(typeof msgs[0]!="function" && typeof msgs[0]!="object")
    {
        msgs[0] ="%c"+msgs[0];
        msgs.splice(1,0,"color: #008c7d;")
    }

    this._logMeta("tset", msgs);

    if (this.hideAll == false && this.hideErr== false)
    {
        console.log.apply(console, msgs)
    }
}

LoggerCaryon.prototype.temp = function ()
{
    var msgs = Array.from(arguments);//参数转换为数组

    if(typeof msgs[0]!="function" && typeof msgs[0]!="object")
    {
        msgs[0] ="%c"+msgs[0];
        msgs.splice(1,0,"color: #9a1ad6;")
    }

    this._logMeta("temp", msgs);

    if (this.hideAll == false && this.hideErr== false)
    {
        console.log.apply(console, msgs)
    }
}



export default LoggerCaryon;