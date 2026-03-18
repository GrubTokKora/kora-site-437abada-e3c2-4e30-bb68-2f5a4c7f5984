import { useState } from 'react';

type MenuItem = {
  name: string;
  description?: string;
  price?: string;
};

type MenuSectionProps = {
  title: string;
  subtitle?: string;
  items: MenuItem[];
  layout?: 'two-column' | 'single-column';
};

function MenuSection({ title, subtitle, items, layout = 'two-column' }: MenuSectionProps) {
  return (
    <section className="py-10 md:py-14">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-6">
          <h3 className="text-xl md:text-2xl tracking-[0.3em] text-vega-purple uppercase mb-1">
            {title}
          </h3>
          {subtitle && (
            <p className="text-sm md:text-base tracking-[0.25em] text-gray-700 uppercase">
              {subtitle}
            </p>
          )}
        </div>
        <div
          className={
            layout === 'two-column'
              ? 'grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4'
              : 'space-y-3'
          }
        >
          {items.map((item) => (
            <div
              key={item.name + (item.description ?? '')}
              className="flex justify-between gap-4 border-b border-dotted border-purple-300 pb-1"
            >
              <div>
                <p className="font-semibold tracking-wide text-gray-900 uppercase text-sm md:text-base">
                  {item.name}
                </p>
                {item.description && (
                  <p className="text-xs md:text-sm text-gray-700 mt-0.5">{item.description}</p>
                )}
              </div>
              {item.price && (
                <p className="font-semibold text-vega-purple text-sm md:text-base whitespace-nowrap">
                  {item.price}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Menu() {
  const [activeSection, setActiveSection] = useState('menu-weekly');
  const weeklySpecials: MenuItem[] = [
    { name: 'MONDAY · Bottle Beer', price: '5' },
    { name: 'MONDAY · Draft Beer', price: '7' },
    { name: 'TUESDAY · House Margarita', price: '10' },
    { name: 'WEDNESDAY · House Tequila 1 oz shot', price: '3' },
    { name: 'THURSDAY · Sangria', price: '10' },
    { name: 'SUNDAY · 1/2 Off Bottle Wine' },
  ];

  const happyHourBites: MenuItem[] = [
    { name: 'Wings', price: '8' },
    { name: 'Beef Nacho', price: '9' },
    { name: 'Avocado Fritters', price: '8' },
    { name: 'Ceviche Tostada', price: '8' },
    { name: 'Empanada Chicken or Beef', price: '5' },
    { name: 'Guacamole, Salsa & Arbol', price: '8' },
  ];

  const happyHourDrinks: MenuItem[] = [
    { name: 'Draft Beer', price: '7' },
    { name: 'Bottle Beer', price: '5' },
    { name: 'House Wine', price: '9' },
    { name: 'House Margarita', description: '+ Flavour 2 + Floater 5', price: '9' },
    { name: 'Sangria', price: '9' },
  ];

  const dessertItems: MenuItem[] = [
    {
      name: 'Churros',
      description: 'Fried pastry, cinnamon, chocolate, ice crème',
      price: '10',
    },
    {
      name: 'Mexican Choco Tres Leche',
      description: 'Traditional Mexican sponge cake',
      price: '10',
    },
    {
      name: 'Fried Ice Crème',
      description: 'Corn crumbs, popcorn, caramel, cinnamon',
      price: '10',
    },
    {
      name: 'Flan',
      description: 'Mexican custard',
      price: '7',
    },
  ];

  const cordialItems: MenuItem[] = [
    { name: 'Kahlua', price: '10' },
    { name: 'Grand Marnier', price: '12' },
    { name: 'Baileys', price: '10' },
    { name: 'Sambuca', price: '10' },
  ];

  const hotDrinks: MenuItem[] = [
    { name: 'Coffee', price: '4' },
    { name: 'Espresso', price: '4' },
    { name: 'Cappuccino', price: '6' },
    { name: 'Tea', price: '4' },
    { name: 'Double Espresso', price: '6' },
    { name: 'Mexican Coffee + Liquor', price: '12' },
  ];

  // Dinner menu – condensed but structured similar to the print menu
  const smallPlates: MenuItem[] = [
    { name: 'Wings of Fire', description: 'Sweet chipotle chili/orange habanero', price: '14' },
    { name: 'Loaded Nachos', description: 'Corn tortilla, cheese, beans, salsa, jalapeño, crema, guacamole', price: '12' },
    { name: 'Avocado Fritters', description: 'Corn, cheese, chili lime mayo', price: '12' },
    { name: 'Chicken Flautas', description: 'Corn tortilla, crema, queso fresco, tomatillo', price: '12' },
    { name: 'Mexican Street Corn', description: 'Grilled corn, cotija cheese, mayo, queso fresco', price: '9' },
    { name: 'Guacamole', description: 'Fresh avocado, lime, cilantro, tomato, jalapeño', price: '16' },
    { name: 'Shrimp Ceviche', description: 'Lime, cilantro, pepper, corn, celery', price: '16' },
    { name: 'Tostones', description: 'Hand mashed plantain', price: '6' },
    { name: 'Empanada', description: 'Fried flour tortilla, Mexican spices, chicken or ground beef', price: '12' },
    { name: 'Coco Loco Shrimp', description: 'Coconut, mango, habanero salsa', price: '15' },
  ];

  const soupSalad: MenuItem[] = [
    { name: 'Chicken Tortilla Soup', description: 'Corn tortilla chips, avocado, queso fresco', price: '10' },
    { name: 'Beef Soup', description: 'Slow cooked brisket, Mexican spices, corn, potato', price: '12' },
    { name: 'Black Bean Soup', description: 'Onion, cilantro, garlic, cumin', price: '8' },
    { name: 'Avocado Salad', description: 'Greens, jicama, tomato, cilantro dressing', price: '12' },
    {
      name: 'Taco Shell Salad',
      description: 'Flour shell, greens, tomato, beans, cheese, crema, guacamole',
      price: '12',
    },
  ];

  const classics: MenuItem[] = [
    { name: 'Tacos', description: 'Soft corn tortilla (3), salsa, rice, beans', price: '16–24' },
    { name: 'Fajita', description: 'Onion, peppers, flour tortilla, crema, rice, beans', price: '20–30' },
    { name: 'Burrito', description: 'Flour tortilla, rice, beans, cheese, salsa', price: '15–22' },
    { name: 'Enchilada', description: 'Corn tortilla, salsa, crema, cheese, rice, beans', price: '19–27' },
    { name: 'Quesadilla', description: 'Flour tortilla, cheese, crema, tomato, rice, beans', price: '16–24' },
    { name: 'Chimichanga', description: 'Fried flour tortilla, cheese, rice, beans', price: '18–27' },
  ];

  const signature: MenuItem[] = [
    { name: 'Chipotle Chicken', description: 'Lemon garlic, chipotle, rice, market vegetables', price: '23' },
    { name: 'Churrasco', description: 'Skirt steak, chimichurri, fried plantain, beans, market vegetables', price: '35' },
    { name: 'Carnitas', description: 'Slow cooked braised ribs, dark beer, rice, beans, salsa', price: '22' },
    { name: 'Salmon Yucatan', description: 'Pan seared, creamy avocado salsa, market vegetables', price: '27' },
    { name: 'Shrimp Diablo', description: 'Shrimp, chipotle butter, rice, market vegetables', price: '27' },
  ];

  const sidesKids: MenuItem[] = [
    { name: 'Guacamole', price: '6' },
    { name: 'Homemade Chips & Salsa', price: '6' },
    { name: 'Fried Plantain', price: '6' },
    { name: 'Rice (Red / White)', price: '4 / 6' },
    { name: 'Beans', price: '4 / 6' },
    { name: 'Kids · Chicken Fingers', description: '10 and under, served with fries', price: '12' },
    { name: 'Kids · Cheese Quesadilla', price: '12' },
    { name: 'Kids · Ground Beef Cheese Taco', price: '12' },
  ];

  const sectionLinks = [
    { id: 'menu-weekly', label: 'Weekly Specials' },
    { id: 'menu-happy-hour', label: 'Happy Hour' },
    { id: 'menu-dinner', label: 'Dinner Menu' },
    { id: 'menu-dessert', label: 'Dessert & Drinks' },
  ];

  return (
    <section id="menu" className="relative bg-white py-14 md:py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-5xl tracking-[0.30em] uppercase text-primary mb-4 font-semibold">
            Explore our menus
          </h2>
          <p className="max-w-2xl mx-auto text-sm md:text-base text-gray-600">
            Browse weekly drink specials, happy hour bites and drinks, our full dinner offerings,
            and decadent desserts & coffee – all inspired by vibrant Mexican flavors.
          </p>
        </div>

        {/* Horizontally scrollable section headings */}
        <div className="mt-4 md:mt-6">
          <div className="px-4 md:px-8 py-3 overflow-x-auto">
            <div className="flex justify-center items-center gap-3 md:gap-4 mx-auto w-max">
              {sectionLinks.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => setActiveSection(link.id)}
                  className={`whitespace-nowrap px-4 md:px-5 py-2 rounded-full border text-xs md:text-sm tracking-[0.16em] uppercase transition-colors duration-300 ${
                    activeSection === link.id
                      ? 'bg-primary text-white border-primary shadow-sm'
                      : 'border-purple-200 bg-white/80 text-gray-800 hover:bg-primary hover:text-white hover:border-primary'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Specials */}
      {activeSection === 'menu-weekly' && (
        <div className="py-2">
          <MenuSection
            title="WEEKLY SPECIALS"
            subtitle="All week long"
            items={weeklySpecials}
            layout="single-column"
          />
        </div>
      )}

      {/* Happy Hour */}
      {activeSection === 'menu-happy-hour' && (
        <div className="bg-white py-10 md:py-14">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-6">
              <h3 className="text-xl md:text-2xl tracking-[0.3em] text-vega-purple uppercase mb-1">
                Happy Hour
              </h3>
              <p className="text-xs md:text-sm tracking-[0.25em] uppercase text-gray-700">
                Monday – Friday 4PM–7PM
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h4 className="text-lg tracking-[0.25em] text-vega-purple uppercase mb-3">
                  Bites
                </h4>
                <MenuSection title="" items={happyHourBites} layout="single-column" />
              </div>
              <div>
                <h4 className="text-lg tracking-[0.25em] text-vega-purple uppercase mb-3">
                  Drinks
                </h4>
                <MenuSection title="" items={happyHourDrinks} layout="single-column" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dinner Menu */}
      {activeSection === 'menu-dinner' && (
        <div className="py-10 md:py-14">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-8">
              <h3 className="text-xl md:text-2xl tracking-[0.3em] text-vega-purple uppercase">
                Dinner
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div>
                <h4 className="text-lg tracking-[0.25em] text-gray-900 uppercase mb-3">
                  Small Plates
                </h4>
                <MenuSection title="" items={smallPlates} layout="single-column" />

                <h4 className="text-lg tracking-[0.25em] text-gray-900 uppercase mt-6 mb-3">
                  Soup & Salad
                </h4>
                <MenuSection title="" items={soupSalad} layout="single-column" />
              </div>

              <div>
                <h4 className="text-lg tracking-[0.25em] text-gray-900 uppercase mb-3">
                  Classics
                </h4>
                <MenuSection title="" items={classics} layout="single-column" />
              </div>

              <div>
                <h4 className="text-lg tracking-[0.25em] text-gray-900 uppercase mb-3">
                  Signature
                </h4>
                <MenuSection title="" items={signature} layout="single-column" />

                <h4 className="text-lg tracking-[0.25em] text-gray-900 uppercase mt-6 mb-3">
                  Sides & Kids
                </h4>
                <MenuSection title="" items={sidesKids} layout="single-column" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dessert & Drinks */}
      {activeSection === 'menu-dessert' && (
        <div className="bg-white py-10 md:py-14">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-6">
              <h3 className="text-xl md:text-2xl tracking-[0.3em] text-vega-purple uppercase mb-2">
                Dessert
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <MenuSection title="Dessert" items={dessertItems} layout="single-column" />
              </div>
              <div className="space-y-6">
                <MenuSection title="Cordials" items={cordialItems} layout="single-column" />
                <MenuSection title="Hot Drinks" items={hotDrinks} layout="single-column" />
              </div>
            </div>
            <p className="mt-8 text-center text-xs md:text-sm tracking-[0.3em] uppercase text-orange-500">
              Stressed is just dessert spelled backwards
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

