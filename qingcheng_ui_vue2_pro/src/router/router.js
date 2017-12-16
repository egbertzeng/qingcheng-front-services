import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/user/Login/Login.vue'
import Regist from '@/components/user/Regist/Regist.vue'
import Index from '@/components/user/Index/Index.vue'
import routerUrl from "../common/FrontRouterConstants";
import FirstScreenBody from '@/components/user/Index/Bodyer/FirstScreenBody'
import SearchScreenBodyForCategory from '@/components/user/Index/Bodyer/SearchScreenBodyForCategory'
import SearchScreenBodyForKey from '@/components/user/Index/Bodyer/SearchScreenBodyForKey'
import UserFavoriteCourse from '@/components/user/Index/Bodyer/UserFavoriteCourse'
import AppTeachers from '@/components/user/Index/Bodyer/AppTeachersBody'
import AppMatesBody from '@/components/user/Index/Bodyer/AppMatesBody.vue'
import CourseDetailTemplate from '@/components/common/basicTemplate/CourseDetailTemplate.vue'
import AppOrderMain from '@/components/user/Index/Bodyer/AppOrderMain.vue'
import CourseFollowerNumberOrder from '@/components/user/Index/Bodyer/CourseFollowerNumberOrder'
import TeacherFollowerNuberOrder from '@/components/user/Index/Bodyer/TeacherFollowerNuberOrder.vue'
import StudentFollowerNuberOrder from '@/components/user/Index/Bodyer/StudentFollowerNuberOrder.vue'
import StudentCourseFollowNuberOrder from '@/components/user/Index/Bodyer/StudentCourseFollowNuberOrder.vue'
import TeacherCoursePublishNuberOrder from '@/components/user/Index/Bodyer/TeacherCoursePublishNuberOrder.vue'
import UserHistoryCourse from '@/components/user/Index/Bodyer/UserHistoryCourse'
import About from '@/components/user/Index/Footer/about/About'
import AdminFilter from '@/components/admin/AdminFilter'
import AdminMain from '@/components/admin/AdminMain/AdminMain'
import Monitor from '@/components/admin/AdminMain/Monitor/Monitor'
import Course from '@/components/admin/AdminMain/Course/CourseCreate'
import CourseManager from '@/components/admin/AdminMain/Course/CourseManager'
import StudentManager from '@/components/admin/AdminMain/User/StudentManager'
import TeacherManager from '@/components/admin/AdminMain/User/TeacherManager'
import CourseMate  from '@/components/common/basicTemplate/modals/CourseMate/CourseMate'
import PdfPlayerFullScreen  from '@/components/common/PdfPlayer/PdfPlayerFullScreen'
import test  from '@/components/test/test.vue'
Vue.use(Router);

