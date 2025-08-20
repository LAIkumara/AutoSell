import { useEffect, useState } from "react";
import UploadFile from "../utils/uploadFile";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function CreateAdvertisement() {

  const [adId, setAdId] = useState("")
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [altCategory, setAltCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [submodel, setSubmodel] = useState("");
  const [year, setYear] = useState("");
  const [images, setImages] = useState([]);
  const [condition, setCondition] = useState("");
  const [location, setLocation] = useState({ city: "", state: "" });
  const [contactInfo, setContactInfo] = useState({ phone: "", email: "", whatsapp: "" });
  const [price, setPrice] = useState("");
  const [isNegotiable, setIsNegotiable] = useState(false);
  const [tags, setTags] = useState([]);
  const [adType, setAdType] = useState("standard");
  const [status, setStatus] = useState("pending");
  const [author, setAuthor] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const [categoryData, setCategoryData] = useState([]);
  const [altCategoryData, setAltCategoryData] = useState([]);
  const [brandData, setBrandData] = useState([]);
  const [modelData, setModelData] = useState([]);
  const [submodelData, setSubmodelData] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_BACKEND_URL + '/api/auth/category');
        setCategoryData(response.data);
        console.log("Categories fetched:", response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = async (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    
    // Reset dependent dropdowns
    setAltCategory("");
    setBrand("");
    setModel("");
    setSubmodel("");
    setAltCategoryData([]);
    setBrandData([]);
    setModelData([]);
    setSubmodelData([]);
    
    if (!selectedCategory) return;
    
    try {
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL + `/api/auth/category/${selectedCategory}/altCategories`);
      // If backend returns the whole category document, extract altCategories
      const altCategories = response.data.altCategories || response.data;
      setAltCategoryData(altCategories);
    } catch (error) {
      console.error("Error fetching alternative categories:", error);
    }
  }

  const handleAltCategoryChange = async (e) => {
    const selectedAltCategory = e.target.value;
    setAltCategory(selectedAltCategory);
    
    // Reset dependent dropdowns
    setBrand("");
    setModel("");
    setSubmodel("");
    setBrandData([]);
    setModelData([]);
    setSubmodelData([]);
    
    if (!selectedAltCategory) return;
    
    try {
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL + `/api/auth/category/${category}/altCategories/${selectedAltCategory}/brands`);
      // If backend returns the whole structure, extract brands
      const brands = response.data.brands || response.data;
      setBrandData(brands);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  }

  const handleBrandChange = async (e) => {
    const selectedBrand = e.target.value;
    setBrand(selectedBrand);
    
    // Reset dependent dropdowns
    setModel("");
    setSubmodel("");
    setModelData([]);
    setSubmodelData([]);
    
    if (!selectedBrand) return;
    
    try {
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL + `/api/auth/category/${category}/altCategories/${altCategory}/brands/${selectedBrand}/models`);
      // If backend returns the whole structure, extract models
      const models = response.data.models || response.data;
      setModelData(models);
    } catch (error) {
      console.error("Error fetching models:", error);
    }
  }

  const handleModelChange = async (e) => {
    const selectedModel = e.target.value;
    setModel(selectedModel);
    
    // Reset dependent dropdown
    setSubmodel("");
    setSubmodelData([]);
    
    if (!selectedModel) return;
    
    try {
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL + `/api/auth/category/${category}/altCategories/${altCategory}/brands/${brand}/models/${selectedModel}/submodels`);
      // If backend returns the whole structure, extract submodels
      const submodels = response.data.submodels || response.data;
      setSubmodelData(submodels);
    } catch (error) {
      console.error("Error fetching submodels:", error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const imageUrls = await UploadFile(images);
      const adData = {
        adId: adId,
        title: title,
        description: description,
        category: category,
        altCategory: altCategory,
        brand: brand,
        model: model,
        submodel: submodel,
        year: year,
        images: imageUrls,
        condition: condition,
        location: location,
        contactInfo: contactInfo,
        price: price,
        isNegotiable: isNegotiable,
        tags: tags,
        adType: adType,
        status: status,
      };

      const response = await axios.post(import.meta.env.VITE_BACKEND_URL + '/api/auth/advertisement', adData);
      console.log("Advertisement created:", response.data);
      setAdId(response.data._id);
      toast.success("Advertisement created successfully!");
      navigate("/advertisements");
    } catch (error) {
      console.error("Error creating advertisement:", error);
      toast.error("Failed to create advertisement.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <h1>Create Advertisement</h1>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Category:</label>
          <select value={category} onChange={handleCategoryChange} required>
            <option value="">Select Category</option>
            {Array.isArray(categoryData.data) && categoryData.data.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Alternative Category:</label>
          <select value={altCategory} onChange={handleAltCategoryChange} required disabled={!category}>
            <option value="">Select Alternative Category</option>
            {Array.isArray(altCategoryData.data) && altCategoryData.data.map((altCat) => (
              <option key={altCat._id} value={altCat._id}>
                {altCat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Brand:</label>
          <select value={brand} onChange={handleBrandChange} required disabled={!altCategory}>
            <option value="">Select Brand</option>
            {Array.isArray(brandData.data) && brandData.data.map((brandItem) => (
              <option key={brandItem._id} value={brandItem._id}>
                {brandItem.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Model:</label>
          <select value={model} onChange={handleModelChange} required disabled={!brand}>
            <option value="">Select Model</option>
            {Array.isArray(modelData.data) && modelData.data.map((modelItem) => (
              <option key={modelItem._id} value={modelItem._id}>
                {modelItem.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Submodel:</label>
          <select
            value={submodel}
            onChange={(e) => setSubmodel(e.target.value)}
            required
            disabled={!model}
          >
            <option value="">Select Submodel</option>
            {Array.isArray(submodelData.data) && submodelData.data.map((sub) => (
              <option key={sub._id} value={sub._id}>
                {sub.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Year:</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Condition:</label>
          <input
            type="text"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Location:</label>
          <input
            type="text"
            placeholder="City"
            value={location.city}
            onChange={(e) =>
              setLocation({ ...location, city: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="State"
            value={location.state}
            onChange={(e) =>
              setLocation({ ...location, state: e.target.value })
            }
            required
          />
        </div>

        <div>
          <label>Contact Info:</label>
          <input
            type="text"
            placeholder="Phone"
            value={contactInfo.phone}
            onChange={(e) =>
              setContactInfo({ ...contactInfo, phone: e.target.value })
            }
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={contactInfo.email}
            onChange={(e) =>
              setContactInfo({ ...contactInfo, email: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="WhatsApp"
            value={contactInfo.whatsapp}
            onChange={(e) =>
              setContactInfo({ ...contactInfo, whatsapp: e.target.value })
            }
          />
        </div>

        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <label>
            <input
              type="checkbox"
              checked={isNegotiable}
              onChange={(e) => setIsNegotiable(e.target.checked)}
            />
            Negotiable
          </label>
        </div>

        <div>
          <label>Tags:</label>
          <input
            type="text"
            value={tags.join(",")}
            onChange={(e) => setTags(e.target.value.split(","))}
          />
        </div>

        <div>
          <label>Ad Type:</label>
          <select value={adType} onChange={(e) => setAdType(e.target.value)}>
            <option value="standard">Standard</option>
            <option value="premium">Premium</option>
          </select>
        </div>

        <div>
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div>
          <label>Images:</label>
          <input
            type="file"
            multiple
            onChange={(e) => setImages([...e.target.files])}
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}