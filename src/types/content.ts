
export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  branchId: string;
  imageUrl?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Sermon {
  id: string;
  title: string;
  description: string;
  speaker: string;
  recordedDate: string;
  branchId: string;
  mediaUrl: string;
  mediaType: "video" | "audio";
  thumbnailUrl?: string;
  transcription?: string;
  summary?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  branchId: string;
  priority: "low" | "medium" | "high";
  imageUrl?: string;
  startDate: string;
  endDate?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  branchId: string;
  imageUrl?: string;
  tags: string[];
  published: boolean;
  publishedDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface Forum {
  id: string;
  title: string;
  description: string;
  branchId: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface ForumTopic {
  id: string;
  title: string;
  content: string;
  forumId: string;
  branchId: string;
  authorId: string;
  authorName: string;
  replyCount: number;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ForumReply {
  id: string;
  content: string;
  topicId: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
}

export interface Media {
  id: string;
  title: string;
  description?: string;
  mediaUrl: string;
  mediaType: "video" | "audio" | "image";
  thumbnailUrl?: string;
  duration?: number;
  artist?: string;
  album?: string;
  branchId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  branchId: string;
  createdBy: string;
  isOpen: boolean;
  memberCount: number;
  admins: string[];
  createdAt: string;
  updatedAt: string;
}

export interface RadioStation {
  id: string;
  name: string;
  description: string;
  streamUrl: string;
  logoUrl?: string;
  branchId: string;
  isLive?: boolean;
  currentShow?: string;
  createdAt: string;
  updatedAt: string;
}
