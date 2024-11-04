import ApiCommonRequest from '@/service'

/**
 * 获取公告列表
 */
export function api_get_announcement_list(data: BasePageProps) {
  return ApiCommonRequest<BasePageProps, ApiAnnouncement.AnnouncementNoticeListData[]>({
    url: '/api/back/notice/list',
    method: 'GET',
    data,
  })
}

/**
 * 获取公告详情
 */
export function api_get_announcement_detail(data: { id: any }) {
  return ApiCommonRequest<{ id: any }, ApiAnnouncement.AnnouncementNoticeDetailData>({
    url: '/api/back/notice/detail',
    method: 'GET',
    data,
  })
}

/**
 * 新增公告
 */
export function api_add_announcement(data: ApiAnnouncement.AddAnnouncementNoticeProps) {
  return ApiCommonRequest<ApiAnnouncement.AddAnnouncementNoticeProps>({
    url: '/api/back/notice/create',
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

/**
 * 编辑公告
 */
export function api_edit_announcement(data: ApiAnnouncement.EditAnnouncementNoticeProps) {
  return ApiCommonRequest<ApiAnnouncement.EditAnnouncementNoticeProps>({
    url: '/api/back/notice/update',
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

/**
 * 删除公告
 */
export function api_delete_announcement(data: ApiAnnouncement.DeleteAnnouncementNoticeProps) {
  return ApiCommonRequest<any>({
    url: '/api/back/notice/delete',
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
