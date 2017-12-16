/**
 * Created by liguohua on 2017/5/20.
 */
export let App_Displayer_Props = {

  /**
   * common属性
   */
  //要显示的课程
  choiceCourse: {required: true},
  //课程的标题
  choiceCourseLabelText: {required: true},
  //主颜色
  choiceCourseColor: {required: true},
  //每行显示多少列
  choiceCourseColumnNum: {required: true},
  //主icon
  choiceCourseIcon: {required: true},
  //icon大小
  choiceCourseIconSize: {required: true},
  //头部的标签大小
  choiceCourseLabelSize: {required: true},
  //显示子标题
  choiceCourseShowSubTitle: {required: true},
  //显示描述
  choiceCourseShowDescription: {required: true},
  //显示按钮
  choiceCourseShowButtons: {required: true},
  //显示右上角的标签
  choiceCourseShowCornerLabel: {required: true},
  //显示播放量
  choiceCourseShowPlayTimes: {required: true},
  //显示推荐值
  choiceCourseShowRecommendValue: {required: true},
  //控制是否启用折叠菜单
  needUpdateSetStyle: {default: false},

}
export let App_Displayer_Name_CV001 = "cardVersion001";
export let App_Displayer_Name_TV001 = "tableVersion001";
export let App_Displayer_Name_TV002 = "tableVersion002";
