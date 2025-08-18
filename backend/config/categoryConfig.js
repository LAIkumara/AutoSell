const categoryConfig = {
    electronics: {
      name: 'Electronics',
      subcategories: {
        mobile_phones: {
          name: 'Mobile Phones',
          attributes: {
            brand: {
              type: 'select',
              required: true,
              options: ['Apple', 'Samsung', 'OnePlus', 'Google', 'Xiaomi', 'Huawei', 'Oppo', 'Vivo', 'Other']
            },
            model: {
              type: 'dependent_select', // Depends on brand
              required: true,
              dependsOn: 'brand',
              options: {
                'Apple': ['iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15', 'iPhone 14 Pro Max', 'iPhone 14 Pro', 'iPhone 14', 'iPhone 13', 'iPhone 12'],
                'Samsung': ['Galaxy S24 Ultra', 'Galaxy S24+', 'Galaxy S24', 'Galaxy S23 Ultra', 'Galaxy Note 20', 'Galaxy A54', 'Galaxy A34'],
                'OnePlus': ['OnePlus 12', 'OnePlus 11', 'OnePlus Nord 3', 'OnePlus 10 Pro'],
                'Google': ['Pixel 8 Pro', 'Pixel 8', 'Pixel 7 Pro', 'Pixel 7', 'Pixel 6a'],
                'Other': [] // Free text input
              }
            },
            storage: {
              type: 'select',
              required: true,
              options: ['64GB', '128GB', '256GB', '512GB', '1TB']
            },
            color: {
              type: 'select',
              required: false,
              options: ['Black', 'White', 'Blue', 'Red', 'Green', 'Purple', 'Gold', 'Silver', 'Other']
            },
            condition: {
              type: 'select',
              required: true,
              options: ['New', 'Like New', 'Good', 'Fair', 'Poor']
            }
          }
        },
        laptops: {
          name: 'Laptops',
          attributes: {
            brand: {
              type: 'select',
              required: true,
              options: ['Apple', 'Dell', 'HP', 'Lenovo', 'Asus', 'Acer', 'MSI', 'Other']
            },
            model: {
              type: 'text',
              required: true
            },
            processor: {
              type: 'select',
              required: true,
              options: ['Intel Core i3', 'Intel Core i5', 'Intel Core i7', 'Intel Core i9', 'AMD Ryzen 3', 'AMD Ryzen 5', 'AMD Ryzen 7', 'AMD Ryzen 9', 'Apple M1', 'Apple M2', 'Apple M3']
            },
            ram: {
              type: 'select',
              required: true,
              options: ['4GB', '8GB', '16GB', '32GB', '64GB']
            },
            storage: {
              type: 'select',
              required: true,
              options: ['128GB SSD', '256GB SSD', '512GB SSD', '1TB SSD', '2TB SSD', '1TB HDD', '2TB HDD']
            }
          }
        }
      }
    },
    
    vehicles: {
      name: 'Vehicles',
      subcategories: {
        cars: {
          name: 'Cars',
          attributes: {
            make: {
              type: 'select',
              required: true,
              options: ['Toyota', 'Honda', 'Ford', 'BMW', 'Mercedes-Benz', 'Audi', 'Nissan', 'Hyundai', 'Kia', 'Mazda', 'Other']
            },
            model: {
              type: 'text',
              required: true
            },
            year: {
              type: 'number',
              required: true,
              min: 1990,
              max: new Date().getFullYear() + 1
            },
            mileage: {
              type: 'number',
              required: true,
              min: 0
            },
            fuelType: {
              type: 'select',
              required: true,
              options: ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG', 'LPG']
            },
            transmission: {
              type: 'select',
              required: true,
              options: ['Manual', 'Automatic', 'CVT']
            },
            bodyType: {
              type: 'select',
              required: true,
              options: ['Sedan', 'Hatchback', 'SUV', 'Coupe', 'Convertible', 'Wagon', 'Pickup']
            }
          }
        }
      }
    },
    
    real_estate: {
      name: 'Real Estate',
      subcategories: {
        apartments: {
          name: 'Apartments',
          attributes: {
            bedrooms: {
              type: 'number',
              required: true,
              min: 0,
              max: 10
            },
            bathrooms: {
              type: 'number',
              required: true,
              min: 1,
              max: 10
            },
            area: {
              type: 'number',
              required: true,
              min: 100
            },
            areaUnit: {
              type: 'select',
              required: true,
              options: ['sq ft', 'sq m']
            },
            furnished: {
              type: 'select',
              required: true,
              options: ['Fully Furnished', 'Semi Furnished', 'Unfurnished']
            },
            floor: {
              type: 'number',
              required: false,
              min: 0,
              max: 50
            },
            parking: {
              type: 'select',
              required: false,
              options: ['Yes', 'No']
            }
          }
        }
      }
    }
  };
  
  // Helper function to get category structure
  const getCategoryStructure = () => {
    return Object.keys(categoryConfig).map(categoryKey => ({
      value: categoryKey,
      label: categoryConfig[categoryKey].name,
      subcategories: Object.keys(categoryConfig[categoryKey].subcategories).map(subKey => ({
        value: subKey,
        label: categoryConfig[categoryKey].subcategories[subKey].name
      }))
    }));
  };
  
  // Helper function to get attributes for a specific subcategory
  const getSubcategoryAttributes = (category, subcategory) => {
    if (categoryConfig[category] && categoryConfig[category].subcategories[subcategory]) {
      return categoryConfig[category].subcategories[subcategory].attributes;
    }
    return {};
  };
  
  // Helper function to validate ad attributes
  const validateAdAttributes = (category, subcategory, attributes) => {
    const requiredAttributes = getSubcategoryAttributes(category, subcategory);
    const errors = [];
    
    Object.keys(requiredAttributes).forEach(attrKey => {
      const attrConfig = requiredAttributes[attrKey];
      if (attrConfig.required && !attributes[attrKey]) {
        errors.push(`${attrKey} is required for ${subcategory}`);
      }
    });
    
    return errors;
  };
export { categoryConfig, getCategoryStructure, getSubcategoryAttributes, validateAdAttributes };