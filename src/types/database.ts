export interface Database {
  public: {
    Tables: {
      landing_pages: {
        Row: {
          id: string
          user_id: string
          title: string
          slug: string
          content: {
            project: ProjectDetails
            design: DesignConfig
          }
          published: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Tables['landing_pages']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Tables['landing_pages']['Insert']>
      }
    }
  }
}

export type Tables = Database['public']['Tables']