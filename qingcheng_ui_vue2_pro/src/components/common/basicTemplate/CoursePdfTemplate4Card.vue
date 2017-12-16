<template>
  <div class="ui fluid card" @click.stop.prevent="openMaterialFile(m,true)" style="cursor: pointer;">
    <div class="content">
      <i class="ui file pdf outline icon " :class="[iconSize,c]"></i>
      {{m.fileName}}
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
      needUpdateSetStyle: {default: false},
      iconSize:{default: "big"},
    },
    data () {
      return {

      }
    },
    created(){
      this.setStyle();
    },
    updated(){
      this.setStyle();
    },
    methods: {
      openMaterialFile(m, fullScreen){
        this.setStyle();
        //打开文件
        PDFLAYER_CALLER(this.composeDfsFileOpenUrl(m.filePath), fullScreen);
        //显示引入
        m.shouldDisplay = true;
      },
      //打开文件流
      composeDfsFileOpenUrl(uri) {
        return js_compose_dfs_file_open_url(uri);
      },
      setStyle(){
        if (this.needUpdateSetStyle) {
          js_serviec_sematicDriver4DropDwon();
        }
      },
    }
  }
</script>

<style scoped>
</style>
