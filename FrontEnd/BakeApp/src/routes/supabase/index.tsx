// supabase/index.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sjpxrusffwjosgejccbi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqcHhydXNmZndqb3NnZWpjY2JpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMwMDc5MDYsImV4cCI6MjAxODU4MzkwNn0.y_w2WbOejoymns8X0CFzGxTPWIg9vYjM6-Ck5RPvpeI';
const supabase = createClient(supabaseUrl, supabaseKey);




export default supabase;

