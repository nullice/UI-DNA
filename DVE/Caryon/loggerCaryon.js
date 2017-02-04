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
    this.hideTemp = false; //隐藏“temp”输出到控制台
    this.hidePin = false; //隐藏“pin”输出到控制台

    this.logs = []//存储每一条日志


    window.onerror = function (errorMessage, scriptURI, lineNumber, columnNumber, errorObj)
    {
        this.err("错误信息：", errorMessage, "文件：", scriptURI, "位置（行/列）：", lineNumber + "/" + columnNumber, "错误详情：", errorObj)
    }

    // throw new Error("出错了！");

    return this;

}


LoggerCaryon.prototype._logMeta = function (type, msgs, pinTag)
{
    var log = {
        type: type,
        msgs: msgs,
        time: new Date(),
        pinTag: pinTag || null
    }
    this.logs.push(log)
}


LoggerCaryon.prototype.log = function ()
{
    var msgs = Array.from(arguments);//参数转换为数组
    this._logMeta("log", msgs);
    if (this.hideAll == false && this.hideLog == false)
    {
        console.log.apply(console, msgs)
    }

}

LoggerCaryon.prototype.err = function ()
{
    var msgs = Array.from(arguments);//参数转换为数组
    this._logMeta("err", msgs);
    if (this.hideAll == false && this.hideErr == false)
    {
        console.error.apply(console, msgs)
    }
}

LoggerCaryon.prototype.info = function ()
{
    var msgs = Array.from(arguments);//参数转换为数组
    this._logMeta("info", msgs);
    if (this.hideAll == false && this.hideErr == false)
    {
        console.info.apply(console, msgs)
    }
}

LoggerCaryon.prototype.test = function ()
{
    var msgs = Array.from(arguments);//参数转换为数组

    if (typeof msgs[0] != "function" && typeof msgs[0] != "object")
    {
        msgs[0] = "%c" + msgs[0];
        msgs.splice(1, 0, "color: #008c7d;")
    }

    this._logMeta("tset", msgs);

    if (this.hideAll == false && this.hideErr == false)
    {
        console.log.apply(console, msgs)
    }
}

LoggerCaryon.prototype.temp = function ()
{
    var msgs = Array.from(arguments);//参数转换为数组

    if (typeof msgs[0] != "function" && typeof msgs[0] != "object")
    {
        msgs[0] = "%c" + msgs[0];
        msgs.splice(1, 0, "color: #9a1ad6;")
    }

    this._logMeta("temp", msgs);

    if (this.hideAll == false && this.hideErr == false)
    {
        console.log.apply(console, msgs)
    }
}

/**
 *
 */
LoggerCaryon.prototype.pin = function (pinTag, pinPosition, log)
{
    var msgs = Array.from(arguments);//参数转换为数组
    var pinPosition = msgs.splice(1, 1)
    msgs.push(pinPosition);


    if (typeof msgs[0] != "function" && typeof msgs[0] != "object")
    {
        msgs[0] = "%c" + msgs[0];
        msgs.splice(1, 0, "color: #b8b8b8;")
    }

    this._logMeta("pin", msgs, msgs[0]);

    if (this.hideAll == false && this.hideErr == false)
    {
        console.log.apply(console, msgs)
    }
}


export default LoggerCaryon;