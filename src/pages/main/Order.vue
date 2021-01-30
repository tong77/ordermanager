<template>
  <div style="background: #fff;">
    <el-col :span="24" style="background: #fff;height:100%">
      <div>
        <span>
          订单号
          <el-input v-model="orderNo" placeholder="订单号" size="small"></el-input>
        </span>
        <span>
          收货人
          <el-input v-model="consignee" placeholder="收货人" size="small"></el-input>
        </span>
        <span>
          手机号
          <el-input v-model="phone" placeholder="手机号" size="small"></el-input>
        </span>
        <span>
          订单状态
          <el-select v-model="orderState" placeholder="请选择" size="small">
            <el-option v-for="item in options" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </span>
        <div style="margin: 20px 0;"></div>
        <p>
          <span>选择时间</span>
          <el-date-picker
            v-model="date"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="small"
          ></el-date-picker>
          <el-button @click="clickSearch" type="primary" size="mini" style=" margin-left:20px ">查询</el-button>
        </p>
      </div>
      <div style="margin: 20px 0;"></div>
      <el-table :data="tableData" border style="width: 100%; ">
        <el-table-column fixed prop="orderNo" label="订单号"></el-table-column>
        <el-table-column prop="orderTime" label="下单时间"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="consignee" label="收货人"></el-table-column>
        <el-table-column prop="deliverAddress" label="配送地址"></el-table-column>
        <el-table-column prop="deliveryTime" label="送达时间"></el-table-column>
        <el-table-column prop="remarks" label="用户备注"></el-table-column>
        <el-table-column prop="orderAmount" label="订单金额"></el-table-column>
        <el-table-column prop="orderState" label="订单状态"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>

            <el-button @click="ediClick(scope.row)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div>

               附件名称：<el-input v-model="addFileName" autocomplete="off" size="small" style="width: 300px;" ></el-input>
                <div class="add-file-right" style="height:70px;margin-left:100px;margin-top:15px;">
                    <div class="add-file-right-img" style="margin-left:70px;">上传文件：</div>
                    <input type="file" ref="clearFile" @change="getFile($event)" multiple="multiplt" class="add-file-right-input" style="margin-left:70px;" accept=".docx,.doc,.pdf">
                    <span class="add-file-right-more">支持扩展名：.doc .docx .pdf </span>
                </div>
                <div class="add-file-list">
                    <ul>
                        <li v-for="(item, index) in addArr" :key="index"><a >{{item.name}}</a></li>
                    </ul>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitAddFile" size="small">开始上传</el-button>
                    <el-button @click="resetAdd" size="small">全部删除</el-button>
               </div>
      </div>
      <!-- 编辑弹框 -->
      <el-dialog class="edit" title="收货地址" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="订单号" :label-width="formLabelWidth">
            <el-input v-model="form.orderNo" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="下单时间" :label-width="formLabelWidth">
            <el-date-picker v-model="form.orderTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
          </el-form-item>
          <el-form-item label="电话" :label-width="formLabelWidth">
            <el-input v-model="form.phone" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="收货人" :label-width="formLabelWidth">
            <el-input v-model="form.consignee" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="送货地址" :label-width="formLabelWidth">
            <el-input v-model="form.deliverAddress" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="送达时间" :label-width="formLabelWidth">
            <el-date-picker v-model="form.deliveryTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="form.remarks" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="订单金额" :label-width="formLabelWidth">
            <el-input v-model="form.orderAmount" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="订单状态" :label-width="formLabelWidth">
            <el-select v-model="form.orderState" placeholder="订单状态">
              <el-option label="已受理" value="已受理"></el-option>
              <el-option label="已完成" value="已完成"></el-option>
              <el-option label="派送中" value="派送中"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="editsure">确 定</el-button>
        </div>
      </el-dialog>
      <!-- //查看弹窗 -->
      <el-dialog class="seeall" title="订单详情" :visible.sync="dialogTableVisible">
        <div>
          <p>
            订单id:
            <span>{{allsee.id}}</span>
          </p>
          <p>
            订单号:
            <span>{{allsee.orderNo}}</span>
          </p>
          <p>
            下单时间:
            <span>{{allsee.orderTime}}</span>
          </p>
          <p>
            联系电话:
            <span>{{allsee.phone}}</span>
          </p>
          <p>
            收货人:
            <span>{{allsee.consignee}}</span>
          </p>
          <p>
            送货地址:
            <span>{{allsee.deliverAddress}}</span>
          </p>
          <p>
            送达时间:
            <span>{{allsee.deliveryTime}}</span>
          </p>
          <p>
            备注:
            <span>{{allsee.remarks}}</span>
          </p>
          <p>
            订单金额:
            <span>{{allsee.orderAmount}}</span>
          </p>
          <p>
            订单状态:
            <span>{{allsee.orderState}}</span>
          </p>
        </div>
      </el-dialog>
      <!-- 分页器 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pagesizes"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-col>
  </div>
</template>

<script>
import { orderlist, orderedit } from "@/api/apis";
import { getChaintime } from "@/utils/utils";

export default {
  data() {
    return {
      date: [],
      orderNo: "",
      consignee: "",
      phone: "",
      orderState: "",
      options: ["已完成", "已受理", "派送中", "全部"],
      //分页器
      currentPage: 1,
      pagesize: 5,
      total: 0,
      pagesizes: [5, 10, 15],

      tableData: [],

      dialogTableVisible: false,
      dialogFormVisible: false,
      // isloading: true,
      formLabelWidth: "80px",
      allsee: [],

      form: {},
    }
  },
  created() {
    this.getorderlist();
  },
  methods: {
    // 页码大小
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.getorderlist(this.paramsex);
    },
    //当前页变动
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getorderlist(this.paramsex);
    },
    clickSearch() {
      let { orderNo, consignee, phone, orderState } = this;

      //额外参数对象
      let paramsex = {};
      if (orderNo != "") paramsex.orderNo = orderNo;
      if (consignee != "") paramsex.consignee = consignee;
      if (phone != "") paramsex.phone = phone;
      if (orderState != "" && orderState != "全部")
        paramsex.orderState = orderState;
      if (this.date.length > 0)
        paramsex.date = JSON.stringify([
          getChaintime(this.date[0]),
          getChaintime(this.date[1]),
        ]);

      this.paramsex = paramsex;
      this.getorderlist(this.paramsex);
    },
    getorderlist(paramsex) {
      orderlist({
        currentPage: this.currentPage,
        pageSize: this.pagesize,
        ...paramsex,
      }).then((res) => {
        for (let obj of res.data.data) {
          obj.deliveryTime = getChaintime(obj.deliveryTime);
          obj.orderTime = getChaintime(obj.orderTime);
        }
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },
    //查看
    handleClick(row) {
      this.dialogTableVisible = true;
      this.allsee = row;
    },
    //修改编辑
    ediClick(row) {
      this.dialogFormVisible = true;
      // console.log(row);
      
      this.form ={...row} ;
      
    },
    //确认修改
    editsure() {
      orderedit(this.form).then((res) => {
        if(res.data.code==0){
           this.getorderlist();
        }
      });
      this.dialogFormVisible = false;
    },

    //分页器
  },
};
</script>

<style lang="less" scoped>
.el-col {
  border-radius: 4px;
  padding: 20px;
  span {
    color: #606266;
    font-size: 14px;
    margin: 0 10px;
  }
  .el-input {
    display: inline-block;
    width: 200px;
  }
}
.seeall {
  p {
    margin: 10px 0;
    span {
      display: inline-block;
      // margin-left: 20px;
    }
  }
}
.el-dialog {
  width: 40%;
}
</style>