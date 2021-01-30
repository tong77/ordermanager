<template>
  <div style="background: #fff">
    <div class="title">
      <p>英雄列表上传</p>
    </div>
    <el-col :span="24" style="background: #fff; height: 100%">
      <div>
        附件名称：<el-input
          v-model="addFileName"
          autocomplete="off"
          size="small"
          style="width: 300px"
        ></el-input>
        <div
          class="add-file-right"
          style="height: 70px; margin-left: 100px; margin-top: 15px"
        >
          <div class="add-file-right-img" style="margin-left: 70px">
            上传文件：
          </div>
          <input
            type="file"
            ref="clearFile"
            @change="getFile($event)"
            multiple="multiplt"
            class="add-file-right-input"
            style="margin-left: 70px"
            accept=".docx,.doc,.pdf"
          />
          <span class="add-file-right-more">支持扩展名：.doc .docx .pdf </span>
        </div>
        <div class="add-file-list">
          <ul>
            <li v-for="(item, index) in addArr" :key="index">
              <a>{{ item.name }}</a>
            </li>
          </ul>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitAddFile" size="small"
            >开始上传</el-button
          >
          <el-button @click="resetAdd" size="small">全部删除</el-button>
        </div>
      </div>
    </el-col>
  </div>
</template>

<script>
import {GET_ACC_IMG} from "@/api/apis";
export default {
  data() {
    return {}
  },
  methods:{
    getFile(event){
           var file = event.target.files;
           for(var i = 0;i<file.length;i++){
            //    上传类型判断
               var imgName = file[i].name;
                var idx = imgName.lastIndexOf(".");  
                if (idx != -1){
                    var ext = imgName.substr(idx+1).toUpperCase();   
                    ext = ext.toLowerCase( ); 
                     if (ext!='pdf' && ext!='doc' && ext!='docx'){
                       
                    }else{
                          this.addArr.push(file[i]);
                    }   
                }else{

                }
           }
       },
       submitAddFile(){
           if(0 == this.addArr.length){
             this.$message({
               type: 'info',
               message: '请选择要上传的文件'
             });
             return;
           }

            var formData = new FormData();
            formData.append('num', this.addType);
            formData.append('linkId',this.addId);
            formData.append('rfilename',this.addFileName);
            for(var i=0;i<this.addArr.length;i++){
                formData.append('fileUpload',this.addArr[i]);
            }
          let config = {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': this.token
            }
          };
          this.axios.post(apidate.uploadEnclosure,formData,config)
            .then((response) => {
                if(response.data.info=="success"){this.$message({
                        type: 'success',
                        message: '附件上传成功!'
                    });
                }
            })
        },

  }
}

</script>

<style lang="less" scoped>
@base: #dcdfe6;
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
.title {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid @base;
  padding: 0 20px;
}
</style>