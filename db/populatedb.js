#! /usr/bin/env node

const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS suppliers (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR (255),
  contact_person VARCHAR (20),
  contact_phone VARCHAR (20),
  contact_email VARCHAR (255)
);

CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR (150)
);

CREATE TABLE IF NOT EXISTS inventory_items (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR (255),
  count SMALLINT,
  unit VARCHAR (20),
  category_id INTEGER,
  supplier_id INTEGER,
  FOREIGN KEY (category_id) REFERENCES categories(id),
  FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
);

INSERT INTO suppliers (name, contact_person, contact_phone, contact_email) VALUES
  ('Bakery Machines Inc.', 'Li Wei', '(555) 123-4567', 'info@bakerymachinesinc.com'),
  ('Traditional Cookware Co.', 'Zhang Min', '(555) 234-5678', 'contact@traditionalcookwareco.com'),
  ('Festive Baking Supplies', 'Wang Lei', '(555) 345-6789', 'hello@festivebakingsupplies.com'),
  ('Chef''s Best Equipment', 'Chen Xia', '(555) 456-7890', 'inquiries@chefsbestequipment.com'),
  ('Tea Leaf Imports', 'Liu Jing', '(555) 567-8901', 'info@tealeafimports.com'),
  ('Golden Egg Farm', 'Yang Hao', '(555) 678-9012', 'contact@goldeneggfarm.com'),
  ('Lotus Foods Inc.', 'Zhao Hui', '(555) 789-0123', 'hello@lotusfoodsinc.com'),
  ('Sunshine Bakery Supplies', 'Sun Mei', '(555) 890-1234', 'support@sunshinebakerysupplies.com'),
  ('Bean Masters Co.', 'Tang Rong', '(555) 901-2345', 'contact@beanmastersco.com'),
  ('Sesame King', 'Lin Feng', '(555) 012-3456', 'info@sesameking.com');

INSERT INTO categories (name) VALUES
  ('Tools'),
  ('Buns'),
  ('Pastries'),
  ('Fillings'),
  ('Seasonal'),
  ('Fried Goods'),
  ('Ingredients');

INSERT INTO inventory_items (name, count, unit, category_id, supplier_id) VALUES
  ('Bakery Mixer', 5, 'units', 1, 1),
  ('Custard Buns', 150, 'pieces', 2, 2),
  ('Croissants', 100, 'pieces', 3, 3),
  ('Apple Filling', 50, 'kg', 4, 4),
  ('Mooncakes', 200, 'pieces', 5, 5),
  ('Donuts', 75, 'pieces', 6, 6),
  ('Flour', 500, 'kg', 7, 7),
  ('Dough Cutter', 12, 'units', 1, 8),
  ('Sesame Paste', 20, 'kg', 7, 10),
  ('Rolling Pin', 8, 'units', 1, 9);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.argv[1],
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
