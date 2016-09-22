/**
 * Created by bgllj on 2016/9/20.
 */



var TEST = function (testName)
{
    this.name = testName || "一只测试";
    this.allTimes = 0;
    this.errTimes = 0;
    this.warnTimes = 0;
    this.errsLog = "";
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

/**
 * 生成测试报告，在控制台输出。
 * @param retrunString 为真会返回报告文本。
 * @returns {string}
 */
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
    console.log("%c" + this.errsLog, " color: #f55;")
    console.log(this.log)
    console.log("%c-----------------------------------------------", " color: #aaa;")

    if (retrunString)
    {
        return text0 + "\n" + text1 + "\n" + this.errsLog + "\n" + this.log;
    }
}

/**
 * 值检查，比较 2 个值是否相等。
 * @param value
 * @param expectValue
 * @param name
 */
TEST.prototype.seeVelue = function (value, expectValue, name)
{
    this.allTimes = this.allTimes + 1;


    var equal = false;
    if (typeof value == "object" && typeof expectValue == "object")
    {
        equal = _.isEqual(value, expectValue);
    } else
    {
        equal = (value !== expectValue);

    }

    if (equal)
    {
        this.errTimes++;
        this.errsLog += "\n" + "[ERR] " + this.allTimes + ": " + name + `  ( ${value} !== ${expectValue} )`;

    } else
    {
        this.log += "\n" + "[OK] " + this.allTimes + ": " + name + `  ( ${value} == ${expectValue} )`;
    }
}

/**
 * 添加一行段日志
 * @param text
 */
TEST.prototype.log = function (text)
{
    this.log += text + "\n";
}
export default TEST;
