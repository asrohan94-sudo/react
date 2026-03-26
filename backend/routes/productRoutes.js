import express from "express";
import multer from "multer";
import { 
  listProducts, 
  deleteProduct, 
  singleProduct 
} from "../controllers/ProductController.js"; // controller methods for non-file operations
import cloudinary from "cloudinary";
import fs from "fs";
import Product from "../models/productModel.js";

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Cloudinary config
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper to upload files
const uploadToCloudinary = async (filePath, folder = "courses") => {
  const result = await cloudinary.v2.uploader.upload(filePath, { folder });
  fs.unlinkSync(filePath);
  return result.secure_url;
};

// CREATE COURSE with images
router.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "routineImages", maxCount: 10 },
  ]),
  async (req, res) => {
    try {
      const { name, price, category, examCount, notesCount, featureCount, link, description, features, specialFeatures, time } = req.body;

      let imageUrl = "";
      if (req.files?.image?.[0]) {
        imageUrl = await uploadToCloudinary(req.files.image[0].path, "courses/main");
      }

      let routineUrls = [];
      if (req.files?.routineImages?.length > 0) {
        routineUrls = await Promise.all(
          req.files.routineImages.map((file) => uploadToCloudinary(file.path, "courses/routine"))
        );
      }

      const course = await Product.create({
        name,
        price,
        category,
        examCount,
        notesCount,
        featureCount,
        link,
        description,
        features,
        specialFeatures,
        time,
        image: imageUrl,
        routineImages: routineUrls,
      });

      res.status(201).json({ success: true, course });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: err.message });
    }
  }
);

// UPDATE COURSE with images
router.put(
  "/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "routineImages", maxCount: 10 },
  ]),
  async (req, res) => {
    try {
      const course = await Product.findById(req.params.id);
      if (!course) return res.status(404).json({ success: false, message: "Course not found" });

      let imageUrl = course.image;
      if (req.files?.image?.[0]) {
        imageUrl = await uploadToCloudinary(req.files.image[0].path, "courses/main");
      }

      let routineUrls = course.routineImages;
      if (req.files?.routineImages?.length > 0) {
        routineUrls = await Promise.all(
          req.files.routineImages.map((file) => uploadToCloudinary(file.path, "courses/routine"))
        );
      }

      const updatedCourse = await Product.findByIdAndUpdate(
        req.params.id,
        { ...req.body, image: imageUrl, routineImages: routineUrls },
        { new: true }
      );

      res.json({ success: true, course: updatedCourse });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: err.message });
    }
  }
);

// ROUTES without files can use controllers
router.get("/", listProducts);
router.get("/:id", singleProduct);
router.delete("/:id", deleteProduct);

export default router;