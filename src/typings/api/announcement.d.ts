declare namespace ApiAnnouncement {
  interface AnnouncementNoticeListData {
    id: any
    title: string
    create_time: string
  }

  interface AnnouncementNoticeDetailData {
    id: any
    title: string
    content: string
    create_time: string
  }

  interface AddAnnouncementNoticeProps {
    title: string
    content: string
  }

  interface EditAnnouncementNoticeProps extends AddAnnouncementNoticeProps {
    id: any
  }

  interface DeleteAnnouncementNoticeProps {
    id: any
  }
}
