/**
 * Created by 语冰 on 2015/9/22.
 */


function ColorRNA()
{
//---私有

    this._xyz = {X: 0, Y: 0, Z: 0};

    this._gamma = -2.2; //gamma 变换值； _gamma < 0 表示 sRGB 模式
    this._colorSpace = "sRGB";
    this._refWhiteName = "D65";
    this._refWhiteNameUSER = "";//强制制度值
    this._adtAlg = "Bradford";
    this._doAdapta = true;
    this._doAdaptaUSER = 0;// 0 默认，1 强制使用，-1 强制不使用


    this._dLV = 1; //计算精度 2：16位, 1：7位, 0：4位;

    this._COLORSPACES =
    {
        sRGB: "sRGB",
        AdobeRGB: "AdobeRGB",
        AppleRGB: "AppleRGB",
        BestRGB: "BestRGB",
        BetaRGB: "BetaRGB",
        BruceRGB: "BruceRGB",
        CIERGB: "CIERGB",
        ColorMatchRGB: "ColorMatchRGB",
        ECIRGBv2: "ECIRGBv2",
        DonRGB4: "DonRGB4",
        EktaSpacePS5: "EktaSpacePS5",
        NTSCRGB: "NTSCRGB",
        PALSECAMRGB: "PALSECAMRGB",
        ProPhotoRGB: "ProPhotoRGB",
        SMPTECRGB: "SMPTECRGB",
        WideGamutRGB: "WideGamutRGB"
    }
    this._REFWHITES =
    {
        A: "A",
        B: "B",
        C: "C",
        D50: "D50",
        D55: "D55",
        D65: "D65",
        D75: "D75",
        E: "E",
        F2: "F2",
        F7: "F7",
        F11: "F11"
    }


    this._adt_refWhite = {X: 0, Y: 0, Z: 0};// 参考白
    this._adt_refWhiteRGB = {X: 0, Y: 0, Z: 0};// RGB 色彩空间参考白
    this._adt_mtxAdaptMa = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
    this._adt_mtxAdaptMaI = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];


//---in RGB-----------------------
    this._rgbX(arguments, this._COLORSPACES.sRGB)

}

//---原型函数--------------------------------------------------------------------------------------------------


//取 RGB 值，如：#ffffff
ColorRNA.prototype._RGBstring = function ()
{
    return "#" + this.r.toString(16) + this.g.toString(16) + this.b.toString(16)
}

ColorRNA.prototype._arrayProduct = function (inArray, inArray2)
{
    var sum = 0;
    for (var z = 0; z < inArray.length; z++)
    {
        sum += inArray[z] * inArray2[z];
    }

    return sum;
}


//把一个数 inNumber 归一化；inMax,inMin 为原最大最小区间，newMax 为新最大值；如果只有一个参数将按[0,255] 归一化到 [0,1]
ColorRNA.prototype._normaliz = function (inNumber, inMin, inMax, newMax)
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

ColorRNA.prototype._normalizArray = function (inArray, inMin, inMax, newMax)
{
    for (var i = 0; i < inArray.length; i++)
    {
        inArray[i] = this._normaliz(inArray[i], inMin, inMax, newMax);
    }
    return inArray;
}


ColorRNA.prototype._arrayFixed = function (inArray, Number)
{
    for (var z = 0; z < inArray.length; z++)
    {
        inArray[z] = +inArray[z].toFixed(Number);
    }
}

ColorRNA.prototype._arrayRound = function (inArray)
{
    for (var z = 0; z < inArray.length; z++)
    {

        inArray[z] = Math.round(inArray[z]);
    }
}


//对已经归一化的 RGB 值进行  Gamma 2.2 的变换，
ColorRNA.prototype._enGamma = function (rgb)
{
    var newRGB = 0;
    var sign = 1;

    if (rgb < 0)//处理负数情况
    {
        sign = -1;
        rgb = -rgb;
    }


    if (this._gamma < 0)//----sRGB-----------
    {

        if (rgb <= 0.0031306684425005883)
        {
            newRGB = sign * rgb * 12.92;
        }
        else
        {
            newRGB = sign * 1.055 * Math.pow(rgb, 0.416666666666666667) - 0.055 //0.416666666666666667 = 1/2.4;
        }
    }
    if (this._gamma == 0)//-----L*-----------
    {

        if (rgb <= (216.0 / 24389.0))
        {
            newRGB = sign * (rgb * 24389.0 / 2700.0);
        }
        else
        {
            newRGB = sign * (1.16 * Math.pow(rgb, 1.0 / 3.0) - 0.16);
        }
    }
    if (this._gamma > 0)//-----普通 Gamma-----------
    {

        newRGB = sign * Math.pow(rgb, 1 / this._gamma);
    }


    return newRGB;

}


ColorRNA.prototype._adt_adaptation = function (lightName, algName)
{

    this._adt_setRefWhite(lightName);
    this._adt_setAdaptMa(algName);


    var Ad = this._adt_refWhite.X * this._adt_mtxAdaptMa[0][0] + this._adt_refWhite.Y * this._adt_mtxAdaptMa[1][0] + this._adt_refWhite.Z * this._adt_mtxAdaptMa[2][0];
    var Bd = this._adt_refWhite.X * this._adt_mtxAdaptMa[0][1] + this._adt_refWhite.Y * this._adt_mtxAdaptMa[1][1] + this._adt_refWhite.Z * this._adt_mtxAdaptMa[2][1];
    var Cd = this._adt_refWhite.X * this._adt_mtxAdaptMa[0][2] + this._adt_refWhite.Y * this._adt_mtxAdaptMa[1][2] + this._adt_refWhite.Z * this._adt_mtxAdaptMa[2][2];


    var As = this._adt_refWhiteRGB.X * this._adt_mtxAdaptMa[0][0] + this._adt_refWhiteRGB.Y * this._adt_mtxAdaptMa[1][0] + this._adt_refWhiteRGB.Z * this._adt_mtxAdaptMa[2][0];
    var Bs = this._adt_refWhiteRGB.X * this._adt_mtxAdaptMa[0][1] + this._adt_refWhiteRGB.Y * this._adt_mtxAdaptMa[1][1] + this._adt_refWhiteRGB.Z * this._adt_mtxAdaptMa[2][1];
    var Cs = this._adt_refWhiteRGB.X * this._adt_mtxAdaptMa[0][2] + this._adt_refWhiteRGB.Y * this._adt_mtxAdaptMa[1][2] + this._adt_refWhiteRGB.Z * this._adt_mtxAdaptMa[2][2];

    var X = this._xyz.X * this._adt_mtxAdaptMa[0][0] + this._xyz.Y * this._adt_mtxAdaptMa[1][0] + this._xyz.Z * this._adt_mtxAdaptMa[2][0];
    var Y = this._xyz.X * this._adt_mtxAdaptMa[0][1] + this._xyz.Y * this._adt_mtxAdaptMa[1][1] + this._xyz.Z * this._adt_mtxAdaptMa[2][1];
    var Z = this._xyz.X * this._adt_mtxAdaptMa[0][2] + this._xyz.Y * this._adt_mtxAdaptMa[1][2] + this._xyz.Z * this._adt_mtxAdaptMa[2][2];

    X *= (Ad / As);
    Y *= (Bd / Bs);
    Z *= (Cd / Cs);

    var X2 = X * this._adt_mtxAdaptMaI[0][0] + Y * this._adt_mtxAdaptMaI[1][0] + Z * this._adt_mtxAdaptMaI[2][0];
    var Y2 = X * this._adt_mtxAdaptMaI[0][1] + Y * this._adt_mtxAdaptMaI[1][1] + Z * this._adt_mtxAdaptMaI[2][1];
    var Z2 = X * this._adt_mtxAdaptMaI[0][2] + Y * this._adt_mtxAdaptMaI[1][2] + Z * this._adt_mtxAdaptMaI[2][2];

    return [X2, Y2, Z2];
}

ColorRNA.prototype._adt_invAdaptation = function (xyz, lightName, algName)
{

    this._adt_setRefWhite(lightName);
    this._adt_setAdaptMa(algName);


    var As = this._adt_refWhite.X * this._adt_mtxAdaptMa[0][0] + this._adt_refWhite.Y * this._adt_mtxAdaptMa[1][0] + this._adt_refWhite.Z * this._adt_mtxAdaptMa[2][0];
    var Bs = this._adt_refWhite.X * this._adt_mtxAdaptMa[0][1] + this._adt_refWhite.Y * this._adt_mtxAdaptMa[1][1] + this._adt_refWhite.Z * this._adt_mtxAdaptMa[2][1];
    var Cs = this._adt_refWhite.X * this._adt_mtxAdaptMa[0][2] + this._adt_refWhite.Y * this._adt_mtxAdaptMa[1][2] + this._adt_refWhite.Z * this._adt_mtxAdaptMa[2][2];

    var Ad = this._adt_refWhiteRGB.X * this._adt_mtxAdaptMa[0][0] + this._adt_refWhiteRGB.Y * this._adt_mtxAdaptMa[1][0] + this._adt_refWhiteRGB.Z * this._adt_mtxAdaptMa[2][0];
    var Bd = this._adt_refWhiteRGB.X * this._adt_mtxAdaptMa[0][1] + this._adt_refWhiteRGB.Y * this._adt_mtxAdaptMa[1][1] + this._adt_refWhiteRGB.Z * this._adt_mtxAdaptMa[2][1];
    var Cd = this._adt_refWhiteRGB.X * this._adt_mtxAdaptMa[0][2] + this._adt_refWhiteRGB.Y * this._adt_mtxAdaptMa[1][2] + this._adt_refWhiteRGB.Z * this._adt_mtxAdaptMa[2][2];

    var X1 = xyz[0] * this._adt_mtxAdaptMa[0][0] + xyz[1] * this._adt_mtxAdaptMa[1][0] + xyz[2] * this._adt_mtxAdaptMa[2][0];
    var Y1 = xyz[0] * this._adt_mtxAdaptMa[0][1] + xyz[1] * this._adt_mtxAdaptMa[1][1] + xyz[2] * this._adt_mtxAdaptMa[2][1];
    var Z1 = xyz[0] * this._adt_mtxAdaptMa[0][2] + xyz[1] * this._adt_mtxAdaptMa[1][2] + xyz[2] * this._adt_mtxAdaptMa[2][2];

    X1 *= (Ad / As);
    Y1 *= (Bd / Bs);
    Z1 *= (Cd / Cs);

    var X2 = X1 * this._adt_mtxAdaptMaI[0][0] + Y1 * this._adt_mtxAdaptMaI[1][0] + Z1 * this._adt_mtxAdaptMaI[2][0];
    var Y2 = X1 * this._adt_mtxAdaptMaI[0][1] + Y1 * this._adt_mtxAdaptMaI[1][1] + Z1 * this._adt_mtxAdaptMaI[2][1];
    var Z2 = X1 * this._adt_mtxAdaptMaI[0][2] + Y1 * this._adt_mtxAdaptMaI[1][2] + Z1 * this._adt_mtxAdaptMaI[2][2];

    return [X2, Y2, Z2];
}


