-- SolarCalc Seed Data

-- Products
INSERT INTO products (name, category, brand, model, price, wattage, rating, review_count, specs) VALUES
('Canadian Solar 550W', 'panel', 'Canadian Solar', 'CS6R-550MS', 220, 550, 4.8, 124, '{"efficiency":"21.3%","warranty":"25 years","weight":"28.6 kg"}'),
('LONGi Hi-MO 5 450W', 'panel', 'LONGi', 'LR5-72HBD-450M', 185, 450, 4.6, 89, '{"efficiency":"20.5%","warranty":"25 years","weight":"22.5 kg"}'),
('Trina Vertex S 580W', 'panel', 'Trina Solar', 'TSM-DE21(II)', 240, 580, 4.7, 67, '{"efficiency":"21.8%","warranty":"25 years","weight":"32.1 kg"}'),
('SMA Sunny Island 10kW', 'inverter', 'SMA', 'Sunny Island 10.0', 3500, 10000, 4.9, 56, '{"efficiency":"97%","warranty":"10 years","type":"Hybrid"}'),
('Fronius Primo 8kW', 'inverter', 'Fronius', 'Primo 8.2-1', 2800, 8200, 4.8, 43, '{"efficiency":"98%","warranty":"10 years","type":"String"}'),
('Huawei SUN2000 12kW', 'inverter', 'Huawei', 'SUN2000-12KTL-M2', 3200, 12000, 4.7, 78, '{"efficiency":"98.6%","warranty":"10 years","type":"Hybrid"}'),
('Tesla Powerwall 13.5kWh', 'battery', 'Tesla', 'Powerwall 2', 8500, 13500, 4.7, 201, '{"capacity":"13.5 kWh","warranty":"10 years","dod":"90%"}'),
('BYD Battery-Box 10kWh', 'battery', 'BYD', 'Battery-Box Premium HVS', 5200, 10000, 4.6, 134, '{"capacity":"10 kWh","warranty":"10 years","dod":"90%"}'),
('Cable Solar 10mm² 50m', 'cable', 'Tycables', 'SOLAR-10', 180, NULL, 4.5, 67, '{"section":"10mm²","length":"50m","type":"DC Solar"}'),
('Cable Solar 6mm² 50m', 'cable', 'Tycables', 'SOLAR-6', 120, NULL, 4.4, 45, '{"section":"6mm²","length":"50m","type":"DC Solar"}'),
('SPD Tipo II 40kA', 'protection', 'Schneider', 'iPRD 40r', 95, NULL, 4.8, 32, '{"type":"SPD Tipo II","capacity":"40kA","voltage":"275V"}'),
('Disyuntor Diferencial 40A', 'protection', 'Schneider', 'Acti9 iID', 65, NULL, 4.6, 28, '{"type":"Diferencial","rating":"40A","poles":"2P"}');

-- Installers
INSERT INTO installers (company_name, contact_name, email, phone, city, state, specialties, certifications, rating, review_count, years_experience, is_verified) VALUES
('SolarTech MX', 'Ing. Carlos Mendez', 'info@solartech.mx', '+52 55 1234 5678', 'Ciudad de Mexico', 'CDMX', '["residential","commercial"]', '["NABCEP","CFE"]', 4.8, 124, 8, true),
('EcoSolar SA', 'Ing. Ana Garcia', 'contacto@ecosolar.mx', '+52 33 9876 5432', 'Guadalajara', 'Jalisco', '["residential","rural"]', '["CFE"]', 4.5, 89, 5, true),
('SunPower Pro', 'Ing. Roberto Diaz', 'ventas@sunpowerpro.mx', '+52 81 5555 1234', 'Monterrey', 'Nuevo Leon', '["commercial","industrial"]', '["NABCEP","ISO 9001"]', 4.9, 156, 12, true),
('Foton Energia', 'Ing. Maria Lopez', 'info@fotonenergia.mx', '+52 33 4444 5678', 'Guadalajara', 'Jalisco', '["residential"]', '["CFE"]', 4.3, 45, 3, false),
('Solar Solutions MTY', 'Ing. Fernando Ruiz', 'soluciones@solarsolutions.mx', '+52 81 6666 7890', 'Monterrey', 'Nuevo Leon', '["residential","commercial","industrial"]', '["NABCEP","CFE","ISO 9001"]', 4.7, 198, 10, true),
('Verde Solar', 'Ing. Laura Hernandez', 'hola@verdesolar.mx', '+52 55 7777 8901', 'Puebla', 'Puebla', '["residential","rural"]', '["CFE"]', 4.4, 67, 4, false);
