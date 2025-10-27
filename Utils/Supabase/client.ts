import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    "https://uwhhaljvjsyynnrqwrlh.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3aGhhbGp2anN5eW5ucnF3cmxoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDY2Njc0MiwiZXhwIjoyMDc2MjQyNzQyfQ.qXyDkc7WNdW9AhrevQsjhEmBa7QbrJxhmxmQMoaPjk4"
  )
}