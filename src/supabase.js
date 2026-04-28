import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bcjgnslsuwxaaioasmuw.supabase.co'
const supabaseAnonKey = 'sb_publishable_8aP6vJWwpywLEAoW3HImnA_AKul1YiU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)