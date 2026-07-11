-- SolarCalc Database Schema

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    avatar_url VARCHAR(500),
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Projects
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL,
    location VARCHAR(200),
    property_type VARCHAR(30) CHECK (property_type IN ('residential', 'commercial', 'industrial', 'rural')),
    consumption_method VARCHAR(20) CHECK (consumption_method IN ('manual', 'appliances')),
    monthly_kwh DECIMAL(10,2),
    panels_count INTEGER,
    panels_watt INTEGER,
    inverter_kw DECIMAL(6,2),
    battery_kwh DECIMAL(6,2),
    system_cost DECIMAL(12,2),
    monthly_savings DECIMAL(10,2),
    roi_months INTEGER,
    co2_reduction DECIMAL(8,2),
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'saved', 'quoted', 'archived')),
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Products (Marketplace)
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    category VARCHAR(50) CHECK (category IN ('panel', 'inverter', 'battery', 'cable', 'protection', 'accessory')),
    brand VARCHAR(100),
    model VARCHAR(100),
    description TEXT,
    wattage INTEGER,
    voltage INTEGER,
    price DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    image_url VARCHAR(500),
    specs JSONB,
    rating DECIMAL(2,1) DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Installers
CREATE TABLE IF NOT EXISTS installers (
    id SERIAL PRIMARY KEY,
    company_name VARCHAR(200) NOT NULL,
    contact_name VARCHAR(100),
    email VARCHAR(255),
    phone VARCHAR(20),
    website VARCHAR(500),
    address VARCHAR(300),
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100) DEFAULT 'Mexico',
    lat DECIMAL(10,8),
    lng DECIMAL(11,8),
    specialties JSONB,
    certifications JSONB,
    rating DECIMAL(2,1) DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    years_experience INTEGER,
    is_verified BOOLEAN DEFAULT false,
    logo_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Quotes
CREATE TABLE IF NOT EXISTS quotes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id),
    quote_number VARCHAR(30) UNIQUE NOT NULL,
    pdf_url VARCHAR(500),
    valid_until DATE,
    total_cost DECIMAL(12,2),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'accepted', 'expired')),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_projects_user ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_installers_city ON installers(city);
CREATE INDEX IF NOT EXISTS idx_quotes_project ON quotes(project_id);
CREATE INDEX IF NOT EXISTS idx_quotes_user ON quotes(user_id);
