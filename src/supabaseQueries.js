import { supabase } from "./supabase";

// ==============================
// Deals - بتجيب حسب الفلتر
// ==============================
export const getDeals = async (filterType = "Pizza & Fast food") => {
  const { data, error } = await supabase
    .from("deals")
    .select("*")
    .eq("filter_type", filterType)
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching deals:", error.message);
    return [];
  }
  return data;
};

// ==============================
// Categories
// ==============================
export const getCategories = async () => {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching categories:", error.message);
    return [];
  }
  return data;
};

// ==============================
// Restaurants
// ==============================
export const getRestaurants = async () => {
  const { data, error } = await supabase
    .from("restaurants")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching restaurants:", error.message);
    return [];
  }
  return data;
};