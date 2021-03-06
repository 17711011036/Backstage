const db = require("../config/dbpoolConfig");
const goodsDao = {
    //查询所有商品
    goodsmsg(sql,params){
        // return new Promise(function (resolve,reject) {
        //     db.connect("SELECT g.goods_ID,g.goodsName,g.goodsImg,goodsPrice,gc.cateName,DATE_FORMAT(g.createTime,\"%Y-%m-%d %H:%i:%S\") AS createTime,IF(g.goodsStatus=1,\"已上架\",\"已下架\") AS goodsStatus " +
        //         "FROM goods g,goods_category gc " +
        //         "WHERE g.inventory>-1 AND g.is_delete=0 AND g.cate_ID=gc.cate_ID",
        //         [],(err,data)=>{
        //             if (!err){
        //                 resolve(data);
        //             } else {
        //                 reject(data);
        //             }
        //         })
        // })
        return new Promise(function (resolve, reject) {
            db.connect(sql, [params], function (error, data) {
                if (!error){
                    resolve(data);
                } else {
                    reject(data);
                }
            });
        });
    },
    goodsmsg2(req,resp){
        return new Promise(function (resolve,reject) {
            db.connect("SELECT g.goods_ID,gc.cateName AS cate_ID,g.goodsName,g.goodsImg,g.goodsPrice,g.is_shelves,g.is_hot,g.is_recom,g.is_new,g.is_sales,g.salesTime,g.inventory,IF(g.goodsStatus=1,'已上架','已下架') AS goodsStatus " +
                "FROM goods g,goods_category gc WHERE g.cate_ID=gc.cate_ID AND g.inventory>-1 and g.is_delete=0",
                [],(err,data)=>{
                    if (!err){
                        resolve(data);
                    } else {
                        reject(data);
                    }
                })
        })
    },
    goodsmsg3(sql,...args) {
        return new Promise(function (resolve, reject) {
            db.connect(sql, ...args, function (error, data) {
                resolve(data);
            });
        });
    },
    //查询购物车
    shopping(sql,params){
        // return new Promise((resolve, reject) => {
        //     console.log(2);
        //     db.connect("SELECT shop_ID,goods_ID,goodsNum,toal,total_of FROM shop_cart",
        //         [], (err, data) => {
        //             if (!err) {
        //                 resolve(data);
        //             } else {
        //                 reject(data);
        //             }
        //         })
        // })
        return new Promise(function (resolve, reject) {
            db.connect(sql, [params], function (error, data) {
                if (!error){
                    resolve(data);
                } else {
                    reject(data);
                }
            });
        });
    },
    shopping2(req,resp){
        console.log(3);
        return new Promise((resolve, reject) => {
            db.connect("SELECT * FROM shop_cart",
                [], (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(data);
                    }
                })
        })
    },
    shopping3(sql,...args) {
        return new Promise(function (resolve, reject) {
            db.connect(sql, ...args, function (error, data) {
                resolve(data);
            });
        });
    },
    // 商品分类
    goodscate(req,resp){
        return new Promise(function (resolve,reject) {
            db.connect("SELECT cate_ID,cateName,IF(gc.status=1,'已上架','已下架') as status,DATE_FORMAT(cateTime,'%Y-%m-%d %H:%i:%S') as cateTime FROM goods_category gc where gc.is_del=0",
                [],(err,data)=>{
                    if (!err){
                        resolve(data);
                    } else {
                        reject(data);
                    }
                })
        })
    },
    goodscate2(sql,params){
        // return new Promise(function (resolve,reject) {
        //     db.connect("SELECT cate_ID,cateName,IF(gc.status=1,\"已上架\",\"已下架\") as status,DATE_FORMAT(cateTime,\"%Y-%m-%d %H:%i:%S\") as cateTime FROM goods_category gc where gc.is_del=0",
        //         [],(err,data)=>{
        //             if (!err){
        //                 resolve(data);
        //             } else {
        //                 reject(data);
        //             }
        //         })
        // })
        return new Promise(function (resolve, reject) {
            db.connect(sql, [params], function (error, data) {
                if (!error){
                    resolve(data);
                } else {
                    reject(data);
                }
            });
        });
    },
    goodscate3(sql,...args){
        // return new Promise(function (resolve,reject) {
        //     db.connect("SELECT cate_ID,cateName,IF(gc.status=1,\"已上架\",\"已下架\") as status,DATE_FORMAT(cateTime,\"%Y-%m-%d %H:%i:%S\") as cateTime FROM goods_category gc where gc.is_del=0",
        //         [],(err,data)=>{
        //             if (!err){
        //                 resolve(data);
        //             } else {
        //                 reject(data);
        //             }
        //         })
        // })
        return new Promise(function (resolve, reject) {
            db.connect(sql, ...args, function (error, data) {
                if (!error){
                    resolve(data);
                } else {
                    reject(data);
                }
            });
        });
    },
    // 商品评论
    goodscom(req,resp){
        return new Promise(function (resolve,reject) {
            db.connect("SELECT uc.commentsId,u.u_id,u.name,g.goods_ID,g.goodsName,CASE uc.comType WHEN 1 THEN \"好评\" WHEN 2 THEN \"中评\" ELSE \"差评\" END as comType,uc.com_Content,DATE_FORMAT(comTime,\"%Y-%m-%d %H:%i:%S\") as comTime " +
                "FROM user_comments uc,users u,goods g " +
                "WHERE uc.u_id=u.u_id AND uc.goods_ID=g.goods_ID",
                [],(err,data)=>{
                    if (!err){
                        resolve(data);
                    } else {
                        reject(data);
                    }
                })
        })
    },
    goodscom2(sql,params){
        return new Promise(function (resolve, reject) {
            db.connect(sql, [params], function (error, data) {
                if (!error){
                    resolve(data);
                } else {
                    reject(data);
                }
            });
        });
    },
    goodscom3(sql,...args){
        return new Promise(function (resolve, reject) {
            db.connect(sql, ...args, function (error, data) {
                if (!error){
                    resolve(data);
                } else {
                    reject(data);
                }
            });
        });
    },
    // 删除商品
    deletegoods(params) {
        return new Promise(function (resolve, reject) {
            db.connect("delete from goods where goods_ID=?", [params], function (error, data) {
                resolve(data);
            })
        })
    },
    // 上架商品
    status(params){
        return new Promise(function (resolve,reject) {
            db.connect("UPDATE goods SET goodsStatus=1 WHERE goods_ID=?",
                [params],(err,data)=>{
                    if (!err){
                        resolve(data);
                    } else {
                        reject(data);
                    }
                })
        })
    },
    //下架商品
    status2(params){
        return new Promise(function (resolve,reject) {
            db.connect("UPDATE goods SET goodsStatus=2 WHERE goods_ID=?",
                [params],(err,data)=>{
                    if (!err){
                        resolve(data);
                    } else {
                        reject(data);
                    }
                })
        })
    },
    //上架种类
    oncatestatus(params){
        return new Promise(function (resolve,reject) {
            db.connect("UPDATE goods_category SET status=1 WHERE cate_ID=?",
                [params],(err,data)=>{
                    if (!err){
                        resolve(data);
                    } else {
                        reject(data);
                    }
                })
        })
    },
    //下架种类
    uncatestatus(params){
        return new Promise(function (resolve,reject) {
            db.connect("UPDATE goods_category SET status=2 WHERE cate_ID=?",
                [params],(err,data)=>{
                    if (!err){
                        resolve(data);
                    } else {
                        reject(data);
                    }
                })
        })
    },
    //删除种类
    delcate(params){
        return new Promise(function (resolve,reject) {
            db.connect("delete from goods_category WHERE cate_ID=?",
                [params],(err,data)=>{
                    if (!err){
                        resolve(data);
                    } else {
                        reject(data);
                    }
                })
        })
    },
    // 商品评论删除
    delcom(params){
        return new Promise(function (resolve,reject) {
            db.connect("delete from user_comments WHERE commentsId=?",
                [params],(err,data)=>{
                    if (!err){
                        resolve(data);
                    } else {
                        reject(data);
                    }
                })
        })
    },
    // 商品详情
    goodsdetail(sql,params){
        // return new Promise(function (resolve,reject) {
        //     db.connect("SELECT gd.detailId,g.goods_ID,g.goodsName,gd.descTitle,(CASE WHEN LENGTH(gd.descText)>10 THEN CONCAT(SUBSTRING(gd.descText,1,10),'...') ELSE gd.descText END) AS descText,gd.detailImg FROM goods g,goods_details gd WHERE g.goods_ID=gd.goods_ID",
        //         [],(err,data)=>{
        //             if (!err){
        //                 resolve(data);
        //             } else {
        //                 reject(data);
        //             }
        //         })
        // })
        return new Promise(function (resolve, reject) {
            db.connect(sql, [params], function (error, data) {
                if (!error){
                    resolve(data);
                } else {
                    reject(data);
                }
            });
        });
    },
    goodsdetail2(req,resp){
        return new Promise(function (resolve,reject) {
            db.connect("SELECT gd.detailId,gd.goods_ID AS gname,gd.descTitle,gd.descText,gd.detailImg FROM goods_details gd",
                [],(err,data)=>{
                    if (!err){
                        resolve(data);
                    } else {
                        reject(data);
                    }
                })
        })
    },
    goodsdetail3(sql,...args) {
        return new Promise(function (resolve, reject) {
            db.connect(sql, ...args, function (error, data) {
                resolve(data);
            });
        });
    },
    //商品详情 删除
    detaildelete(params){
        return new Promise(function (resolve,reject) {
            db.connect("delete from goods_details where detailId=?",
                [params],(err,data)=>{
                    if (!err){
                        resolve(data);
                    } else {
                        reject(data);
                    }
                })
        })
    },
    // 新增商品
    addgoodsinfo(sql, ...args){
        return new Promise(function (resolve, reject) {
            db.connect(sql, ...args, function (error, data) {
                resolve(data);
            })
        })
    },
    // 商品信息 修改
    modifygoods(sql, ...args) {
        return new Promise(function (resolve, reject) {
            db.connect(sql, ...args, function (error, data) {
                resolve(data);
            })
        })
    },
    // 商品分类 修改
    modifycate(sql, ...args) {
        return new Promise(function (resolve, reject) {
            db.connect(sql, ...args, function (error, data) {
                resolve(data);
            })
        })
    },
    // 商品详情 新增
    adddetail(sql, ...args) {
        return new Promise(function (resolve, reject) {
            db.connect(sql, ...args, function (error, data) {
                resolve(data);
            })
        })
    },
    // 商品详情 修改
    modifydetail(sql, ...args) {
        return new Promise(function (resolve, reject) {
            db.connect(sql, ...args, function (error, data) {
                resolve(data);
            })
        })
    }
};
module.exports = goodsDao;