ColorRNA.prototype._adt_setRefWhite = function (lightname)
{
    if (this._refWhiteNameUSER.length > 0)//强制使用用户指定参考白
    {
        lightname = this._refWhiteNameUSER
    }


    this._adt_refWhite.Y = 1.0;
    switch (lightname)
    {
        case "A" ://(ASTM E308-01)
        {
            this._adt_refWhite.X = 1.09850;
            this._adt_refWhite.Z = 0.35585;
            break;
        }
        case "B" ://(Wyszecki & Stiles, p. 769)
        {
            this._adt_refWhite.X = 0.99072;
            this._adt_refWhite.Z = 0.85223;
            break;
        }
        case "C" :// (ASTM E308-01)
        {
            this._adt_refWhite.X = 0.98074;
            this._adt_refWhite.Z = 1.18232;
            break;
        }
        case "D50" :
        {
            this._adt_refWhite.X = 0.96422;
            this._adt_refWhite.Z = 0.82521;
            break;
        }
        case "D55" :
        {
            this._adt_refWhite.X = 0.95682;
            this._adt_refWhite.Z = 0.92149;
            break;
        }
        case "D65" :
        {
            this._adt_refWhite.X = 0.95047;
            this._adt_refWhite.Z = 1.08883;
            break;
        }
        case "D75" :
        {
            this._adt_refWhite.X = 0.94972;
            this._adt_refWhite.Z = 1.22638;
            break;
        }
        case "E" :
        {
            this._adt_refWhite.X = 1.00000;
            this._adt_refWhite.Z = 1.00000;
            break;
        }
        case "F2" :
        {
            this._adt_refWhite.X = 0.99186;
            this._adt_refWhite.Z = 0.67393;
            break;
        }
        case "F7" :
        {
            this._adt_refWhite.X = 0.95041;
            this._adt_refWhite.Z = 1.08747;
            break;
        }
        case "F11" :
        {
            this._adt_refWhite.X = 1.00962;
            this._adt_refWhite.Z = 0.64350;
            break;
        }
    }
}

ColorRNA.prototype._adt_setAdaptMa = function (aglName)
{
    switch (aglName)
    {
        case "Bradford" :
        {
            this._adt_mtxAdaptMa = [
                [0.8951, -0.7502, 0.0389],
                [0.2664, 1.7135, -0.0685],
                [-0.1614, 0.0367, 1.0296]];

            this._adt_mtxAdaptMaI = [
                [0.9869929054667123, 0.43230526972339456, -0.008528664575177328],
                [-0.14705425642099013, 0.5183602715367776, 0.04004282165408487],
                [0.15996265166373125, 0.0492912282128556, 0.9684866957875502]];
            break;
        }
        case "vonKries" : //von Kries
        {
            this._adt_mtxAdaptMa = [
                [0.40024, -0.2263, 0],
                [0.7076, 1.16532, 0],
                [-0.08081, 0.0457, 0.91822]];

            this._adt_mtxAdaptMaI = [
                [1.8599363874558397, 0.3611914362417676, -0],
                [-1.1293816185800916, 0.6388124632850422, -0],
                [0.21989740959619328, -0.000006370596838650885, 1.0890636230968613]];
            break;
        }
        case "none":
        {
            this._adt_mtxAdaptMa = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
            this._adt_mtxAdaptMaI = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
            break;
        }

    }


}


//让经过 Gamma  的变换 RGB 归一化值还原
ColorRNA.prototype._deGamma = function (rgb)
{
    var newRGB = 0;
    var sign = 1;

    if (rgb < 0)//处理负数情况
    {
        sign = -1;
        rgb = -rgb;
    }


    if (this._gamma < 0)//----sRGB-----------
    {

        if (rgb <= 0.0404482362771076)
        {
            newRGB = sign * rgb / 12.92;
        }
        else
        {
            newRGB = sign * Math.pow((rgb + 0.055) / 1.055, 2.4);
        }
    }
    if (this._gamma == 0)//-----L*-----------
    {

        if (rgb <= 0.08)
        {
            newRGB = sign * 2700.0 * rgb / 24389.0;
        }
        else
        {
            newRGB = sign * ((((1000000.0 * rgb + 480000.0) * rgb + 76800.0) * rgb + 4096.0) / 1560896.0);
        }
    }
    if (this._gamma > 0)//-----普通 Gamma-----------
    {

        newRGB = sign * Math.pow(rgb, this._gamma);
    }

    return newRGB;
}


