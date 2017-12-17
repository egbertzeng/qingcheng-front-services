<template>
  <div id="modalForFlowPlayer" style="margin-top: 2% ;padding-top: 1%" class="modal fade bs-example-modal-lg"
       data-backdrop="static"
       data-keyboard="false" tabindex="-1" role="dialog"
       aria-labelledby="gridSystemModalLabel">
    <div class="modal-dialog" style="padding-top: 4%;" :style="[{width:bestModalWidth}]" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">&times;</span></button>
          <div class="modal-title " id="gridSystemModalLabel" >
            <img v-if="currentVideo.filePoster!=undefined" class="ui avatar image"
                 :src="composeDfsFileOpenUrl(currentVideo.filePoster)"
                 style="cursor: pointer;"
            alt="查看课程详情">
            <span>{{currentPlayingCourseName}}:{{currentPlayingVideoName}}</span>
          </div>
        </div>
        <div class="modal-body" style="padding-top: 9px;">
          <div class="ui two column centered grid">
            <!--播放器-->
            <div id="APP_MY_FLOWPLAYER_HTML_ID" href="#" class="ten wide column"
                 style="cursor: pointer;margin: 0;padding:0;display:block;width:100%;height:460px;background-color: black; z-index: 9999">
            </div>
            <!--播放列表-->
            <ul class="six wide column ui items"
                style="  margin-top: 0px;padding:0px;display:block;width:100%;height:460px;overflow-x:hidden;overflow-y: auto ;background-color: darkgrey;">
              <li class="fluid item flowplayer-play-item" v-for="(e,i) of videoFiles"
                  :style="[{backgroundColor:e.bgColor}]"
                  @click="clickCoursePlaylistPlay(e,i)" style="cursor:pointer;margin:4px 2px 4px 0px; height: auto;">
                <div class="blurring dimmable small image">
                  <div class="ui dimmer">
                    <div class="content">
                      <div class="center">
                        <i class="inverted video play outline icon"
                           :class="[currentPlayingCourseNameLabelColor,playIconSize]"></i>
                      </div>
                    </div>
                  </div>
                  <img v-if="videoFiles.length>0" :src="composeDfsFileOpenUrl(e.filePoster)"/>
                </div>
                <div class="middle aligned content" style="float: left;padding-left: 4px;">
                  <strong style="color: black;">
                    <i class="film icon" :class="[currentPlayingCourseNameLabelColor]"></i>
                    <span style="font-size:medium">
                      {{e.fileName}}
                    </span>
                  </strong>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
  </div><!-- /.modal -->
