<a name="objectOBJ"></a>

## objectOBJ
Created by bgllj on 2016/10/26.

**Kind**: global variable  

* [objectOBJ](#objectOBJ)
    * [.isEmptyObject(obj)](#objectOBJ.isEmptyObject) 鈬?<code>boolean</code>
    * [.objectCopyToObject(ob1, ob2, func_allowCopy, func_rename, func_valueFiter, func_for)](#objectOBJ.objectCopyToObject)
    * [.setObjectValueByNames(object, names, value)](#objectOBJ.setObjectValueByNames)

<a name="objectOBJ.isEmptyObject"></a>

### objectOBJ.isEmptyObject(obj) 鈬?<code>boolean</code>
瀵硅薄鏄惁涓虹┖

**Kind**: static method of [<code>objectOBJ</code>](#objectOBJ)  

| Param |
| --- |
| obj | 

<a name="objectOBJ.objectCopyToObject"></a>

### objectOBJ.objectCopyToObject(ob1, ob2, func_allowCopy, func_rename, func_valueFiter, func_for)
澶嶅埗瀵硅薄銆傚彲鎺у埗瑕佸鍒剁殑灞炴€э紝澶嶅埗鍚庣殑灞炴€у悕锛屽鐞嗘柊灞炴€у€?
**Kind**: static method of [<code>objectOBJ</code>](#objectOBJ)  

| Param | Description |
| --- | --- |
| ob1 | 婧愬璞?|
| ob2 | 鐩爣瀵硅薄 |
| func_allowCopy | 鍒ゆ柇鏄惁鍏佽澶嶅埗鐨勫嚱鏁帮紝杩斿洖鐪熷厑璁稿鍒?func_allowCopy(灞炴€у悕,灞炴€у€?銆傚彲绌?|
| func_rename | 閲嶅懡鍚嶅鍒跺埌鐩爣瀵硅薄涓婄殑灞炴€у悕锛?杩斿洖鏂板睘鎬у悕 func_rename(灞炴€у悕,灞炴€у€?銆傚彲绌?|
| func_valueFiter | 澶勭悊澶嶅埗鍒扮洰鏍囧璞′笂鐨勫睘鎬у€硷紝杩斿洖澶勭悊鍚庣殑灞炴€у€?func_rename(灞炴€у悕,灞炴€у€?銆傚彲绌?|
| func_for | 姣忔寰幆鎵ц鐨勫嚱鏁?func_for(ob1,ob2,x)銆傚彲绌?|

<a name="objectOBJ.setObjectValueByNames"></a>

### objectOBJ.setObjectValueByNames(object, names, value)
鏍规嵁灞炴€у悕璺緞鍒楄〃锛坣ames锛夊瀵硅薄灞炴€ц祴鍊?
**Kind**: static method of [<code>objectOBJ</code>](#objectOBJ)  

| Param | Description |
| --- | --- |
| object | 瀵硅薄 |
| names | 灞炴€у悕璺緞鍒楄〃锛屽 [position,enableAssigns,y] |
| value | 鍊?|

