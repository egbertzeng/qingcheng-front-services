#!/bin/bash
#########################################
#author: liguohua
#email : liguohua@cloud-star.com.cn
#date  : 2017.11.14
#此文件会被PM使用，用于产生新的项目
#########################################

#一、定义变量
#1.需要改动的变量
_local_backend_uri="localhost:8082"
_dev_backend_uri="10.99.22.23:8082"
_prod_backend_uri="10.99.21.23:8082"
_private_docker_registry_uri=10.99.21.26:5000
_project_name=telecomapistore-frontend-services
_k8s_env=(
            dev
            prod
          )
#2.不需要改动的变量
_pwd=$PWD
_project_root_path=$_pwd
_deployment_path=$_project_root_path/deployment
_seed_services_path=$_deployment_path/seed-services
_seed_service_path=''
_config_generator_shell_path=$_deployment_path/shell/SedExecute.sh
_replace_shell_path=$_deployment_path/shell/Replace.sh
_vue2_seed_service_name="vue2-seed-service"
_ng4_seed_service_name="ng4-seed-service"
_select_seed_service_name=""
_k8s_config_templates_name="k8s-deployment-templates"
_k8s_config_templates_path=$_seed_services_path/$_k8s_config_templates_name
_k8s_config_suffix=.yaml
_entry_html_file=""
_msg_break="================================================================="
#一、输入服务名称
echo $_msg_break
echo "请输入服务名称，例如：demo-portal-service"
read _service_name
if  [ $_service_name == "" ]; then
    echo "服务名称不能为空"
    exit
fi
echo "您输入服务名称为："$_service_name
echo $_msg_break
echo "正在为检查服务是否已经存在"
_dist_service_path=$_project_root_path/$_service_name
if [ -d $_dist_service_path ]; then
    echo "服务已经存在："$_dist_service_path
    exit
fi
#二、输入服务端口
echo $_msg_break
echo "请输入服务端口，例如：8080"
read _service_port
if  [ $_service_port == "" ]; then
    echo "服务端口不能为空"
    exit
fi
echo "您输入服务名称为："$_service_port
#三、选择服务类型
echo $_msg_break
echo -e "请输选择新建服务的类型：\n \t 1.vue2类型的服务  \n \t 2.angular4类型的服务  "
read _service_type
if [ $_service_type == "1" ]; then
    _seed_service_path=$_seed_services_path/$_vue2_seed_service_name
    _select_seed_service_name=$_vue2_seed_service_name
    _entry_html_file=$_dist_service_path/index.html
elif [ $_service_type == "2" ]; then
    _seed_service_path=$_seed_services_path/$_ng4_seed_service_name
    _select_seed_service_name=$_ng4_seed_service_name
    _entry_html_file=$_dist_service_path/src/index.html
else
    echo "您选择了不支持发服务类型："$_service_type
    exit
fi
#echo "种子服务的类型为："$_seed_service_path
##三、根据种子生成服务
#1.生成服务
echo $_msg_break
echo "正在为您生产服务，请您稍后。。。。"
echo "cp  -R $_seed_service_path $_dist_service_path"
cp  -R $_seed_service_path $_dist_service_path
echo "cp  -R $_k8s_config_templates_path/* $_dist_service_path/"
cp  -R $_k8s_config_templates_path/*  $_dist_service_path/
#2.配置项目
echo $_msg_break
echo "正在为您初始化服务，如下文件将被生成："
#2.1配置package.json
_package_json_path=$_dist_service_path/package.json
echo "正在为您生成：$_package_json_path"
#配置服务名称
sh $_replace_shell_path _SERVICE_NAME_ $_service_name $_package_json_path
#配置本地开发环境的后端入口
sh $_replace_shell_path _LOCAL_BACKEND_URI_ $_local_backend_uri $_package_json_path
#配置DEV环境的后端入口
sh $_replace_shell_path _DEV_BACKEND_URI_ $_dev_backend_uri $_package_json_path
#配置PROD环境的后端入口
sh $_replace_shell_path _PROD_BACKEND_URI_ $_prod_backend_uri $_package_json_path

#2.2配置入口html文件
echo "正在为您生成：$_entry_html_file"
sh $_replace_shell_path _SERVICE_NAME_ $_service_name $_entry_html_file

#2.3配置k8s部署文件
for _env in ${_k8s_env[@]};do
    _dist_seed_k8s_deployment_file=$_dist_service_path/$_k8s_config_templates_name-$_env$_k8s_config_suffix
    _dist_service_k8s_deployment_file=$_dist_service_path/$_service_name-$_env$_k8s_config_suffix
    mv $_dist_seed_k8s_deployment_file $_dist_service_k8s_deployment_file
    echo "正在为您生成：$_dist_service_k8s_deployment_file"
    #替换service_name
    sh $_replace_shell_path _MODULE_NAME_ $_service_name $_dist_service_k8s_deployment_file
    #替换project_name
    sh $_replace_shell_path _PROJECT_NAME_ $_project_name $_dist_service_k8s_deployment_file
    #替换private_docker_registry_uri
    sh $_replace_shell_path _DOCKER_IMAGE_CENTER_ $_private_docker_registry_uri $_dist_service_k8s_deployment_file
    #替换指定端口
    sh $_replace_shell_path _SERVICE_PORT_ $_service_port $_dist_service_k8s_deployment_file
done
#3.将服务加入git管理
echo $_msg_break
echo "正在将您的服务加入git管理，请您稍后。。。。"
git add $_dist_service_path
##4.按照依赖包
#cd $_dist_service_path
#cnpm install
echo "=====恭喜您，您的服务已经创建成功。服务的路径为：$_project_root_path======"
#5.提示后续操作
echo $_msg_break
echo "=====您还需要处理如下事情，才能更好的使用云星数据的devops服务====="
echo -e " \t 1.定制自己的kubernetes的配置文件"
echo -e " \t 2.把新服务添加到Jenkins控制文件"
echo -e " \t 3.编写自己的前端业务逻辑代码，并将代码提交到git中"