</template>
<script type="text/javascript">
  import {
    REST_URL_VIDEO_LIST_ONE_COURSE_REST_URL,
    REST_URL_COURSE_FILE_OPNE_REST_URL,
    js_compose_dfs_file_open_url
  } from "../../../../../common/AppRestUrlConstants";
  import {App_Ajax_Get} from "../../../../../common/AppVueResourceApi";
  import {App_Random_Color} from "../../../../../common/AppColorConstants";
  import routerUrl from "../../../../../common/FrontRouterConstants";
  import {js_AppFlowPlayer_Modal_hide} from "./FlowPlayerProCaller";
  import {js_CourseDetailModal_show} from "../CourseDetail/CourseDetailCaller";
  import {js_goToCourseDetail} from "../../../../../common/services/router/AppRouterUtil";
  export default {
    created(){
      $('.flowplayer-play-item .image').dimmer({on: 'hover'});
    },
    updated(){
      $('.flowplayer-play-item  .image').dimmer({on: 'hover'});
    },
    watch: {
      '$store.state.currtentFocusCourse4Player': 'fentchVideoPlayListByCourseUrl'
    },
    data () {
      return {
        playIconSize: "large",
        bestModalWidth: "1000px",
        currtentPlayingCourse: "",
        //正在播放
        currentPlayingCourseNameLabelColor: App_Random_Color(),
        currentPlayingCourseName: "",
        currentPlayingVideoName: "",
        currentVideo: "",
        videoFiles: [],
        //必要的常量
        playlistDefaultColor: "#dcdcdc",
        playlistVideoIndexPrefix4Html: "playlistVideoIndexPrefix_",
        currentSystemTime: new Date(),
        //当前用户收藏的课程
        userFavoriteCourse: [],
        currtentcourseIsInFavorite: false,
        favoriteIconColor: "",
      }
    },
    methods: {
      /**
       * 获取需要播放的课程
       */
      fentchVideoPlayListByCourseUrl(){
        this.currtentPlayingCourse = this.$store.state.currtentFocusCourse4Player;
        if (this.currtentPlayingCourse != "") {
          this.getVideoPlayListByCourseUrl(this.currtentPlayingCourse);
        }
      },
      //此方法用于，点击播放列表所要做的操作
      clickCoursePlaylistPlay(e, index) {
        //设置播放列表的背景颜色
        this.setPlayingBgColor(index);
        //播放列表按钮点击效果,播放视频文件
        this.currentVideo = e;
        this.currentPlayingVideoName = e.fileName;
        //2.播放视频文件
        this.flowPlayterCaller(e.fileUrl, true);
      },
      flowPlayterCaller(uri, autoPlay) {
        let url = REST_URL_COURSE_FILE_OPNE_REST_URL + uri;
        this.trigerFlowplayer("", "APP_MY_FLOWPLAYER_HTML_ID", url, autoPlay);
      },

      composeDfsFileOpenUrl(uri) {
        return js_compose_dfs_file_open_url(uri);
      },
      setPlayingBgColor (i0) {
        if (this.videoFiles != null) {
          for (let i = 0; i < this.videoFiles.length; i++) {
            if (i === i0) {
              this.videoFiles[i].bgColor = this.currentPlayingCourseNameLabelColor;
            } else {
              this.videoFiles[i].bgColor = this.playlistDefaultColor;
            }
          }
        }
      },
      setBestModalWidth(){
        let maxVideoNameLenght = 0;
        for (let i = 0; i < this.videoFiles.length; i++) {
          let l = this.videoFiles[i].fileName.length;
          maxVideoNameLenght = (maxVideoNameLenght > l) ? maxVideoNameLenght : l;
        }
        if (maxVideoNameLenght > 0 && maxVideoNameLenght <= 25) {
          this.bestModalWidth = "1200px";
        } else if (maxVideoNameLenght > 25 && maxVideoNameLenght <= 30) {
          this.bestModalWidth = "1240px";
        } else {
          this.bestModalWidth = "1280px";
        }
      },

      trigerFlowplayer(scritpsrc, htmlid, videourl, autoplay) {
        //1.初始player
        let id = htmlid;
        let url = videourl;
        let swfp = "/libs/flowplayer-build/build/flowplayer.commercial.swf";
        //2.解析URL
        url = encodeURI(url);
        url = encodeURI(url);
        //3.配置项
        let properties = {
          clip: {
            autoPlay: autoplay,       //是否自动播放，默认true
            autoBuffering: true,    //是否自动缓冲视频，默认true
            url: url,
            volume: 100,
            live: false,
            isFlashVideo: false,
            isMidroll: false,
            fadeInSpeed: 5,
            fadeOutSpeed: 5,
            isPostroll: true,
            isPreroll: true,
            seekableOnBegin: true,
            smoothing: true,
            startDispatched: true,
          },
          plugins: {
            dock: {
              display: 'none',
              left: 10,
              top: 170,
              height: 59,
              autoHide: false,
              overColor: '#'
            },
            controls: {
              playlist: false,
              backgroundGradient: 'none',
              //backgroundColor: 'transparent',
              scrubber: true,
              mute: true,
              height: 25,
              tooltips: {
                buttons: true,
                play: '播放',
                fullscreen: '全屏',
                fullscreenExit: '退出全屏',
                pause: '暂停',
                mute: '静音',
                unmute: '取消静音'
              }
            }
          },
          play: {//调节播放按钮的属性
            label: "",
            replayLabel: "",
            width: 100,
            height: 100,
          }
        };
        //4.播放视频
        let player = $f(id, swfp, properties).setVolume(100).play();
      },
      getVideoPlayListByCourseUrl(e){
        let url = REST_URL_VIDEO_LIST_ONE_COURSE_REST_URL;
        let params = {dirPath: e.courseUrl};
        App_Ajax_Get(this, url, params).then(function (data) {
          this.videoFiles = data;
          if (this.videoFiles.length <= 0) {
            alert("系统错误！请联系管理员！")
            return;
          }
          //设置正在播放的颜色
          this.currentPlayingCourseNameLabelColor = App_Random_Color();
          //设置选中颜色
          this.setPlayingBgColor(0);
          //设置当前要播放的视频
          this.currentVideo = this.videoFiles[0];
          //设置合适的宽度
          this.setBestModalWidth();
          //设置CourseName
          this.currentPlayingCourseName = e.courseName;
          //设置fileName
          if (this.videoFiles != null) {
            if (this.videoFiles.length >= 1) {
              this.currentPlayingVideoName = this.videoFiles[0].fileName;
              //播放第一个视频
              this.flowPlayterCaller(this.videoFiles[0].fileUrl, false);
            }
          }
        });
      },

    }
  }
</script>
<style scoped>

</style>
