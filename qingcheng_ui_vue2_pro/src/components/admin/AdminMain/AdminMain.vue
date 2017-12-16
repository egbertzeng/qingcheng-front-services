<template>
  <div class="ui fluid container">

    <div class="ui  big inverted segment">
      <div class="ui  big inverted secondary pointing menu">
        <a v-for="(e,i) in menuItems" class="item" :class="[e.active]" @click="menuItemClick(e)">
          <i class=" big icon" :class="[e.icon,e.iconColor]"></i> {{e.name}}
        </a>


        <a @click="goHomeClick()" class="right item">
          <i class=" big home icon" :class="goHomeIconColor"></i> 返回主页
        </a>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/javascript">
  import routerUrl from "../../../common/FrontRouterConstants";
  import {App_Random_Color} from "../../../common/AppColorConstants";

  export default {
    data () {
      return {
        //菜单项
        menuItemIconSize: "massive",
        menuItems: [
          {
            name: "教师管理",
            route: routerUrl.path.TeacherManager,
            icon: "spy",
            iconColor: App_Random_Color(),
            iconSize: this.menuItemIconSize,
            active: "active"
          },
          {
            name: "学员管理",
            route: routerUrl.path.StudentManager,
            icon: "user",
            iconColor: App_Random_Color(),
            iconSize: this.menuItemIconSize,
            active: ""
          },
          {
            name: "课程管理",
            route: routerUrl.path.adminCourseManager,
            icon: "edit",
            iconColor: App_Random_Color(),
            iconSize: this.menuItemIconSize,
            active: ""
          },
          {
            name: "课程制作",
            route: routerUrl.path.adminCourseCreate,
            icon: "book",
            iconColor: App_Random_Color(),
            iconSize: this.menuItemIconSize,
            active: ""
          },
          /*          {
           name: "集群监控",
           route: routerUrl.path.adminMainMonitor,
           icon: "laptop",
           iconColor: App_Random_Color(),
           iconSize: this.menuItemIconSize,
           active: "active"
           },*/


        ],
        goHomeIconColor: App_Random_Color(),
      }
    }
    ,
    methods: {
      //返回主页
      goHomeClick(){
        this.$router.push(routerUrl.path.index);
      },
      //点击菜单项
      menuItemClick(e){
        this.setMenuStyle(e);
        //路由规则
        this.gotoWichComponent(e);
      },
      gotoWichComponent(e){
        this.$router.push(e.route);
      },
      //设置菜单项的激活状态
      setMenuStyle(e){
        for (let i = 0; i < this.menuItems.length; i++) {
          if (e == this.menuItems[i]) {
            this.menuItems[i].active = "active";
          } else {
            this.menuItems[i].active = "";
          }
        }
      }
      ,
    }
  }
</script>

<style scoped>
</style>