ColorRNA.prototype._getRGBnucleotids = function (rabColorSpaceName, XYZtoRGB)
{
    this._adt_refWhiteRGB.Y = 1.0;

    this._refWhiteName = "D65";//设置缺省值
    this._doAdapta = true;//设置缺省

    switch (rabColorSpaceName)
    {

        //sRGB---------------------------------------
        case "sRGB":
        {
            this._gamma = -2.2;
            this._adt_refWhiteRGB.X = 0.95047;
            this._adt_refWhiteRGB.Z = 1.08883;

            if (XYZtoRGB == true)
            {
                if (this._dLV == 2)
                {
                    return [[3.2404541621141045, -1.5371385127977166, -0.498531409556016],
                        [-0.9692660305051868, 1.8760108454466942, 0.041556017530349834],
                        [0.055643430959114726, -0.2040259135167538, 1.0572251882231791]];
                }
                else
                {
                    return [[3.2404542, -1.5371385, -0.4985314],
                        [-0.969266, 1.8760108, 0.041556],
                        [0.0556434, -0.2040259, 1.0572252]];
                }
                break;
            }


            if (this._dLV == 2)
            {
                return [[0.4124564390896922, 0.357576077643909, 0.18043748326639894],
                    [0.21267285140562253, 0.715152155287818, 0.07217499330655958],
                    [0.0193338955823293, 0.11919202588130297, 0.9503040785363679]];
            }
            else
            {
                return [[0.4124564, 0.3575761, 0.1804375],
                    [0.2126729, 0.7151522, 0.072175],
                    [0.0193339, 0.119192, 0.9503041]];
            }
            break;
        }
        //Adobe RGB (1998)-------------------------------------
        case "AdobeRGB":
        {
            this._gamma = 2.2;
            this._adt_refWhiteRGB.X = 0.95047;
            this._adt_refWhiteRGB.Z = 1.08883;

            if (XYZtoRGB == true)
            {
                if (this._dLV == 2)
                {
                    return [[2.041368979260079, -0.5649463871751954, -0.3446943843778483],
                        [-0.9692660305051861, 1.876010845446693, 0.041556017530349786],
                        [0.013447387216170255, -0.11838974235412553, 1.0154095719504164]];
                }
                else
                {
                    return [[2.041369, -0.5649464, -0.3446944],
                        [-0.969266, 1.8760108, 0.041556],
                        [0.0134474, -0.1183897, 1.0154096]];
                }
                break;
            }


            if (this._dLV == 2)
            {
                return [[0.5767308871981477, 0.18555395071121408, 0.18818516209063843],
                    [0.29737686371154487, 0.6273490714522, 0.07527406483625537],
                    [0.027034260337413143, 0.0706872193185578, 0.9911085203440292]];
            }
            else
            {
                return [[0.5767309, 0.185554, 0.1881852],
                    [0.2973769, 0.6273491, 0.0752741],
                    [0.0270343, 0.0706872, 0.9911085]];
            }
            break;
        }
        //Apple RGB -------------------------------------
        case "AppleRGB":
        {
            this._gamma = 1.8;
            this._adt_refWhiteRGB.X = 0.95047;
            this._adt_refWhiteRGB.Z = 1.08883;


            if (XYZtoRGB == true)
            {
                if (this._dLV == 2)
                {
                    return [[2.951537290948746, -1.2894115658994107, -0.473844478043996],
                        [-1.0851093382231771, 1.9908566080903682, 0.037202561107440836],
                        [0.08549335448914223, -0.26949635273220945, 1.0912975249496382]];
                }
                else
                {
                    return [[2.9515373, -1.2894116, -0.4738445],
                        [-1.0851093, 1.9908566, 0.0372026],
                        [0.0854934, -0.2694964, 1.0912975]];
                }
                break;
            }

            if (this._dLV == 2)
            {
                return [[0.4497288365610329, 0.31624860938967136, 0.1844925540492957],
                    [0.24465248708920193, 0.6720282949530516, 0.08331921795774647],
                    [0.025184814847417827, 0.14118241490610328, 0.9224627702464786]];
            }
            else
            {
                return [[0.4497288, 0.3162486, 0.1844926],
                    [0.2446525, 0.6720283, 0.0833192],
                    [0.0251848, 0.1411824, 0.9224628]];
            }
            break;
        }
        //Best RGB -------------------------------------
        case "BestRGB":
        {
            this._gamma = 2.2;
            this._adt_refWhiteRGB.X = 0.96422;
            this._adt_refWhiteRGB.Z = 0.82521;

            if (XYZtoRGB == true)
            {
                if (this._dLV == 2)
                {
                    return [[1.7552599329466554, -0.4836785613998958, -0.25300004986116026],
                        [-0.5441336296844771, 1.5068789209543363, 0.021552825898898505],
                        [0.00634673971374007, -0.01757613896601896, 1.225695866021057]];
                }
                else
                {
                    return [[1.7552599, -0.4836786, -0.253],
                        [-0.5441336, 1.5068789, 0.0215528],
                        [0.0063467, -0.0175761, 1.2256959]];
                }
                break;
            }


            if (this._dLV == 2)
            {
                return [[0.6326696499956765, 0.20455579792131387, 0.12699455208300955],
                    [0.22845686422193134, 0.7373522948326431, 0.034190840945425655],
                    [0, 0.009514223159130886, 0.8156957768408691]];
            }
            else
            {
                return [[0.6326696, 0.2045558, 0.1269946],
                    [0.2284569, 0.7373523, 0.0341908],
                    [0, 0.0095142, 0.8156958]];
            }
            break;
        }
        //Beta RGB -------------------------------------
        case "BetaRGB":
        {

            this._gamma = 2.2;
            this._adt_refWhiteRGB.X = 0.96422;
            this._adt_refWhiteRGB.Z = 0.82521;


            if (XYZtoRGB == true)
            {
                if (this._dLV == 2)
                {
                    return [[1.6832269542614402, -0.4282362832078967, -0.2360184809079736],
                        [-0.7710228944287557, 1.7065571005222588, 0.04468995133824896],
                        [0.04000128943944507, -0.08853755837368198, 1.272364022576533]];
                }
                else
                {
                    return [[1.683227, -0.4282363, -0.2360185],
                        [-0.7710229, 1.7065571, 0.04469],
                        [0.0400013, -0.0885376, 1.272364]];
                }
                break;
            }

            if (this._dLV == 2)
            {
                return [[0.671253700292543, 0.17458338980154234, 0.11838290990591456],
                    [0.30327257771637545, 0.6637860908315439, 0.03294133145208057],
                    [5.409707559738789e-17, 0.040700961469342455, 0.7845090385306573]];
            }
            else
            {
                return [[0.6712537, 0.1745834, 0.1183829],
                    [0.3032726, 0.6637861, 0.0329413],
                    [0, 0.040701, 0.784509]];
            }
            break;
        }
        //Bruce RGB -------------------------------------
        case "BruceRGB":
        {
            this._gamma = 2.2;
            this._adt_refWhiteRGB.X = 0.95047;
            this._adt_refWhiteRGB.Z = 1.08883;

            if (XYZtoRGB == true)
            {
                if (this._dLV == 2)
                {
                    return [[2.745466866559799, -1.1358136045241505, -0.4350268528006593],
                        [-0.9692660305051869, 1.8760108454466942, 0.04155601753034985],
                        [0.011272295190850611, -0.1139754291519338, 1.0132540899331266]];
                }
                else
                {
                    return [[2.7454669, -1.1358136, -0.4350269],
                        [-0.969266, 1.8760108, 0.041556],
                        [0.0112723, -0.1139754, 1.0132541]];
                }
                break;
            }

            if (this._dLV == 2)
            {
                return [[0.4674161637795275, 0.2944512299212599, 0.18860260629921258],
                    [0.24101145944881885, 0.6835474980314961, 0.07544104251968503],
                    [0.021910132677165326, 0.0736128074803149, 0.9933070598425197]];
            }
            else
            {
                return [[0.4674162, 0.2944512, 0.1886026],
                    [0.2410115, 0.6835475, 0.075441],
                    [0.0219101, 0.0736128, 0.9933071]];
            }
            break;
        }
        //CIE RGB -------------------------------------
        case "CIERGB":
        {
            this._gamma = 2.2;
            this._adt_refWhiteRGB.X = 1.00000;
            this._adt_refWhiteRGB.Z = 1.00000;


            if (XYZtoRGB == true)
            {
                if (this._dLV == 2)
                {
                    return [[2.370674329102138, -0.9000405327854051, -0.4706337963167336],
                        [-0.513884966581945, 1.42530358655747, 0.08858138002447524],
                        [0.005298175073030407, -0.0146949384101032, 1.0093967633370728]];
                }
                else
                {
                    return [[2.3706743, -0.9000405, -0.4706338],
                        [-0.513885, 1.4253036, 0.0885814],
                        [0.0052982, -0.0146949, 1.0093968]];
                }
                break;
            }


            if (this._dLV == 2)
            {
                return [[0.48871796548117163, 0.31068034326701394, 0.20060169125181454],
                    [0.1762044365340279, 0.8129846938775509, 0.010810869588421142],
                    [0, 0.010204828793442072, 0.9897951712065579]];
            }
            else
            {
                return [[0.488718, 0.3106803, 0.2006017],
                    [0.1762044, 0.8129847, 0.0108109],
                    [0, 0.0102048, 0.9897952]];
            }

            break;
        }
        //ColorMatch RGB -------------------------------------
        case "ColorMatchRGB":
        {
            this._gamma = 1.8;
            this._adt_refWhiteRGB.X = 0.96422;
            this._adt_refWhiteRGB.Z = 0.82521;

            if (XYZtoRGB == true)
            {
                if (this._dLV == 2)
                {
                    return [[2.6422874096694384, -1.2234270341709754, -0.39301430179044206],
                        [-1.1119762771300263, 2.059018273920192, 0.01596138196837363],
                        [0.08216985846755141, -0.2807254155216341, 1.4559876814266082]];
                }
                else
                {
                    return [[2.6422874, -1.223427, -0.3930143],
                        [-1.1119763, 2.0590183, 0.0159614],
                        [0.0821699, -0.2807254, 1.4559877]];
                }
                break;
            }

            if (this._dLV == 2)
            {
                return [[0.509343853397384, 0.3209070884940387, 0.13396905810857737],
                    [0.2748839843731914, 0.6581314865725201, 0.06698452905428869],
                    [0.024254469209399214, 0.1087820638962844, 0.6921734668943165]];
            }
            else
            {
                return [[0.5093439, 0.3209071, 0.1339691],
                    [0.274884, 0.6581315, 0.0669845],
                    [0.0242545, 0.1087821, 0.6921735]];
            }
            break;
        }
        //ECI RGB v2 -------------------------------------
        case "ECIRGBv2":
        {
            this._gamma = 0;
            this._adt_refWhiteRGB.X = 0.96422;
            this._adt_refWhiteRGB.Z = 0.82521;

            if (XYZtoRGB == true)
            {
                if (this._dLV == 2)
                {
                    return [[1.7827617697270912, -0.49698473887532724, -0.2690100880150854],
                        [-0.9593623286322266, 1.9477962429805813, -0.027580735166583017],
                        [0.08593169513496947, -0.17446738103160447, 1.322827306926194]];
                }
                else
                {
                    return [[1.7827618, -0.4969847, -0.2690101],
                        [-0.9593623, 1.9477962, -0.0275807],
                        [0.0859317, -0.1744674, 1.3228273]];
                }
                break;
            }


            if (this._dLV == 2)
            {
                return [[0.650204257079646, 0.1780773570796461, 0.13593838584070797],
                    [0.32024985796460176, 0.6020710644121368, 0.07767907762326169],
                    [-5.3871025143217717e-17, 0.06783899317319857, 0.7573710068268015]];
            }
            else
            {
                return [[0.6502043, 0.1780774, 0.1359384],
                    [0.3202499, 0.6020711, 0.0776791],
                    [-0, 0.067839, 0.757371]];
            }

            break;
        }
        //Don RGB 4 -------------------------------------
        case "DonRGB4":
        {
            this._gamma = 2.2;
            this._adt_refWhiteRGB.X = 0.96422;
            this._adt_refWhiteRGB.Z = 0.82521;


            if (XYZtoRGB == true)
            {
                if (this._dLV == 2)
                {
                    return [[1.7603902333031187, -0.48811980100639313, -0.25361261951399006],
                        [-0.7126287844544976, 1.6527431594729967, 0.041671534607820124],
                        [0.00782073858032594, -0.03474110403369325, 1.244774289550262]];
                }
                else
                {
                    return [[1.7603902, -0.4881198, -0.2536126],
                        [-0.7126288, 1.6527432, 0.0416715],
                        [0.0078207, -0.0347411, 1.2447743]];
                }
                break;
            }

            if (this._dLV == 2)
            {
                return [[0.645771138436728, 0.19335110357732524, 0.12509775798594666],
                    [0.2783496286365207, 0.6879702057518782, 0.033680165611601025],
                    [0.0037113283818203304, 0.01798614916998376, 0.8035125224481958]];
            }
            else
            {
                return [[0.6457711, 0.1933511, 0.1250978],
                    [0.2783496, 0.6879702, 0.0336802],
                    [0.0037113, 0.0179861, 0.8035125]];
            }

            break;
        }
        //Ekta Space PS5 -------------------------------------
        case "EktaSpacePS5":
        {
            this._gamma = 2.2;
            this._adt_refWhiteRGB.X = 0.96422;
            this._adt_refWhiteRGB.Z = 0.82521;


            if (XYZtoRGB == true)
            {
                if (this._dLV == 2)
                {
                    return [[2.0043819420638203, -0.7304844248729281, -0.24500518813859393],
                        [-0.7110285484718862, 1.6202125940588885, 0.07922268628430854],
                        [0.038126311068521795, -0.0868779875167958, 1.2725437595985338]];
                }
                else
                {
                    return [[2.0043819, -0.7304844, -0.2450052],
                        [-0.7110285, 1.6202126, 0.0792227],
                        [0.0381263, -0.086878, 1.2725438]];
                }
                break;
            }


            if (this._dLV == 2)
            {
                return [[0.5938913615570769, 0.2729801227546152, 0.09734851568830809],
                    [0.26062858312936465, 0.7349464843393485, 0.004424932531286731],
                    [4.743538587961513e-17, 0.04199694196224853, 0.7832130580377514]];
            }
            else
            {
                return [[0.5938914, 0.2729801, 0.0973485],
                    [0.2606286, 0.7349465, 0.0044249],
                    [0, 0.0419969, 0.7832131]];
            }

            break;
        }
        //NTSC RGB -------------------------------------
        case "NTSCRGB":
        {
            this._gamma = 2.2;
            this._adt_refWhiteRGB.X = 0.98074;
            this._adt_refWhiteRGB.Z = 1.18232;

            if (XYZtoRGB == true)
            {
                if (this._dLV == 2)
                {
                    return [[1.9099960989184541, -0.5324541554529706, -0.2882091300158282],
                        [-0.9846663050051847, 1.9991709828893145, -0.02830819991079395],
                        [0.0583056402155416, -0.11837811801337218, 0.8975534918028807]];
                }
                else
                {
                    return [[1.9099961, -0.5324542, -0.2882091],
                        [-0.9846663, 1.999171, -0.0283082],
                        [0.0583056, -0.1183781, 0.8975535]];
                }
                break;
            }

            if (this._dLV == 2)
            {
                return [[0.6068909212389378, 0.1735011212389381, 0.20034795752212392],
                    [0.2989164238938052, 0.5865990289506955, 0.11448454715549937],
                    [-5.028240852204785e-17, 0.06609566523388125, 1.116224334766119]];
            }
            else
            {
                return [[0.6068909, 0.1735011, 0.200348],
                    [0.2989164, 0.586599, 0.1144845],
                    [-0, 0.0660957, 1.1162243]];
            }
            break;
        }

        //PAL/SECAM RGB -------------------------------------
        case "PALSECAMRGB":
        {
            this._gamma = 2.2;
            this._adt_refWhiteRGB.X = 0.95047;
            this._adt_refWhiteRGB.Z = 1.08883;

            if (XYZtoRGB == true)
            {
                if (this._dLV == 2)
                {
                    return [[3.0628971232226965, -1.393179136493678, -0.4757516712579541],
                        [-0.9692660305051867, 1.876010845446694, 0.04155601753034983],
                        [0.06787750995175175, -0.22885477399033227, 1.0693489682562851]];
                }
                else
                {
                    return [[3.0628971, -1.3931791, -0.4757517],
                        [-0.969266, 1.8760108, 0.041556],
                        [0.0678775, -0.2288548, 1.069349]];
                }
                break;
            }


            if (this._dLV == 2)
            {
                return [[0.4306190335097004, 0.3415419122574957, 0.17830905423280421],
                    [0.22203793915343925, 0.7066384391534394, 0.07132362169312169],
                    [0.020185267195767184, 0.12955038051146386, 0.9390943522927689]];
            }
            else
            {
                return [[0.430619, 0.3415419, 0.1783091],
                    [0.2220379, 0.7066384, 0.0713236],
                    [0.0201853, 0.1295504, 0.9390944]];
            }
            break;
        }
        //ProPhoto RGB -------------------------------------
        case "ProPhotoRGB":
        {
            this._gamma = 1.8;
            this._adt_refWhiteRGB.X = 0.96422;
            this._adt_refWhiteRGB.Z = 0.82521;

            if (XYZtoRGB == true)
            {
                if (this._dLV == 2)
                {
                    return [[1.3459433009386654, -0.25560750931676696, -0.05111176587088495],
                        [-0.544598869458717, 1.508167317720767, 0.020535141586646915],
                        [0, -0, 1.2118127506937628]];
                }
                else
                {
                    return [[1.3459433, -0.2556075, -0.0511118],
                        [-0.5445989, 1.5081673, 0.0205351],
                        [0, 0, 1.2118128]];
                }
                break;
            }


            if (this._dLV == 2)
            {
                return [[0.7976749444306044, 0.13519170147409815, 0.031353354095297416],
                    [0.2880402378623102, 0.7118740972357901, 0.00008566490189971971],
                    [0, 0, 0.82521]];
            }
            else
            {
                return [[0.7976749, 0.1351917, 0.0313534],
                    [0.2880402, 0.7118741, 0.0000857],
                    [0, 0, 0.82521]];
            }
            break;
        }
        //SMPTE-C RGB -------------------------------------
        case "SMPTECRGB":
        {
            this._gamma = 2.2;
            this._adt_refWhiteRGB.X = 0.95047;
            this._adt_refWhiteRGB.Z = 1.08883;

            if (XYZtoRGB == true)
            {
                if (this._dLV == 2)
                {
                    return [[3.505395974670056, -1.7394893606633242, -0.543964026874098],
                        [-1.0690722072799321, 1.9778244814100043, 0.035172230231857005],
                        [0.056320014767146896, -0.1970226122130985, 1.0502026283050325]];
                }
                else
                {
                    return [[3.505396, -1.7394894, -0.543964],
                        [-1.0690722, 1.9778245, 0.0351722],
                        [0.05632, -0.1970226, 1.0502026]];
                }
                break;
            }

            if (this._dLV == 2)
            {
                return [[0.3935890809541021, 0.365249655704132, 0.19163126334176603],
                    [0.21241315480062656, 0.7010436940127694, 0.08654315118660402],
                    [0.018742337188290558, 0.11193134610287912, 0.9581563167088301]];
            }
            else
            {
                return [[0.3935891, 0.3652497, 0.1916313],
                    [0.2124132, 0.7010437, 0.0865432],
                    [0.0187423, 0.1119313, 0.9581563]];
            }
            break;
        }
        //Wide Gamut RGB -------------------------------------
        case "WideGamutRGB":
        {
            this._gamma = 2.2;
            this._adt_refWhiteRGB.X = 0.96422;
            this._adt_refWhiteRGB.Z = 0.82521;

            if (XYZtoRGB == true)
            {
                if (this._dLV == 2)
                {
                    return [[1.4628067131216802, -0.18406234137547003, -0.27436064462466103],
                        [-0.5217933153765428, 1.447238063402864, 0.06772274590650387],
                        [0.034934211112166366, -0.09689300063185764, 1.2884099024409357]];
                }
                else
                {
                    return [[1.4628067, -0.1840623, -0.2743606],
                        [-0.5217933, 1.4472381, 0.0677227],
                        [0.0349342, -0.096893, 1.2884099]];
                }
                break;
            }


            if (this._dLV == 2)
            {
                return [[0.7161045686144476, 0.10092960102210317, 0.1471858303634494],
                    [0.25818736147323623, 0.7249378299500627, 0.016874808576701202],
                    [0, 0.05178127356786167, 0.7734287264321384]];
            }
            else
            {
                return [[0.7161046, 0.1009296, 0.1471858],
                    [0.2581874, 0.7249378, 0.0168748],
                    [0, 0.0517813, 0.7734287]];
            }
            break;
        }
    }
}


