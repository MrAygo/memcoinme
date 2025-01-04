import { supabase } from '../lib/supabase';
import { BuilderState } from '../types/builder';

export async function saveProject(name: string, urlSlug: string, state: BuilderState) {
  const { data, error } = await supabase
    .from('projects')
    .insert({
      name,
      url_slug: urlSlug,
      state,
      user_id: (await supabase.auth.getUser()).data.user?.id
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateProject(id: string, state: BuilderState, published: boolean = false) {
  const { data, error } = await supabase
    .from('projects')
    .update({ state, published })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getProject(id: string) {
  const { data, error } = await supabase
    .from('projects')
    .select()
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function getUserProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select()
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return data;
}