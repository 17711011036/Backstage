const leaseDao = require("../dao/leaseDao");
let dataInfo;
const leaseController = {
    leaseTransfer(req,resp) {
        leaseDao.leaseInquiry().then(function(data) {
            let getAllData = data;
            leaseDao.leaseInquiry().then(function(data) {
                let getData = data;
                dataInfo = {
                    getAllData: getAllData,
                    getData: getData
                };
                resp.send(dataInfo);
            })
        });
    },
    leaseModify(req,resp){
        var popObj = JSON.parse(req.query.popObj);
        var dataIndex = req.query.dataIndex;
        var modify = popObj.modify;
        var val = ''
        var sql = '';
        var wh = '';
        var addArr = [];
        for(var key in modify) {
            addArr.push(modify[key]);
            val += key + '=?,'
        }
        addArr.push(dataIndex);
        sql = 'UPDATE lease l,lease_details ld SET l.ID=?,ld.detailsName=?,l.Maintitle=?,l.Subtitle=?,ld.detailsPrice=?,ld.detailsImg=? WHERE l.ID=? AND ld.detailsID=l.ID';
        leaseDao.modifyRep(sql,addArr).then(function(data) {
            resp.send(data);
        })
    },
}
module.exports = leaseController;