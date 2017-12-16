<template>
  <div class="ui fluid container" style="margin-bottom: 2%">

    <!--1.选择是否需要合成片头文件-->
    <div v-if="showNeedComposeTsFileTip" class="ui cards">
      <div class="card">
        <div class="content">
          <div class="header"><i class="minus icon" :class="[appGreenColor]"></i>不要合成片头文件</div>
          <div class="description">不需要为课程中的视频添加片头文件.成功的几率比较高，建议选择这个！</div>
        </div>
        <div class="extra content">
          <div @click="noCompose()" class="ui two buttons">
            <div class="ui basic  button" :class="[appGreenColor]">不合成，选择这里</div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="content">
          <div class="header"><i class="plus icon":class="[appRedColor]"></i>要合成片头文件</div>
          <div class="description">可以为课程中所有的视频添加指定的片头文件，成功的几率比较低，不建议选择这个！</div>
        </div>
        <div class="extra content">
          <div @click="yesCompose()" class="ui two buttons">
            <div class="ui basic  button":class="[appRedColor]">要合成，选择这里</div>
          </div>
        </div>
      </div>
    </div>

    <!--2.检查片头文件是否存在-->
    <div v-if="needComposeTsFile" class="ui fluid container">
      <h6>检查片头文件</h6>
      <div class="ui segment">
        <div class="ui form">
          <div class="required field">
            <label>请输入要合成的片头ts文件</label>
            <input type="text" v-model="tsFilePath" placeholder="请输入片头文件">
          </div>
          <div class="ui fluid right aligned container">
            <div @click="checkTsFileIsExist()" class="ui  button" :class="[appGreenColor]"><i class="doctor icon"></i>
              检查片头文件是否存在!
            </div>
          </div>
        </div>
        <!--片头文件检查结果提示-->
        <div v-if="tsFileTipShow" class="ui icon message">
          <i class="big icon" :class="[tsFileTipIconClass]"></i>
          <div class="content">
            <p>{{tsFileTip}}</p>
          </div>
        </div>

      </div>
    </div>

    <!--3.检查课程路径是否存在-->
    <div v-if="tsFileIsExist" class="ui fluid container" style="margin-top: 2%">
      <h6>检查课程路径</h6>
      <div class="ui segment">
        <div class="ui form">
          <div class="required field">
            <label>要制作成课程的路径</label>
            <input type="text" v-model="courseDirPath" placeholder="请输入要制造的课程路径">
          </div>
          <div v-if="!showCheckResult" class="ui container right aligned">
            <div @click="checkCourseDir()" class="ui  button" :class="[appGreenColor]">检查,这是否是我要操作的路径?</div>
          </div>
          <!--片头文件检查结果-->
          <div v-if="coursePathCheckResultTip" class="ui icon message">
            <i class="big  check square icon" :class="[appGreenColor]"></i>
            <div class="content">
              <p>{{coursePathCheckResultMessage}}</p>
            </div>
          </div>


          <div v-if="showCheckResult&&!showFinalTip" class="ui container right aligned">
            <div class="ui buttons">
              <button @click="selectErrorPaht()" class="ui button">错啦，这不是我想要操作的目录!</button>
              <div class="or"></div>
              <button @click="selectRightPaht()" class="ui button" :class="[appGreenColor]" data-toggle="modal"
                      data-target=".fbs-example-modal-sm">对的，这是我想要操作的目录!
              </button>
            </div>
          </div>
        </div>

        <!--成功后的最终的提示-->
        <div v-if="showFinalTip" class="ui icon message">
          <i class="big check square icon" :class="[appGreenColor]"></i>
          <div class="content">
            <p>恭喜您，课程制作成功！请对照下面表格，检查是否生成了你想要的信息！</p>
          </div>
        </div>
        <!--课程路径对照表-->
        <table v-if="showCheckResult" class="ui striped  selectable celled table">
          <thead>
          <tr>
            <th>文件名称</th>
            <th>创建日期</th>
            <th>文件大小</th>
            <th>文件类型</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(e,i) in allFilesInCourseDir">
            <td>{{e.abpath}}</td>
            <td>{{e.mdate}}</td>
            <td>{{e.size}}</td>
            <td>{{e.type}}</td>
          </tr>
          </tbody>
        </table>

      </div>
    </div>

    <!--摸态框-->
    <div style="margin-top: 4%;" class="modal fbs-example-modal-sm" data-backdrop="static" data-keyboard="false"
         tabindex="-1" role="dialog"
         aria-labelledby="myLargeModalLabel">
      <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
              aria-hidden="true">&times;</span></button>
            <i v-if="showWaitIcon" class="notched circle loading icon"></i>
            {{tipTitle}}：
          </div>
          <div class="modal-body">
            {{tipMsg}}
          </div>
          <div v-if="showDirectButton" class="modal-footer">
            <div class="ui fluid icon buttons">
              <button class="ui left labeled icon button" data-toggle="modal" data-target=".fbs-example-modal-sm"><i
                class="left arrow icon"></i> 取消
              </button>
              <button class="ui right labeled icon  button" :class="[appGreenColor]" @click="makeCourseByDir()"><i
                class="right arrow icon"></i>继续
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script type="text/javascript">
  import {
    REST_URL_QINGCHENG_LOCALFILE_GET_FILELIST,
    REST_URL_UTIL_MEDIA_DIR_TO_COURSE, REST_URL_QINGCHENG_LOCALFILE_CHECK_TSFILE_ISEXIST
  } from "../../../../common/AppRestUrlConstants";
  import {App_Ajax_Get, App_Ajax_Post} from "../../../../common/AppVueResourceApi";
  import {App_Green_Color, App_Red_Color} from "../../../../common/AppColorConstants";
  export default {
    data () {
      return {
        //是否需要合成tsFile
        showNeedComposeTsFileTip: true,
        needComposeTsFile: false,
        //片头文件
        tsFileIsExist: false,
        tsFilePath: "",
        tsFileTip: "",
        tsFileTipShow: false,


        showWaitIcon: false,
        showDirectButton: true,
        showCheckResult: false,
        allFilesInCourseDir: "",
        //检查课程路径
        courseDirPath: "",
        coursePathCheckResultTip: '',
        coursePathCheckResultMessage: "",


        tipTitle: "",
        tipMsg: "",
        showFinalTip: false,
        tsFileTipIconClass: "",

        appGreenColor: App_Green_Color(),
        appRedColor: App_Red_Color(),
      }
    },
    methods: {
      yesCompose(){
        this.showFinalTip = false;
        this.needComposeTsFile = true;
        this.tsFileIsExist = false;
        this.showNeedComposeTsFileTip = false;
      },
      noCompose(){
        this.showFinalTip = false;
        this.needComposeTsFile = false;
        this.tsFileIsExist = true;
        this.showNeedComposeTsFileTip = false;
      },
      //检查tsFile是否存在
      checkTsFileIsExist(){
        //过滤空文件
        if (this.tsFilePath == "") {
          this.showFinalTip = false;
          this.tsFileTipShow = true;
          this.tsFileTip = "文件路径不能为空";
          return;
        }
        //文件不空
        let url = REST_URL_QINGCHENG_LOCALFILE_CHECK_TSFILE_ISEXIST;
        let params = {file: this.tsFilePath};
        App_Ajax_Get(this, url, params).then(function (data) {
          this.tsFileIsExist = data;
          console.log(this.tsFileIsExist);
          this.tsFileTipShow = true;
          if (this.tsFileIsExist) {
            this.tsFileTipIconClass = this.appGreenColor + " smile ";
            this.tsFileTip = "片头文件存在";
          } else {
            this.tsFileTipIconClass = this.appRedColor+" frown ";
            this.tsFileTip = "片头文件不存在";
          }
        });
      },
      //生成课程文件
      makeCourseByDir(){
        this.showDirectButton = false;
        this.tipTitle = "不要关闭";
        this.tipMsg = "正在生成课程请稍候。。。";
        this.showWaitIcon = true;
        this.showFinalTip = false;
        //获取Category信息
        let url = REST_URL_UTIL_MEDIA_DIR_TO_COURSE;
        let params = {"dir": this.courseDirPath, "file": this.tsFilePath, composeTsFile: this.needComposeTsFile};
        App_Ajax_Get(this, url, params).then(function (data) {
          if (data == "ok") {
            this.showWaitIcon = false;
            this.tipTitle = "恭喜您";
            this.tipMsg = "成功创建课程！" + this.courseDirPath;
            this.showFinalTip = true;
            this.checkCourseDir();
          }
        });
      },
      //路径选择正确
      selectRightPaht(){
        this.showFinalTip = false;
        this.showDirectButton = true;
        this.tipTitle = "友情提示";
        this.tipMsg = "生成课程，可能会对目录内的文件造成破坏,请做好备份!";
      },
      //路径选择错误
      selectErrorPaht(){
        this.showFinalTip = false;
        this.courseDirPath = "";
        this.allFilesInCourseDir = [];
        this.showCheckResult = false;
      },
      //检查路径选择是否正确
      checkCourseDir(){
        //1.空路径检查
        if (this.courseDirPath == "") {
          this.coursePathCheckResultTip = true;
          this.coursePathCheckResultMessage = "课程路径不能为空！";
          this.showCheckResult = false;
          return;
        }
        //2.课程路径检测
        let url = REST_URL_QINGCHENG_LOCALFILE_GET_FILELIST;
        let params = {dir: this.courseDirPath};
        App_Ajax_Get(this, url, params).then(function (data) {
          this.allFilesInCourseDir = data;
          if (this.allFilesInCourseDir.length > 0) {
            this.showCheckResult = true;
          } else {
            this.showCheckResult = false;
          }
        });
      }
    }
  }
</script>
<style scoped>
</style>
