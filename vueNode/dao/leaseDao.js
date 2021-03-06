const db = require("../config/dbpoolConfig");
const leaseDao = {
    leaseInquiry(params) {
        return new Promise(function (resolve, reject) {
            db.connect("SELECT l.ID,ld.detailsName,l.Maintitle,l.Subtitle,ld.detailsPrice,ld.detailsImg FROM lease l,lease_details ld WHERE l.ID=ld.ID", [], function (error, data) {
                resolve(data)
            })
        })
    },
    leaseClassInquiry(params) {
        return new Promise(function (resolve, reject) {
            db.connect("SELECT l.portfolioID,ld.goodsName,ll.Maintitle,l.goods_type,l.goods_num,ld.goodsImg FROM lease_portfolio l,goods ld,lease ll WHERE l.goods_ID=ld.goods_ID AND ll.ID=l.leaseID", [], function (error, data) {
                resolve(data)
            })
        })
    },
    getLease(sql,params) {
        return new Promise(function (resolve, reject) {
            db.connect(sql, [params], function (error, data) {
                resolve(data);
            });
        });
    },
    pacingLease(sql,...args) {
        return new Promise(function (resolve, reject) {
            db.connect(sql, ...args, function (error, data) {
                resolve(data);
            });
        });
    },
    modifyRep(sql, ...args) {
        return new Promise(function (resolve, reject) {
            db.connect(sql, ...args, function (error, data) {
                resolve(data);
            })
        })
    },
    addForum(sql, ...args) {
        return new Promise(function (resolve, reject) {
            db.connect(sql, ...args, function (error, data) {
                resolve(data);
            })
        })
    },
    addForum2(sql2, ...args) {
        return new Promise(function (resolve, reject) {
            db.connect(sql2, ...args, function (error, data) {
                resolve(data);
                console.log(sql2)
                console.log(...args)
                console.log(data)
            })
        })
    },
    deleteInfo(params) {
        return new Promise(function (resolve, reject) {
            db.connect("delete from lease where ID=?", [params], function (error, data) {
                resolve(data);
            })
        });
    },
    deleteInfo2(params) {
        return new Promise(function (resolve, reject) {
            db.connect("delete from lease_details where ID=?", [params], function (error, data) {
                resolve(data);
            })
        });
    },
};
module.exports = leaseDao;