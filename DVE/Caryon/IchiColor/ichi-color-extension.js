/**
 * Created by bgllj on 2016/11/24.
 */

import IchiColor from "./ichi-color.js"
import ColorRNA from "./lib/ColorRNA.js"

function expandIchiColor(IchiColor)
{

    window.maxu=0
    window.maxv=0
    window.minu=0
    window.minv=0

    IchiColor.prototype.__extensionInit = function ()
    {
        this.ex = {};

        this.ex.colorRNA = new ColorRNA()

        var obSelf = this;

        obSelf.__ex_enable = true;
        obSelf.__pauseUpdate_ex_labPs = false;
        obSelf.__pauseUpdate_ex_lab = false;
        obSelf.__pauseUpdate_ex_LCHab = false;
        obSelf.__pauseUpdate_ex_hsl255 = false;
        obSelf.__pauseUpdate_ex_hsl240 = false;
        obSelf.__pauseUpdate_ex_xyz = false;
        obSelf.__pauseUpdate_ex_xyY = false;
        obSelf.__pauseUpdate_ex_luv = false;

        //LabPs-----------------------------------
        obSelf.ex.labPs = {
            _l: 0,
            _a: 0,
            _b: 0,
        }
        Object.defineProperty(obSelf.ex.labPs, "l",
            {
                set: function (x)
                {
                    x = verifyNumber(x)
                    x = colorValueRange(x, 0, 100)
                    var rgb = obSelf.ex.colorRNA.LabPS(
                        [x,
                            obSelf.ex.labPs.a,
                            obSelf.ex.labPs.b]
                    ).rgb()

                    this._l = x;
                    obSelf.__pauseUpdate_ex_labPs = true;
                    obSelf.set(rgb);
                    obSelf.__pauseUpdate_ex_labPs = false;
                },
                get: function ()
                {
                    return this._l;
                }
            }
        );
        Object.defineProperty(obSelf.ex.labPs, "a",
            {
                set: function (x)
                {
                    x = verifyNumber(x)
                    x = colorValueRange(x, -128, 127)
                    var rgb = obSelf.ex.colorRNA.LabPS([obSelf.ex.labPs.l, x, obSelf.ex.labPs.b]).rgb()

                    this._a = x;
                    obSelf.__pauseUpdate_ex_labPs = true;
                    obSelf.set(rgb);
                    obSelf.__pauseUpdate_ex_labPs = false;
                },
                get: function ()
                {
                    return this._a;
                }
            }
        );
        Object.defineProperty(obSelf.ex.labPs, "b",
            {
                set: function (x)
                {
                    x = verifyNumber(x)
                    x = colorValueRange(x, -128, 127)
                    var rgb = obSelf.ex.colorRNA.LabPS([obSelf.ex.labPs.l, obSelf.ex.labPs.a, x]).rgb()


                    this._b = x;
                    obSelf.__pauseUpdate_ex_labPs = true;
                    obSelf.set(rgb);
                    obSelf.__pauseUpdate_ex_labPs = false;
                },
                get: function ()
                {
                    return this._b;
                }
            }
        );

        //Lab-----------------------------------
        obSelf.ex.lab = {
            _l: 0,
            _a: 0,
            _b: 0,
        }


        Object.defineProperty(obSelf.ex.lab, "l",
            {
                set: function (x)
                {
                    x = verifyNumber(x)
                    x = colorValueRange(x, 0, 100)
                    var rgb = obSelf.ex.colorRNA.Lab(
                        [x,
                            obSelf.ex.lab.a,
                            obSelf.ex.lab.b]
                    ).rgb()

                    this._l = x;
                    obSelf.__pauseUpdate_ex_lab = true;
                    obSelf.set(rgb);
                    obSelf.__pauseUpdate_ex_lab = false;
                },
                get: function ()
                {
                    return this._l;
                }
            }
        );

        Object.defineProperty(obSelf.ex.lab, "a",
            {
                set: function (x)
                {
                    x = verifyNumber(x)
                    x = colorValueRange(x, -128, 127)
                    var rgb = obSelf.ex.colorRNA.Lab([obSelf.ex.lab.l, x, obSelf.ex.lab.b]).rgb()

                    this._a = x;
                    obSelf.__pauseUpdate_ex_lab = true;
                    obSelf.set(rgb);
                    obSelf.__pauseUpdate_ex_lab = false;
                },
                get: function ()
                {
                    return this._a;
                }
            }
        );
        Object.defineProperty(obSelf.ex.lab, "b",
            {
                set: function (x)
                {
                    x = verifyNumber(x)
                    x = colorValueRange(x, -128, 127)
                    var rgb = obSelf.ex.colorRNA.Lab([obSelf.ex.lab.l, obSelf.ex.lab.a, x]).rgb()

                    this._b = x;
                    obSelf.__pauseUpdate_ex_lab = true;
                    obSelf.set(rgb);
                    obSelf.__pauseUpdate_ex_lab = false;
                },
                get: function ()
                {
                    return this._b;
                }
            }
        );
        //LCHab-----------------------------------
        obSelf.ex.LCHab = {
            _l: 0,
            _c: 0,
            _h: 0,
        }
        Object.defineProperty(obSelf.ex.LCHab, "l",
            {
                set: function (x)
                {
                    x = verifyNumber(x)
                    x = colorValueRange(x, 0, 100)
                    var rgb = obSelf.ex.colorRNA.LCHab(
                        [x,
                            obSelf.ex.LCHab.c,
                            obSelf.ex.LCHab.h]
                    ).rgb()

                    this._l = x;
                    obSelf.__pauseUpdate_ex_LCHab = true;
                    obSelf.set(rgb);
                    obSelf.__pauseUpdate_ex_LCHab = false;
                },
                get: function ()
                {
                    return this._l;
                }
            }
        );
        Object.defineProperty(obSelf.ex.LCHab, "c",
            {
                set: function (x)
                {
                    x = verifyNumber(x)
                    x = colorValueRange(x, 0, 100)
                    var rgb = obSelf.ex.colorRNA.LCHab([obSelf.ex.LCHab.l, x, obSelf.ex.LCHab.h]).rgb()

                    this._c = x;
                    obSelf.__pauseUpdate_ex_LCHab = true;
                    obSelf.set(rgb);
                    obSelf.__pauseUpdate_ex_LCHab = false;
                },
                get: function ()
                {
                    return this._c;
                }
            }
        );
        Object.defineProperty(obSelf.ex.LCHab, "h",
            {
                set: function (x)
                {
                    x = verifyNumber(x)
                    x = colorValueRange(x, 0, 360)
                    var rgb = obSelf.ex.colorRNA.LCHab([obSelf.ex.LCHab.l, obSelf.ex.LCHab.c, x]).rgb()

                    this._h = x;
                    obSelf.__pauseUpdate_ex_LCHab = true;
                    obSelf.set(rgb);
                    obSelf.__pauseUpdate_ex_LCHab = false;
                },
                get: function ()
                {
                    return this._h;
                }
            }
        );
        //HSL255 ----------------------------------- Office HSL
        obSelf.ex.hsl255 = {
            _h: 0,
            _s: 0,
            _l: 0,
        }
        Object.defineProperty(obSelf.ex.hsl255, "h",
            {
                set: function (x)
                {
                    x = verifyNumber(x)
                    x = colorValueRange(x, 0, 255)
                    var rgb = obSelf.ex.colorRNA.HSL255([x, obSelf.ex.hsl255.s, obSelf.ex.hsl255.l]).rgb()

                    this._h = x;
                    obSelf.__pauseUpdate_ex_hsl255 = true;
                    obSelf.set(rgb);
                    obSelf.__pauseUpdate_ex_hsl255 = false;
                },
                get: function ()
                {
                    return this._h;
                }
            }
        );

        Object.defineProperty(obSelf.ex.hsl255, "s",
            {
                set: function (x)
                {
                    x = verifyNumber(x)
                    x = colorValueRange(x, 0, 255)
                    var rgb = obSelf.ex.colorRNA.HSL255([obSelf.ex.hsl255.h, x, obSelf.ex.hsl255.l]).rgb()

                    this._s = x;
                    obSelf.__pauseUpdate_ex_hsl255 = true;
                    obSelf.set(rgb);
                    obSelf.__pauseUpdate_ex_hsl255 = false;
                },
                get: function ()
                {
                    return this._s;
                }
            }
        );

        Object.defineProperty(obSelf.ex.hsl255, "l",
            {
                set: function (x)
                {
                    x = verifyNumber(x)
                    x = colorValueRange(x, 0, 255)
                    var rgb = obSelf.ex.colorRNA.HSL255([obSelf.ex.hsl255.h, obSelf.ex.hsl255.s, x]).rgb()

                    this._l = x;
                    obSelf.__pauseUpdate_ex_hsl255 = true;
                    obSelf.set(rgb);
                    obSelf.__pauseUpdate_ex_hsl255 = false;
                },
                get: function ()
                {
                    return this._l;
                }
            }
        );
        //HSL240----------------------------------- window esl
        obSelf.ex.hsl240 = {
            _h: 0,
            _s: 0,
            _l: 0,
        }
        Object.defineProperty(obSelf.ex.hsl240, "h",
            {
                set: function (x)
                {
                    x = verifyNumber(x)
                    x = colorValueRange(x, 0, 239)
                    var rgb = obSelf.ex.colorRNA.HSL240([x, obSelf.ex.hsl240.s, obSelf.ex.hsl240.l]).rgb()

                    this._h = x;
                    obSelf.__pauseUpdate_ex_hsl240 = true;
                    obSelf.set(rgb);
                    obSelf.__pauseUpdate_ex_hsl240 = false;
                },
                get: function ()
                {
                    return this._h;
                }
            }
        );

        Object.defineProperty(obSelf.ex.hsl240, "s",
            {
                set: function (x)
                {
                    x = verifyNumber(x)
                    x = colorValueRange(x, 0, 240)
                    var rgb = obSelf.ex.colorRNA.HSL240([obSelf.ex.hsl240.h, x, obSelf.ex.hsl240.l]).rgb()

                    this._s = x;
                    obSelf.__pauseUpdate_ex_hsl240 = true;
                    obSelf.set(rgb);
                    obSelf.__pauseUpdate_ex_hsl240 = false;
                },
                get: function ()
                {
                    return this._s;
                }
            }
        );

        Object.defineProperty(obSelf.ex.hsl240, "l",
            {
                set: function (x)
                {
                    x = verifyNumber(x)
                    x = colorValueRange(x, 0, 240)
                    var rgb = obSelf.ex.colorRNA.HSL240([obSelf.ex.hsl240.h, obSelf.ex.hsl240.s, x]).rgb()

                    this._l = x;
                    obSelf.__pauseUpdate_ex_hsl240 = true;
                    obSelf.set(rgb);
                    obSelf.__pauseUpdate_ex_hsl240 = false;
                },
                get: function ()
                {
                    return this._l;
                }
            }
        );

        //XYZ-----------------------------------
        obSelf.ex.xyz = {
            _x: 0,
            _y: 0,
            _z: 0,
        }

        Object.defineProperty(obSelf.ex.xyz, "x",
            {
                set: function (x)
                {
                    x = verifyNumber(x)
                    x = colorValueRange(x, 0, 3)
                    var rgb = obSelf.ex.colorRNA.XYZ([x, obSelf.ex.xyz.y, obSelf.ex.xyz.z]).rgb()

                    this._x = x;
                    obSelf.__pauseUpdate_ex_xyz = true;
                    obSelf.set(rgb);
                    obSelf.__pauseUpdate_ex_xyz = false;
                },
                get: function ()
                {
                    return this._x;
                }
            }
        );
        Object.defineProperty(obSelf.ex.xyz, "y",
            {
                set: function (x)
                {
                    x = verifyNumber(x)
                    x = colorValueRange(x, 0, 3)
                    var rgb = obSelf.ex.colorRNA.XYZ([obSelf.ex.xyz.x, x, obSelf.ex.xyz.z]).rgb()

                    this._y = x;
                    obSelf.__pauseUpdate_ex_xyz = true;
                    obSelf.set(rgb);
                    obSelf.__pauseUpdate_ex_xyz = false;
                },
                get: function ()
                {
                    return this._y;
                }
            }
        );

        Object.defineProperty(obSelf.ex.xyz, "z",
            {
                set: function (x)
                {
                    x = verifyNumber(x)
                    x = colorValueRange(x, 0, 2)
                    var rgb = obSelf.ex.colorRNA.XYZ([obSelf.ex.xyz.x, obSelf.ex.xyz.y, x]).rgb()

                    this._z = x;
                    obSelf.__pauseUpdate_ex_xyz = true;
                    obSelf.set(rgb);
                    obSelf.__pauseUpdate_ex_xyz = false;
                },
                get: function ()
                {
                    return this._z;
                }
            }
        );

        //xyY-----------------------------------
        obSelf.ex.xyY = {
            _x: 0,
            _y: 0,
            _Y: 0,
        }

        Object.defineProperty(obSelf.ex.xyY, "x",
            {
                set: function (x)
                {
                    x = verifyNumber(x)
                    x = colorValueRange(x, 0, 2)
                    var rgb = obSelf.ex.colorRNA.xyY([x, obSelf.ex.xyY.y, obSelf.ex.xyY.Y]).rgb()

                    this._x = x;
                    obSelf.__pauseUpdate_ex_xyY = true;
                    obSelf.set(rgb);
                    obSelf.__pauseUpdate_ex_xyY = false;
                },
                get: function ()
                {
                    return this._x;
                }
            }
        );

        Object.defineProperty(obSelf.ex.xyY, "y",
            {
                set: function (x)
                {
                    x = verifyNumber(x)
                    x = colorValueRange(x, 0, 2)
                    var rgb = obSelf.ex.colorRNA.xyY([obSelf.ex.xyY.x, x, obSelf.ex.xyY.Y]).rgb()

                    this._y = x;
                    obSelf.__pauseUpdate_ex_xyY = true;
                    obSelf.set(rgb);
                    obSelf.__pauseUpdate_ex_xyY = false;
                },
                get: function ()
                {
                    return this._y;
                }
            }
        );
        Object.defineProperty(obSelf.ex.xyY, "Y",
            {
                set: function (x)
                {
                    x = verifyNumber(x)
                    x = colorValueRange(x, 0, 1)
                    var rgb = obSelf.ex.colorRNA.xyY([obSelf.ex.xyY.x, obSelf.ex.xyY.y, x]).rgb()

                    this._Y = x;
                    obSelf.__pauseUpdate_ex_xyY = true;
                    obSelf.set(rgb);
                    obSelf.__pauseUpdate_ex_xyY = false;
                },
                get: function ()
                {
                    return this._Y;
                }
            }
        );

        //Luv-----------------------------------
        obSelf.ex.luv = {
            _l: 0,
            _u: 0,
            _v: 0,
        }

        Object.defineProperty(obSelf.ex.luv, "l",
            {
                set: function (x)
                {
                    x = verifyNumber(x)
                    x = colorValueRange(x, 0, 100)
                    var rgb = obSelf.ex.colorRNA.Luv([x, obSelf.ex.luv.u, obSelf.ex.luv.v]).rgb()

                    this._l = x;
                    obSelf.__pauseUpdate_ex_luv = true;
                    obSelf.set(rgb);
                    obSelf.__pauseUpdate_ex_luv = false;
                },
                get: function ()
                {
                    return this._l;
                }
            }
        );

        Object.defineProperty(obSelf.ex.luv, "u",
            {
                set: function (x)
                {
                    x = verifyNumber(x)
                    x = colorValueRange(x, -200, 200)
                    var rgb = obSelf.ex.colorRNA.Luv([obSelf.ex.luv.l, x, obSelf.ex.luv.v]).rgb()

                    this._u = x;
                    obSelf.__pauseUpdate_ex_luv = true;
                    obSelf.set(rgb);
                    obSelf.__pauseUpdate_ex_luv = false;
                },
                get: function ()
                {
                    return this._u;
                }
            }
        );

        Object.defineProperty(obSelf.ex.luv, "v",
            {
                set: function (x)
                {
                    x = verifyNumber(x)
                    x = colorValueRange(x, -200, 200)
                    var rgb = obSelf.ex.colorRNA.Luv([obSelf.ex.luv.l, obSelf.ex.luv.u, x]).rgb()

                    this._v = x;
                    obSelf.__pauseUpdate_ex_luv = true;
                    obSelf.set(rgb);
                    obSelf.__pauseUpdate_ex_luv = false;
                },
                get: function ()
                {
                    return this._v;
                }
            }
        );


        function verifyNumber(x)
        {
            x = +x;
            if (Number.isNaN(x))
            {
                x = 0;
            }
            return x;
        }

        function colorValueRange(value, min, max)
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

    }


    IchiColor.prototype.__extensionSettingEvent = function ()
    {
        if (this.__ex_enable)
        {
            if (this.__pauseUpdate_ex_labPs != true)
            {
                var labPs = this.ex.colorRNA.rgb(this.r, this.g, this.b).LabPS();
                this.ex.labPs._l = labPs[0];
                this.ex.labPs._a = labPs[1];
                this.ex.labPs._b = labPs[2];
            }
            if (this.__pauseUpdate_ex_lab != true)
            {
                var lab = this.ex.colorRNA.rgb(this.r, this.g, this.b).Lab();
                this.ex.lab._l = lab[0];
                this.ex.lab._a = lab[1];
                this.ex.lab._b = lab[2];
            }
            if (this.__pauseUpdate_ex_LCHab != true)
            {
                var LCHab = this.ex.colorRNA.rgb(this.r, this.g, this.b).LCHab();
                this.ex.LCHab._l = LCHab[0];
                this.ex.LCHab._c = LCHab[1];
                this.ex.LCHab._h = LCHab[2];
            }
            if (this.__pauseUpdate_ex_hsl255 != true)
            {
                var hsl255 = this.ex.colorRNA.rgb(this.r, this.g, this.b).HSL255();
                this.ex.hsl255._h = hsl255[0];
                this.ex.hsl255._s = hsl255[1];
                this.ex.hsl255._l = hsl255[2];
            }
            if (this.__pauseUpdate_ex_hsl240 != true)
            {
                var hsl240 = this.ex.colorRNA.rgb(this.r, this.g, this.b).HSL240();
                this.ex.hsl240._h = hsl240[0];
                this.ex.hsl240._s = hsl240[1];
                this.ex.hsl240._l = hsl240[2];
            }
            if (this.__pauseUpdate_ex_xyz != true)
            {
                var xyz = this.ex.colorRNA.rgb(this.r, this.g, this.b).XYZ();
                this.ex.xyz._x = xyz[0];
                this.ex.xyz._y = xyz[1];
                this.ex.xyz._z = xyz[2];
            }
            if (this.__pauseUpdate_ex_xyY != true)
            {
                var xyY = this.ex.colorRNA.rgb(this.r, this.g, this.b).xyY();
                this.ex.xyY._x = xyY[0];
                this.ex.xyY._y = xyY[1];
                this.ex.xyY._Y = xyY[2];
            }
            if (this.__pauseUpdate_ex_luv != true)
            {
                var luv = this.ex.colorRNA.rgb(this.r, this.g, this.b).Luv();
                this.ex.luv._l = luv[0];
                this.ex.luv._u = luv[1];
                this.ex.luv._v = luv[2];

                if (luv[1] > window.maxu)
                {
                    window.maxu =luv[1]
                }
                if (luv[1] <window.minu)
                {
                    window.minu =luv[1]
                }
                if (luv[2] > window.maxv)
                {
                    window.maxv =luv[2]
                }
                if (luv[2] <window.minv)
                {
                    window.minv =luv[2]
                }


            }

        }


    }

    return IchiColor
}
export  default expandIchiColor;