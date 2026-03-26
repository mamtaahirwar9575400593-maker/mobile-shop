import { motion } from "motion/react";

const CATEGORIES = [
  { label: "Apple", emoji: "🍎", color: "bg-gray-50 hover:bg-gray-100" },
  { label: "Samsung", emoji: "📱", color: "bg-blue-50 hover:bg-blue-100" },
  { label: "Google", emoji: "🔍", color: "bg-green-50 hover:bg-green-100" },
  { label: "Xiaomi", emoji: "🌟", color: "bg-orange-50 hover:bg-orange-100" },
  { label: "Flagship", emoji: "👑", color: "bg-purple-50 hover:bg-purple-100" },
  { label: "Budget", emoji: "💰", color: "bg-yellow-50 hover:bg-yellow-100" },
  { label: "Accessories", emoji: "🎧", color: "bg-teal-50 hover:bg-teal-100" },
  { label: "Sale", emoji: "🏷️", color: "bg-red-50 hover:bg-red-100" },
];

export function CategorySection() {
  return (
    <section className="py-10 px-4 sm:px-6 max-w-7xl mx-auto" id="brands">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-2xl font-bold text-center text-foreground mb-2">
          Shop by Category
        </h2>
        <p className="text-center text-muted-foreground mb-8 text-sm">
          Find exactly what you're looking for
        </p>

        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
          {CATEGORIES.map((cat, i) => (
            <motion.button
              key={cat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className={`flex flex-col items-center gap-2 p-3 sm:p-4 rounded-2xl cursor-pointer transition-all duration-200 border border-transparent hover:border-border hover:shadow-card group ${cat.color}`}
              data-ocid={`category.${cat.label.toLowerCase()}.button`}
            >
              <span className="text-2xl sm:text-3xl group-hover:scale-110 transition-transform duration-200">
                {cat.emoji}
              </span>
              <span className="text-xs sm:text-sm font-medium text-foreground">
                {cat.label}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
