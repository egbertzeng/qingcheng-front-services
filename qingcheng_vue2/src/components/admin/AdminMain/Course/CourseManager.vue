<template>
  <div class="ui fluid container">

    <!--课程信息展示区域-->
    <table class="ui  unstackable compact sortable  striped selectable celled table">
      <thead>
      <tr>
        <th>序号</th>
        <th @click="sortbyCourseName()" title="courseName">课程名称</th>
        <th @click="sortbyCourseUrl()" title="courseUrl">课程路径</th>
        <th @click="sortbyOnline()" title="courseOnLine">上线</th>
        <th @click="sortbyLoop()" title="courseIsRecommendedForLoop">轮播</th>
        <th @click="sortbyCourseIsRecommended()" title="courseIsRecommended">推荐</th>
        <th @click="sortbyRecommandStar()" title="courseRecommendStart">推荐值</th>
        <th @click="sortbyPlayTimes()" title="coursePlayTimes">播放量</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(e,i) in allCourse4Admin">
        <td>{{i+1}}</td>
        <td @click="goToCourseDetail(e)" style="cursor: pointer;">
          <img v-if="e.coursePosterUrl!=undefined" class="ui avatar  image"
               :src="composeDfsFileOpenUrl(e.coursePosterUrl)">
          {{e.courseName}}
        </td>
        <td>{{e.courseUrl}}</td>
        <td v-if="e.courseOnLine"><i class="smile icon" :class="[appGreenColor]"></i>{{e.courseOnLine}}</td>
        <td v-if="!e.courseOnLine"><i class="frown icon" :class="[appRedColor]"></i>{{e.courseOnLine}}</td>
        <td v-if="e.courseIsRecommendedForLoop"><i class="smile icon" :class="[appGreenColor]"></i>{{e.courseIsRecommendedForLoop}}
        </td>
        <td v-if="!e.courseIsRecommendedForLoop"><i class="frown icon" :class="[appRedColor]"></i>{{e.courseIsRecommendedForLoop}}
        </td>
        <td v-if="e.courseIsRecommended"><i class="smile icon" :class="[appGreenColor]"></i>{{e.courseIsRecommended}}
        </td>
        <td v-if="!e.courseIsRecommended"><i class="frown icon" :class="[appRedColor]"></i>{{e.courseIsRecommended}}
        </td>
        <td>{{e.courseRecommendStart}}</td>
        <td>{{e.coursePlayTimes}}</td>
        <td>
          <div class="ui small compact basic icon buttons">
            <!--查看课程的详细信息-->
            <button title="查看课程" @click="getCourseDetailInfo(e)" class="ui button"><i class="info circle icon"></i>
            </button>
            <!--查看课程的详细信息（new）-->
            <button title="查看课程" @click="getCourseDetailInfo2(e)" class="ui button"><i
              class="unlock alternate icon"></i>
            </button>
            <!--观看课程-->
            <button title="观看课程" @click="getVideosIncourse(e)" class="ui button"><i class="unhide icon"></i></button>
            <!--修改课程的信息-->
            <button title="修改课程" @click="editCourseDetailInfo(e)" class="ui button"><i class="edit icon"></i></button>
            <!--移动课程-->
            <button title="移动课程" @click="moveCoures(e)" class="ui button"><i class="send outline icon"></i></button>
          </div>
        </td>
      </tr>
      </tbody>
      <!--TODO 分页显示需要开发-->
      <tfoot v-if="todo_page_show">
      <tr>
        <th colspan="8">
          <div class="ui right floated pagination menu">
            <a class="icon item">
              <i class="left chevron icon"></i>
            </a>
            <a class="item">1</a>
            <a class="item">2</a>
            <a class="item">3</a>
            <a class="item">4</a>
            <a class="icon item">
              <i class="right chevron icon"></i>
            </a>
          </div>
        </th>
      </tr>
      </tfoot>
    </table>

    <!--课程详细信息摸态框-->
    <div id="courseDetailInfoModal" class="modal fade bs-example-modal-lg" data-backdrop="static" data-keyboard="false"
         tabindex="-1" role="dialog"
         aria-labelledby="myLargeModalLabel">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
              aria-hidden="true">&times;</span></button>
            <span class="modal-title" id="myModalLabel">
              <i @click="getVideosIncourse(curruentCourse)" v-if="curruentCourse.courseOnLine" class="film  icon"
                 :class="[appTealColor]"
                 style="cursor: pointer;"></i>
              <i @click="getVideosIncourse(curruentCourse)" v-if="!curruentCourse.courseOnLine" class="film icon"
                 :class="[appRedColor]"
                 style="cursor: pointer;"></i>
              《{{curruentCourse.courseName}}》的课程详细信息如下：
            </span>
          </div>
          <div class="modal-body">
            <table class="ui striped  compact selectable celled table">
              <thead>
              <tr>
                <th>属性名</th>
                <th>属性值</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(value,key) in curruentCourse">
                <td>{{key}}</td>
                <td>
                  <div class="ui input focus">
                    {{value}}
                  </div>
                </td>
              </tr>
              </tbody>
              <tfoot>
              <tr>
                <th class=" right aligned " colspan="2">
                  <button @click="closeButtonOnCourseDetailModal()" class="ui  button">关闭</button>
                  <button @click="getVideosIncourse(curruentCourse)" class="ui button" :class="[appTealColor]">播放
                  </button>
                </th>
              </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
    <!--修改课程详细信息摸态框-->
    <div id="cousreEditModal" class="modal fade" data-backdrop="static" data-keyboard="false" tabindex="-1"
         role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button @click="editCourseDetailInfoCancle()" type="button" class="close" data-dismiss="modal"
                    aria-label="Close"><span
              aria-hidden="true">&times;</span></button>
            <span class="modal-title"><i
              class="ui edit icon" :class="[appTealColor]"></i>修改《{{curruentCourse.courseName}}》的课程信息</span>
          </div>
          <div class="modal-body">
            <form class="ui form">
              <div class="disabled  required field">
                <label>课程编号：courseID</label>
                <input v-model="curruentCourse.courseID" type="text" name="first-name">
              </div>
              <div class="two fields">
                <div class="disabled  required field">
                  <label>课程路径：courseUrl</label>
                  <input v-model="curruentCourse.courseUrl" type="text" name="first-name">
                </div>
                <div class="field">
                  <label>课程海报：coursePoster</label>
                  <input v-model="curruentCourse.coursePoster" type="text" name="first-name">
                </div>
              </div>
              <div class="two fields">
                <div class="required disabled field">
                  <label>播放次数：coursePlayTimes</label>
                  <input v-model="curruentCourse.coursePlayTimes" type="text" name="first-name">
                </div>
                <div class="required field">
                  <label>推荐星级：courseRecommendStart</label>
                  <input v-model="curruentCourse.courseRecommendStart" type="text" name="first-name">
                </div>
              </div>
              <div class="two fields">
                <div class="required field">
                  <label>课程名称：courseName</label>
                  <input v-model="curruentCourse.courseName" type="text" name="first-name">
                </div>
                <div class="required field">
                  <label>课程子名：courseSubName</label>
                  <input v-model="curruentCourse.courseSubName" type="text" name="first-name">
                </div>
              </div>
              <div class="required field">
                <label>课程描述：courseDescription</label>
                <textarea v-model="curruentCourse.courseDescription" rows="3"></textarea>
              </div>
              <div class="ui grid">
                <div @click.stop.prevent="courseOnLineCheck()" class="four wide column">
                  <label class="checkbox" for="checkbox1">
                    <input v-if="curruentCourse.courseOnLine" type="checkbox" data-toggle="checkbox" id="checkbox1"
                           required checked>
                    <input v-if="!curruentCourse.courseOnLine" type="checkbox" data-toggle="checkbox" id="checkbox1"
                           required>
                    是否在线
                  </label>
                </div>
                <div @click.stop.prevent="courseIsRecommendedForLoopCheck()" class="four wide column">
                  <label class="checkbox" for="checkbox3">
                    <input v-if="curruentCourse.courseIsRecommendedForLoop" type="checkbox" data-toggle="checkbox"
                           value="" id="checkbox3" checked required>
                    <input v-if="!curruentCourse.courseIsRecommendedForLoop" type="checkbox" data-toggle="checkbox"
                           value="" id="checkbox3" required>
                    是否轮播
                  </label>
                </div>
                <div @click.stop.prevent="courseIsRecommendedCheck()" class="four wide column">
                  <label class="checkbox" for="checkbox2">
                    <input v-if="curruentCourse.courseIsRecommended" type="checkbox" data-toggle="checkbox" value=""
                           id="checkbox2" checked required>
                    <input v-if="!curruentCourse.courseIsRecommended" type="checkbox" data-toggle="checkbox" value=""
                           id="checkbox2" required>
                    是否推荐
                  </label>

                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button @click="editCourseDetailInfoCancle()" data-dismiss="modal" class="ui grey button"> 取消</button>
            <button @click="editCourseDetailInfoSubmit()" class="ui button" :class="[appTealColor]">修改</button>
          </div>
        </div>
      </div>
    </div>

    <!--修改课程结果提示摸态框-->
    <div style="margin-top: 4%;" class="modal fade" id="editResultTipModal" data-backdrop="static" data-keyboard="false"
         tabindex="-1" role="dialog"
         aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
              aria-hidden="true">&times;</span></button>
            <span class="modal-title"><i :class="[editResultTip.icon]"></i>{{editResultTip.title}}</span>
          </div>
          <div class="modal-body">
            {{editResultTip.message}}
          </div>
          <div v-if="editResultTip.showbuttons" class="modal-footer">
            <button @click="editCoreseResultTipDetailClick()" class="ui button" :class="[appTealColor]">查看详情</button>
            <button @click="editCoreseResultTipPlayClick()" class="ui button" :class="[appTealColor]">播放课程</button>
          </div>
        </div>
      </div>
    </div>

    <!--移动课程摸态框-->
    <div class="modal fade" id="moveCourseModalTip" data-backdrop="static" data-keyboard="false" tabindex="-1"
         role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
              aria-hidden="true">&times;</span></button>
            <span class="modal-title">
              <i class="ui move icon " :class="[appTealColor]"></i>移动课程《{{curruentCourse.courseName}}》
            </span>
          </div>
          <div class="modal-body">
            <form class="ui form">
              <div class="disabled field">
                <label>课程名称：</label>
                <input type="text" v-model="curruentCourse.courseName"/>
              </div>
              <div class="disabled field">
                <label>课程原本路径：</label>
                <input type="text" v-model="curruentCourse.courseUrl"/>
              </div>
              <div class="field">
                <label>课程目的路径：</label>
                <input type="text" v-model="courseDistPath">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button class="ui button" data-dismiss="modal">关闭</button>
            <button @click="moveCourseSubmit()" class="ui button" :class="[appTealColor]">移动课程</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import {
    REST_URL_COURSE_ADMIN_ALL_LIST_REST_URL,
    REST_URL_COURSE_ADMIN_UPDATE_REST_URL, REST_URL_COURSE_ADMIN_DFS_RENAME_REST_URL,
    REST_URL_COURSE_ADMIN_DELETE_REST_URL, js_compose_dfs_file_open_url
  } from "../../../../common/AppRestUrlConstants";
  import {App_Ajax_Get, App_Ajax_Post} from "../../../../common/AppVueResourceApi";
  import {js_AppFlowPlayer_Modal_show_new} from "../../../common/basicTemplate/modals/Flowplayer/FlowPlayerProCaller";
  import {App_Green_Color, App_Red_Color, App_Teal_Color} from "../../../../common/AppColorConstants";
  import {js_CourseDetailModal_show} from "../../../common/basicTemplate/modals/CourseDetail/CourseDetailCaller";

  export default {
    components: {},
    data () {
      return {
        curruentCourse: "",
        allCourse4Admin: [],
        allCourse4AdminSortFlag: false,
        todo_page_show: false,
        //修改结果提示
        editResultTip: {
          icon: "",
          title: "",
          message: "",
          showbuttons: true,
        },
        //移动课程的目标路径
        courseDistPath: "",
        appGreenColor: App_Green_Color(),
        appRedColor: App_Red_Color(),
        appTealColor: App_Teal_Color(),
      }
    },
    created(){
      this.getAllCourse4Admin();
    },
    mounted(){
    },
    updated(){
    },
    methods: {
      //播放课程
      getVideosIncourse(e){
        //状态设置
        js_AppFlowPlayer_Modal_show_new(this, e);
        this.showOrHideModal("hide");
      },
      //获取要管理的课程信息
      getAllCourse4Admin(){
        let url = REST_URL_COURSE_ADMIN_ALL_LIST_REST_URL;
        let params = {};
        App_Ajax_Get(this, url, params).then(function (data) {
          this.allCourse4Admin = data;
        });
      },
      //点击课程详细信息上的关闭按钮
      closeButtonOnCourseDetailModal(){
        this.showOrHideModal("hide");
      },
      //查看课程的详细信息
      getCourseDetailInfo(e){
        this.showOrHideModal("show");
        this.curruentCourse = e;
      },
      //查看课程的详细信息(new)
      getCourseDetailInfo2(e){
        this.goToCourseDetail(e);
      },
      //显示或隐藏课程详细信息的弹窗层
      showOrHideModal(action){
        $("#courseDetailInfoModal").modal(action);
      },
      //编辑课程详细信息
      editCourseDetailInfo(e){
        this.showOrHideEditCourseModal("show");
        this.curruentCourse = e;
      },
      //设置是否上线
      courseOnLineCheck(){
        this.curruentCourse.courseOnLine = !this.curruentCourse.courseOnLine;
      },
      //设置是否推荐
      courseIsRecommendedCheck(){
        this.curruentCourse.courseIsRecommended = !this.curruentCourse.courseIsRecommended;
      },
      //设置是否推荐
      courseIsRecommendedForLoopCheck(){
        this.curruentCourse.courseIsRecommendedForLoop = !this.curruentCourse.courseIsRecommendedForLoop;
      },
      //取消更新请求
      editCourseDetailInfoCancle(){
        this.getAllCourse4Admin();
      },
      //更新课程通用请求
      editCourseDetailInfoCommon(){
        let url = REST_URL_COURSE_ADMIN_UPDATE_REST_URL;
        let params = {
          courseID: this.curruentCourse.courseID,
          courseName: this.curruentCourse.courseName,
          courseSubName: this.curruentCourse.courseSubName,
          courseUrl: this.curruentCourse.courseUrl,
          courseDescription: this.curruentCourse.courseDescription,
          coursePoster: this.curruentCourse.coursePoster,
          courseOnLine: this.curruentCourse.courseOnLine,
          coursePlayTimes: this.curruentCourse.coursePlayTimes,
          courseIsRecommended: this.curruentCourse.courseIsRecommended,
          courseRecommendStart: this.curruentCourse.courseRecommendStart,
          courseIsRecommendedForLoop: this.curruentCourse.courseIsRecommendedForLoop,
          courseDescriptionShow: this.curruentCourse.courseDescriptionShow,
        };
        return App_Ajax_Post(this, url, params);
      },
      //修改成功后提示消息
      editCourseDetailInfoTipModalSet(res){
        //显示结果弹窗
        $("#editResultTipModal").modal("show");
        if (res.status == 200) {
          //设置样式
          this.editResultTip.showbuttons = true;
          this.editResultTip.icon = "ui big " + this.appGreenColor + " smile icon";
          this.editResultTip.title = "修改成功";
          this.editResultTip.message = "恭喜您，您的修改的《" + this.curruentCourse.courseName + "》已经保存成功！课程路径：" + this.curruentCourse.courseUrl;
          //刷新页面
          this.getAllCourse4Admin();
        } else {
          this.editResultTip.showbuttons = true;
          this.editResultTip.icon = "ui big " + this.appRedColor + " frown icon";
          this.editResultTip.title = "修改失败";
          this.editResultTip.message = "很抱歉，您的修改《" + this.curruentCourse.courseName + "》没能保存成功！课程路径：" + this.curruentCourse.courseUrl;
          //刷新页面
          this.getAllCourse4Admin();
        }
      },
      //提交更新请求
      editCourseDetailInfoSubmit(){
        this.editCourseDetailInfoCommon().then(function (res) {
          this.editCourseDetailInfoTipModalSet(res);
          //关闭修改弹窗
          this.showOrHideEditCourseModal("hide");
        });
      },
      //修改结果提示框中的播放按钮事件
      editCoreseResultTipPlayClick(){
        //关闭结果弹窗
        $("#editResultTipModal").modal("hide");
        //打开播放弹窗
        this.getVideosIncourse(this.curruentCourse);
      },
      //修改结果提示框中的播放按钮事件
      editCoreseResultTipDetailClick(){
        //关闭结果弹窗
        $("#editResultTipModal").modal("hide");
        this.getCourseDetailInfo(this.curruentCourse);
      },
      //显示或隐藏修改信息弹窗
      showOrHideEditCourseModal(action){
        $("#cousreEditModal").modal(action);
      },

      //移动课程，
      moveCoures(e){
        $("#moveCourseModalTip").modal("show");
        this.curruentCourse = e;
      },
      //提交移动课程
      moveCourseSubmit(){
        //0.弹窗设置
        this.editResultTip.showbuttons = false;
        $("#moveCourseModalTip").modal("hide");
        this.courseDistPath = this.courseDistPath.trim();
        //1.文件系统移动
        let params = {
          from: this.curruentCourse.courseUrl,
          to: this.courseDistPath,
        };
        App_Ajax_Post(this, REST_URL_COURSE_ADMIN_DFS_RENAME_REST_URL, params).then(function (res) {
          if (res.status == 200 && res.bodyText == "true") {
            //2.数据库移动
            this.curruentCourse.courseUrl = this.courseDistPath;
            this.curruentCourse.coursePosterUrl = this.courseDistPath + this.curruentCourse.coursePoster;
            this.editCourseDetailInfoCommon().then(function (res) {
              this.editCourseDetailInfoTipModalSet(res);
            });
          } else {
            //显示结果弹窗
            $("#editResultTipModal").modal("show");
            this.editResultTip.showbuttons = false;
            this.editResultTip.icon = "ui big " + this.appRedColor + " frown icon";
            this.editResultTip.title = "修改失败";
            this.editResultTip.message = "很抱歉，您的修改《" + this.curruentCourse.courseName + "》没能保存成功！课程路径：" + this.curruentCourse.courseUrl;
          }
        });
      },
      //查看课程详情
      goToCourseDetail(e){
        js_CourseDetailModal_show(this, e);
      },
      //打开文件流
      composeDfsFileOpenUrl(uri) {
        return js_compose_dfs_file_open_url(uri);
      },
      //根据是否是轮播进行排序
      sortbyLoop(){
        this.allCourse4AdminSortFlag = !(this.allCourse4AdminSortFlag);
        this.allCourse4Admin.sort((e1, e2) => {
          if (this.allCourse4AdminSortFlag) {
            return +(e1.courseIsRecommendedForLoop - e2.courseIsRecommendedForLoop);
          } else {
            return -(e1.courseIsRecommendedForLoop - e2.courseIsRecommendedForLoop);
          }
        });
      },
      //根据是否推荐进行排序
      sortbyCourseIsRecommended(){
        this.allCourse4AdminSortFlag = !(this.allCourse4AdminSortFlag);
        this.allCourse4Admin.sort((e1, e2) => {
          if (this.allCourse4AdminSortFlag) {
            return +(e1.courseIsRecommended - e2.courseIsRecommended );
          } else {
            return -(e1.courseIsRecommended - e2.courseIsRecommended );
          }
        });
      },
      //根据推荐值进行排序
      sortbyRecommandStar(){
        this.allCourse4AdminSortFlag = !(this.allCourse4AdminSortFlag);
        this.allCourse4Admin.sort((e1, e2) => {
          if (this.allCourse4AdminSortFlag) {
            return +(e1.courseRecommendStart - e2.courseRecommendStart);
          } else {
            return -(e1.courseRecommendStart - e2.courseRecommendStart);
          }
        });
      },
      //根据是否在线进行排序
      sortbyOnline(){
        this.allCourse4AdminSortFlag = !(this.allCourse4AdminSortFlag);
        this.allCourse4Admin.sort((e1, e2) => {
          if (this.allCourse4AdminSortFlag) {
            return +(e1.courseOnLine - e2.courseOnLine);
          } else {
            return -(e1.courseOnLine - e2.courseOnLine);
          }
        });
      },
      //根据播放量进行排序
      sortbyPlayTimes(){
        this.allCourse4AdminSortFlag = !(this.allCourse4AdminSortFlag);
        this.allCourse4Admin.sort((e1, e2) => {
          if (this.allCourse4AdminSortFlag) {
            return +(e1.coursePlayTimes - e2.ccoursePlayTimes);
          } else {
            return -(e1.coursePlayTimes - e2.coursePlayTimes);
          }
        });
      },
      //根据url进行排序
      sortbyCourseUrl(){
        this.allCourse4AdminSortFlag = !(this.allCourse4AdminSortFlag);
        this.allCourse4Admin.sort((e1, e2) => {
          if (this.allCourse4AdminSortFlag) {
            return +(e1.courseUrl - e2.ccourseUrl);
          } else {
            return -(e1.courseUrl - e2.courseUrl);
          }
        });
      },
      //根据课程名称
      sortbyCourseName(){
        this.allCourse4AdminSortFlag = !(this.allCourse4AdminSortFlag);
        this.allCourse4Admin.sort((e1, e2) => {
          if (this.allCourse4AdminSortFlag) {
            return +(e1.courseName - e2.ccourseName);
          } else {
            return -(e1.courseName - e2.courseName);
          }
        });
      },
    }
  }
</script>
<style scoped>
</style>
