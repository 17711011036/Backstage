const leaseDao = require("../dao/leaseDao");
let dataInfo;
const leaseController = {
    leaseTransfer(req,resp) {
        var currentP = req.query.currentP;
        var currentIndex = (currentP - 1)*currentP;
        var queryData = "%" + req.query.queryData + "%";

        // 弹出层
        leaseDao.leaseInquiry().then(function(data) {
            var getAllData = data;
            // 表格信息
            var mySql = '';
            var paramsArr = '';
            if(queryData == '%%') {
                mySql = "SELECT l.ID,ld.detailsName,l.Maintitle,l.Subtitle,ld.detailsPrice,ld.detailsImg FROM lease l,lease_details ld WHERE l.ID=ld.ID";
                paramsArr = [currentIndex];
            }else {
                mySql = "SELECT l.ID,ld.detailsName,l.Maintitle,l.Subtitle,ld.detailsPrice,ld.detailsImg FROM lease l,lease_details ld WHERE l.ID=ld.ID and Id.detailsNam=?";
                paramsArr = [queryData,currentIndex];
            }
            leaseDao.getLease(mySql,queryData).then(function(data) {
                var getData = data;
                // 分页
                mySql += ' limit ?,5';
                leaseDao.pacingLease(mySql,paramsArr).then(function(data) {
                    var paceDate = data;
                    dataInfo = {
                        getAllData: getAllData,
                        getData: getData,
                        paceDate: paceDate
                    };
                    resp.send(dataInfo);
                })

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
    addForum(req,resp) {
        var popObj = JSON.parse(req.query.popObj);
        var insert = popObj.insert;
        var val = '';
        var val2 = '';
        var sql = '';
        var sql2 = '';
        var wh = '';
        var wh2 = '';
        var id = '';
        var addArr = [];
        var addArr2 = [];
        for(var key in insert) {
            if(/title/.test(key)) {
                addArr.push(insert[key].trim());
                val += key + ',' ;
                wh +='?,'
            }else {
                console.log(key)
                addArr2.push(insert[key].trim());
                val2 += key + ',' ;
                wh2 +='?,'
            }
        }
        val = val.substr(0,val.length-1);
        wh = wh.substr(0,wh.length-1);
        sql = 'insert into lease (ID,'+ val +') values(null,'+ wh +')';
        val2 = val2.substr(0,val2.length-1);
        wh2 = wh2.substr(0,wh2.length-1);
        id = req.query.insertIndex;
        addArr2.push(id);
        sql2 = 'insert into lease_details (detailsID,detailsImg,detailsName,detailsPrice,ID,goodsSno) values(null,?,?,?,?,null)';
        leaseDao.addForum(sql,addArr).then(function(data) {
            let add1=data;
            console.log("========================================")
            console.log(add1);
            leaseDao.addForum2(sql2,addArr2).then(function (data) {
                let add2=data;
                resp.send({
                    add1,
                    add2
                });
            })
        })
    },
}
module.exports = leaseController;