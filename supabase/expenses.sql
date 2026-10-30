-- Bảng expenses với các ràng buộc kiểm tra dữ liệu nghiêm ngặt
create table public.expenses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  amount     numeric(12,2) not null check (amount > 0),            -- 0 và số âm bị từ chối
  category   text not null
             check (category in ('Food','Transport','Shopping','Bills','Other')),
  spent_on   date not null,                                        -- bắt buộc có ngày
  note       text default '' check (char_length(note) <= 100),     -- tối đa 100 ký tự
  created_at timestamptz not null default now()
);

-- Index tăng tốc truy vấn theo user_id
create index on public.expenses (user_id);

-- Bật Row Level Security (RLS)
alter table public.expenses enable row level security;

-- Policy chỉ cho phép người dùng xem dữ liệu của chính họ
create policy "select own" on public.expenses
  for select to authenticated using (auth.uid() = user_id);

-- Policy chỉ cho phép người dùng thêm dữ liệu cho chính họ
create policy "insert own" on public.expenses
  for insert to authenticated with check (auth.uid() = user_id);

-- Policy chỉ cho phép người dùng xóa dữ liệu của chính họ
create policy "delete own" on public.expenses
  for delete to authenticated using (auth.uid() = user_id);

