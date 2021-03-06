/**
 * Created by nullice on 2017/4/9.
 */


//  import axios from "axios"
/**
 * 网络通信核心
 * @returns {NetCaryon}
 */
var NetCaryon = function ()
{
    this.HOSTURL = ["http://127.0.0.1", "http://design-enzyme.com"][1]
    return this;
}


NetCaryon.prototype.getOnce = async function (url, isFullUrl)
{
    var self = this
    if (isFullUrl)
    {
        var url = url
    } else
    {
        var url = self.HOSTURL + url
    }

    return new Promise(function (resolve, reject)
    {
        axios.get(url)
            .then(function (response)
            {
                console.info("axios.get", response)
                resolve(response.data)
            })
            .catch(function (error)
            {
                console.info("axios.get", error)
                reject(null);
            });

    })
}


NetCaryon.prototype.getOfficialMessges = async function ()
{
    var self = this
    return await this.getOnce('/api/uidna/messge')
}

NetCaryon.prototype.getLatestVersion = async function ()
{
    var self = this
    return await this.getOnce('/api/uidna/latest_var')
}

export  default NetCaryon