export default new Router({
  //HTML5 History 模式,说明参见：http://router.vuejs.org/zh-cn/essentials/history-mode.html
  mode: 'history',
  routes: [
    //测试组件
    // {path: routerUrl.path.root, component: Hello},
    //login组件
    {path: routerUrl.path.login, component: Login},
    //regist组件
    {path: routerUrl.path.regist, component: Regist},
    //index组件
    {path: routerUrl.path.root, redirect: routerUrl.path.index},
    //index组件
    {
      path: routerUrl.path.index,
      component: Index,
      // meta: {requireAuth: true,},
      children: [
        //首屏跳转
        {
          path: routerUrl.path.root,
          meta: {requireAuth: true,},
          component: FirstScreenBody
        },
        //首屏组件
        {
          path: routerUrl.path.firstScreenBody,
          meta: {requireAuth: true,},
          component: FirstScreenBody
        },
        //根据category搜索结果展现组件
        {
          path: routerUrl.path.indexCategory,
          name: routerUrl.name.indexCategory,
          meta: {requireAuth: true,},
          component: SearchScreenBodyForCategory
        },
        //根据searchKey搜索结果展现组件
        {
          path: routerUrl.path.searchScreenBodyForKey,
          name: routerUrl.name.searchScreenBodyForKey,
          meta: {requireAuth: true,},
          component: SearchScreenBodyForKey
        },
        //根据用户的email获取他所关注的课程
        {
          path: routerUrl.path.userFavoriteCourse,
          name: routerUrl.name.userFavoriteCourse,
          meta: {requireAuth: true,},
          component: UserFavoriteCourse
        },
        //根据用户的email获取他的浏览记录
        {
          path: routerUrl.path.userHistoryCourse,
          name: routerUrl.name.userHistoryCourse,
          meta: {requireAuth: true,},
          component: UserHistoryCourse
        },
        //根据用户的email获取他所关注的教师
        {
          path: routerUrl.path.AppTeachers,
          name: routerUrl.name.AppTeachers,
          meta: {requireAuth: true,},
          component: AppTeachers
        },
        //根据用户的email获取他所关注的学友
        {
          path: routerUrl.path.AppMatesBody,
          name: routerUrl.name.AppMatesBody,
          meta: {requireAuth: true,},
          component: AppMatesBody
        },
        //课程详情页
        {
          path: routerUrl.path.CourseDetailTemplate,
          name: routerUrl.name.CourseDetailTemplate,
          meta: {requireAuth: true,},
          component: CourseDetailTemplate
        },
        //排行榜，学生在粉丝数量上的排行榜
        {
          path: routerUrl.path.AppOrderMain,
          name: routerUrl.name.AppOrderMain,
          meta: {requireAuth: true,},
          component: AppOrderMain,
          children: [
            //首屏跳转
            {
              path: routerUrl.path.root,
              meta: {requireAuth: true,},
              component: CourseFollowerNumberOrder
            },
            //排行榜，课程在粉丝数量上的排行榜
            {
              path: routerUrl.path.CourseFollowerNumberOrder,
              name: routerUrl.name.CourseFollowerNumberOrder,
              meta: {requireAuth: true,},
              component: CourseFollowerNumberOrder
            },
            //排行榜，老师在粉丝数量上的排行榜
            {
              path: routerUrl.path.TeacherFollowerNuberOrder,
              name: routerUrl.name.TeacherFollowerNuberOrder,
              meta: {requireAuth: true,},
              component: TeacherFollowerNuberOrder,

            },
            //排行榜，学生在粉丝数量上的排行榜
            {
              path: routerUrl.path.StudentFollowerNuberOrder,
              name: routerUrl.name.StudentFollowerNuberOrder,
              meta: {requireAuth: true,},
              component: StudentFollowerNuberOrder
            },
            //排行榜，学生在关注量上的排行榜
            {
              path: routerUrl.path.StudentCourseFollowNuberOrder,
              name: routerUrl.name.StudentCourseFollowNuberOrder,
              meta: {requireAuth: true,},
              component: StudentCourseFollowNuberOrder
            },
            //排行榜，老师在发布量上的排行榜
            {
              path: routerUrl.path.TeacherCoursePublishNuberOrder,
              name: routerUrl.name.TeacherCoursePublishNuberOrder,
              meta: {requireAuth: true,},
              component: TeacherCoursePublishNuberOrder
            },
          ]
        },


      ],
    },
    //课程学友组件
    {
      path: routerUrl.path.userCourseMate,
      name: routerUrl.name.userCourseMate,
      meta: {requireAuth: true,},
      component: CourseMate
    },
    //adminFilter组件
    {
      path: routerUrl.path.adminFilter,
      name: routerUrl.name.adminFilter,
      meta: {requireAuth: true,},
      component: AdminFilter
    },
    //adminMain组件
    {
      path: routerUrl.path.adminMain,
      name: routerUrl.name.adminMain,
      meta: {requireAuth: true,},
      component: AdminMain,
      children: [
        //系统监控跳转
        {
          path: routerUrl.path.blank,
          meta: {requireAuth: true,},
          component: TeacherManager,
        },
        //教师管理
        {
          path: routerUrl.path.TeacherManager,
          meta: {requireAuth: true,},
          component: TeacherManager,
        },
        //学员管理
        {
          path: routerUrl.path.StudentManager,
          meta: {requireAuth: true,},
          component: StudentManager,
        },
        //课程管理
        {
          path: routerUrl.path.adminCourseManager,
          meta: {requireAuth: true,},
          component: CourseManager,
        },
        //课程制作
        {
          path: routerUrl.path.adminCourseCreate,
          meta: {requireAuth: true,},
          component: Course,
        },
        //系统监控
        {
          path: routerUrl.path.adminMainMonitor,
          meta: {requireAuth: true,},
          component: Monitor,
        },
      ],
    },
    //PDF显示组件
    {
      path: routerUrl.path.test,
      name: routerUrl.name.test,
      component: test
    },
    //PDF显示组件
    {
      path: routerUrl.path.PdfPlayerFullScreen,
      name: routerUrl.name.PdfPlayerFullScreen,
      component: PdfPlayerFullScreen
    },
    //about组件
    {
      path: routerUrl.path.about,
      name: routerUrl.name.about,
      component: About
    },
  ]
})
