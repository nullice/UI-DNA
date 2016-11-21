/**
 * Created by bgllj on 2016/11/7.
 */

//                                __
//                 ___      ____/  /\
//                /  /\    /  /:\_:\/:\
//               /  /:/   /__/::/\/:/\:\
//              /  /:/    \__\/\ /::\/:/__
//             /  /:/       /__/:/\:/:/ \:\
//            /  /:/        \  \:\/:/ /::/
//           /  /:/          \  \::/ /::/
//          /__/:/            \  \:\/::/
//          \__\/              \  \::/
//                              \__\/
//
//                     一色
//             +------------------+
//             |     ichiColor    |
//             +------------------+
//                · main module ·
//
//           By nullice ui@nullice.com
//                 nullice.com
//                license : MIT


// import ColorRNA from "./lib/ColorRNA"


var IchiColor = function (in_color)
{
    //判断是被作为普通函数调用还是被 new 操作符作为构造函数调用

    if (typeof this === "object" && this.__isIchiColor)
    {
        var _new_mode = true;
    } else
    {
        var _new_mode = false;
    }

    if (_new_mode) //构造函数模式
    {
        if (this.__initialized === false)
        {
            this.initSetterGetter();
            this.__initialized = true;
        }

        this.set.apply(this, arguments)
    }
    else //工厂函数模式
    {
        var color = new IchiColor()
        IchiColor.apply(color, arguments)
        return color;
    }


    // console.log(this.r, this.g, this.b)
    return this;
}

/**
 * 对象判断标识
 * @type {boolean}
 * @private
 */
IchiColor.prototype.__isIchiColor = true;

/**
 * 是否已初始化
 * @type {boolean}
 * @private
 */
IchiColor.prototype.__initialized = false;

/**
 * 是否暂停 r、g、b 的 setter 的 update 动作
 * @type {boolean}
 * @private
 */
IchiColor.prototype.__pauseUpdate = false;

/**
 * 是否暂停 r、g、b 的 setter 的 update Hsv 的动作
 * @type {boolean}
 * @private
 */
IchiColor.prototype.__pauseUpdate_Hsv = false;


/**
 * 是否暂停 r、g、b 的 setter 的 update Hwb 的动作
 * @type {boolean}
 * @private
 */
IchiColor.prototype.__pauseUpdate_Hwb = false;


IchiColor.prototype._rgb = function ()
{
    return {r: this.r, g: this.g, b: this.b};
};


IchiColor.prototype._gethex = function ()
{
    var r = this.r.toString(16);
    var g = this.g.toString(16);
    var b = this.b.toString(16);
    var hex = '#';
    if (r.length == 1)
    {
        hex = hex + "0" + r;
    } else
    {
        hex = hex + r;
    }

    if (g.length == 1)
    {
        hex = hex + "0" + g;
    } else
    {
        hex = hex + g;
    }

    if (b.length == 1)
    {
        hex = hex + "0" + b;
    } else
    {
        hex = hex + b;
    }


    return hex;
};


/**
 *
 * @param hue 色相调整值 [-180,180]
 * @param saturation 色相调整值  [-100,100]
 * @param brightness 色相调整值  [-100,100]
 * @returns {{red: (*|number), grain: (number|*), blue: (number|*)}}
 */
IchiColor.prototype.adjust_hueSaturation = function (hue, saturation, brightness)
{
    // console.log(hue, saturation, brightness)
    var hsv = this._getHsv();

    if (hue != undefined)
    {
        hsv.h = hsv.h + hue;
        if (hsv.h < 0)
        {
            hsv.h = 360 - hsv.h;
        }
        if (hsv.h > 360)
        {
            hsv.h = hsv.h - 360;
        }

    }

    if (saturation != undefined)
    {
        hsv.s = hsv.s + saturation;
        if (hsv.s < 0)
        {
            hsv.s = 0;
        }
        if (hsv.s > 100)
        {
            hsv.s = 100;
        }
    }

    if (brightness != undefined)
    {
        hsv.v = hsv.v + brightness;
        if (hsv.v < 0)
        {
            hsv.v = 0;
        }
        if (hsv.v > 100)
        {
            hsv.v = 100;
        }
    }

    this._setFromHsv(hsv);
    return this;
};


