
-- ================================
-- ESTRUCTURA BASE DE DATOS
-- Estilo a Medida
-- ================================

-- 1) Categorías
create table if not exists public.categorias (
  id bigserial primary key,
  slug text unique not null,
  nombre text not null,
  descripcion text,
  imagen_portada_url text,
  orden int default 0,
  creado_at timestamptz default now()
);

-- 2) Productos
create table if not exists public.productos (
  id bigserial primary key,
  categoria_id bigint references public.categorias(id) on delete set null,
  slug text unique not null,
  nombre text not null,
  descripcion_corta text,
  descripcion_larga text,
  precio_desde numeric(12,2),
  ancho_cm int,
  alto_cm int,
  profundidad_cm int,
  destacado boolean default false,
  imagen_url text,
  creado_at timestamptz default now()
);

-- 3) Galería de productos (fotos adicionales)
create table if not exists public.producto_fotos (
  id bigserial primary key,
  producto_id bigint references public.productos(id) on delete cascade,
  url text not null,
  alt text,
  orden int default 0
);

-- 4) Features / características de productos
create table if not exists public.producto_features (
  id bigserial primary key,
  producto_id bigint references public.productos(id) on delete cascade,
  texto text not null,
  orden int default 0
);

-- 5) Proyectos (galería/portafolio)
create table if not exists public.proyectos (
  id bigserial primary key,
  slug text unique not null,
  titulo text not null,
  descripcion text,
  portada_url text,
  fecha date,
  orden int default 0,
  creado_at timestamptz default now()
);

-- 6) Fotos de proyectos
create table if not exists public.proyecto_fotos (
  id bigserial primary key,
  proyecto_id bigint references public.proyectos(id) on delete cascade,
  url text not null,
  alt text,
  orden int default 0
);

-- 7) Testimonios
create table if not exists public.testimonios (
  id bigserial primary key,
  texto text not null,
  autor text,
  orden int default 0,
  creado_at timestamptz default now()
);

-- 8) Leads (consultas desde el formulario de contacto)
create table if not exists public.leads (
  id bigserial primary key,
  nombre text not null,
  telefono text,
  email text,
  producto_slug text,
  mensaje text,
  origen text default 'web',
  creado_at timestamptz default now()
);

-- 9) Información general del sitio (footer/datos de contacto)
create table if not exists public.site_info (
  id smallint primary key default 1,
  marca text,
  eslogan text,
  direccion text,
  telefono text,
  email text,
  instagram_url text,
  facebook_url text,
  pinterest_url text,
  actualizado_at timestamptz default now()
);

-- ================================
-- RLS (Row Level Security) y Policies
-- ================================
alter table public.categorias          enable row level security;
alter table public.productos           enable row level security;
alter table public.producto_fotos      enable row level security;
alter table public.producto_features   enable row level security;
alter table public.proyectos           enable row level security;
alter table public.proyecto_fotos      enable row level security;
alter table public.testimonios         enable row level security;
alter table public.leads               enable row level security;
alter table public.site_info           enable row level security;

-- Lectura pública
create policy if not exists public_select_categorias
on public.categorias for select to anon using (true);

create policy if not exists public_select_productos
on public.productos for select to anon using (true);

create policy if not exists public_select_producto_fotos
on public.producto_fotos for select to anon using (true);

create policy if not exists public_select_producto_features
on public.producto_features for select to anon using (true);

create policy if not exists public_select_proyectos
on public.proyectos for select to anon using (true);

create policy if not exists public_select_proyecto_fotos
on public.proyecto_fotos for select to anon using (true);

create policy if not exists public_select_testimonios
on public.testimonios for select to anon using (true);

create policy if not exists public_select_site_info
on public.site_info for select to anon using (true);

-- Insert público solo en leads
create policy if not exists public_insert_leads
on public.leads for insert to anon with check (true);
