<template>
  <div class="ui container fluid" style="margin: 0px; padding: 0px;">
    <div class="title" @click="openMaterialFile(m,false)"
         style="cursor: pointer; background-color: whitesmoke; padding: 0px;margin: 0px;">
      <div class="ui secondary  menu" style="cursor: pointer; margin-left:-10px; margin-right:-14px;font-size: medium;">
        <div class="item" style="margin-left: 0px; ">
          <i class="dropdown icon " :class="[iconSize,c]"></i>
        </div>
        <div class="item">
          <i class="ui file pdf outline icon " :class="[iconSize,c]"></i> {{m.fileName}}
        </div>
        <div class="right menu">
          <a class="ui item" @click.stop.prevent="openMaterialFile(m,true)">
            <i class="ui clone icon " :class="[iconSize,c]"></i> 全屏阅读
          </a>
        </div>
      </div>
    </div>
    <div class="content" style="padding: 0px; margin:0px;margin-top: -4px; overflow: hidden;">
      <div class="panel panel-default" style="margin: 0px; overflow: hidden;">
        <div class="panel-body" style=" padding:0px;margin: 0px;background-color: whitesmoke; overflow: hidden;" >
          <div id="css_pdf_js_view" v-if="m.shouldDisplay" class="embed-responsive embed-responsive-16by9"
             style=" overflow: hidden;" >
            <iframe class="embed-responsive-item" src="/libs/pdfjs/web/viewer.html" style=" overflow: hidden;"></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import {PDFLAYER_CALLER} from "../PdfPlayer/PdfPlayerFullScreenCaller";
  import {js_compose_dfs_file_open_url} from "../../../common/AppRestUrlConstants";
  import {js_serviec_sematicDriver4DropDwon} from "../../../common/services/SematicDriver/SematicDriver";
  export default {
    props: {
      //参考材料
      m: {required: true},
      //主要颜色
      c: {required: true},

    },
    data () {
      return {
        iconSize: "large"
      }
    },
    created(){
      //this.setStyle();
    },
    updated(){

    },
    methods: {
      openMaterialFile(m, fullScreen){
        //打开文件
        PDFLAYER_CALLER(this.composeDfsFileOpenUrl(m.filePath), fullScreen);
        //显示引入
        m.shouldDisplay = true;
      },
      //打开文件流
      composeDfsFileOpenUrl(uri) {
        return js_compose_dfs_file_open_url(uri);
      },
    }
  }
</script>

<style scoped>
  #css_pdf_js_view{
    height: 560px;
    width:100%;
    overflow: hidden;
  }
</style>