ColorRNA.prototype._RGB_to_YPbPr = function (rgb)
{

    rgb = this._normalizArray(rgb, 0, 255, 1);

    var
        Y = 0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2],
        Pb = -0.1687367 * rgb[0] - 0.331264 * rgb[1] + 0.5 * rgb[2],
        Pr = 0.5 * rgb[0] - 0.418688 * rgb[1] - 0.081312 * rgb[2];

    return [Y, Pb, Pr];
}

ColorRNA.prototype._YPbPr_to_RGB_ = function (YPbPr)
{
    var
        r = 0.99999999999914679361 * YPbPr[0] - 1.2188941887145875e-06 * YPbPr[1] + 1.4019995886561440468 * YPbPr[2],
        g = 0.99999975910502514331 * YPbPr[0] - 0.34413567816504303521 * YPbPr[1] - 0.71413649331646789076 * YPbPr[2],
        b = 1.00000124040004623180 * YPbPr[0] + 1.77200006607230409200 * YPbPr[1] + 2.1453384174593273e-06 * YPbPr[2];


    return this._normalizArray([r, g, b], 0, 1, 255);
}


ColorRNA.prototype._RGB_to_YCbCr = function (rgb)
{

    rgb = this._normalizArray(rgb, 0, 255, 1);
    var
        Y = 65.481 * rgb[0] + 128.553 * rgb[1] + 24.966 * rgb[2] + 16,
        Cb = -37.797 * rgb[0] - 74.203 * rgb[1] + 112.0 * rgb[2] + 128,
        Cr = 112.0 * rgb[0] - 93.786 * rgb[1] - 18.214 * rgb[2] + 128;

    return [Y, Cb, Cr];
}

ColorRNA.prototype._YCbCr_to_RGB = function (YCbCr)
{
    YCbCr[0] -= 16.0
    YCbCr[1] -= 128.0
    YCbCr[2] -= 128.0

    var
        r = 0.00456621004566210107 * YCbCr[0] + 1.1808799897946415e-09 * YCbCr[1] + 0.00625892896994393634 * YCbCr[2],
        g = 0.00456621004566210107 * YCbCr[0] - 0.00153632368604490212 * YCbCr[1] - 0.00318811094965570701 * YCbCr[2],
        b = 0.00456621004566210107 * YCbCr[0] + 0.00791071623355474145 * YCbCr[1] + 1.1977497040190077e-08 * YCbCr[2];


    return this._normalizArray([r, g, b], 0, 1, 255);
}


ColorRNA.prototype._RGB_to_JpegYCbCr = function (rgb)
{

    var YPbPr = this._RGB_to_YPbPr(rgb);
    var
        Y = YPbPr[0],
        Cb = YPbPr[1] + 0.5,
        Cr = YPbPr[2] + 0.5;

    return [Y, Cb, Cr];
}

ColorRNA.prototype._JpegYCbCr_to_RGB = function (YCbCr)
{
    var rgb = this._YPbPr_to_RGB_([YCbCr[0], YCbCr[1] - 0.5, YCbCr[2] - 0.5]);
    return rgb;
}


ColorRNA.prototype._RGB_to_YIQ = function (rgb)
{
    rgb = this._normalizArray(rgb, 0, 255, 1);

    var
        Y = 0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2],
        I = 0.595716 * rgb[0] - 0.274453 * rgb[1] - 0.321263 * rgb[2],
        Q = 0.211456 * rgb[0] - 0.522591 * rgb[1] + 0.311135 * rgb[2];
    return [Y, I, Q];
}

ColorRNA.prototype._YIQ_to_RGB = function (YIQ)
{
    var
        r = YIQ[0] + 0.9562957197589482261 * YIQ[1] + 0.6210244164652610754 * YIQ[2],
        g = YIQ[0] - 0.2721220993185104464 * YIQ[1] - 0.6473805968256950427 * YIQ[2],
        b = YIQ[0] - 1.1069890167364901945 * YIQ[1] + 1.7046149983646481374 * YIQ[2];

    return this._normalizArray([r, g, b], 0, 1, 255);
}

ColorRNA.prototype._RGB_to_YUV = function (rgb)
{
    rgb = this._normalizArray(rgb, 0, 255, 1);

    var
        Y = 0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2],
        U = -0.147 * rgb[0] - 0.289 * rgb[1] + 0.436 * rgb[2],
        V = 0.615 * rgb[0] - 0.515 * rgb[1] - 0.100 * rgb[2];

    return [Y, U, V];
}


ColorRNA.prototype._YUV_to_RGB = function (YUV)
{

    var
        r = YUV[0] - 3.945707070708279e-05 * YUV[1] + 1.1398279671717170825 * YUV[2],
        g = YUV[0] - 0.3946101641414141437 * YUV[1] - 0.5805003156565656797 * YUV[2],
        b = YUV[0] + 2.0319996843434342537 * YUV[1] - 4.813762626262513e-04 * YUV[2];


    return this._normalizArray([r, g, b], 0, 1, 255);
}


ColorRNA.prototype._RGB_to_HSL = function (rgb, outFloat)
{
    rgb = this._normalizArray(rgb, 0, 255, 1);

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


    if (outFloat != true)
    {
        h = Math.round(h);
        s = Math.round(s);
        l = Math.round(l);
    }

    return [h, s, l];
}


ColorRNA.prototype._HSL_to_RGB = function (HSL)
{
    var
        h = HSL[0],
        s = this._normaliz(HSL[1], 0, 100, 1),
        l = this._normaliz(HSL[2], 0, 100, 1);

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

    return this._normaOutRGB(this._normalizArray([r, g, b], 0, 1, 255));
}

ColorRNA.prototype._RGB_to_HSL_255 = function (rgb)
{
    var hsl = this._RGB_to_HSL(rgb, true);
    hsl[0] = Math.round(this._normaliz(hsl[0], 0, 360, 255));
    hsl[1] = Math.round(this._normaliz(hsl[1], 0, 100, 255));
    hsl[2] = Math.round(this._normaliz(hsl[2], 0, 100, 255));

    return hsl;
}

ColorRNA.prototype._HSL_to_RGB_255 = function (inHSL)
{
    var hsl = [0, 0, 0];

    hsl[0] = Math.round(this._normaliz(inHSL[0], 0, 255, 360)),
        hsl[1] = Math.round(this._normaliz(inHSL[1], 0, 255, 100)),
        hsl[2] = Math.round(this._normaliz(inHSL[2], 0, 255, 100));
    var rgb = this._HSL_to_RGB(hsl);

    return rgb;
}


ColorRNA.prototype._RGB_to_HSL_win239 = function (rgb)
{
    var hsl = this._RGB_to_HSL(rgb, true);
    hsl[0] = Math.round(this._normaliz(hsl[0], 0, 360, 239));
    hsl[1] = Math.round(this._normaliz(hsl[1], 0, 100, 240));
    hsl[2] = Math.round(this._normaliz(hsl[2], 0, 100, 240));

    return hsl;
}

ColorRNA.prototype._HSL_to_RGB_win240 = function (inHSL)
{
    var hsl = [0, 0, 0];

    hsl[0] = Math.round(this._normaliz(inHSL[0], 0, 239, 360)),
        hsl[1] = Math.round(this._normaliz(inHSL[1], 0, 240, 100)),
        hsl[2] = Math.round(this._normaliz(inHSL[2], 0, 240, 100));
    var rgb = this._HSL_to_RGB(hsl);

    return rgb;
}


