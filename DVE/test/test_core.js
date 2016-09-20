/**
 * Created by bgllj on 2016/9/20.
 */



var TEST = function (testName)
{
    this.name = testName || "一只测试";
    this.allTimes = 0;
    this.errTimes = 0;
    this.warnTimes = 0;
    this.log = "";

    return this;

}


TEST.prototype.init = function ()
{
    this.allTimes = 0;
    this.errTimes = 0;
    this.warnTimes = 0;
    this.errsLog = "";
    this.log = "";
}

TEST.prototype.report = function (retrunString)
{
    var text0 = `[test] ${this.name}  - （${new Date().toLocaleString()})`;
    var text1 = `%c测试项目数：${this.allTimes}  - %c错误数：${this.errTimes}  -  ${"%c警告数：" + this.warnTimes}`;

    console.log("%c" + text0, "font-size: 10pt;     border-radius: 4px;background-color: #2b5cdc;color: #f7f7f7;padding: 2px 50px;font-weight: bold;")
    console.log(text1
        , " color: #888; font-weight: bold;"
        , "color: #f54a4a; font-weight: bold;"
        , " color: #e2d567; font-weight: bold;"
    )
    console.log(this.errsLog, " color: #f55;")
    console.log(this.log)
    console.log("%c-----------------------------------------------", " color: #aaa;")

    if(retrunString)
    {
        return text0 + "\n" + text1 + "\n" + this.errsLog + "\n" + this.log;
    }
}


TEST.prototype.seeVelue = function (value, expectValue, name)
{
    this.allTimes = this.allTimes + 1;

    if (value !== expectValue)
    {
        this.errTimes++;
        this.errsLog += "\n" + "[ERR] " + name + `  ( ${value} + ${expectValue} )`;

    } else
    {
        this.log += "\n" + "[OK] " + name + `  ( ${value} + ${expectValue} )`;
    }
}


export default TEST;
