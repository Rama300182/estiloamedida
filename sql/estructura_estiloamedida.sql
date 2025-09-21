
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

-- 8) Leads (consultas desde el formulario de contacto) - TABLA EXISTENTE
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

-- 9) Consultas mejoradas (nueva versión más completa)
create table if not exists public.consultas (
  id bigserial primary key,
  nombre text not null,
  email text not null,
  telefono text,
  mensaje text,
  producto_interes text, -- 'cocinas', 'comodas', 'placards', 'otros'
  presupuesto_estimado text, -- 'hasta_50000', '50000_100000', etc.
  estado text default 'nuevo', -- 'nuevo', 'contactado', 'presupuestado', 'cerrado'
  origen text default 'web',
  notas text, -- para uso interno del equipo
  creado_at timestamptz default now(),
  actualizado_at timestamptz default now()
);

-- 10) Newsletter (suscriptores)
create table if not exists public.newsletter (
  id bigserial primary key,
  email text unique not null,
  nombre text,
  apellido text,
  fecha_suscripcion timestamptz default now(),
  fecha_baja timestamptz,
  activo boolean default true
);

-- 11) Información general del sitio (footer/datos de contacto)
-- 11) Información general del sitio (footer/datos de contacto)
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
alter table public.consultas           enable row level security;  -- NUEVA
alter table public.newsletter          enable row level security;  -- NUEVA
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

-- Insert público solo en leads, consultas y newsletter
create policy if not exists public_insert_leads
on public.leads for insert to anon with check (true);

-- Permitir insertar consultas desde el formulario web
create policy if not exists public_insert_consultas
on public.consultas for insert to anon with check (true);

-- Permitir insertar suscripciones al newsletter
create policy if not exists public_insert_newsletter
on public.newsletter for insert to anon with check (true);

-- Función para actualizar timestamp automáticamente
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.actualizado_at = now();
    return new;
end;
$$ language plpgsql;

-- Trigger para actualizar automáticamente el campo actualizado_at en consultas
create trigger update_consultas_updated_at 
    before update on public.consultas 
    for each row execute function update_updated_at_column();
