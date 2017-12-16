/**
 * Created by liguohua on 2017/5/28.
 */
export function PDFLAYER_CALLER(url,fullScreen) {
  /*
   此处没有办法定义全局变量，要和/libs/pdfjs/web/viewer.js中的保持一致
   let DEFAULT_URL = window.sessionStorage.getItem("APP_CURRENT_PDF_FILE_PATH");
   */
  window.sessionStorage.setItem("APP_CURRENT_PDF_FILE_PATH", url);
  if(fullScreen){
    /*
     打开显示pdf文件的模板
     */
    window.open("/libs/pdfjs/web/viewer.html");
  }
}

