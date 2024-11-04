declare namespace PageRoute {
  /**
   * the root route key
   * @translate 根路由
   */
  type RootRouteKey = 'root';

  /**
   * the not found route, which catch the invalid route path
   * @translate 未找到路由(捕获无效路径的路由)
   */
  type NotFoundRouteKey = 'not-found';

  /**
   * the route key
   * @translate 页面路由
   */
  type RouteKey =
    | '403'
    | '404'
    | '500'
    | 'constant-page'
    | 'login'
    | 'not-found'
    | 'about'
    | 'auth-demo'
    | 'auth-demo_permission'
    | 'auth-demo_super'
    | 'dashboard'
    | 'dashboard_analysis'
    | 'dashboard_changePwd'
    | 'dashboard_workbench'
    | 'exception'
    | 'exception_403'
    | 'exception_404'
    | 'exception_500'
    | 'finance-mg'
    | 'fn-developing'
    | 'fn-developing_rich-editor-server-developing'
    | 'fn'
    | 'fn_file-upload-server'
    | 'fn_image-upload-server'
    | 'fn_rich-editor-server'
    | 'fn_tab-detail'
    | 'fn_tab-multi-detail'
    | 'fn_tab'
    | 'fn_websocket'
    | 'goods-mg'
    | 'management'
    | 'management_auth'
    | 'management_role'
    | 'management_user'
    | 'multi-menu'
    | 'multi-menu_first'
    | 'multi-menu_first_second-new'
    | 'multi-menu_first_second-new_third'
    | 'multi-menu_first_second'
    | 'order-mg'
    | 'plugin'
    | 'plugin_charts'
    | 'plugin_charts_antv'
    | 'plugin_charts_echarts'
    | 'plugin_copy'
    | 'plugin_editor'
    | 'plugin_editor_markdown'
    | 'plugin_editor_quill'
    | 'plugin_icon'
    | 'plugin_map'
    | 'plugin_print'
    | 'plugin_swiper'
    | 'plugin_video'
    | 'productionProcurement'
    | 'test'
    | 'user-mg'
    | 'user-mg_user-list'
    | 'warehouse-mg';

  /**
   * last degree route key, which has the page file
   * @translate 最后一级路由(该级路有对应的页面文件)
   */
  type LastDegreeRouteKey = Extract<
    RouteKey,
    | '403'
    | '404'
    | '500'
    | 'constant-page'
    | 'login'
    | 'not-found'
    | 'about'
    | 'auth-demo_permission'
    | 'auth-demo_super'
    | 'dashboard_analysis'
    | 'dashboard_changePwd'
    | 'dashboard_workbench'
    | 'exception_403'
    | 'exception_404'
    | 'exception_500'
    | 'finance-mg'
    | 'fn-developing_rich-editor-server-developing'
    | 'fn_file-upload-server'
    | 'fn_image-upload-server'
    | 'fn_rich-editor-server'
    | 'fn_tab-detail'
    | 'fn_tab-multi-detail'
    | 'fn_tab'
    | 'fn_websocket'
    | 'goods-mg'
    | 'management_auth'
    | 'management_role'
    | 'management_user'
    | 'multi-menu_first_second-new_third'
    | 'multi-menu_first_second'
    | 'order-mg'
    | 'plugin_charts_antv'
    | 'plugin_charts_echarts'
    | 'plugin_copy'
    | 'plugin_editor_markdown'
    | 'plugin_editor_quill'
    | 'plugin_icon'
    | 'plugin_map'
    | 'plugin_print'
    | 'plugin_swiper'
    | 'plugin_video'
    | 'productionProcurement'
    | 'test'
    | 'user-mg_user-list'
    | 'warehouse-mg'
  >;
}