ColorRNA.prototype._RGB_to_HSV = function (rgb)
{
    var max, min, h, s, v, d,
        r = this._normaliz(rgb[0], 0, 255, 1),
        g = this._normaliz(rgb[1], 0, 255, 1),
        b = this._normaliz(rgb[2], 0, 255, 1);

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

ColorRNA.prototype._HSV_to_RGB = function (HSV)
{
    var r, g, b, i, f, p, q, t;

    // h = h / 360;
    if (v === 0)
    {
        return [0, 0, 0];
    }

    var
        s = this._normaliz(HSV[1], 0, 100, 1),
        v = this._normaliz(HSV[2], 0, 100, 1),
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


    return this._normaOutRGB(this._normalizArray([r, g, b], 0, 1, 255));
}

ColorRNA.prototype._RGB_to_HWB = function (rgb)
{
    var HSV = this._RGB_to_HSV(rgb);

    var H, W, B;

    H = HSV[0];
    W = Math.round(((100 - HSV[1]) * HSV[2]) / 100);
    B = Math.round(100 - HSV[2]);

    return [H, W, B];
}

ColorRNA.prototype._HWB_to_RGB = function (HWB)
{


    var H, S, V;

    H = HWB[0];
    S = 100 - (HWB[1] / (100 - HWB[2]) * 100);
    V = 100 - HWB[2];

    var rgb = this._HSV_to_RGB([H, S, V]);


    return rgb;
}


ColorRNA.prototype._RGB_to_CMY = function (rgb)
{
    var
        C = 1 - (rgb[0] / 255),
        M = 1 - (rgb[1] / 255),
        Y = 1 - (rgb[2] / 255);

    C = Math.round(C * 100);
    M = Math.round(M * 100);
    Y = Math.round(Y * 100);

    return [C, M, Y];

}

ColorRNA.prototype._CMY_to_RGB = function (CMY)
{
    var
        C = CMY[0] / 100,
        M = CMY[1] / 100,
        Y = CMY[2] / 100;

    var
        R = Math.round(Math.max(0, (1 - C) * 255)),
        G = Math.round(Math.max(0, (1 - M) * 255)),
        B = Math.round(Math.max(0, (1 - Y) * 255));
    return [R, G, B];
}

ColorRNA.prototype._CMY_to_CMYK = function (CMY)
{
    var C = CMY[0] / 100;
    var M = CMY[1] / 100;
    var Y = CMY[2] / 100;
    var K = Math.min(Y, Math.min(M, Math.min(C, 1)));
    C = Math.round((C - K) / (1 - K) * 100);
    M = Math.round((M - K) / (1 - K) * 100);
    Y = Math.round((Y - K) / (1 - K) * 100);
    K = Math.round(K * 100);
    return [C, M, Y, K];
}

ColorRNA.prototype._CMYK_to_CMY = function (CMYK)
{

    var
        C = CMYK[0] / 100 * (1 - CMYK[3] / 100) + CMYK[3] / 100,
        M = CMYK[1] / 100 * (1 - CMYK[3] / 100) + CMYK[3] / 100,
        Y = CMYK[2] / 100 * (1 - CMYK[3] / 100) + CMYK[3] / 100;


    return [Math.round(C * 100), Math.round(M * 100), Math.round(Y * 100)];
}


ColorRNA.prototype._RGB_to_CMYK = function (rgb)
{
    return this._CMY_to_CMYK(this._RGB_to_CMY(rgb));
}

ColorRNA.prototype._CMYK_to_RGB = function (CMYK)
{
    return this._CMY_to_RGB(this._CMYK_to_CMY(CMYK));

}

ColorRNA.prototype._RGB_to_XYZ = function ()
{
    var x, y, z;
    var nucleotids = this._getRGBnucleotids(this._colorSpace);


    var rgbs =
        [
            this._deGamma(this._normaliz(this.r)),
            this._deGamma(this._normaliz(this.g)),
            this._deGamma(this._normaliz(this.b))
        ];


    x = this._arrayProduct(rgbs, nucleotids[0]);
    y = this._arrayProduct(rgbs, nucleotids[1]);
    z = this._arrayProduct(rgbs, nucleotids[2]);

    this._xyz.X = x;
    this._xyz.Y = y;
    this._xyz.Z = z;

    if ((this._doAdapta == true || this._doAdaptaUSER == 1 ) && this._doAdaptaUSER != -1)
    {
        var xyz2 = this._adt_adaptation(this._refWhiteName, this._adtAlg);
        this._xyz.X = xyz2[0];
        this._xyz.Y = xyz2[1];
        this._xyz.Z = xyz2[2];

    }

    return [this._xyz.X, this._xyz.Y, this._xyz.Z]
}

ColorRNA.prototype._XYZ_to_RGB = function ()
{
    var nucleotids = this._getRGBnucleotids(this._colorSpace, true);
    var xyzs = [this._xyz.X, this._xyz.Y, this._xyz.Z];


    if ((this._doAdapta == true || this._doAdaptaUSER == 1 ) && this._doAdaptaUSER != -1)
    {

        xyzs = this._adt_invAdaptation(xyzs, this._refWhiteName, this._adtAlg);
    }

    var _r, _g, _b;

    _r = this._arrayProduct(xyzs, nucleotids[0]);
    _g = this._arrayProduct(xyzs, nucleotids[1]);
    _b = this._arrayProduct(xyzs, nucleotids[2]);

    var rgbs =
        [
            this._normaliz(this._enGamma(_r), 0, 1, 255),
            this._normaliz(this._enGamma(_g), 0, 1, 255),
            this._normaliz(this._enGamma(_b), 0, 1, 255)
        ];

    this._arrayRound(rgbs);
    return rgbs;
}


ColorRNA.prototype._XYZ_to_Lab = function (psMod)
{
    var xyz = [this._xyz.X, this._xyz.Y, this._xyz.Z];

    var kE = 0.008856451679 //216.0 / 24389.0;
    var kK = 903.2962962963 //24389.0 / 27.0;


    this._adt_setRefWhite("D65");

    if (psMod === true)//ps
    {
        this._getRGBnucleotids("sRGB");
        xyz = this._adt_adaptation("D50", this._adtAlg);
    }


    var xr = xyz[0] / this._adt_refWhite.X;
    var yr = xyz[1] / this._adt_refWhite.Y;
    var zr = xyz[2] / this._adt_refWhite.Z;

    var fx = (xr > kE) ? Math.pow(xr, 1.0 / 3.0) : ((kK * xr + 16.0) / 116.0);
    var fy = (yr > kE) ? Math.pow(yr, 1.0 / 3.0) : ((kK * yr + 16.0) / 116.0);
    var fz = (zr > kE) ? Math.pow(zr, 1.0 / 3.0) : ((kK * zr + 16.0) / 116.0);

    var Lab = [116.0 * fy - 16.0, 500.0 * (fx - fy), 200.0 * (fy - fz)];

    return Lab;
}


ColorRNA.prototype._LCHab_to_XYZ = function (LCH)
{
    var Lab = [0, 0, 0];

    Lab[0] = LCH[0];
    Lab[1] = LCH[1] * Math.cos(LCH[2] * Math.PI / 180.0);
    Lab[2] = LCH[1] * Math.sin(LCH[2] * Math.PI / 180.0);

    return this._Lab_to_XYZ(Lab, false);
}


ColorRNA.prototype._XYZ_to_LCHab = function ()
{
    var Lab = this._XYZ_to_Lab(Lab, false);
    var LCH = [0, 0, 0];

    LCH[0] = Lab[0];
    LCH[1] = Math.sqrt(Lab[1] * Lab[1] + Lab[2] * Lab[2]);
    LCH[2] = 180.0 * Math.atan2(Lab[2], Lab[1]) / Math.PI;
    if (LCH[2] < 0.0)
    {
        LCH[2] += 360.0;
    }


    return LCH;
}


ColorRNA.prototype._Lab_to_XYZ = function (Labs, psMod)
{

    var xyz = [0, 0, 0];

    var kE = 0.008856451679 //216.0 / 24389.0;
    var kK = 903.2962962963 //24389.0 / 27.0;
    var kKE = 8.0;


    var Lab =
    {
        L: Labs[0],
        a: Labs[1],
        b: Labs[2],
    }

    var fy = (Lab.L + 16.0) / 116.0;
    var fx = 0.002 * Lab.a + fy;
    var fz = fy - 0.005 * Lab.b;

    var fx3 = fx * fx * fx;
    var fz3 = fz * fz * fz;

    var xr = (fx3 > kE) ? fx3 : ((116.0 * fx - 16.0) / kK);
    var yr = (Lab.L > kKE) ? Math.pow((Lab.L + 16.0) / 116.0, 3.0) : (Lab.L / kK);
    var zr = (fz3 > kE) ? fz3 : ((116.0 * fz - 16.0) / kK);


    //if (psMod === true)
    //{
    //    this._adt_setRefWhite("D65");
    //}


    if (psMod === true)
    {
        this._adt_setRefWhite("D50");
    }
    else
    {
        this._adt_setRefWhite("D65");
    }


    xyz[0] = xr * this._adt_refWhite.X;
    xyz[1] = yr * this._adt_refWhite.Y;
    xyz[2] = zr * this._adt_refWhite.Z;

    this._xyz.X = xyz[0];
    this._xyz.Y = xyz[1];
    this._xyz.Z = xyz[2];

    if (psMod === true)
    {
        this._getRGBnucleotids("sRGB")
        // xyz = this._adt_adaptation("D65", this._adtAlg);
        xyz = this._adt_invAdaptation(xyz, "D50", this._adtAlg);
    }

    this._xyz.X = xyz[0];
    this._xyz.Y = xyz[1];
    this._xyz.Z = xyz[2];


    return [this._xyz.X, this._xyz.Y, this._xyz.Z];
}


ColorRNA.prototype._XYZ_to_xyY = function ()
{
    var xyY = [0, 0, 0];
    var Den = this._xyz.X + this._xyz.Y + this._xyz.Z;
    if (Den > 0.0)
    {
        xyY[0] = this._xyz.X / Den;
        xyY[1] = this._xyz.Y / Den;
    }
    else
    {
        this._adt_setRefWhite(this._refWhiteName);
        xyY[0] = this._adt_refWhite.X / (this._adt_refWhite.X + this._adt_refWhite.Y + this._adt_refWhite.Z);
        xyY[1] = this._adt_refWhite.Y / (this._adt_refWhite.X + this._adt_refWhite.Y + this._adt_refWhite.Z);
    }

    xyY[2] = this._xyz.Y;

    return xyY;
}


ColorRNA.prototype._xyY_to_XYZ = function (xyY)
{
    var XYZ = [0, 0, 0];
    if (xyY[1] < 0.000001)
    {
        XYZ[0] = XYZ[1] = XYZ[2] = 0.0;
    }
    else
    {
        XYZ[0] = (xyY[0] * xyY[2]) / xyY[1];
        XYZ[1] = xyY[2];
        XYZ[2] = ((1.0 - xyY[0] - xyY[1]) * xyY[2]) / xyY[1];
    }


    this._xyz.X = XYZ[0];
    this._xyz.Y = XYZ[1];
    this._xyz.Z = XYZ[2];
    return XYZ;
}

ColorRNA.prototype._xyY_to_Wavelength = function (xyY)
{

    var x = xyY[0],
        y = xyY[1],
        xr = this._adt_refWhite.X / ( this._adt_refWhite.X + this._adt_refWhite.Y + this._adt_refWhite.Z),
        yr = this._adt_refWhite.Y / (this._adt_refWhite.X + this._adt_refWhite.Y + this._adt_refWhite.Z);


    var dominantWavelength;
    var count = 0;
    var tArray = [0.0, 0.0];	// t
    var wArray = [0.0, 0.0];	// wavelength
    var cArray = [0, 0];		// cycle

    var nm;

    var a = x - xr;
    var b = y - yr;

    if ((a >= -0.000001) && (a <= 0.000001) && (b >= -0.000001) && (b <= 0.000001))
    {
        return (0.0);	// cannot compute the dominant wavelength, because (x, y) is the same as (xr, yr)
    }

    for (nm = 360; nm <= 830; nm += 5)
    {
        var i1 = (nm - 360) / 5;
        var i2 = (nm == 830) ? 0 : i1 + 1;
        var nm2 = 5 * i2 + 360;

        var CIE1931StdObs_x = [
            0.000129900000, 0.000232100000, 0.000414900000, 0.000741600000, 0.001368000000, 0.002236000000,
            0.004243000000, 0.007650000000, 0.014310000000, 0.023190000000, 0.043510000000, 0.077630000000, 0.134380000000, 0.214770000000, 0.283900000000, 0.328500000000,
            0.348280000000, 0.348060000000, 0.336200000000, 0.318700000000, 0.290800000000, 0.251100000000, 0.195360000000, 0.142100000000, 0.095640000000, 0.057950010000,
            0.032010000000, 0.014700000000, 0.004900000000, 0.002400000000, 0.009300000000, 0.029100000000, 0.063270000000, 0.109600000000, 0.165500000000, 0.225749900000,
            0.290400000000, 0.359700000000, 0.433449900000, 0.512050100000, 0.594500000000, 0.678400000000, 0.762100000000, 0.842500000000, 0.916300000000, 0.978600000000,
            1.026300000000, 1.056700000000, 1.062200000000, 1.045600000000, 1.002600000000, 0.938400000000, 0.854449900000, 0.751400000000, 0.642400000000, 0.541900000000,
            0.447900000000, 0.360800000000, 0.283500000000, 0.218700000000, 0.164900000000, 0.121200000000, 0.087400000000, 0.063600000000, 0.046770000000, 0.032900000000,
            0.022700000000, 0.015840000000, 0.011359160000, 0.008110916000, 0.005790346000, 0.004109457000, 0.002899327000, 0.002049190000, 0.001439971000, 0.000999949300,
            0.000690078600, 0.000476021300, 0.000332301100, 0.000234826100, 0.000166150500, 0.000117413000, 0.000083075270, 0.000058706520, 0.000041509940, 0.000029353260,
            0.000020673830, 0.000014559770, 0.000010253980, 0.000007221456, 0.000005085868, 0.000003581652, 0.000002522525, 0.000001776509, 0.000001251141];
        var CIE1931StdObs_y = [
            0.000003917000, 0.000006965000, 0.000012390000, 0.000022020000, 0.000039000000, 0.000064000000,
            0.000120000000, 0.000217000000, 0.000396000000, 0.000640000000, 0.001210000000, 0.002180000000, 0.004000000000, 0.007300000000, 0.011600000000, 0.016840000000,
            0.023000000000, 0.029800000000, 0.038000000000, 0.048000000000, 0.060000000000, 0.073900000000, 0.090980000000, 0.112600000000, 0.139020000000, 0.169300000000,
            0.208020000000, 0.258600000000, 0.323000000000, 0.407300000000, 0.503000000000, 0.608200000000, 0.710000000000, 0.793200000000, 0.862000000000, 0.914850100000,
            0.954000000000, 0.980300000000, 0.994950100000, 1.000000000000, 0.995000000000, 0.978600000000, 0.952000000000, 0.915400000000, 0.870000000000, 0.816300000000,
            0.757000000000, 0.694900000000, 0.631000000000, 0.566800000000, 0.503000000000, 0.441200000000, 0.381000000000, 0.321000000000, 0.265000000000, 0.217000000000,
            0.175000000000, 0.138200000000, 0.107000000000, 0.081600000000, 0.061000000000, 0.044580000000, 0.032000000000, 0.023200000000, 0.017000000000, 0.011920000000,
            0.008210000000, 0.005723000000, 0.004102000000, 0.002929000000, 0.002091000000, 0.001484000000, 0.001047000000, 0.000740000000, 0.000520000000, 0.000361100000,
            0.000249200000, 0.000171900000, 0.000120000000, 0.000084800000, 0.000060000000, 0.000042400000, 0.000030000000, 0.000021200000, 0.000014990000, 0.000010600000,
            0.000007465700, 0.000005257800, 0.000003702900, 0.000002607800, 0.000001836600, 0.000001293400, 0.000000910930, 0.000000641530, 0.000000451810];
        var CIE1931StdObs_z = [
            0.000606100000, 0.001086000000, 0.001946000000, 0.003486000000, 0.006450001000, 0.010549990000,
            0.020050010000, 0.036210000000, 0.067850010000, 0.110200000000, 0.207400000000, 0.371300000000, 0.645600000000, 1.039050100000, 1.385600000000, 1.622960000000,
            1.747060000000, 1.782600000000, 1.772110000000, 1.744100000000, 1.669200000000, 1.528100000000, 1.287640000000, 1.041900000000, 0.812950100000, 0.616200000000,
            0.465180000000, 0.353300000000, 0.272000000000, 0.212300000000, 0.158200000000, 0.111700000000, 0.078249990000, 0.057250010000, 0.042160000000, 0.029840000000,
            0.020300000000, 0.013400000000, 0.008749999000, 0.005749999000, 0.003900000000, 0.002749999000, 0.002100000000, 0.001800000000, 0.001650001000, 0.001400000000,
            0.001100000000, 0.001000000000, 0.000800000000, 0.000600000000, 0.000340000000, 0.000240000000, 0.000190000000, 0.000100000000, 0.000049999990, 0.000030000000,
            0.000020000000, 0.000010000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000,
            0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000,
            0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000,
            0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000];


        var x1 = CIE1931StdObs_x[i1] / (CIE1931StdObs_x[i1] + CIE1931StdObs_y[i1] + CIE1931StdObs_z[i1]);
        var y1 = CIE1931StdObs_y[i1] / (CIE1931StdObs_x[i1] + CIE1931StdObs_y[i1] + CIE1931StdObs_z[i1]);
        var x2 = CIE1931StdObs_x[i2] / (CIE1931StdObs_x[i2] + CIE1931StdObs_y[i2] + CIE1931StdObs_z[i2]);
        var y2 = CIE1931StdObs_y[i2] / (CIE1931StdObs_x[i2] + CIE1931StdObs_y[i2] + CIE1931StdObs_z[i2]);

        var c = x1 - xr;
        var d = y1 - yr;
        var e = x2 - x1;
        var f = y2 - y1;

        var s = (a * d - b * c) / (b * e - a * f);
        if ((s < 0.0) || (s >= 1.0))
        {
            continue;
        }

        var t = (Math.abs(a) >= Math.abs(b)) ? ((e * s + c) / a) : ((f * s + d) / b);
        tArray[count] = t;
        cArray[count] = nm;
        wArray[count] = (nm2 - nm) * s + nm;
        count += 1;
    }

    if ((cArray[1] == 830) && (tArray[1] > 0.0))
    {
        dominantWavelength = -wArray[0];
    }
    else
    {
        dominantWavelength = (tArray[0] >= 0.0) ? wArray[0] : wArray[1];
    }

    return (dominantWavelength);


}


ColorRNA.prototype._XYZ_to_Luv = function ()
{

    var Luv = [0, 0, 0]
    var kE = 216.0 / 24389.0;
    var kK = 24389.0 / 27.0;
    var kKE = 8.0;
    this._adt_setRefWhite("D65");


    var Den = this._xyz.X + 15.0 * this._xyz.Y + 3.0 * this._xyz.Z;
    var up = (Den > 0.0) ? ((4.0 * this._xyz.X) / (this._xyz.X + 15.0 * this._xyz.Y + 3.0 * this._xyz.Z)) : 0.0;
    var vp = (Den > 0.0) ? ((9.0 * this._xyz.Y) / (this._xyz.X + 15.0 * this._xyz.Y + 3.0 * this._xyz.Z)) : 0.0;

    var urp = (4.0 * this._adt_refWhite.X) / (this._adt_refWhite.X + 15.0 * this._adt_refWhite.Y + 3.0 * this._adt_refWhite.Z);
    var vrp = (9.0 * this._adt_refWhite.Y) / (this._adt_refWhite.X + 15.0 * this._adt_refWhite.Y + 3.0 * this._adt_refWhite.Z);

    var yr = this._xyz.Y / this._adt_refWhite.Y;

    Luv[0] = (yr > kE) ? (116.0 * Math.pow(yr, 1.0 / 3.0) - 16.0) : (kK * yr);
    Luv[1] = 13.0 * Luv[0] * (up - urp);
    Luv[2] = 13.0 * Luv[0] * (vp - vrp);

    return Luv;

}


ColorRNA.prototype._Luv_to_XYZ = function (Luv)
{

    var kK = 24389.0 / 27.0;
    var kKE = 8.0;
    var XYZ = {X: 0, Y: 0, Z: 0};
    this._adt_setRefWhite("D65");


    XYZ.Y = (Luv[0] > kKE) ? Math.pow((Luv[0] + 16.0) / 116.0, 3.0) : (Luv[0] / kK);
    var u0 = (4.0 * this._adt_refWhite.X) / (this._adt_refWhite.X + 15.0 * this._adt_refWhite.Y + 3.0 * this._adt_refWhite.Z);
    var v0 = (9.0 * this._adt_refWhite.Y) / (this._adt_refWhite.X + 15.0 * this._adt_refWhite.Y + 3.0 * this._adt_refWhite.Z);

    var a = (((52.0 * Luv[0]) / (Luv[1] + 13.0 * Luv[0] * u0)) - 1.0) / 3.0;
    var b = -5.0 * XYZ.Y;
    var c = -1.0 / 3.0;
    var d = XYZ.Y * (((39.0 * Luv[0]) / (Luv[2] + 13.0 * Luv[0] * v0)) - 5.0);

    XYZ.X = (d - b) / (a - c);
    XYZ.Z = XYZ.X * a + b;

    this._xyz.X = XYZ.X;
    this._xyz.Y = XYZ.Y;
    this._xyz.Z = XYZ.Z;
}


ColorRNA.prototype._hex_to_rgb = function (hex)
{
    var r, g, b;
    if (hex.length == 3)
    {
        r = parseInt((hex.slice(0, 1) + hex.slice(0, 1)), 16);
        g = parseInt((hex.slice(1, 2) + hex.slice(1, 2)), 16);
        b = parseInt((hex.slice(2, 3) + hex.slice(2, 3)), 16);
    }
    else if (hex.length == 6)
    {
        r = parseInt((hex.slice(0, 2) ), 16);
        g = parseInt((hex.slice(2, 4)), 16);
        b = parseInt((hex.slice(4, 6) ), 16);
    }

    return [r, g, b];
}


ColorRNA.prototype._rgb_to_hex = function (rgb)
{
    var hex = rgb[0] * 65536 + rgb[1] * 256 + rgb[2];

    hex = hex.toString(16).toUpperCase();


    while (hex.length < 6)
    {
        hex = "0" + hex;
    }

    return hex.toString(16).toUpperCase();


}


// 检查输入的 RGB 值，如果是 0~1 的小数形式将转化为 0~255 的形式
ColorRNA.prototype._normaInputRGB = function (inArray)
{
    var modeFloat = false;
    var z = 0
    var flTest = "";

    if (inArray.length == 3)
    {
        if (inArray[1] > 1 && inArray[1] > 1 && inArray[1] > 1)
        {
            return inArray;
        }

        for (z = 0; z < inArray.length; z++)
        {
            if (String(inArray[z]).indexOf(".") > -1)
            {
                modeFloat = true;
            }
        }
        if (modeFloat == true)
        {
            for (z = 0; z < inArray.length; z++)
            {
                inArray[z] = this._normaliz(inArray[z], 0, 1, 255);
            }
        }

    }

    return inArray;
}


// 检查输出的 RGB 值，将小于 0 和 -0 的值转换为 0；
ColorRNA.prototype._normaOutRGB = function (inArray)
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

// 检查输出的 Lab 值，四舍五入舍到 1 位小数，PS(PhotoShop)模式完全舍去小数位；
ColorRNA.prototype._normaOutLab = function (inArray, PSMod)
{
    var z = 0
    for (z = 0; z < inArray.length; z++)
    {
        if (PSMod)
        {
            inArray[z] = Math.round(inArray[z]);
        }
        else
        {
            inArray[z] = +inArray[z].toFixed(4);
        }

    }
    return inArray;
}

// 检查输出的值数组，四舍五入舍到 X 位小数；
ColorRNA.prototype._normaOutX = function (inArray, X)
{
    var z = 0
    for (z = 0; z < inArray.length; z++)
    {
        inArray[z] = +inArray[z].toFixed(X);

    }
    return inArray;
}


// 检查输入的 XYZ 值，如果有非 0~1 形式的值，将把所有值除以 100
ColorRNA.prototype._normaInputXYZ = function (inArray)
{

    var z = 0

    if (inArray[0] > 1 || inArray[1] > 1 || inArray[2] > 1)
    {
        for (z = 0; z < inArray.length; z++)
        {
            inArray[z] = inArray[z] / 100;

        }
    }
    return inArray;
}


//  设置指定的参考白色（光照条件）,没有参数将设置为缺省值（RGB 默认 D65）
ColorRNA.prototype.setRefWhite = function (inRefWhiteName)
{
    if (arguments.length == 0)
    {
        this._refWhiteNameUSER = "";
    }
    else
    {
        this._refWhiteNameUSER = inRefWhiteName;
    }

    return this;
}

//  返回当前参考白色设置（光照条件）
ColorRNA.prototype.getRefWhite = function ()
{

    if (this._refWhiteNameUSER.length > 0)
    {
        return this._refWhiteNameUSER;
    }
    return this._refWhiteName;
}

//默认以 sRGB 设置 RGB 的值，
ColorRNA.prototype.rgb = function ()
{
    return (this._rgbX(arguments, this._COLORSPACES.sRGB));
}


//供各种色彩空间设置取值函数调用的模板----------------------------------
ColorRNA.prototype._rgbX = function (argus, colorSpace)
{
    var rgb = [0, 0, 0];
    this._colorSpace = colorSpace;

    if (argus.length == 0)
    {
        rgb = this._XYZ_to_RGB();
        return this._normaOutRGB(rgb);
    }

    if (argus.length == 1)
    {
        if (Array.isArray(argus[0]))
        {
            if (argus[0].length == 3)
            {
                rgb = argus[0];
            }
        }
        else if (argus[0].slice(0, 1) == "#")
        {
            rgb = this._hex_to_rgb(argus[0].slice(1, argus[0].length));
        }

    }
    if (argus.length == 3)
    {
        rgb[0] = argus[0];
        rgb[1] = argus[1];
        rgb[2] = argus[2];
    }

    this._normaInputRGB(rgb);
    this.r = rgb[0];
    this.g = rgb[1];
    this.b = rgb[2];
    this._RGB_to_XYZ();

    return this;
}

ColorRNA.prototype._LabX = function (argus, PhotoShopMod)
{
    var Lab = [0, 0, 0];

    if (argus.length == 0)
    {
        Lab = this._XYZ_to_Lab(PhotoShopMod);
        this._normaOutLab(Lab, PhotoShopMod);
        return Lab;
    }

    if (argus.length == 1)
    {
        if (Array.isArray(argus[0]))
        {
            if (argus[0].length == 3)
            {
                Lab = argus[0];
            }
        }
    }
    if (argus.length == 3)
    {
        Lab[0] = argus[0];
        Lab[1] = argus[1];
        Lab[2] = argus[2];
    }

    this._Lab_to_XYZ(Lab, PhotoShopMod);
    return this;
}

ColorRNA.prototype._xyYX = function (argus)
{
    var xyY = [0, 0, 0];

    if (argus.length == 0)
    {
        xyY = this._XYZ_to_xyY();
        this._normaOutX(xyY, 4);
        return xyY;
    }

    if (argus.length == 1)
    {
        if (Array.isArray(argus[0]))
        {
            if (argus[0].length == 3)
            {
                xyY = argus[0];
            }
        }
    }
    if (argus.length == 3)
    {
        xyY[0] = argus[0];
        xyY[1] = argus[1];
        xyY[2] = argus[2];
    }

    this._xyY_to_XYZ(xyY);
    return this;
}


ColorRNA.prototype._LCHabX = function (argus)
{

    var LCH = [0, 0, 0];

    if (argus.length == 0)
    {
        LCH = this._XYZ_to_LCHab();
        this._normaOutX(LCH, 4);
        return LCH;
    }

    if (argus.length == 1)
    {
        if (Array.isArray(argus[0]))
        {
            if (argus[0].length == 3)
            {
                LCH = argus[0];
            }
        }
    }
    if (argus.length == 3)
    {
        LCH[0] = argus[0];
        LCH[1] = argus[1];
        LCH[2] = argus[2];
    }
    this._LCHab_to_XYZ(LCH)
    return this;
}


ColorRNA.prototype._LuvX = function (argus)
{

    var Luv = [0, 0, 0];

    if (argus.length == 0)
    {
        Luv = this._XYZ_to_Luv();
        this._normaOutX(Luv, 4);
        return Luv;
    }

    if (argus.length == 1)
    {
        if (Array.isArray(argus[0]))
        {
            if (argus[0].length == 3)
            {
                Luv = argus[0];
            }
        }
    }
    if (argus.length == 3)
    {
        Luv[0] = argus[0];
        Luv[1] = argus[1];
        Luv[2] = argus[2];
    }
    this._Luv_to_XYZ(Luv)
    return this;
}


ColorRNA.prototype._baseRGB_XXXx = function (argus, mode)
{
    var XXX = [0, 0, 0];


    if (argus.length == 0 || typeof argus[0] == "string")
    {
        if (typeof argus[0] == "string") this._colorSpace = argus[0];

        var rgb = this._XYZ_to_RGB();

        if (mode == "HSL")
        {
            return this._RGB_to_HSL(rgb);
        }
        else if (mode == "HSL255")
        {
            return this._RGB_to_HSL_255(rgb);
        }
        else if (mode == "HSLwin")
        {
            return this._RGB_to_HSL_win239(rgb);
        }
        else if (mode == "HSV" || mode == "HSB")
        {
            return this._RGB_to_HSV(rgb);
        }
        else if (mode == "HWB")
        {
            return this._RGB_to_HWB(rgb);
        }
        else if (mode == "YUV")
        {
            return this._RGB_to_YUV(rgb);
        }
        else if (mode == "YCbCr")
        {
            return this._RGB_to_YCbCr(rgb);
        }
        else if (mode == "JpegYCbCr")
        {
            return this._RGB_to_JpegYCbCr(rgb);
        }
        else if (mode == "YIQ")
        {
            return this._RGB_to_YIQ(rgb);
        }
        else if (mode == "YPbPr")
        {
            return this._RGB_to_YPbPr(rgb);
        }

        else if (mode == "CMY")
        {
            return this._RGB_to_CMY(rgb);
        }
        else if (mode == "CMYK")
        {
            return this._RGB_to_CMYK(rgb);
        }

    }

    if (argus.length == 1 || argus.length == 2)
    {

        this._colorSpace = "sRGB";
        if (typeof argus[1] == "string") this._colorSpace = argus[3];

        if (Array.isArray(argus[0]))
        {
            if (argus[0].length == 3)
            {
                XXX = argus[0];
            }
        }

    }


    if (argus.length >= 3 || typeof argus[3] == "string")
    {
        this._colorSpace = "sRGB";
        if (typeof argus[3] == "string") this._colorSpace = argus[3];

        XXX[0] = argus[0];
        XXX[1] = argus[1];
        XXX[2] = argus[2];
        if (typeof argus[3] == "number")  XXX[3] = argus[3];
    }


    var rgb2 = [0, 0, 0];
    if (mode == "HSL")
    {
        rgb2 = this._HSL_to_RGB([XXX[0], XXX[1], XXX[2]]);
    }
    else if (mode == "HSL255")
    {
        rgb2 = this._HSL_to_RGB_255([XXX[0], XXX[1], XXX[2]]);
    }
    else if (mode == "HSLwin")
    {
        rgb2 = this._HSL_to_RGB_win240([XXX[0], XXX[1], XXX[2]]);
    }
    else if (mode == "HSV" || mode == "HSB")
    {
        rgb2 = this._HSV_to_RGB([XXX[0], XXX[1], XXX[2]]);
    }
    else if (mode == "HWB")
    {
        rgb2 = this._HWB_to_RGB([XXX[0], XXX[1], XXX[2]]);
    }
    else if (mode == "CMY")
    {
        rgb2 = this._CMY_to_RGB([XXX[0], XXX[1], XXX[2]]);
    }
    else if (mode == "YUV")
    {
        rgb2 = this._YUV_to_RGB([XXX[0], XXX[1], XXX[2]]);
    }
    else if (mode == "YCbCr")
    {
        rgb2 = this._YCbCr_to_RGB([XXX[0], XXX[1], XXX[2]]);
    }
    else if (mode == "JpegYCbCr")
    {
        rgb2 = this._JpegYCbCr_to_RGB([XXX[0], XXX[1], XXX[2]]);
    }
    else if (mode == "YIQ")
    {
        rgb2 = this._YIQ_to_RGB([XXX[0], XXX[1], XXX[2]]);
    }
    else if (mode == "YPbPr")
    {
        rgb2 = this._YPbPr_to_RGB_([XXX[0], XXX[1], XXX[2]]);
    }
    else if (mode == "CMYK")
    {
        rgb2 = this._CMYK_to_RGB([XXX[0], XXX[1], XXX[2], XXX[3]]);
    }

    this.r = rgb2[0];
    this.g = rgb2[1];
    this.b = rgb2[2];

    this._RGB_to_XYZ();

    return this;
}


//-----------------------------------

ColorRNA.prototype.Luv = function ()
{
    return (this._LuvX(arguments));
}


ColorRNA.prototype.xyY = function ()
{
    return (this._xyYX(arguments));
}


ColorRNA.prototype.LabPS = function ()
{
    return (this._LabX(arguments, true));
}

ColorRNA.prototype.Lab = function ()
{
    return (this._LabX(arguments, false));
}


ColorRNA.prototype.LCHab = function ()
{
    return (this._LCHabX(arguments, false));
}

ColorRNA.prototype.HSL = function ()
{
    return (this._baseRGB_XXXx(arguments, "HSL"));
}

ColorRNA.prototype.HSL255 = function ()
{
    return (this._baseRGB_XXXx(arguments, "HSL255"));
}

ColorRNA.prototype.HSL240 = function ()
{
    return (this._baseRGB_XXXx(arguments, "HSLwin"));
}


ColorRNA.prototype.HSV = function ()
{
    return (this._baseRGB_XXXx(arguments, "HSV"));
}

ColorRNA.prototype.HSB = function ()
{
    return (this._baseRGB_XXXx(arguments, "HSV"));
}

ColorRNA.prototype.HWB = function ()
{
    return (this._baseRGB_XXXx(arguments, "HWB"));
}

ColorRNA.prototype.YPbPr = function ()
{
    return (this._baseRGB_XXXx(arguments, "YPbPr"));
}

ColorRNA.prototype.YIQ = function ()
{
    return (this._baseRGB_XXXx(arguments, "YIQ"));
}

ColorRNA.prototype.JpegYCbCr = function ()
{
    return (this._baseRGB_XXXx(arguments, "JpegYCbCr"));
}

ColorRNA.prototype.YCbCr = function ()
{
    return (this._baseRGB_XXXx(arguments, "YCbCr"));
}

ColorRNA.prototype.YUV = function ()
{
    return (this._baseRGB_XXXx(arguments, "YUV"));
}


ColorRNA.prototype.CMYK = function ()
{
    return (this._baseRGB_XXXx(arguments, "CMYK"));
}

ColorRNA.prototype.CMY = function ()
{
    return (this._baseRGB_XXXx(arguments, "CMY"));
}

// 颜色设置、取值器，带参数调用设置颜色，不带参数调用取颜色
// 各种 RGB 色彩空间 ---------------------------------------------------------------
ColorRNA.prototype.sRGB = function ()
{
    return (this._rgbX(arguments, this._COLORSPACES.sRGB));
}


ColorRNA.prototype.AdobeRGB = function ()
{
    return (this._rgbX(arguments, this._COLORSPACES.AdobeRGB));
}

ColorRNA.prototype.AppleRGB = function ()
{
    return (this._rgbX(arguments, this._COLORSPACES.AppleRGB));
}

ColorRNA.prototype.BestRGB = function ()
{
    return (this._rgbX(arguments, this._COLORSPACES.BestRGB));
}

ColorRNA.prototype.BetaRGB = function ()
{
    return (this._rgbX(arguments, this._COLORSPACES.BetaRGB));
}

ColorRNA.prototype.BruceRGB = function ()
{
    return (this._rgbX(arguments, this._COLORSPACES.BruceRGB));
}

ColorRNA.prototype.CIERGB = function ()
{
    return (this._rgbX(arguments, this._COLORSPACES.CIERGB));
}

ColorRNA.prototype.ColorMatchRGB = function ()
{
    return (this._rgbX(arguments, this._COLORSPACES.ColorMatchRGB));
}

ColorRNA.prototype.DonRGB4 = function ()
{
    return (this._rgbX(arguments, this._COLORSPACES.DonRGB4));
}

ColorRNA.prototype.ECIRGBv2 = function ()
{
    return (this._rgbX(arguments, this._COLORSPACES.ECIRGBv2));
}

ColorRNA.prototype.EktaSpacePS5 = function ()
{
    return (this._rgbX(arguments, this._COLORSPACES.EktaSpacePS5));
}

ColorRNA.prototype.NTSCRGB = function ()
{
    return (this._rgbX(arguments, this._COLORSPACES.NTSCRGB));
}

ColorRNA.prototype.PALSECAMRGB = function ()
{
    return (this._rgbX(arguments, this._COLORSPACES.PALSECAMRGB));
}

ColorRNA.prototype.ProPhotoRGB = function ()
{
    return (this._rgbX(arguments, this._COLORSPACES.ProPhotoRGB));
}

ColorRNA.prototype.SMPTECRGB = function ()
{
    return (this._rgbX(arguments, this._COLORSPACES.SMPTECRGB));
}

ColorRNA.prototype.WideGamutRGB = function ()
{
    return (this._rgbX(arguments, this._COLORSPACES.WideGamutRGB));
}

// ---------------------------------------------------------------

ColorRNA.prototype.getWavelength = function (alg)
{
    return +this._xyY_to_Wavelength(this.xyY()).toFixed(4);

}

ColorRNA.prototype.getLuma = function (alg)
{
    var luma = 0;
    var rgb = this._XYZ_to_RGB();
    this._normalizArray(rgb, 0, 255, 1);

    if (alg == "601")
    {
        luma = rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114;
    }
    else if (alg == "HSP")
    {

        luma = Math.sqrt(.241 * Math.pow(rgb[0], 2) + 0.691 * Math.pow(rgb[1], 2) + 0.068 * Math.pow(rgb[2], 2));

    }
    else //709
    {
        luma = rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
    }

    return luma;
    //0~1
}

ColorRNA.prototype.getWCAGluma = function ()
{// http://www.w3.org/TR/WCAG20/#relativeluminancedef

    var rgb = this._XYZ_to_RGB();
    var luma = [];
    for (var i = 0; i < rgb.length; i++)
    {
        var chan = rgb[i] / 255;
        luma[i] = (chan <= 0.03928) ? chan / 12.92 : Math.pow(((chan + 0.055) / 1.055), 2.4)
    }
    return 0.2126 * luma[0] + 0.7152 * luma[1] + 0.0722 * luma[2];
}


ColorRNA.prototype.getWCAGcontrastThan = function (inColor)
{//http://www.w3.org/TR/WCAG20/#contrast-ratiodef

    var luma1 = this.getWCAGluma(),
        luma2 = inColor.getWCAGluma();

    if (luma1 > luma2)
    {
        return (luma1 + 0.05) / (luma2 + 0.05)
    }
    ;
    return (luma2 + 0.05) / (luma1 + 0.05);

}

ColorRNA.prototype.getHex = function ()
{//get RGB Hex

    var rgb =
        this._XYZ_to_RGB();
    var hex = this._rgb_to_hex([rgb[0], rgb[1], rgb[2]]);
    return "#" + hex;
}

// XYZ 色彩空间---------------------------------------------------------------

ColorRNA.prototype.XYZ = function ()
{
    var xyz = [0, 0, 0];


    if (arguments.length == 0)
    {
        xyz = [this._xyz.X, this._xyz.Y, this._xyz.Z];
        return xyz;
    }

    if (arguments.length == 1)
    {
        if (Array.isArray(arguments[0]))
        {
            if (arguments[0].length == 3)
            {
                xyz = arguments[0];
            }
        }
    }
    if (arguments.length == 3)
    {
        xyz[0] = arguments[0];
        xyz[1] = arguments[1];
        xyz[2] = arguments[2];
    }

    this._normaInputXYZ(xyz);
    this._xyz.X = xyz[0];
    this._xyz.Y = xyz[1];
    this._xyz.Z = xyz[2];
    return this;
}

//--------------------------------------------
ColorRNA.prototype.colorDiff = function (color1, color2, alg)
{
    var ca1 = color1.Lab();
    var Lab1 = {L: ca1[0], a: ca1[1], b: ca1[2]};

    var ca2 = color2.Lab();
    var Lab2 = {L: ca2[0], a: ca2[1], b: ca2[2]};


    var deltaE = 0;

    if (alg == "DeltaE1976")
    {
        var delL = Lab1.L - Lab2.L;
        var dela = Lab1.a - Lab2.a;
        var delb = Lab1.b - Lab2.b;
        deltaE = Math.sqrt(delL * delL + dela * dela + delb * delb);
    }


    // textiles OR Graphic Arts
    if (alg == "DeltaE1994_T" || alg == "DeltaE1994_G")
    {
        var k1 = (alg == "DeltaE1994_T") ? 0.048 : 0.045;
        var k2 = (alg == "DeltaE1994_T") ? 0.014 : 0.015;
        var kL = (alg == "DeltaE1994_T") ? 2.0 : 1.0;
        var kC = 1.0;
        var kH = 1.0;

        var C1 = Math.sqrt(Lab1.a * Lab1.a + Lab1.b * Lab1.b);
        var C2 = Math.sqrt(Lab2.a * Lab2.a + Lab2.b * Lab2.b);

        var delA = Lab1.a - Lab2.a;
        var delB = Lab1.b - Lab2.b;
        var delC = C1 - C2;
        var delH2 = delA * delA + delB * delB - delC * delC;
        var delH = (delH2 > 0.0) ? Math.sqrt(delH2) : 0.0;
        var delL = Lab1.L - Lab2.L;

        var sL = 1.0;
        var sC = 1.0 + k1 * C1;
        var sH = 1.0 + k2 * C1;

        var vL = delL / (kL * sL);
        var vC = delC / (kC * sC);
        var vH = delH / (kH * sH);

        if (alg == "DeltaE1994_T")
        {
            deltaE = Math.sqrt(vL * vL + vC * vC + vH * vH);
        }
        else
        {
            deltaE = Math.sqrt(vL * vL + vC * vC + vH * vH);
        }
    }


    if (alg == "DeltaE2000")
    {
        var kL = 1.0;
        var kC = 1.0;
        var kH = 1.0;
        var lBarPrime = 0.5 * (Lab1.L + Lab2.L);
        var c1 = Math.sqrt(Lab1.a * Lab1.a + Lab1.b * Lab1.b);
        var c2 = Math.sqrt(Lab2.a * Lab2.a + Lab2.b * Lab2.b);
        var cBar = 0.5 * (c1 + c2);
        var cBar7 = cBar * cBar * cBar * cBar * cBar * cBar * cBar;
        var g = 0.5 * (1.0 - Math.sqrt(cBar7 / (cBar7 + 6103515625.0)));
        /* 6103515625 = 25^7 */
        var a1Prime = Lab1.a * (1.0 + g);
        var a2Prime = Lab2.a * (1.0 + g);
        var c1Prime = Math.sqrt(a1Prime * a1Prime + Lab1.b * Lab1.b);
        var c2Prime = Math.sqrt(a2Prime * a2Prime + Lab2.b * Lab2.b);
        var cBarPrime = 0.5 * (c1Prime + c2Prime);
        var h1Prime = (Math.atan2(Lab1.b, a1Prime) * 180.0) / Math.PI;
        if (h1Prime < 0.0)
            h1Prime += 360.0;
        var h2Prime = (Math.atan2(Lab2.b, a2Prime) * 180.0) / Math.PI;
        if (h2Prime < 0.0)
            h2Prime += 360.0;
        var hBarPrime = (Math.abs(h1Prime - h2Prime) > 180.0) ? (0.5 * (h1Prime + h2Prime + 360.0)) : (0.5 * (h1Prime + h2Prime));
        var t = 1.0 -
            0.17 * Math.cos(Math.PI * (      hBarPrime - 30.0) / 180.0) +
            0.24 * Math.cos(Math.PI * (2.0 * hBarPrime       ) / 180.0) +
            0.32 * Math.cos(Math.PI * (3.0 * hBarPrime + 6.0) / 180.0) -
            0.20 * Math.cos(Math.PI * (4.0 * hBarPrime - 63.0) / 180.0);
        if (Math.abs(h2Prime - h1Prime) <= 180.0)
        {
            var dhPrime = h2Prime - h1Prime;
        }

        else
        {
            var dhPrime = (h2Prime <= h1Prime) ? (h2Prime - h1Prime + 360.0) : (h2Prime - h1Prime - 360.0);
        }
        var dLPrime = Lab2.L - Lab1.L;
        var dCPrime = c2Prime - c1Prime;
        var dHPrime = 2.0 * Math.sqrt(c1Prime * c2Prime) * Math.sin(Math.PI * (0.5 * dhPrime) / 180.0);
        var sL = 1.0 + ((0.015 * (lBarPrime - 50.0) * (lBarPrime - 50.0)) / Math.sqrt(20.0 + (lBarPrime - 50.0) * (lBarPrime - 50.0)));
        var sC = 1.0 + 0.045 * cBarPrime;
        var sH = 1.0 + 0.015 * cBarPrime * t;
        var dTheta = 30.0 * Math.exp(-((hBarPrime - 275.0) / 25.0) * ((hBarPrime - 275.0) / 25.0));
        var cBarPrime7 = cBarPrime * cBarPrime * cBarPrime * cBarPrime * cBarPrime * cBarPrime * cBarPrime;
        var rC = Math.sqrt(cBarPrime7 / (cBarPrime7 + 6103515625.0));
        var rT = -2.0 * rC * Math.sin(Math.PI * (2.0 * dTheta) / 180.0);
        deltaE = Math.sqrt(
            (dLPrime / (kL * sL)) * (dLPrime / (kL * sL)) +
            (dCPrime / (kC * sC)) * (dCPrime / (kC * sC)) +
            (dHPrime / (kH * sH)) * (dHPrime / (kH * sH)) +
            (dCPrime / (kC * sC)) * (dHPrime / (kH * sH)) * rT);
    }


    if (alg == "DeltaECMC_11" || alg == "DeltaECMC_21")
    {
        if (alg == "DeltaECMC_11")
        {
            var L = 1.0, C = 1.0;
        }
        else if (alg == "DeltaECMC_21")
        {
            var L = 2.0, C = 1.0;
        }

        var c1 = Math.sqrt(Lab1.a * Lab1.a + Lab1.b * Lab1.b);
        var c2 = Math.sqrt(Lab2.a * Lab2.a + Lab2.b * Lab2.b);
        var sl = (Lab1.L < 16.0) ? (0.511) : ((0.040975 * Lab1.L) / (1.0 + 0.01765 * Lab1.L));
        var sc = (0.0638 * c1) / (1.0 + 0.0131 * c1) + 0.638;
        var h1 = (c1 < 0.000001) ? 0.0 : ((Math.atan2(Lab1.b, Lab1.a) * 180.0) / Math.PI);
        while (h1 < 0.0)
            h1 += 360.0;
        while (h1 >= 360.0)
            h1 -= 360.0;
        var t = ((h1 >= 164.0) && (h1 <= 345.0)) ? (0.56 + Math.abs(0.2 * Math.cos((Math.PI * (h1 + 168.0)) / 180.0))) : (0.36 + Math.abs(0.4 * Math.cos((Math.PI * (h1 + 35.0)) / 180.0)));
        var c4 = c1 * c1 * c1 * c1;
        var f = Math.sqrt(c4 / (c4 + 1900.0));
        var sh = sc * (f * t + 1.0 - f);
        var delL = Lab1.L - Lab2.L;
        var delC = c1 - c2;
        var delA = Lab1.a - Lab2.a;
        var delB = Lab1.b - Lab2.b;
        var dH2 = delA * delA + delB * delB - delC * delC;
        var v1 = delL / (L * sl);
        var v2 = delC / (C * sc);
        var v3 = sh;
        if (L == 2.0)
        {
            deltaE = Math.sqrt(v1 * v1 + v2 * v2 + (dH2 / (v3 * v3)));
        }
        else
        {
            deltaE = Math.sqrt(v1 * v1 + v2 * v2 + (dH2 / (v3 * v3)));
        }
    }

    return +deltaE.toFixed(2);
}


ColorRNA.prototype.diff_ECMC11_Than = function (color2)
{
    return this.colorDiff(this, color2, "DeltaECMC_11");
}

ColorRNA.prototype.diff_ECMC21_Than = function (color2)
{
    return this.colorDiff(this, color2, "DeltaECMC_21");
}

ColorRNA.prototype.diff_DE2000_Than = function (color2)
{
    return this.colorDiff(this, color2, "DeltaE2000");
}

ColorRNA.prototype.diff_DE1976_Than = function (color2)
{
    return this.colorDiff(this, color2, "DeltaE1976");
}

ColorRNA.prototype.diff_DE1994_GraphicArts_Than = function (color2)
{
    return this.colorDiff(this, color2, "DeltaE1994_G");
}

ColorRNA.prototype.diff_DE1994_Textiles_Than = function (color2)
{
    return this.colorDiff(this, color2, "DeltaE1994_T");
}




export default ColorRNA;




















