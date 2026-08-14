export interface PostFrontmatter {
  title: string;
  meta_title?: string;
  description?: string;
  date?: string;
  image?: string;
  categories?: string[];
  tags?: string[];
  draft?: boolean;
  featured?: boolean;
  author?: string;
  noindex?: boolean;
  canonical?: string;
  layout?: string;
  [key: string]: any;
}

export interface PostItem {
  frontmatter: PostFrontmatter;
  content: string;
  slug: string;
}

export interface CategoryWithCount {
  name: string;
  posts: number;
}

export interface Banner {
  title: string;
  title_small?: string;
  content: string;
  image_enable: boolean;
  image: string;
  button: {
    enable: boolean;
    label: string;
    link: string;
    rel?: string;
  };
}

export interface SectionConfig {
  enable: boolean;
  title: string;
}

export interface PromotionConfig {
  enable: boolean;
  link: string;
  image: string;
}

export interface HomepageData {
  banner: Banner;
  featured_posts: SectionConfig;
  recent_posts: SectionConfig;
  promotion: PromotionConfig;
}

export interface SiteConfig {
  site: {
    title: string;
    base_url: string;
    favicon: string;
    logo: string;
    logo_width: string;
    logo_height: string;
    logo_text: string;
    copyright: string;
  };
  settings: {
    pagination: number;
    summary_length: number;
    blog_folder: string;
    default_theme: string;
  };
  params: {
    tag_manager_id?: string;
    contact_form_action?: string;
    copyright?: string;
  };
  metadata: {
    meta_author: string;
    meta_image: string;
    meta_description: string;
  };
}
