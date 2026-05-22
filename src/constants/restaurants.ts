export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: string;
  image: string;
  tags: string[];
  popular: boolean;
  menu: Dish[];
}

export const RESTAURANTS: Restaurant[] = [
  {
    id: '1',
    name: 'Punjab Da Dhaba',
    cuisine: 'North Indian & Mughlai',
    rating: 4.8,
    deliveryTime: '20-30 min',
    deliveryFee: 'Free',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=600&auto=format&fit=crop',
    tags: ['North Indian', 'Mughlai', 'Tandoor'],
    popular: true,
    menu: [
      {
        id: '101',
        name: 'Butter Chicken',
        description: 'Tender tandoori chicken pieces simmered in a rich, creamy tomato-based makhani gravy with butter, cream, kasuri methi, and aromatic whole spices.',
        price: 299,
        image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=400&auto=format&fit=crop',
        category: 'Main Course',
      },
      {
        id: '102',
        name: 'Dal Makhani',
        description: 'Slow-cooked overnight black urad dal and rajma simmered with fresh butter, cream, tomatoes, ginger-garlic paste, and finished with a tadka of cumin and ghee.',
        price: 249,
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=400&auto=format&fit=crop',
        category: 'Main Course',
      },
      {
        id: '103',
        name: 'Garlic Butter Naan',
        description: 'Soft leavened tandoor-baked flatbread brushed generously with melted garlic butter and sprinkled with fresh chopped coriander leaves and sesame seeds.',
        price: 69,
        image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=400&auto=format&fit=crop',
        category: 'Breads',
      },
      {
        id: '104',
        name: 'Masala Chaas',
        description: 'Refreshing chilled spiced buttermilk blended with roasted cumin powder, fresh mint leaves, green chilli, ginger, and a pinch of black salt.',
        price: 49,
        image: 'https://images.unsplash.com/photo-1571006682830-2bbd608ee5d2?q=80&w=400&auto=format&fit=crop',
        category: 'Beverages',
      },
    ],
  },
  {
    id: '2',
    name: 'Madras Dosa House',
    cuisine: 'South Indian & Filter Coffee',
    rating: 4.6,
    deliveryTime: '15-25 min',
    deliveryFee: '₹29',
    image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?q=80&w=600&auto=format&fit=crop',
    tags: ['South Indian', 'Dosa', 'Idli'],
    popular: true,
    menu: [
      {
        id: '201',
        name: 'Crispy Masala Dosa',
        description: 'Golden crispy fermented rice and urad dal crepe filled with spiced potato-onion masala, served with coconut chutney and piping hot sambar.',
        price: 149,
        image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?q=80&w=400&auto=format&fit=crop',
        category: 'Dosa',
      },
      {
        id: '202',
        name: 'Idli Sambar Platter',
        description: 'Four fluffy steamed rice cakes made from fermented batter, served with aromatic drumstick sambar, tangy tomato chutney, and fresh coconut chutney.',
        price: 99,
        image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=400&auto=format&fit=crop',
        category: 'Tiffin',
      },
      {
        id: '203',
        name: 'Medu Vada',
        description: 'Crispy golden deep-fried urad dal doughnuts with a soft fluffy interior, tempered with curry leaves and mustard seeds, served with sambar and chutney.',
        price: 79,
        image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?q=80&w=400&auto=format&fit=crop',
        category: 'Snacks',
      },
      {
        id: '204',
        name: 'Filter Kaapi',
        description: 'Authentic South Indian degree coffee brewed with dark-roasted peaberry beans and fresh chicory, mixed with hot frothy milk and served in a traditional dabara set.',
        price: 39,
        image: 'https://images.unsplash.com/photo-1610889556528-9a770e32642f?q=80&w=400&auto=format&fit=crop',
        category: 'Beverages',
      },
    ],
  },
  {
    id: '3',
    name: 'Hyderabadi Biryani Palace',
    cuisine: 'Biryani & Kebabs',
    rating: 4.9,
    deliveryTime: '25-40 min',
    deliveryFee: '₹49',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=600&auto=format&fit=crop',
    tags: ['Biryani', 'Kebabs', 'Hyderabadi'],
    popular: true,
    menu: [
      {
        id: '301',
        name: 'Hyderabadi Dum Biryani',
        description: 'Fragrant aged basmati rice layered with marinated tender goat meat, fried onions, saffron milk, mint, and whole spices, slow-cooked on dum in sealed handi.',
        price: 349,
        image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=400&auto=format&fit=crop',
        category: 'Biryani',
      },
      {
        id: '302',
        name: 'Galouti Kebab',
        description: 'Melt-in-your-mouth Lucknowi-style minced mutton kebabs made with over 100 ground spices, raw papaya tenderizer, and seared on tawa, served with ulte tawa ka paratha.',
        price: 279,
        image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=400&auto=format&fit=crop',
        category: 'Kebabs',
      },
      {
        id: '303',
        name: 'Mirchi Ka Salan',
        description: 'Tangy and spicy Hyderabadi curry made with long green chillies simmered in a rich gravy of roasted peanuts, sesame seeds, coconut, and tamarind.',
        price: 199,
        image: 'https://images.unsplash.com/photo-1574653853027-5382a3d23a15?q=80&w=400&auto=format&fit=crop',
        category: 'Sides',
      },
      {
        id: '304',
        name: 'Double Ka Meetha',
        description: 'Traditional Hyderabadi royal dessert of fried bread slices soaked in warm saffron-cardamom flavored sweetened reduced milk, garnished with dry fruits and rose petals.',
        price: 129,
        image: 'https://images.unsplash.com/photo-1567337710282-00832b415979?q=80&w=400&auto=format&fit=crop',
        category: 'Desserts',
      },
    ],
  },
  {
    id: '4',
    name: 'Delhi Chaat Corner',
    cuisine: 'Chaat & Street Food',
    rating: 4.5,
    deliveryTime: '10-20 min',
    deliveryFee: 'Free',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=600&auto=format&fit=crop',
    tags: ['Chaat', 'Street Food', 'Vegetarian'],
    popular: false,
    menu: [
      {
        id: '401',
        name: 'Pani Puri',
        description: 'Crispy hollow semolina puris filled with spiced potato-chickpea mixture and served with tangy tamarind water and spicy mint-coriander jaljeera pani.',
        price: 79,
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=400&auto=format&fit=crop',
        category: 'Chaat',
      },
      {
        id: '402',
        name: 'Chole Bhature',
        description: 'Spicy Punjabi-style chickpea curry cooked with tea-infused dark masala, served with deep-fried puffed white flour bhatura, pickled onion, and green chutney.',
        price: 129,
        image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?q=80&w=400&auto=format&fit=crop',
        category: 'Main Course',
      },
      {
        id: '403',
        name: 'Aloo Tikki Chaat',
        description: 'Crispy golden pan-fried spiced potato patties topped with tangy tamarind chutney, cool mint yogurt, sev, pomegranate seeds, and fresh coriander.',
        price: 89,
        image: 'https://images.unsplash.com/photo-1606491956689-2ea866880049?q=80&w=400&auto=format&fit=crop',
        category: 'Chaat',
      },
      {
        id: '404',
        name: 'Mango Lassi',
        description: 'Thick creamy chilled yogurt smoothie blended with ripe Alphonso mango pulp, a touch of cardamom, sugar, and topped with saffron strands and chopped pistachios.',
        price: 69,
        image: 'https://images.unsplash.com/photo-1527685609591-44b0aef2400b?q=80&w=400&auto=format&fit=crop',
        category: 'Beverages',
      },
    ],
  },
  {
    id: '5',
    name: 'Sharmaji Ki Mithai',
    cuisine: 'Indian Sweets & Desserts',
    rating: 4.7,
    deliveryTime: '15-25 min',
    deliveryFee: '₹19',
    image: 'https://images.unsplash.com/photo-1589119908995-c6837fa14848?q=80&w=600&auto=format&fit=crop',
    tags: ['Mithai', 'Sweets', 'Desserts'],
    popular: true,
    menu: [
      {
        id: '501',
        name: 'Gulab Jamun',
        description: 'Soft golden deep-fried khoya dumplings soaked in warm rose-cardamom flavored sugar syrup, garnished with slivered pistachios and dried rose petals.',
        price: 99,
        image: 'https://images.unsplash.com/photo-1666190077589-0tried4c3a89?q=80&w=400&auto=format&fit=crop',
        category: 'Mithai',
      },
      {
        id: '502',
        name: 'Kaju Katli',
        description: 'Signature diamond-shaped cashew nut fudge made with finely ground premium cashews, sugar, ghee, and delicately coated with edible pure silver vark.',
        price: 149,
        image: 'https://images.unsplash.com/photo-1589119908995-c6837fa14848?q=80&w=400&auto=format&fit=crop',
        category: 'Mithai',
      },
      {
        id: '503',
        name: 'Rabri Jalebi',
        description: 'Crispy spiral deep-fried fermented batter jalebis drenched in saffron sugar syrup, served warm with thick reduced sweetened rabri flavored with cardamom and kesar.',
        price: 119,
        image: 'https://images.unsplash.com/photo-1567337710282-00832b415979?q=80&w=400&auto=format&fit=crop',
        category: 'Mithai',
      },
      {
        id: '504',
        name: 'Kulfi Falooda',
        description: 'Creamy dense traditional Indian frozen dessert made from slow-reduced sweetened milk, served with rose falooda vermicelli, basil seeds, and chopped dry fruits.',
        price: 89,
        image: 'https://images.unsplash.com/photo-1571006682830-2bbd608ee5d2?q=80&w=400&auto=format&fit=crop',
        category: 'Desserts',
      },
    ],
  },
];
