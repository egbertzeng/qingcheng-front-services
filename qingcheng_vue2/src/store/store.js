/**
 * Created by liguohua on 2017/5/1.
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    //搜索关键字状态
    searchKey: "",
    //类别信息状态
    searchCategory: "",
    //关注的课程
    currtentFocusCourse4Player: "",
    currtentFocusCourse4Teacher: "",
    currtentFocusCourse4Student: "",
    currtentFocusCourse4Material: "",
    currtentFocusCourse4Detail: "",
    currtentFocusStudent4Detail: "",
    //用户关注的课程
    userFavoriteCourse: [],
    //当前关注的教师
    currtentFocusTeacher: "",
    //是否要查询全体老师
    isAllTeacher: false,
    //时间戳，用于通用的监听变化
    timestamp: "",
    //时间戳，用于监听关注的用户变化
    timestamp4FavoriteUser: "",
    //时间戳，用于监听关注的课程变化
    timestamp4Favorite: "",
    //用于实时监听所关注学友的变化
    timestamp4AppMatesBody: "",
    //当前打开的pdf文件路径
    currtentPdfFileUri:"",
    fromRouter: "",
    searchResultIsNull: false,
    //测试数据
    count: 0,
  },
  mutations: {
    //测试数据
    inc: state => state.count++,
    dec: state => state.count--,
  }
});
