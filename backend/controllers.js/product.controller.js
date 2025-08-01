import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log("Error in Get Products", error.message);
        res.status(500).json({ success: false, message: "Error in Get Products"});
    }
}

export const createProduct = async (req,res) => {
    const product = req.body;

    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "All fields are required"});
    }

    const newProduct = await Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.log("Error in Create Product", error.message);
        res.status(500).json({ success: false, message: "Error in Create Product"});
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Product ID"});
    }

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted successfully"});
    } catch (error) {
        console.log("Error in Delete Product", error.message);
        res.status(500).json({ success: false, message: "Server error"});
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Product ID"});
    }

    try {
        await Product.findByIdAndUpdate(id, product, { new: true });
        res.status(200).json({ success: true, data: product, message: "Product updated successfully"});
    } catch (error) {
        console.log("Error in Update Product", error.message);
        res.status(500).json({ success: false, message: "Server error"});
    }
}