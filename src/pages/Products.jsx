import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "../components/ProductCard";
import { products, categoryInfo, allBrands, priceRanges } from "../data";
import { concerns, skinTypes, ingredients } from "../data/editorial";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");

  const categoryFilter = searchParams.get("category") || "";
  const searchQuery = searchParams.get("search") || "";
  const brandFilter = searchParams.get("brand") || "";
  const priceFilter = searchParams.get("price") || "";
  const concernFilter = searchParams.get("concern") || "";
  const skinTypeFilter = searchParams.get("skintype") || "";
  const ingredientFilter = searchParams.get("ingredient") || "";
  const finishFilter = searchParams.get("finish") || "";
  const sortBy = searchParams.get("sort") || "popular";

  const filtered = useMemo(() => {
    let result = [...products];
    if (categoryFilter) result = result.filter(p => p.category === categoryFilter);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.ingredients.toLowerCase().includes(q));
    }
    if (brandFilter) result = result.filter(p => p.brand === brandFilter);
    if (priceFilter) {
      const [min, max] = priceFilter.split("-").map(Number);
      result = result.filter(p => p.price >= min && p.price <= max);
    }
    if (concernFilter) result = result.filter(p => p.concerns.includes(concernFilter));
    if (skinTypeFilter) result = result.filter(p => p.skinTypes.includes(skinTypeFilter));
    if (ingredientFilter) result = result.filter(p => p.ingredient === ingredientFilter);
    if (finishFilter) result = result.filter(p => p.finish === finishFilter);

    switch (sortBy) {
      case "price-low": result.sort((a, b) => a.price - b.price); break;
      case "price-high": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      case "newest": result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
      case "discount": result.sort((a, b) => b.discount - a.discount); break;
      default: result.sort((a, b) => b.reviews - a.reviews); break;
    }
    return result;
  }, [categoryFilter, searchQuery, brandFilter, priceFilter, concernFilter, skinTypeFilter, ingredientFilter, finishFilter, sortBy]);

  const updateFilter = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    setSearchParams(params);
  };

  const clearFilters = () => setSearchParams({});

  const activeFilters = [categoryFilter, brandFilter, priceFilter, concernFilter, skinTypeFilter, ingredientFilter, finishFilter].filter(Boolean).length;
  const hasActiveFilters = activeFilters > 0 || searchQuery;

  const currentCat = categoryInfo.find(c => c.id === categoryFilter);

  const FilterBtn = ({ isActive, onClick, children }) => (
    <button onClick={onClick} className={`block w-full text-left px-3 py-2 rounded-lg text-xs sm:text-sm transition-all ${isActive ? "bg-primary-50 text-primary-700 font-semibold shadow-sm" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}>{children}</button>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-400 flex-wrap">
            <Link to="/" className="hover:text-primary-600">Home</Link><span>/</span>
            <span className="text-gray-900 font-medium">{currentCat ? currentCat.name : searchQuery ? `"${searchQuery}"` : "All Products"}</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mt-0.5">{currentCat ? currentCat.name : searchQuery ? `Results for "${searchQuery}"` : "All Products"}</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{filtered.length} products</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setMobileFiltersOpen(true)} className="lg:hidden flex items-center gap-2 px-4 py-2.5 border border-primary-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-primary-50">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
            Filters {hasActiveFilters ? `(${activeFilters})` : ""}
          </button>
          <select value={sortBy} onChange={(e) => updateFilter("sort", e.target.value)} className="px-3 py-2.5 border border-primary-200 rounded-xl text-sm text-gray-700 bg-white focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none">
            <option value="popular">Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest First</option>
            <option value="discount">Biggest Discount</option>
          </select>
        </div>
      </div>

      <div className="flex gap-8">
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-28 space-y-6 max-h-[calc(100vh-10rem)] overflow-y-auto pr-2">
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <h3 className="font-semibold text-gray-900 text-sm">Shop by Concern</h3>
              </div>
              <div className="space-y-0.5">
                {concerns.map(c => (
                  <FilterBtn key={c.id} isActive={concernFilter === c.id} onClick={() => updateFilter("concern", concernFilter === c.id ? "" : c.id)}>
                    <span className="mr-1.5">{c.icon}</span>{c.name}
                  </FilterBtn>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 text-sm mb-2.5">Categories</h3>
              <div className="space-y-0.5">
                <FilterBtn isActive={!categoryFilter} onClick={() => updateFilter("category", "")}>All</FilterBtn>
                {categoryInfo.map(cat => (
                  <FilterBtn key={cat.id} isActive={categoryFilter === cat.id} onClick={() => updateFilter("category", categoryFilter === cat.id ? "" : cat.id)}>{cat.name}</FilterBtn>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 text-sm mb-2.5">Skin Type</h3>
              <div className="space-y-0.5">
                {skinTypes.map(s => (
                  <FilterBtn key={s.id} isActive={skinTypeFilter === s.id} onClick={() => updateFilter("skintype", skinTypeFilter === s.id ? "" : s.id)}>{s.emoji} {s.name}</FilterBtn>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 text-sm mb-2.5">Key Ingredient</h3>
              <div className="space-y-0.5">
                {ingredients.map(ing => (
                  <FilterBtn key={ing.id} isActive={ingredientFilter === ing.id} onClick={() => updateFilter("ingredient", ingredientFilter === ing.id ? "" : ing.id)}>{ing.name}</FilterBtn>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2.5">
                <h3 className="font-semibold text-gray-900 text-sm">Brands</h3>
                {brandFilter && <button onClick={() => updateFilter("brand", "")} className="text-xs text-primary-600 hover:underline">Clear</button>}
              </div>
              <div className="space-y-0.5 max-h-40 overflow-y-auto">
                {allBrands.map(b => (
                  <FilterBtn key={b} isActive={brandFilter === b} onClick={() => updateFilter("brand", brandFilter === b ? "" : b)}>{b}</FilterBtn>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 text-sm mb-2.5">Price Range</h3>
              <div className="space-y-0.5">
                {priceRanges.map(r => (
                  <FilterBtn key={r.id} isActive={priceFilter === r.id} onClick={() => updateFilter("price", priceFilter === r.id ? "" : r.id)}>{r.label}</FilterBtn>
                ))}
              </div>
            </div>

            {hasActiveFilters && (
              <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={clearFilters} className="w-full py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm font-medium rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all shadow-lg shadow-primary-200/30">
                Clear All {activeFilters} {activeFilters === 1 ? "Filter" : "Filters"}
              </motion.button>
            )}
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <span className="text-5xl">🔍</span>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">No products match your criteria</h3>
              <p className="mt-1 text-sm text-gray-500">Try adjusting the filters or explore a different category.</p>
              <button onClick={clearFilters} className="mt-6 px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all">Clear All Filters</button>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
              {filtered.map((product, i) => (
                <motion.div key={product.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: (i % 12) * 0.03 }} layout>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {mobileFiltersOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={() => setMobileFiltersOpen(false)} />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 right-0 w-80 max-w-full bg-white z-50 shadow-2xl lg:hidden overflow-y-auto"
            >
              <div className="p-5 border-b border-primary-100 flex items-center justify-between">
                <h2 className="font-semibold text-lg">Filters {hasActiveFilters ? `(${activeFilters})` : ""}</h2>
                <button onClick={() => setMobileFiltersOpen(false)} className="p-2 rounded-lg hover:bg-primary-50"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
              </div>
              <div className="p-5 space-y-6">
                <div>
                  <h3 className="font-semibold text-sm text-gray-900 mb-2">Concern</h3>
                  <div className="flex flex-wrap gap-2">
                    {concerns.map(c => (
                      <button key={c.id} onClick={() => { updateFilter("concern", concernFilter === c.id ? "" : c.id); setMobileFiltersOpen(false); }} className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${concernFilter === c.id ? "bg-primary-50 border-primary-300 text-primary-700" : "border-gray-200 text-gray-600 hover:border-primary-200"}`}>{c.icon} {c.name}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-gray-900 mb-2">Skin Type</h3>
                  <div className="flex flex-wrap gap-2">
                    {skinTypes.map(s => (
                      <button key={s.id} onClick={() => { updateFilter("skintype", skinTypeFilter === s.id ? "" : s.id); setMobileFiltersOpen(false); }} className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${skinTypeFilter === s.id ? "bg-primary-50 border-primary-300 text-primary-700" : "border-gray-200 text-gray-600 hover:border-primary-200"}`}>{s.emoji} {s.name}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-gray-900 mb-2">Category</h3>
                  <div className="space-y-0.5">
                    <button onClick={() => { updateFilter("category", ""); setMobileFiltersOpen(false); }} className={`block w-full text-left px-3 py-2 rounded-lg text-sm ${!categoryFilter ? "bg-primary-50 text-primary-700 font-medium" : "text-gray-600"}`}>All</button>
                    {categoryInfo.map(cat => (
                      <button key={cat.id} onClick={() => { updateFilter("category", cat.id); setMobileFiltersOpen(false); }} className={`block w-full text-left px-3 py-2 rounded-lg text-sm ${categoryFilter === cat.id ? "bg-primary-50 text-primary-700 font-medium" : "text-gray-600"}`}>{cat.name}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-gray-900 mb-2">Price</h3>
                  <div className="space-y-0.5">
                    {priceRanges.map(r => (
                      <button key={r.id} onClick={() => { updateFilter("price", priceFilter === r.id ? "" : r.id); setMobileFiltersOpen(false); }} className={`block w-full text-left px-3 py-2 rounded-lg text-sm ${priceFilter === r.id ? "bg-primary-50 text-primary-700 font-medium" : "text-gray-600"}`}>{r.label}</button>
                    ))}
                  </div>
                </div>
                {hasActiveFilters && (
                  <button onClick={() => { clearFilters(); setMobileFiltersOpen(false); }} className="w-full py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm font-medium rounded-xl">Clear All Filters</button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
