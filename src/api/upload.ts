import ApiCommonRequest from '@/service'

/**
 * 服务器-文件/图片上传, 最高10MB
 */
export function api_upload_file_with_server(file: any) {
  return ApiCommonRequest<any>({
    url: '/api/back/admin/upload/media',
    method: 'POST',
    data: {
      file,
    },
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
