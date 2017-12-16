#!/bin/bash
#########################################
#author: liguohua
#email : liguohua@cloud-star.com.cn
#date  : 2017.08.22
#此文件会被Jenkins自动调用，用于控制整个服务编排的流程
# ./build_push_deploy_jenkins_k8s_402.sh -dev bigdata005
#########################################
echo "please execute this script like: ./build_push_deploy_jenkins_k8s_402.sh.sh activeEnv k8sMaster "
_DEV_ENV_NAME='-dev'
_PROD_ENV_NAME='-prod'
#当前激活的总环境
_curent_active_env=$1
_need_clear_docker_image=false
#一、定义相关变量
#1.需要改动的变量

_private_docker_registry_uri=10.99.21.26:5000
_project_name=telecomapistore-frontend-services
_module_names=(
#                telecomapistore-portal-service
#                 marketing-portal-service
#                admin-portal-service
#                propaganda-portal-service
#                admin-portal-ng4-service
#a-lgh-vue-test001
#a-lgh-ng-test001
#a-lgh-ng4-test002
#test-ng-portal-service
              )
_k8s_config_host=$2
_k8s_config_port=8080
_k8s_config_suffix=.yaml
_k8s_inteval_time=5s

####################################################
####################################################
####################################################
#2.无需改动的变量
_pwd=$PWD
_project_root_path=$_pwd
_docker_compose_root_path=$_pwd/docker
_dockerfile_generator_path=$_pwd/deployment/shell/SedExecute.sh
_dockerfile_template_path=$_pwd/deployment/templates/Dockerfile
_dockerConf_template_path=$_pwd/deployment/templates/_docker
newLineSlash="################################################################################################################"
echo $newLineSlash
echo "PRESS(a or A)SWITCH AUTO MODE:automatic execute all commands "
auto='a'
flag='a'
function autoAction() {
    if [ "$auto" != "a" -a "$auto" != "A" ] ; then
        echo $newLineSlash
        echo $1
        read flag
    fi
}
#3.对每个module进行相关操作
#only dev enviroment needs build docker image
#if [ "$_curent_active_env" -eq "$_DEV_ENV_NAME" ]; then
    for _module_name in ${_module_names[@]};do
        #4.module相关的变量
        _module_root_path=$_pwd/$_module_name
        _docker_image_name=$_project_name/$_module_name
        _docker_image_full_name=$_private_docker_registry_uri/$_docker_image_name

        #二、进行项目编译

        #1.根据模板，重新生成Dockerfile
        msg="======1: generator docker file: $_module_name/Dockerfile"
        echo $msg
        _dockerfile_dist_path=$_module_root_path/Dockerfile
        sh $_dockerfile_generator_path  $_module_name  $_dockerfile_template_path $_dockerfile_dist_path
        cp -r $_dockerConf_template_path $_module_root_path


        #1.npm build
        autoAction "PRESS(s or S) SKIP: npm build : $_module_name"
        msg="=======1.skip npm build : $_module_name======="
        if [ "$flag" = "s" -o "$flag" = "S" ] ; then
           echo $msg
        else
           echo $msg
           cd $_module_root_path
           #重新安装软件包，更新到最新依赖
           cnpm install
           #根据不同的环境切换不同的编译方式
           if [ "$_curent_active_env" = "$_DEV_ENV_NAME" ];then
                   msg="=======npm run build_k8s_dev======="
                   echo $msg
                   npm run build_k8s_dev
           elif [ "$_curent_active_env" = "$_PROD_ENV_NAME" ];then
                   msg="=======npm run build_k8s_prod======="
                   echo $msg
                   npm run build_k8s_prod
           else
                   msg="=======please check your enviroment======="
                   echo $msg
           fi
        fi
        #2.docker build
        autoAction "PRESS(s or S) SKIP: docker build : $_module_name"
        msg="=======2.skip docker build : $_module_name======="
        if [ "$flag" = "s" -o "$flag" = "S" ] ; then
            echo $msg
        else
            echo $msg
            cd $_module_root_path
            docker build -t $_docker_image_full_name .
        fi

        #3.docker push
        autoAction "PRESS(s or S) SKIP: docker push : $_module_name"
        msg="=======3.skip docker push : $_module_name======="
        if [ "$flag" = "s" -o "$flag" = "S" ] ; then
            echo $msg
        else
            echo $msg
            docker push $_docker_image_full_name
        fi
        echo "=======4.docker push $_docker_image_full_name finished!======="
         #4.删除集群中原有的服务
        _module_k8s_deployment_yaml_file=$_module_name$_curent_active_env$_k8s_config_suffix
        _module_module_k8s_deployment_yaml_file_path=$_pwd/$_module_name/$_module_k8s_deployment_yaml_file
        msg="=======5.kubectl delete -s : $_k8s_config_host:$_k8s_config_port -f $_module_module_k8s_deployment_yaml_file_path ======="
        echo $msg
        kubectl delete -s $_k8s_config_host:$_k8s_config_port -f $_module_module_k8s_deployment_yaml_file_path
        #5.等待k8s彻底杀死服务
        sleep $_k8s_inteval_time
        #6.对每个module中的服务在k8s中进行部署
        msg="=======6.kubectl create -s : $_k8s_config_host:$_k8s_config_port -f $_module_module_k8s_deployment_yaml_file_path ======="
        echo $msg
        kubectl create -s $_k8s_config_host:$_k8s_config_port -f $_module_module_k8s_deployment_yaml_file_path
    done
    echo "=======project push $_project_name finished!======="
    #7.清除多余docker镜像
    if [ $_need_clear_docker_image == 'true' ]; then
        #删除所有已经停止的容器
        docker rm $(docker ps -a -q)
        #删除所有\'untagged/dangling\' ()状态的镜像
        docker rmi $(docker images -q -f dangling=true)
        #删除没有使用的镜像
        docker rmi -f $(docker images | grep "<none>" | awk "{print \$3}")
    fi
#fi

