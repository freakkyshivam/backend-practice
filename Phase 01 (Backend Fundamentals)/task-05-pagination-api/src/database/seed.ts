
 
import db from "./connection/db.js"
import { productSchema } from "./schema/product.schema.js"

const data = [
  {
    "name": "Wireless Mouse",
    "description": "Ergonomic wireless mouse with adjustable DPI and silent clicks.",
    "category": "Electronics",
    "price": "799.00"
  },
  {
    "name": "Mechanical Keyboard",
    "description": "Compact mechanical keyboard with hot-swappable switches.",
    "category": "Electronics",
    "price": "2499.00"
  },
  {
    "name": "USB-C Hub",
    "description": "Multi-port USB-C hub with HDMI, USB 3.0, and PD charging.",
    "category": "Electronics",
    "price": "1599.00"
  },
  {
    "name": "Bluetooth Speaker",
    "description": "Portable Bluetooth speaker with deep bass and 12-hour battery life.",
    "category": "Audio",
    "price": "1999.00"
  },
  {
    "name": "Noise Cancelling Headphones",
    "description": "Over-ear headphones with active noise cancellation.",
    "category": "Audio",
    "price": "5499.00"
  },
  {
    "name": "Webcam 1080p",
    "description": "Full HD webcam with built-in microphone and privacy cover.",
    "category": "Electronics",
    "price": "1799.00"
  },
  {
    "name": "Laptop Stand",
    "description": "Adjustable aluminum laptop stand for better desk ergonomics.",
    "category": "Accessories",
    "price": "1299.00"
  },
  {
    "name": "Phone Tripod",
    "description": "Flexible tripod with universal smartphone holder.",
    "category": "Accessories",
    "price": "899.00"
  },
  {
    "name": "Power Bank 20000mAh",
    "description": "High-capacity power bank with fast charging support.",
    "category": "Electronics",
    "price": "1699.00"
  },
  {
    "name": "Smart LED Bulb",
    "description": "Wi-Fi enabled smart bulb with adjustable brightness and color.",
    "category": "Smart Home",
    "price": "699.00"
  },
  {
    "name": "Desk Lamp",
    "description": "LED desk lamp with adjustable brightness and color temperature.",
    "category": "Home",
    "price": "1199.00"
  },
  {
    "name": "Air Purifier",
    "description": "Compact air purifier with HEPA filtration for small rooms.",
    "category": "Home Appliances",
    "price": "6999.00"
  },
  {
    "name": "Electric Kettle",
    "description": "Stainless steel electric kettle with automatic shutoff.",
    "category": "Kitchen",
    "price": "1499.00"
  },
  {
    "name": "Coffee Maker",
    "description": "Programmable drip coffee maker with reusable filter.",
    "category": "Kitchen",
    "price": "3299.00"
  },
  {
    "name": "Digital Kitchen Scale",
    "description": "Precision kitchen scale with tare and gram measurement.",
    "category": "Kitchen",
    "price": "599.00"
  },
  {
    "name": "Water Bottle",
    "description": "Insulated stainless steel bottle that keeps drinks cold for hours.",
    "category": "Lifestyle",
    "price": "899.00"
  },
  {
    "name": "Backpack",
    "description": "Water-resistant laptop backpack with multiple compartments.",
    "category": "Bags",
    "price": "1899.00"
  },
  {
    "name": "Travel Organizer",
    "description": "Compact organizer for passports, cards, and travel documents.",
    "category": "Travel",
    "price": "699.00"
  },
  {
    "name": "Running Shoes",
    "description": "Lightweight running shoes with breathable mesh upper.",
    "category": "Footwear",
    "price": "2999.00"
  },
  {
    "name": "Casual Sneakers",
    "description": "Everyday sneakers with cushioned sole and minimalist design.",
    "category": "Footwear",
    "price": "2499.00"
  },
  {
    "name": "Hoodie",
    "description": "Soft cotton-blend hoodie suitable for casual everyday wear.",
    "category": "Clothing",
    "price": "1799.00"
  },
  {
    "name": "Classic T-Shirt",
    "description": "Regular-fit cotton t-shirt with a comfortable finish.",
    "category": "Clothing",
    "price": "599.00"
  },
  {
    "name": "Denim Jacket",
    "description": "Classic denim jacket with durable stitching and metal buttons.",
    "category": "Clothing",
    "price": "2299.00"
  },
  {
    "name": "Cotton Shirt",
    "description": "Breathable cotton shirt with a regular fit.",
    "category": "Clothing",
    "price": "999.00"
  },
  {
    "name": "Slim Fit Jeans",
    "description": "Stretch denim jeans with a modern slim fit.",
    "category": "Clothing",
    "price": "1599.00"
  },
  {
    "name": "Wallet",
    "description": "Compact leather wallet with multiple card slots.",
    "category": "Accessories",
    "price": "799.00"
  },
  {
    "name": "Sunglasses",
    "description": "UV-protected sunglasses with lightweight frame.",
    "category": "Accessories",
    "price": "999.00"
  },
  {
    "name": "Analog Watch",
    "description": "Minimal analog watch with stainless steel case and strap.",
    "category": "Accessories",
    "price": "1999.00"
  },
  {
    "name": "Fitness Band",
    "description": "Activity tracker with heart-rate monitoring and sleep tracking.",
    "category": "Wearables",
    "price": "2299.00"
  },
  {
    "name": "Smart Watch",
    "description": "Smartwatch with notifications, fitness tracking, and GPS.",
    "category": "Wearables",
    "price": "4999.00"
  },
  {
    "name": "Yoga Mat",
    "description": "Non-slip exercise mat with cushioned surface.",
    "category": "Fitness",
    "price": "799.00"
  },
  {
    "name": "Resistance Bands",
    "description": "Set of resistance bands for strength and mobility workouts.",
    "category": "Fitness",
    "price": "599.00"
  },
  {
    "name": "Dumbbell Set",
    "description": "Adjustable dumbbell set for home strength training.",
    "category": "Fitness",
    "price": "2999.00"
  },
  {
    "name": "Foam Roller",
    "description": "High-density foam roller for muscle recovery and mobility.",
    "category": "Fitness",
    "price": "899.00"
  },
  {
    "name": "Football",
    "description": "Durable training football with machine-stitched panels.",
    "category": "Sports",
    "price": "799.00"
  },
  {
    "name": "Cricket Bat",
    "description": "English willow cricket bat designed for club-level play.",
    "category": "Sports",
    "price": "4499.00"
  },
  {
    "name": "Badminton Racket",
    "description": "Lightweight badminton racket with balanced frame.",
    "category": "Sports",
    "price": "1299.00"
  },
  {
    "name": "Tennis Balls",
    "description": "Pressurized tennis balls suitable for training and matches.",
    "category": "Sports",
    "price": "499.00"
  },
  {
    "name": "Sketchbook",
    "description": "Premium blank sketchbook with thick acid-free paper.",
    "category": "Stationery",
    "price": "449.00"
  },
  {
    "name": "Notebook",
    "description": "Hardcover ruled notebook with durable binding.",
    "category": "Stationery",
    "price": "299.00"
  },
  {
    "name": "Gel Pen Set",
    "description": "Smooth-writing gel pens in assorted colors.",
    "category": "Stationery",
    "price": "199.00"
  },
  {
    "name": "Desk Organizer",
    "description": "Multi-compartment organizer for pens and desk accessories.",
    "category": "Office",
    "price": "499.00"
  },
  {
    "name": "Office Chair",
    "description": "Ergonomic office chair with adjustable lumbar support.",
    "category": "Furniture",
    "price": "8999.00"
  },
  {
    "name": "Study Table",
    "description": "Compact study table with storage shelf and sturdy frame.",
    "category": "Furniture",
    "price": "4999.00"
  },
  {
    "name": "Bookshelf",
    "description": "Five-tier bookshelf with a modern wooden finish.",
    "category": "Furniture",
    "price": "3599.00"
  },
  {
    "name": "Bedside Table",
    "description": "Compact bedside table with drawer and open shelf.",
    "category": "Furniture",
    "price": "2299.00"
  },
  {
    "name": "LED Strip Lights",
    "description": "RGB LED strip with remote control and multiple lighting modes.",
    "category": "Smart Home",
    "price": "999.00"
  },
  {
    "name": "Smart Plug",
    "description": "Wi-Fi smart plug with scheduling and energy monitoring.",
    "category": "Smart Home",
    "price": "799.00"
  },
  {
    "name": "Security Camera",
    "description": "Indoor Wi-Fi security camera with night vision.",
    "category": "Smart Home",
    "price": "2499.00"
  },
  {
    "name": "Bluetooth Earbuds",
    "description": "True wireless earbuds with charging case and touch controls.",
    "category": "Audio",
    "price": "2299.00"
  },
  {
    "name": "USB Microphone",
    "description": "Condenser USB microphone for streaming and voice recording.",
    "category": "Audio",
    "price": "2999.00"
  },
  {
    "name": "Soundbar",
    "description": "Compact soundbar with Bluetooth and virtual surround sound.",
    "category": "Audio",
    "price": "3999.00"
  },
  {
    "name": "Gaming Mouse",
    "description": "High-precision gaming mouse with programmable buttons.",
    "category": "Gaming",
    "price": "1899.00"
  },
  {
    "name": "Gaming Keyboard",
    "description": "RGB mechanical gaming keyboard with anti-ghosting.",
    "category": "Gaming",
    "price": "2799.00"
  },
  {
    "name": "Gaming Headset",
    "description": "Surround-sound gaming headset with noise-isolating microphone.",
    "category": "Gaming",
    "price": "2499.00"
  },
  {
    "name": "Game Controller",
    "description": "Wireless controller compatible with PC and mobile devices.",
    "category": "Gaming",
    "price": "1999.00"
  },
  {
    "name": "Monitor 24 Inch",
    "description": "24-inch Full HD IPS monitor with slim bezels.",
    "category": "Computers",
    "price": "8999.00"
  },
  {
    "name": "Monitor 27 Inch",
    "description": "27-inch QHD IPS monitor for work and entertainment.",
    "category": "Computers",
    "price": "15999.00"
  },
  {
    "name": "External SSD 1TB",
    "description": "Portable 1TB SSD with high-speed USB-C connectivity.",
    "category": "Storage",
    "price": "6499.00"
  },
  {
    "name": "USB Flash Drive 128GB",
    "description": "Compact 128GB USB flash drive for everyday storage.",
    "category": "Storage",
    "price": "799.00"
  },
  {
    "name": "MicroSD Card 256GB",
    "description": "High-speed 256GB microSD card for phones and cameras.",
    "category": "Storage",
    "price": "1299.00"
  },
  {
    "name": "Wi-Fi Router",
    "description": "Dual-band Wi-Fi router with high-speed wireless connectivity.",
    "category": "Networking",
    "price": "2199.00"
  },
  {
    "name": "Ethernet Cable",
    "description": "Cat6 Ethernet cable for reliable high-speed networking.",
    "category": "Networking",
    "price": "299.00"
  },
  {
    "name": "Network Switch",
    "description": "Eight-port gigabit Ethernet switch for home and office networks.",
    "category": "Networking",
    "price": "1299.00"
  },
  {
    "name": "Laptop Sleeve",
    "description": "Protective padded sleeve for laptops up to 15.6 inches.",
    "category": "Accessories",
    "price": "699.00"
  },
  {
    "name": "Cable Organizer",
    "description": "Reusable cable management clips for clean workspaces.",
    "category": "Accessories",
    "price": "249.00"
  },
  {
    "name": "Phone Stand",
    "description": "Adjustable desktop stand for smartphones and tablets.",
    "category": "Accessories",
    "price": "399.00"
  },
  {
    "name": "Tablet",
    "description": "10-inch tablet with high-resolution display and long battery life.",
    "category": "Computers",
    "price": "12999.00"
  },
  {
    "name": "E-Reader",
    "description": "Lightweight e-reader with glare-free display and adjustable light.",
    "category": "Electronics",
    "price": "10999.00"
  },
  {
    "name": "Wireless Charger",
    "description": "Fast wireless charging pad with temperature protection.",
    "category": "Electronics",
    "price": "999.00"
  },
  {
    "name": "Car Charger",
    "description": "Dual-port fast car charger with USB-C support.",
    "category": "Automotive",
    "price": "599.00"
  },
  {
    "name": "Dash Camera",
    "description": "Full HD dash camera with loop recording and night vision.",
    "category": "Automotive",
    "price": "2999.00"
  },
  {
    "name": "Car Vacuum Cleaner",
    "description": "Portable vacuum cleaner designed for car interiors.",
    "category": "Automotive",
    "price": "1599.00"
  },
  {
    "name": "Travel Pillow",
    "description": "Memory foam neck pillow designed for comfortable travel.",
    "category": "Travel",
    "price": "699.00"
  },
  {
    "name": "Luggage Set",
    "description": "Three-piece lightweight luggage set with spinner wheels.",
    "category": "Travel",
    "price": "6999.00"
  },
  {
    "name": "Toiletry Bag",
    "description": "Water-resistant travel toiletry bag with multiple compartments.",
    "category": "Travel",
    "price": "499.00"
  },
  {
    "name": "Electric Toothbrush",
    "description": "Rechargeable electric toothbrush with multiple cleaning modes.",
    "category": "Personal Care",
    "price": "1799.00"
  },
  {
    "name": "Hair Dryer",
    "description": "Compact hair dryer with multiple heat and speed settings.",
    "category": "Personal Care",
    "price": "1299.00"
  },
  {
    "name": "Beard Trimmer",
    "description": "Cordless beard trimmer with adjustable length settings.",
    "category": "Personal Care",
    "price": "1499.00"
  },
  {
    "name": "Desk Fan",
    "description": "Quiet USB desk fan with adjustable airflow.",
    "category": "Home Appliances",
    "price": "699.00"
  },
  {
    "name": "Room Heater",
    "description": "Compact electric room heater with adjustable thermostat.",
    "category": "Home Appliances",
    "price": "1899.00"
  },
  {
    "name": "Humidifier",
    "description": "Ultrasonic humidifier with quiet operation and night mode.",
    "category": "Home Appliances",
    "price": "1599.00"
  },
  {
    "name": "Nonstick Pan",
    "description": "Durable nonstick frying pan suitable for everyday cooking.",
    "category": "Kitchen",
    "price": "999.00"
  },
  {
    "name": "Knife Set",
    "description": "Stainless steel kitchen knife set with storage block.",
    "category": "Kitchen",
    "price": "1499.00"
  },
  {
    "name": "Lunch Box",
    "description": "Leak-resistant insulated lunch box with multiple compartments.",
    "category": "Kitchen",
    "price": "799.00"
  },
  {
    "name": "Memory Foam Pillow",
    "description": "Supportive memory foam pillow designed for comfortable sleep.",
    "category": "Home",
    "price": "1199.00"
  },
  {
    "name": "Bedsheet Set",
    "description": "Soft cotton bedsheet set with matching pillow covers.",
    "category": "Home",
    "price": "1299.00"
  },
  {
    "name": "Table Clock",
    "description": "Minimal digital table clock with alarm and temperature display.",
    "category": "Home",
    "price": "499.00"
  },
  {
    "name": "Wall Clock",
    "description": "Modern wall clock with silent movement mechanism.",
    "category": "Home",
    "price": "699.00"
  },
  {
    "name": "LED Emergency Light",
    "description": "Rechargeable emergency light with bright LED illumination.",
    "category": "Home",
    "price": "899.00"
  },
  {
    "name": "Portable Projector",
    "description": "Compact projector for home entertainment and presentations.",
    "category": "Electronics",
    "price": "6999.00"
  },
  {
    "name": "Action Camera",
    "description": "Compact action camera with 4K video recording.",
    "category": "Cameras",
    "price": "5999.00"
  },
  {
    "name": "Ring Light",
    "description": "Adjustable LED ring light for video calls and content creation.",
    "category": "Photography",
    "price": "1499.00"
  },
  {
    "name": "Camera Tripod",
    "description": "Stable aluminum tripod with adjustable height and phone mount.",
    "category": "Photography",
    "price": "1299.00"
  },
  {
    "name": "Drawing Tablet",
    "description": "Pressure-sensitive drawing tablet for digital artists.",
    "category": "Computers",
    "price": "3999.00"
  },
  {
    "name": "Scientific Calculator",
    "description": "Advanced calculator suitable for engineering and mathematics.",
    "category": "Stationery",
    "price": "899.00"
  },
  {
    "name": "Back Support Cushion",
    "description": "Ergonomic cushion designed to support the lower back.",
    "category": "Furniture",
    "price": "799.00"
  },
  {
    "name": "Whiteboard",
    "description": "Magnetic whiteboard with smooth writing surface.",
    "category": "Office",
    "price": "999.00"
  },
  {
    "name": "Stapler Set",
    "description": "Heavy-duty stapler with staples and staple remover.",
    "category": "Office",
    "price": "349.00"
  },
  {
    "name": "Printer",
    "description": "Compact wireless inkjet printer for home and office use.",
    "category": "Office",
    "price": "6499.00"
  }
]

export const seedData = async()=>{

    data.forEach(async d => {
        await db.insert(productSchema).values({
            name : d.name,
            description : d.description,
            category : d.category,
            price : d.price
        })
        console.log("Data inserted");
        
    });
    
}


 