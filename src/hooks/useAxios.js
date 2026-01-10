import { useState } from "react";
import axiosInstance from "../../src/api/axios";

const useAxiosCRUD = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // READ (GET)
  const fetchAll = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(url);
      setData(response.data);
    } catch {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  // CREATE (POST)
  const createItem = async (newItem) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(url, newItem);

      // Add new item to local state
      setData((prev) => [...prev, response.data]);
    } catch {
      setError("Failed to create item");
    } finally {
      setLoading(false);
    }
  };

  // UPDATE (PUT)
  const updateItem = async (id, updatedItem) => {
    try {
      setLoading(true);
      const response = await axiosInstance.put(`${url}/${id}`, updatedItem);

      // Update item in local state
      setData((prev) =>
        prev.map((item) => (item.id === id ? response.data : item))
      );
    } catch {
      setError("Failed to update item");
    } finally {
      setLoading(false);
    }
  };

  // DELETE
  const deleteItem = async (id) => {
    try {
      setLoading(true);
      await axiosInstance.delete(`${url}/${id}`);

      // Remove item from local state
      setData((prev) => prev.filter((item) => item.id !== id));
    } catch {
      setError("Failed to delete item");
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    fetchAll,
    createItem,
    updateItem,
    deleteItem,
  };
};

export default useAxiosCRUD;