IchiColor.prototype._getHsl = function ()
{
    // console.log("_getHsl2()")
    var rgb = this._normalizArray([this._r, this._g, this._b], 0, 255, 1);
    // console.debug(1)
    var r, g, b, h, s, l, d, max, min;

    r = rgb[0];
    g = rgb[1];
    b = rgb[2];

    max = Math.max(r, g, b);
    min = Math.min(r, g, b);
    l = (max + min) / 2;

    if (max === min)
    {
        h = s = 0; // achromatic
    }
    else
    {
        d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max)
        {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }

        h /= 6;
    }

    h = h * 360;
    s = s * 100;
    l = l * 100;


    h = Math.round(h);
    s = Math.round(s);
    l = Math.round(l);

    if (h < 0 || s < 0 || s > 100 || l < 0 || l > 100)
    {
        console.error("rgb", rgb, {
            r: r,
            g: g,
            b: b,
            h: h,
            s: s,
            l: l,
            d: d,
            max: max,
            min: min
        }, [this._r, this._g, this._b])
    }
    return {h: h, s: s, l: l};
};


IchiColor.prototype._getHsv = function ()
{
    // console.log("_getHsv()")
    var max, min, h, s, v, d,
        r = IchiColor.prototype._normaliz(this.r, 0, 255, 1),
        g = IchiColor.prototype._normaliz(this.g, 0, 255, 1),
        b = IchiColor.prototype._normaliz(this.b, 0, 255, 1);

    max = Math.max(r, g, b);
    min = Math.min(r, g, b);
    v = max;

    d = max - min;
    s = max === 0 ? 0 : d / max;

    if (max === min)
    {
        h = 0;
    }
    else
    {
        switch (max)
        {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }

    h = Math.round(h * 360);
    s = Math.round(s * 100);
    v = Math.round(v * 100);

    return {h: h, s: s, v: v};
};


IchiColor.prototype._getHwb = function ()
{
    var HSV = IchiColor.prototype._RGB_to_HSV([this.r, this.g, this.b]);

    var H, W, B;

    H = HSV[0];
    W = Math.round(((100 - HSV[1]) * HSV[2]) / 100);
    B = Math.round(100 - HSV[2]);

    return {h: H, w: W, b: B};
}


IchiColor.prototype._setFromRgba = function (x)
{
    var reg = /[0-9\.]+/
    var arr = x.split(",");
    if (arr.length >= 3)
    {
        this.__pauseUpdate = true;
        var result = reg.exec(arr[0])
        if (result.length > 0)
        {
            this.r = Number.parseInt(result[0]);
        }

        result = reg.exec(arr[1])
        if (result.length > 0)
        {
            this.g = Number.parseInt(result[0]);
        }

        result = reg.exec(arr[2])
        if (result.length > 0)
        {
            this.b = Number.parseInt(result[0]);
        }

        if (arr.length == 4)
        {
            result = reg.exec(arr[3])


            if (result.length > 0)
            {
                if (result >= 0 && result <= 1)
                {
                    this.alpha = +result[0];
                }
            }
        }

        this.__pauseUpdate = false;
        this.__undateValue()
    }
    
    
    
}



IchiColor.prototype._setFromHsv = function (HSV)
{
    // console.log("_setFromHsv()", HSV)
    var r, g, b, i, f, p, q, t;


    var
        s = IchiColor.prototype._normaliz(HSV.s, 0, 100, 1),
        v = IchiColor.prototype._normaliz(HSV.v, 0, 100, 1),
        h = HSV.h / 60;

    if (HSV.h == 360)
    {
        h = 0;
    }

    i = Math.floor(h);
    f = h - i;
    p = v * (1 - s);
    q = v * (1 - (s * f));
    t = v * (1 - (s * (1 - f)));

    switch (i)
    {
        case 0 :
        {
            r = v;
            g = t;
            b = p;
            break;
        }
        case 1 :
        {
            r = q;
            g = v;
            b = p;
            break;
        }
        case 2:
        {
            r = p;
            g = v;
            b = t;
            break;
        }
        case 3:
        {
            r = p;
            g = q;
            b = v;
            break;
        }
        case 4:
        {
            r = t;
            g = p;
            b = v;
            break;
        }
        case 5:
        {
            r = v;
            g = p;
            b = q;
            break;
        }
    }


    var rgb = IchiColor.prototype._normaOutRGB(IchiColor.prototype._normalizArray([r, g, b], 0, 1, 255));

    this.__pauseUpdate = true;
    this.r = rgb[0];
    this.g = rgb[1];
    this.b = rgb[2];
    this.__pauseUpdate = false;
    this.__pauseUpdate_Hsv = true;
    this.__undateValue();
    this.__pauseUpdate_Hsv = false;
    this.__freshly_hsv = true;
    return this;
}


IchiColor.prototype._setFromHwb = function (HWB)
{
    // console.log("_setFromHwb()", HWB)
    this.__freshly_hwb = true;

    var H, S, V;


    H = HWB.h;

    if (H == 360)
    {
        H = 0;
    }

    if (HWB.b == 100)
    {
        var de = 0
    } else
    {
        var de = HWB.w / (100 - HWB.b)
    }


    S = 100 - (de * 100);
    V = 100 - HWB.b;

    var rgb = IchiColor.prototype._HSV_to_RGB([H, S, V]);


    this.__pauseUpdate = true;
    this.r = rgb[0];
    this.g = rgb[1];
    this.b = rgb[2];
    this.__pauseUpdate = false;
    this.__pauseUpdate_Hwb = true;
    this.__undateValue();
    this.__pauseUpdate_Hwb = false;
    this.__freshly_hwb = true;
    return this;


}

IchiColor.prototype._HSV_to_RGB = function (HSV)
{
    var r, g, b, i, f, p, q, t;

    // h = h / 360;
    if (v === 0)
    {
        return [0, 0, 0];
    }

    var
        s = IchiColor.prototype._normaliz(HSV[1], 0, 100, 1),
        v = IchiColor.prototype._normaliz(HSV[2], 0, 100, 1),
        h = HSV[0] / 60;

    i = Math.floor(h);
    f = h - i;
    p = v * (1 - s);
    q = v * (1 - (s * f));
    t = v * (1 - (s * (1 - f)));

    switch (i)
    {
        case 0 :
        {
            r = v;
            g = t;
            b = p;
            break;
        }
        case 1 :
        {
            r = q;
            g = v;
            b = p;
            break;
        }
        case 2:
        {
            r = p;
            g = v;
            b = t;
            break;
        }
        case 3:
        {
            r = p;
            g = q;
            b = v;
            break;
        }
        case 4:
        {
            r = t;
            g = p;
            b = v;
            break;
        }
        case 5:
        {
            r = v;
            g = p;
            b = q;
            break;
        }
    }


    return IchiColor.prototype._normaOutRGB(IchiColor.prototype._normalizArray([r, g, b], 0, 1, 255));
}
IchiColor.prototype._RGB_to_HSV = function (rgb)
{
    var max, min, h, s, v, d,
        r = IchiColor.prototype._normaliz(rgb[0], 0, 255, 1),
        g = IchiColor.prototype._normaliz(rgb[1], 0, 255, 1),
        b = IchiColor.prototype._normaliz(rgb[2], 0, 255, 1);

    max = Math.max(r, g, b);
    min = Math.min(r, g, b);
    v = max;

    d = max - min;
    s = max === 0 ? 0 : d / max;

    if (max === min)
    {
        h = 0;
    }
    else
    {
        switch (max)
        {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }

    h = Math.round(h * 360);
    s = Math.round(s * 100);
    v = Math.round(v * 100);

    return [h, s, v];
}


IchiColor.prototype._setFromHsl = function (HSL)
{
    this.__freshly_hsl = true;
    // console.log("_setFromHsl()", HSL)
    var
        h = HSL.h,
        s = IchiColor.prototype._normaliz(HSL.s, 0, 100, 1),
        l = IchiColor.prototype._normaliz(HSL.l, 0, 100, 1);

    if (h == 360)
    {
        h = 0;
    }


    if (h == undefined)
    {
        return [0, 0, 0];
    }

    var C = (1 - Math.abs((2 * l) - 1)) * s;
    var hh = h / 60;
    var temp = C * (1 - Math.abs((hh % 2) - 1));

    hh = Math.floor(hh);
    var r;
    var g;
    var b;

    if (hh === 0)
    {
        r = C;
        g = temp;
        b = 0;
    }
    else if (hh === 1)
    {
        r = temp;
        g = C;
        b = 0;
    }
    else if (hh === 2)
    {
        r = 0;
        g = C;
        b = temp;
    }
    else if (hh === 3)
    {
        r = 0;
        g = temp;
        b = C;
    }
    else if (hh === 4)
    {
        r = temp;
        g = 0;
        b = C;
    }
    else if (hh === 5)
    {
        r = C;
        g = 0;
        b = temp;
    }

    var CC = l - (C / 2);
    r += CC;
    g += CC;
    b += CC;

    var rgb = IchiColor.prototype._normaOutRGB(IchiColor.prototype._normalizArray([r, g, b], 0, 1, 255));

    this.__pauseUpdate = true;
    this.r = rgb[0];
    this.g = rgb[1];
    this.b = rgb[2];
    this.__pauseUpdate = false;
    this.__pauseUpdate_Hsl = true;
    this.__undateValue();
    this.__pauseUpdate_Hsl = false;
    this.__freshly_hsl = true;
    return this;
}


IchiColor.prototype._normalizArray = function (inArray, inMin, inMax, newMax)
{
    for (var i = 0; i < inArray.length; i++)
    {
        inArray[i] = this._normaliz(inArray[i], inMin, inMax, newMax);
    }
    return inArray;
}


IchiColor.prototype._normaliz = function (inNumber, inMin, inMax, newMax)
{
    var newNumber = 0;

    if (arguments.length == 4)
    {
        newNumber = (inNumber - inMin) / (inMax - inMin);
        newNumber = newNumber * newMax;
    }
    else
    {
        newNumber = arguments[0] / 255;
    }

    return newNumber;
}

IchiColor.prototype._normaOutRGB = function (inArray)
{

    var z = 0
    for (z = 0; z < inArray.length; z++)
    {
        inArray[z] = Math.round(inArray[z]);
        if (inArray[z] < 0 || inArray[z] == -0)
        {
            inArray[z] = 0;
        }
    }
    return inArray;
}


/**
 * 返回整数颜色值
 * Color("#FFFFFF").int() => 16777215
 * @returns {number}
 */
// IchiColor.prototype.int = function ()
// {
//     var int = 0;
//
//     int = (this.r << 16) + ( this.g << 8) + this.b;
//     return int;
// }


/**
 * 根据参数设置颜色
 * @param  args
 * @returns {IchiColor}
 */
IchiColor.prototype.set = function (args)
{
    if (arguments.length == 0)//无参数
    {
        this.r = 0;
        this.g = 0;
        this.b = 0;
        this.alpha = 1;
    }
    else if (arguments.length === 1)
    {
        var _string_mod
        if (arguments[0].constructor === String)
        {
            if (arguments[0][0] === "#")
            {
                if (arguments[0].length === 4)
                {
                    var _hex3 = Number.parseInt(arguments[0].slice(1), 16);
                    this.r = (_hex3 >> 8 & 0xf) | (_hex3 >> 4 & 0x0f0)
                    this.g = (_hex3 >> 4 & 0xf) | (_hex3 & 0xf0)
                    this.b = ((_hex3 & 0xf) << 4) | (_hex3 & 0xf)
                }
                else if (arguments[0].length === 7)
                {
                    arguments[0] = Number.parseInt(arguments[0].slice(1), 16);
                    _string_mod = "number";
                }


            }else if(arguments[0][0] === "r") //rgba
            {
                this._setFromRgba(arguments[0])
            }
            else if (arguments[0] == +arguments[0])
            {
                _string_mod = "number";
                arguments[0] = +arguments[0];
            }
        }
        if (arguments[0].constructor === Number || _string_mod == "number")
        {

            this.r = arguments[0] >> 16;
            this.g = (arguments[0] >> 8) & 0xff;
            this.b = arguments[0] & 0xff;
        }
        else if (Array.isArray(arguments[0])) // IchiColor([r,g,b])
        {
            if (arguments[0].length == 3)
            {
                this.r = arguments[0][0];
                this.g = arguments[0][1];
                this.b = arguments[0][2];
            }
        }
        else if (arguments[0].constructor === Object)  // IchiColor({r:r, g:g, b:b, alpha:alpha})
        {

            if (arguments[0]["h"] != undefined)
            {
                if (arguments[0]["v"] != undefined)//hsv
                {
                    this.hsv._h = arguments[0]["h"];
                    if (arguments[0]["s"] != undefined)
                    {
                        this.hsv._s = arguments[0]["s"];
                    }
                    this.hsv._v = arguments[0]["v"];
                    this._setFromHsv({h: this.hsv._h, s: this.hsv._s, v: this.hsv._v})


                }
                else if (arguments[0]["l"] != undefined)//hsl
                {
                    this.hsl._h = arguments[0]["h"];
                    if (arguments[0]["s"] != undefined)
                    {
                        this.hsl._s = arguments[0]["s"];
                    }
                    this.hsl._l = arguments[0]["l"];
                    this._setFromHsl({h: this.hsl._h, s: this.hsl._s, l: this.hsl._l})

                }
                else if (arguments[0]["w"] != undefined)//hwb
                {
                    this.hwb._h = arguments[0]["h"];
                    if (arguments[0]["w"] != undefined)
                    {
                        this.hwb._w = arguments[0]["w"];
                    }
                    if (arguments[0]["b"] != undefined)
                    {
                        x
                        this.hwb._b = arguments[0]["b"];
                    }
                    this._setFromHwb({h: this.hwb._h, w: this.hwb._w, b: this.hwb._b})


                }

            }
            else          //rgb
            {
                if (arguments[0]["r"] != undefined)
                {
                    this.r = arguments[0]["r"];

                } else if (arguments[0]["red"] != undefined)
                {
                    this.r = arguments[0]["red"];
                }

                if (arguments[0]["g"] != undefined)
                {
                    this.g = arguments[0]["g"];

                } else if (arguments[0]["green"] != undefined)
                {
                    this.g = arguments[0]["green"];
                }
                else if (arguments[0]["grain"] != undefined)
                {
                    this.g = arguments[0]["grain"];
                }

                if (arguments[0]["b"] != undefined)
                {
                    this.b = arguments[0]["b"];

                } else if (arguments[0]["blue"] != undefined)
                {
                    this.b = arguments[0]["blue"];
                }

                if (arguments[0]["a"] != undefined)
                {
                    this.alpha = arguments[0]["a"];

                } else if (arguments[0]["alpha"] != undefined)
                {
                    this.alpha = arguments[0]["alpha"];
                }
            }


        }

    }
    else if (arguments.length === 3)
    {

    }

    return this;
}


IchiColor.prototype.initSetterGetter = function ()
{
    this._alpha = 1;
    this._rgba = "rgba(0, 0, 0, 1)";
    this._r = 0;
    this._r_intPart = 0;
    this._r_hexChar = "00";
    this._g = 0;
    this._g_intPart = 0;
    this._g_hexChar = "00";
    this._b = 0;
    this._b_intPart = 0;
    this._b_hexChar = "00";

    this._rgbInt = 0;
    this._rgbHex = "#000000";

    Object.defineProperty(this, "r",
        {
            set: function (x)
            {
                x = Number.parseInt(x);
                x = this.__colorValueRange(x, 0, 255);
                this._r = x;
                this._r_intPart = x << 16;
                var char = x.toString(16);
                if (char.length == 1)
                {
                    char = "0" + char;
                }
                this._r_hexChar = char;
                this.__undateValue();

            },
            get: function ()
            {
                return this._r;
            }
        }
    );

    Object.defineProperty(this, "g",
        {
            set: function (x)
            {
                x = Number.parseInt(x);
                x = this.__colorValueRange(x, 0, 255);
                this._g = x;
                this._g_intPart = x << 8;
                var char = x.toString(16);
                if (char.length == 1)
                {
                    char = "0" + char;
                }
                this._g_hexChar = char;
                this.__undateValue();

            },
            get: function ()
            {
                return this._g;
            }
        }
    );

    Object.defineProperty(this, "b",
        {
            set: function (x)
            {
                x = Number.parseInt(x);
                x = this.__colorValueRange(x, 0, 255);
                this._b = x;
                this._b_intPart = x;
                var char = x.toString(16);
                if (char.length == 1)
                {
                    char = "0" + char;
                }
                this._b_hexChar = char;
                this.__undateValue();
            },
            get: function ()
            {
                return this._b;
            }
        }
    );

    Object.defineProperty(this, "int",
        {
            set: function (x)
            {
                x = Number.parseInt(x);
                x = this.__colorValueRange(x, 0, 16777215);
                this.__pauseUpdate = true;
                this.r = x >> 16;
                this.g = (x >> 8) & 0xff;
                this.b = x & 0xff;
                this.__pauseUpdate = false;
                this.__undateValue()
            },
            get: function ()
            {
                return this._rgbInt;
            }
        }
    );

    Object.defineProperty(this, "hex",
        {
            set: function (x)
            {
                if (x[0] === "#")
                {
                    if (x.length === 4)
                    {
                        var _hex3 = Number.parseInt(x.slice(1), 16);
                        this.__pauseUpdate = true;
                        this.r = (_hex3 >> 8 & 0xf) | (_hex3 >> 4 & 0x0f0)
                        this.g = (_hex3 >> 4 & 0xf) | (_hex3 & 0xf0)
                        this.b = ((_hex3 & 0xf) << 4) | (_hex3 & 0xf)
                        this.__pauseUpdate = false;
                        this.__undateValue()

                    }
                    else if (x.length === 7)
                    {
                        x = Number.parseInt(arguments[0].slice(1), 16);
                        this.int = x;
                    }
                }

            },
            get: function ()
            {
                return this._rgbHex;
            }
        }
    );

    //RGBA
    this.__use_rgba = false;
    this.__freshly_rgba = false;
    Object.defineProperty(this, "rgba",
        {
            set: function (x)
            {
                this._setFromRgba(x)
            }
            ,
            get: function ()
            {
                if (this.__use_rgba != true)
                {
                    this.__use_rgba = true;
                }
                if (this.__freshly_rgba != true)
                {
                    this.__undatePart_Rgba();
                }
                return this._rgba;
            }
        }
    );

    Object.defineProperty(this, "alpha",
        {
            set: function (x)
            {
                x = +x;
                x = this.__colorValueRange(x, 0, 1);
                this._alpha = x;
                this.__undatePart_Rgba();
            },
            get: function ()
            {
                return this._alpha;
            }
        }
    );


    //HSV------------------------------------------------------------------
    this.__use_hsv = false;
    this.__freshly_hsv = false;
    this.hsv = {
        _h: 0,
        _s: 0,
        _v: 0,
    };

    Object.defineProperty(this.hsv, "__obSelf", {value: this, enumerable: false});

    Object.defineProperty(this.hsv, "h",
        {
            set: function (x)
            {
                x = Number.parseInt(x);
                x = this.__obSelf.__colorValueRange(x, 0, 360);
                // if (x == 360)
                // {
                //     x = 0;
                // }
                this._h = x;
                this.__obSelf._setFromHsv({h: this._h, s: this._s, v: this._v})
            },
            get: function ()
            {
                if (this.__obSelf.__use_hsv != true)
                {
                    this.__obSelf.__use_hsv = true;
                }
                if (this.__obSelf.__freshly_hsv != true)
                {
                    this.__obSelf.__undatePart_Hsv();
                }
                return this._h;
            }
        }
    );


    Object.defineProperty(this.hsv, "s",
        {
            set: function (x)
            {
                x = Number.parseInt(x);
                x = this.__obSelf.__colorValueRange(x, 0, 100);
                this._s = x;
                this.__obSelf._setFromHsv({h: this._h, s: this._s, v: this._v})
            },
            get: function ()
            {
                if (this.__obSelf.__use_hsv != true)
                {
                    this.__obSelf.__use_hsv = true;
                }
                if (this.__obSelf.__freshly_hsv != true)
                {
                    this.__obSelf.__undatePart_Hsv();
                }
                return this._s;
            }
        }
    );


    Object.defineProperty(this.hsv, "v",
        {
            set: function (x)
            {
                x = Number.parseInt(x);
                x = this.__obSelf.__colorValueRange(x, 0, 100);
                this._v = x;
                this.__obSelf._setFromHsv({h: this._h, s: this._s, v: this._v})
            },
            get: function ()
            {
                if (this.__obSelf.__use_hsv != true)
                {
                    this.__obSelf.__use_hsv = true;
                }
                if (this.__obSelf.__freshly_hsv != true)
                {
                    this.__obSelf.__undatePart_Hsv();
                }
                return this._v;
            }
        }
    );

    //HSL------------------------------------------------------------------
    this.__use_hsl = false;
    this.__freshly_hsl = false;
    this.hsl = {
        _h: 0,
        _s: 0,
        _l: 0,
    };
    Object.defineProperty(this.hsl, "__obSelf", {value: this, enumerable: false});

    Object.defineProperty(this.hsl, "h",
        {
            set: function (x)
            {
                x = Number.parseInt(x);
                x = this.__obSelf.__colorValueRange(x, 0, 360);
                // if (x == 360)
                // {
                //     x = 0;
                // }
                this._h = x;
                this.__obSelf._setFromHsl({h: this._h, s: this._s, l: this._l})
            },
            get: function ()
            {
                if (this.__obSelf.__use_hsl != true)
                {
                    this.__obSelf.__use_hsl = true;
                }
                if (this.__obSelf.__freshly_hsl != true)
                {
                    this.__obSelf.__undatePart_Hsl();
                }
                return this._h;
            }
        }
    );
    Object.defineProperty(this.hsl, "s",
        {
            set: function (x)
            {
                x = Number.parseInt(x);
                x = this.__obSelf.__colorValueRange(x, 0, 100);
                this._s = x;
                this.__obSelf._setFromHsl({h: this._h, s: this._s, l: this._l})
            },
            get: function ()
            {
                if (this.__obSelf.__use_hsl != true)
                {
                    this.__obSelf.__use_hsl = true;
                }
                if (this.__obSelf.__freshly_hsl != true)
                {
                    this.__obSelf.__undatePart_Hsl();
                }
                return this._s;
            }
        }
    );

    Object.defineProperty(this.hsl, "l",
        {
            set: function (x)
            {
                x = Number.parseInt(x);
                x = this.__obSelf.__colorValueRange(x, 0, 100);
                this._l = x;
                this.__obSelf._setFromHsl({h: this._h, s: this._s, l: this._l})
            },
            get: function ()
            {
                if (this.__obSelf.__use_hsl != true)
                {
                    this.__obSelf.__use_hsl = true;
                }
                if (this.__obSelf.__freshly_hsl != true)
                {
                    this.__obSelf.__undatePart_Hsl();
                }
                return this._l;
            }
        }
    );
    //HWB------------------------------------------------------------------
    this.__use_hwb = false;
    this.__freshly_hwb = false;
    this.hwb = {
        _h: 0,
        _w: 0,
        _b: 0,
    };

    Object.defineProperty(this.hwb, "__obSelf", {value: this, enumerable: false});

    Object.defineProperty(this.hwb, "h",
        {
            set: function (x)
            {
                x = Number.parseInt(x);
                x = this.__obSelf.__colorValueRange(x, 0, 360);
                // if (x == 360)
                // {
                //     x = 0;
                // }
                this._h = x;
                this.__obSelf._setFromHwb({h: this._h, w: this._w, b: this._b})
            },
            get: function ()
            {
                if (this.__obSelf.__use_hwb != true)
                {
                    this.__obSelf.__use_hwb = true;
                }
                if (this.__obSelf.__freshly_hwb != true)
                {
                    this.__obSelf.__undatePart_Hwb();
                }
                return this._h;
            }
        }
    );
    Object.defineProperty(this.hwb, "w",
        {
            set: function (x)
            {
                x = Number.parseInt(x);
                x = this.__obSelf.__colorValueRange(x, 0, 100);
                this._w = x;
                this.__obSelf._setFromHwb({h: this._h, w: this._w, b: this._b})
            },
            get: function ()
            {
                if (this.__obSelf.__use_hwb != true)
                {
                    this.__obSelf.__use_hwb = true;
                }
                if (this.__obSelf.__freshly_hwb != true)
                {
                    this.__obSelf.__undatePart_Hwb();
                }

                return this._w;
            }
        }
    );

    Object.defineProperty(this.hwb, "b",
        {
            set: function (x)
            {
                x = Number.parseInt(x);
                x = this.__obSelf.__colorValueRange(x, 0, 100);
                this._b = x;
                this.__obSelf._setFromHwb({h: this._h, w: this._w, b: this._b})
            },
            get: function ()
            {
                if (this.__obSelf.__use_hwb != true)
                {
                    this.__obSelf.__use_hwb = true;
                }
                if (this.__obSelf.__freshly_hwb != true)
                {
                    this.__obSelf.__undatePart_Hwb();
                }

                return this._b;


            }
        }
    );

}

IchiColor.prototype.__undateValue = function ()
{
    if (this.__pauseUpdate)
    {
        return;
    }

    this._rgbInt = this._r_intPart + this._g_intPart + this._b_intPart;
    this._rgbHex = "#" + this._r_hexChar + this._g_hexChar + this._b_hexChar;


    this.__freshly_hsl = false;
    this.__freshly_hsv = false;
    this.__freshly_hwb = false;


    if (this.__use_hsv)
    {
        if (this.__pauseUpdate_Hsv != true)
        {
            this.__undatePart_Hsv();
        }
    }


    if (this.__use_hsl)
    {
        if (this.__pauseUpdate_Hsl != true)
        {
            this.__undatePart_Hsl();
        }
    }


    if (this.__use_hwb)
    {
        if (this.__pauseUpdate_Hwb != true)
        {
            this.__undatePart_Hwb();
        }
    }

    if (this.__use_rgba)
    {
        this.__undatePart_Rgba();
    }

}


IchiColor.prototype.__undatePart_Hsv = function ()
{
    // console.log("__undatePart_Hsv")
    var hsv = this._getHsv();
    this.hsv._h = hsv.h;
    this.hsv._s = hsv.s;
    this.hsv._v = hsv.v;
    this.__freshly_hsv = true;
}

IchiColor.prototype.__undatePart_Hsl = function ()
{
    var hsl = this._getHsl();
    this.hsl._h = hsl.h;
    this.hsl._s = hsl.s;
    this.hsl._l = hsl.l;
    this.__freshly_hsl = true;
}


IchiColor.prototype.__undatePart_Hwb = function ()
{
    // console.log("__undatePart_Hwb")
    var hwb = this._getHwb();
    this.hwb._h = hwb.h;
    this.hwb._w = hwb.w;
    this.hwb._b = hwb.b;
    this.__freshly_hwb = true;
}


IchiColor.prototype.__undatePart_Rgba = function ()
{
    this._rgba = "rgba(" + this._r + ", " + this._g + ", " + this._b + ", " + this.alpha + ")";
    this.__freshly_rgba = true;
}


IchiColor.prototype.__colorValueRange = function (value, min, max)
{

    if (value > max)
    {
        return max;

    }
    else if (value < min)
    {
        return min;
    }
    return value;
}

IchiColor.prototype.getRGB = function ()
{
    return {r: this.r, g: this.g, b: this.b}
}

IchiColor.prototype.getHSL = function ()
{
    return {h: this.hsl.h, s: this.hsl.s, l: this.hsl.l}
}

IchiColor.prototype.getHSV = function ()
{
    return {h: this.hsv.h, s: this.hsv.s, v: this.hsv.v}
}

IchiColor.prototype.getHWB = function ()
{
    return {h: this.hwb.h, w: this.hwb.w, b: this.hwb.b}
}


IchiColor.prototype.getRedGreenBlue = function ()
{
    return {red: this.r, green: this.g, blue: this.b};
};

IchiColor.prototype.getRedGrainBlue = function ()
{
    return {red: this.r, grain: this.g, blue: this.b};
};


IchiColor.prototype.getClone = function ()
{
    var clone = new IchiColor({r: this.r, g: this.g, b: this.b})
    return clone;
};


IchiColor.prototype.getInvertColor = function ()
{
    var clone = new IchiColor({r: 255 - this.r, g: 255 - this.g, b: 255 - this.b})
    return clone;
};


export default IchiColor;
















